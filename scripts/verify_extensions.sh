#!/bin/bash

# This script checks if some version has been added to the extensions.json file
# and for each version:
# - if the version is not already present in the repository
# - if the files associated with the version are present in the repository
# - if the version of the package in the image matches the version in the extensions.json
# - if the name of the extension in the image matches the name in the extensions.json
# - if the publisher name of the extension in the image matches the publisher name in the extensions.json
#
# The script exits with an error code if any of the checks fail.
#
# Pre-requisites:
# - the changes are committed
# - podman is available
# - jq is available
#
# Usage: ./verify_extensions.sh [base_branch]
#   base_branch: the base branch to compare the changes with (default: main)

BASE_BRANCH=${1:-main}
echo "Base branch: $BASE_BRANCH"

# Get the diff for the specific file
if git diff --quiet origin/$BASE_BRANCH...HEAD -- static/api/extensions.json; then
  echo "[OK] No changes found in static/api/extensions.json"
  exit 0
else
  echo "Changes found in static/api/extensions.json"
  CHANGES=$(comm -2 -3 \
    <(jq -r '.extensions[] | .versions[] | .ociUri' static/api/extensions.json | sort) \
    <(jq -r '.extensions[] | .versions[] | .ociUri' <(git show origin/main:static/api/extensions.json) | sort) \
  )
  for ociUri in $CHANGES; do
    echo "New ociUri: $ociUri"
    VERSION=$(cat static/api/extensions.json | \
      jq -c ".extensions[] | .versions[] | select(.ociUri==\"$ociUri\")" \
    )

    # Check if ociUri is already used in the list for other version
    VERSIONS_COUNT=$(echo "$VERSION" | wc -l)
    if [ "$VERSIONS_COUNT" -ne "1" ]; then
      echo "[ERROR] Multiple versions found for $ociUri: $VERSIONS_COUNT"
      for version in $VERSION; do
        echo -n "> Version: "; echo $version | jq .
      done
      exit 1
    fi
    echo -n "New version: "; echo $VERSION | jq .

    # Check the files are present in the repository
    FILES=$(echo $VERSION | jq -r '.files[] | .data')
    PREFIX="https://registry.podman-desktop.io"
    for file in $FILES; do
      if [[ "$file" = "$PREFIX"* ]]; then
        local_file="static"$(echo ${file#$PREFIX})
        if [ ! -f "$local_file" ]; then
          echo -n "[ERROR] File not found: "; echo $local_file
          echo -n "        referenced by: "; echo $file
          exit 1
        fi
      fi
    done
    echo "[OK] All files are present in the repository"

    # Check the content of the image pointed by ociUri
    CONTAINER_ID=$(podman create $ociUri)
    PACKAGE_JSON_CONTENT=$(podman export $CONTAINER_ID | tar -x -O extension/package.json)
    podman rm -f $CONTAINER_ID
    podman rmi -f $ociUri

    # Check the version of the package in the image
    COMMIT_VERSION=$(echo $VERSION | jq -r '.version')
    PACKAGE_VERSION=$(echo $PACKAGE_JSON_CONTENT | jq -r '.version')
    if [ "$PACKAGE_VERSION" != "$COMMIT_VERSION" ]; then
      echo "[ERROR] Package version in image ($PACKAGE_VERSION) does not match the version in the extensions.json ($COMMIT_VERSION)"
      exit 1
    fi
    echo "[OK] Package version in image ($PACKAGE_VERSION) matches the version in the extensions.json ($COMMIT_VERSION)"

    ## get the extension containing the version
    EXTENSION=$(jq -r ".extensions[] | select(any(.versions[]; .ociUri==\"$ociUri\"))" static/api/extensions.json)

    # Check the name of the extension in the image    
    COMMIT_NAME=$(echo $EXTENSION | jq -r '.extensionName')
    PACKAGE_NAME=$(echo $PACKAGE_JSON_CONTENT | jq -r '.name')
    if [ "$PACKAGE_NAME" != "$COMMIT_NAME" ]; then
      echo "[ERROR] Package name in image ($PACKAGE_NAME) does not match the name in the extensions.json ($COMMIT_NAME)"
      exit 1
    fi
    echo "[OK] Package name in image ($PACKAGE_NAME) matches the name in the extensions.json ($COMMIT_NAME)"

    # Check the publisher name of the extension in the image
    COMMIT_PUBLISHER=$(echo $EXTENSION | jq -r '.publisher.publisherName')
    PACKAGE_PUBLISHER=$(echo $PACKAGE_JSON_CONTENT | jq -r '.publisher')
    if [ "$PACKAGE_PUBLISHER" != "$COMMIT_PUBLISHER" ]; then
      echo "[ERROR] Publisher in image ($PACKAGE_PUBLISHER) does not match the publisher in the extensions.json ($COMMIT_PUBLISHER)"
      exit 1
    fi
    echo "[OK] Publisher in image ($PACKAGE_PUBLISHER) matches the publisher in the extensions.json ($COMMIT_PUBLISHER)"
  done
fi

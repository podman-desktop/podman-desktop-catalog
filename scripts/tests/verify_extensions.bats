#!/usr/bin/env bats
#
# Copyright (C) 2026 Red Hat, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# SPDX-License-Identifier: Apache-2.0

SCRIPT_UNDER_TEST="$BATS_TEST_DIRNAME/../verify_extensions.sh"
FIXTURES="$BATS_TEST_DIRNAME/fixtures"

setup() {
  source "$SCRIPT_UNDER_TEST"
}

@test "validate_target_platforms: empty list fails" {
  run validate_target_platforms "$FIXTURES/empty-list.json"
  [ "$status" -ne 0 ]
  [[ "$output" == *"apple-container: targetPlatforms must be a non-empty list"* ]]
}

@test "validate_target_platforms: non-array value fails" {
  run validate_target_platforms "$FIXTURES/not-an-array.json"
  [ "$status" -ne 0 ]
  [[ "$output" == *"apple-container: targetPlatforms must be a non-empty list"* ]]
}

@test "validate_target_platforms: windows/x64 is rejected" {
  run validate_target_platforms "$FIXTURES/invalid-windows-x64.json"
  [ "$status" -ne 0 ]
  [[ "$output" == *"apple-container: invalid targetPlatform windows/x64"* ]]
}

@test "validate_target_platforms: darwin-arm64 is rejected" {
  run validate_target_platforms "$FIXTURES/invalid-darwin-arm64.json"
  [ "$status" -ne 0 ]
  [[ "$output" == *"apple-container: invalid targetPlatform darwin-arm64"* ]]
}

@test "validate_target_platforms: unknown os passes with a warning" {
  run validate_target_platforms "$FIXTURES/unverified-freebsd.json"
  [ "$status" -eq 0 ]
  [[ "$output" == *"[WARN] Unverified target platforms"* ]]
  [[ "$output" == *"freebsd/riscv64"* ]]
}

@test "validate_target_platforms: valid platforms pass silently" {
  run validate_target_platforms "$FIXTURES/valid.json"
  [ "$status" -eq 0 ]
  [ -z "$output" ]
}

@test "check_image_target_platforms: matching platforms pass" {
  run check_image_target_platforms \
    '{"extensionName":"apple-container","targetPlatforms":["darwin/arm64"]}' \
    '{"name":"apple-container","version":"0.2.0","targetPlatforms":["darwin/arm64"]}'
  [ "$status" -eq 0 ]
}

@test "check_image_target_platforms: mismatch fails" {
  run check_image_target_platforms \
    '{"extensionName":"apple-container","targetPlatforms":["darwin/arm64"]}' \
    '{"name":"apple-container","targetPlatforms":["darwin/arm64","linux/amd64"]}'
  [ "$status" -ne 0 ]
  [[ "$output" == *"do not match"* ]]
}

@test "check_image_target_platforms: missing field in image is treated as empty and fails" {
  run check_image_target_platforms \
    '{"extensionName":"apple-container","targetPlatforms":["darwin/arm64"]}' \
    '{"name":"apple-container","version":"0.2.0"}'
  [ "$status" -ne 0 ]
  [[ "$output" == *"do not match"* ]]
}

@test "check_image_target_platforms: order-insensitive comparison" {
  run check_image_target_platforms \
    '{"extensionName":"apple-container","targetPlatforms":["linux/amd64","darwin/arm64"]}' \
    '{"name":"apple-container","targetPlatforms":["darwin/arm64","linux/amd64"]}'
  [ "$status" -eq 0 ]
}

# Hummingbird Extension for Podman Desktop

This extension integrates the [Hummingbird project](https://hummingbird-project.io/) hardened images to Podman Desktop.

## Features

### Hummingbird Catalog

The Podman Desktop Hummingbird extension allows you to directly list the Hummingbird hardened images
from within Podman Desktop and pull them.

![hummingbird-catalog-dark.png](https://github.com/redhat-developer/podman-desktop-hummingbird-ext/raw/v0.3.0/screenshots/hummingbird-catalog-dark.png)

### Alternative page

As the extension is integrated in Podman Desktop, it can scan your local registry and directly suggest alternative
images. 

Combined with the [Grype](https://github.com/podman-desktop/extension-grype) extension, you will be able to compare the
image and their alternatives, comparing image size and number of CVEs.

![hummingbird-alt-dark.png](https://github.com/redhat-developer/podman-desktop-hummingbird-ext/raw/v0.3.0/screenshots/hummingbird-alt-dark.png)

You can get detailed insight on the alternative and the base image in the dedicated details page

![hummingbird-alt-details-dark.png](https://github.com/redhat-developer/podman-desktop-hummingbird-ext/raw/v0.3.0/screenshots/hummingbird-alt-details-dark.png)

### Cloning

Listing image is great, but we also detect the containers that are using an image with a hardened alternative.
From the Hummingbird extension, you can take an existing container and clone its config to use with a Hummingbird image.

![hummingbird-clone-dark.png](https://github.com/redhat-developer/podman-desktop-hummingbird-ext/raw/v0.3.0/screenshots/hummingbird-clone-dark.png)

## End-to-end tests

The Playwright suite covers the installation (install from an OCI image, check that it is active, verify its details
page) as well as the extension functionality. The functional specs open the extension
webview — the same way the [bootc extension](https://github.com/podman-desktop/podman-desktop-extension-bootc) suite
does — and exercise the catalog (repository cards, search, pulling a Hummingbird image, opening its details in Podman
Desktop) and the hardened image alternatives page. The Grype scanning flow (installing the Grype extension and running
the vulnerability analysis) runs on Windows only. The extension is installed once by the first spec file and removed by
the last one (`hummingbird-installation-smoke.spec.ts`), along with the images pulled during the run. It uses
`@podman-desktop/tests-playwright` and an isolated Podman Desktop profile. CI refreshes the framework to `@next` to
match Podman Desktop `main`, regardless of the version pinned in `tests/playwright/package.json`.

CI installs a Podman Desktop production binary via the shared `podman-desktop-install` action. Locally you can either
point at a Podman Desktop checkout or a packaged binary:

```sh
pnpm install --frozen-lockfile
pnpm --dir tests/playwright exec playwright install chromium
PODMAN_DESKTOP_BINARY=/path/to/podman-desktop pnpm test:e2e
```

Or build from a Podman Desktop source checkout:

```sh
cd /path/to/podman-desktop
pnpm install --frozen-lockfile
pnpm test:e2e:build
cd /path/to/podman-desktop-hummingbird-ext
PODMAN_DESKTOP_ARGS=/path/to/podman-desktop pnpm test:e2e
```

On Windows, set `$env:PODMAN_DESKTOP_ARGS` or `$env:PODMAN_DESKTOP_BINARY` in PowerShell before running the tests.
On Linux, install Xvfb and Playwright's system dependencies with
`pnpm --dir tests/playwright exec playwright install --with-deps chromium`.
Set only one of `PODMAN_DESKTOP_BINARY` / `PODMAN_DESKTOP_ARGS`. Locally, have Podman running
beforehand (`podman machine start`): the suite waits for it, but never creates or resets
machines outside CI — the framework's startup helper resets machines stuck in STARTING,
which would delete every local machine.

The default image is `ghcr.io/redhat-developer/podman-desktop-hummingbird-ext:next`. Set `OCI_IMAGE` to test another
published image. Run `pnpm test:e2e` to execute the full suite, or select a subset with tags: `@installation` (install
smoke), `@catalog`, `@alternatives`, `@grype` (Windows only). The catalog spec pulls the small `curl` image by default;
override it with `HUMMINGBIRD_CATALOG_IMAGE` (bare repository name as shown on the catalog card, e.g. `jq`, not a full
image reference). Note that the final cleanup runs in the last spec file of the full suite: a tag-filtered subset
leaves the extension and pulled images behind (the next full run starts from a fresh profile, and the images double as
a local pull cache). Reports, traces, and videos are written under
`tests/playwright/tests/output/`; Playwright's per-test artifacts are under `tests/playwright/output/`.

### Test a local container image

PR checks build the repository's `Containerfile`, export `/extension`, and preload it into the test profile (same pattern
as [quadlet](https://github.com/podman-desktop/extension-podman-quadlet/blob/main/.github/workflows/e2e.yaml) /
[grype](https://github.com/podman-desktop/extension-grype/blob/main/.github/workflows/e2e.yaml)). To reproduce locally
with Podman running:

```sh
podman build -t localhost/local_image ./
container_id=$(podman create --entrypoint /bin/true localhost/local_image)
mkdir -p tests/playwright/tests/output/hummingbird-tests-pd/plugins
podman export "$container_id" | tar -x -C tests/playwright/tests/output/hummingbird-tests-pd/plugins
podman rm "$container_id"
SKIP_INSTALLATION=true SKIP_REMOVE_FOLDER=true PODMAN_DESKTOP_BINARY=/path/to/podman-desktop pnpm test:e2e
```

`SKIP_INSTALLATION=true` skips the registry installation step, and `SKIP_REMOVE_FOLDER=true` preserves the preloaded
profile while still running the framework's global setup (Chromium install). Activation and details checks still run
and fail if the local extension is missing or cannot activate. With `SKIP_INSTALLATION` set, a preloaded extension is
never removed, so the same preloaded profile can be reused across runs.

### CI workflows

- `pr-check.yaml` calls reusable `e2e.yaml` to build and preload the local OCI image, install Podman
  Desktop via `podman-desktop/gh-extensions-actions`, and run the E2E suite (installation, catalog,
  alternatives and the Windows-only Grype scanning flow) on GitHub-hosted
  `ubuntu-26.04` and `windows-2025` runners (same matrix pattern as
  [extension-podman-quadlet](https://github.com/podman-desktop/extension-podman-quadlet/blob/main/.github/workflows/e2e.yaml)).
  The runners also run Docker, which Podman Desktop may pick for pulls (breaking them in different ways
  per OS), so the workflow stops Docker and starts the Podman socket before the tests to make Podman
  the only container engine.
- The same workflow also runs after a successful `next-build.yaml` on `main`. It checks out that build's commit
  and installs the image `next-build` tags with that commit's SHA (pushed alongside `:next`), so every merge is
  covered even when several land close together; it never builds an extension of its own on that path. Manual
  runs (and reusable-workflow callers) can select any published image tag via the `extension-tag` input — `next`
  by default, e.g. `0.3.0` or a full 40-character commit SHA — or build from the selected branch with
  `build-extension`.

Both paths publish JUnit summaries and upload per-OS test artifacts. Playwright traces and videos are only kept for
failures; to keep them for passing tests locally, set the framework's `KEEP_TRACES_ON_PASS=true` /
`KEEP_VIDEOS_ON_PASS=true`.

# Lima extension

This standalone extension connects Podman Desktop to existing Lima instances for Podman, Docker, or Kubernetes.
It also transfers container images to a Lima Kubernetes instance.

## Documentation and usage

For usage and documentation, visit the Lima documentation located on the [Podman Desktop website](https://podman-desktop.io/docs/lima).


## Development

Install dependencies and build the extension:

```sh
pnpm install
pnpm build
```

The build creates `dist/extension.js` and bundles its runtime dependencies.
Podman Desktop supplies `@podman-desktop/api` at runtime.

Load the extension through **Extensions > Development > Add a local folder extension...**.
If development mode is disabled, enable it first.
Select this project folder.
If Lima is stopped, click **Start the extension** (the play button) beside its row.


## Settings

The extension uses the `lima` settings in Podman Desktop:

| Setting            | Default                  | Purpose                                             |
| ------------------ | ------------------------ | --------------------------------------------------- |
| `lima.type`        | `podman`                 | Select `podman`, `docker`, or `kubernetes`.         |
| `lima.name`        | Engine type              | Select the existing Lima instance.                  |
| `lima.socket`      | `<type>.sock`            | Select the socket in the instance `sock` directory. |
| `lima.home`        | `LIMA_HOME` or `~/.lima` | Select the directory for Lima instances.            |
| `lima.binary.path` | `limactl` on `PATH`      | Select a custom Lima executable.                    |

## OCI image

To package an OCI image, run:

```sh
podman build -f Containerfile -t localhost/podman-desktop-extension-lima:dev .
```

The Containerfile installs the locked dependencies and builds the extension from source.
The final image contains the extension files in `/extension`.

For registry installation, tag and push the image to your registry.
Use **Extensions > Install custom...** with the image reference.

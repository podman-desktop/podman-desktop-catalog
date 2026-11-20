# Docker over TCP — Podman Desktop extension

Connect [Podman Desktop](https://podman-desktop.io) to Docker engines that are only reachable via `tcp://`, for example Docker Engine running inside WSL 2 and exposed on `tcp://127.0.0.1:2375`.

## Why

Podman Desktop can only talk to container engines through a local Unix socket or Windows named pipe. Docker contexts and `DOCKER_HOST` values using `tcp://` are skipped. If you run Docker Engine in WSL without Docker Desktop, the Containers, Images and Volumes views stay empty ("No Container Engine").

## How it works

For each configured `tcp://` endpoint, the extension:

1. opens a private local pipe (`\\.\pipe\pd-docker-tcp-<name>` on Windows, a Unix socket in the temp dir elsewhere),
2. relays every connection on that pipe to the TCP address,
3. registers the pipe as a Docker container connection in Podman Desktop,
4. pings `/_ping` every 5 seconds and shows the connection as started or stopped.

No external processes, no admin rights, no changes to your Docker setup.

## Install

**From the image (recommended)**

In Podman Desktop: **Extensions → Install custom…** and enter:

```
ghcr.io/gasparovicm/podman-desktop-docker-tcp:latest
```

**From source (development mode)**

1. Clone or download this repository.
2. **Settings → Preferences → Extensions →** enable **Development Mode**.
3. **Extensions → Local Extensions → Add a local folder extension…** and select the folder.

## Configure

**Settings → Preferences → Docker over TCP → Endpoints**

Default: `WSL Docker=tcp://127.0.0.1:2375`

Multiple engines are separated by `;`:

```
WSL Docker=tcp://127.0.0.1:2375; Build server=tcp://127.0.0.1:23750
```

Changes apply immediately.

## Docker in WSL: expose the engine on localhost only

In `/etc/docker/daemon.json` inside your WSL distro:

```json
{ "hosts": ["unix:///var/run/docker.sock", "tcp://127.0.0.1:2375"] }
```

If your distro's `docker.service` passes `-H fd://`, override it so the `hosts` setting is used:

```bash
sudo systemctl edit docker
# add:
# [Service]
# ExecStart=
# ExecStart=/usr/bin/dockerd
sudo systemctl restart docker
```

Use `tcp://127.0.0.1:2375`, not `tcp://localhost:2375`: Node.js may resolve `localhost` to IPv6 `::1`, which WSL usually does not forward.

## Security

Plain `tcp://` on port 2375 has **no authentication and no encryption**. Anyone who can reach it effectively has root on the Docker host. Only bind it to `127.0.0.1`. For remote engines, use an SSH tunnel and point the extension at the local end:

```bash
ssh -N -L 23750:/var/run/docker.sock user@server
```

The local pipe created by the extension is only accessible to your own user.

## Troubleshooting

**? → Troubleshooting → Logs**, filter for `docker-tcp`. Each endpoint logs one line when it starts, or an error explaining why it could not.

## License

Apache-2.0

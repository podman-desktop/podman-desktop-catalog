# Podman Desktop Quadlet Extension

[![codecov](https://codecov.io/github/podman-desktop/extension-podman-quadlet/graph/badge.svg?token=P885ZCDJA7)](https://codecov.io/github/podman-desktop/extension-podman-quadlet)
[![GitHub Repo stars](https://img.shields.io/github/stars/podman-desktop/extension-podman-quadlet)](https://github.com/podman-desktop/extension-podman-quadlet)

## Overview

![quadlet-list.png](https://github.com/podman-desktop/extension-podman-quadlet/raw/main/images/quadlet-list.png)


## Install

You can install the Podman Quadlet Extension from the extension page and use `ghcr.io/podman-desktop/pd-extension-quadlet:latest`. See the instruction on [How to install an extension](https://podman-desktop.io/docs/extensions/install)

### Requirements

- Podman version 5 and above

## Generating Quadlets

This extension will allow you to list, generate, enable and delete podman quadlet in a given Podman Machine.

### Containers

You can generate Quadlet from the Podman Desktop containers page, as visible bellow

![generate-from-containers-list.png](https://github.com/podman-desktop/extension-podman-quadlet/raw/main/images/generate-from-containers-list.png)

![quadlet-generate-container.png](https://github.com/podman-desktop/extension-podman-quadlet/raw/main/images/quadlet-generate-container.png)

Once generated, the output can be edited before being loaded into the Podman Machine

![edit-podlet-output.png](https://github.com/podman-desktop/extension-podman-quadlet/raw/main/images/edit-podlet-output.png)

### Compose

The extension has a partial support for create quadlet from an existing compose specification

> Podman Desktop group containers in the same compose project.
> This allows us to determine which spec has been used by looking at the `com.docker.compose.project.config_files` containers label

![generate-from-compose.png](https://github.com/podman-desktop/extension-podman-quadlet/raw/main/images/generate-from-compose.png)

Two type of Quadlet can be generated from a compose specification, `Container`, `Kube` or `Pod`

![quadlet-generate-compose.png](https://github.com/podman-desktop/extension-podman-quadlet/raw/main/images/quadlet-generate-compose.png)


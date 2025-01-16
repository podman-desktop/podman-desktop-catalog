# Podman Desktop Quadlet Extension

## Overview

![quadlet-list.png](https://github.com/axel7083/pd-extension-quadlet/blob/a5d3058be94aa5b8b0c784b3c2e3c81657e1e928/images/quadlet-list.png?raw=true)

## Install

You can install the Podman Quadlet Extension from the extension page and use `ghcr.io/axel7083/pd-extension-quadlet:latest`. See the instruction on [How to install an extension](https://podman-desktop.io/docs/extensions/install)

### Requirements

- Podman version 5 and above

## Generating Quadlets

This extension will allow you to list, generate, enable and delete podman quadlet in a given Podman Machine.

This extension integrate the [Podlet](https://github.com/containers/podlet) tool, allowing you to generate Quadlet file from 
an existing resource such as a Container or an Image.

### Containers

You can generate Quadlet from the Podman Desktop containers page, as visible bellow

![generate-from-containers-list.png](https://github.com/axel7083/pd-extension-quadlet/blob/a5d3058be94aa5b8b0c784b3c2e3c81657e1e928/images/generate-from-containers-list.png?raw=true)

![quadlet-generate-container.png](https://github.com/axel7083/pd-extension-quadlet/blob/a5d3058be94aa5b8b0c784b3c2e3c81657e1e928/images/quadlet-generate-container.png?raw=true)

Once generated, the podlet output can be edited before being loaded into the Podman Machine

![edit-podlet-output.png](https://github.com/axel7083/pd-extension-quadlet/blob/a5d3058be94aa5b8b0c784b3c2e3c81657e1e928/images/edit-podlet-output.png?raw=true)

### Compose

Podlet has a support for create quadlet from an existing compose specification

> Podman Desktop group containers in the same compose project. 
> This allows us to determine which spec has been used by looking at the `com.docker.compose.project.config_files` containers label

![generate-from-compose.png](https://github.com/axel7083/pd-extension-quadlet/blob/a5d3058be94aa5b8b0c784b3c2e3c81657e1e928/images/generate-from-compose.png?raw=true)

Two type of Quadlet can be generated from a compose specification, `Container`, `Kube` or `Pod`

![quadlet-generate-compose.png](https://github.com/axel7083/pd-extension-quadlet/blob/a5d3058be94aa5b8b0c784b3c2e3c81657e1e928/images/quadlet-generate-compose.png?raw=true)


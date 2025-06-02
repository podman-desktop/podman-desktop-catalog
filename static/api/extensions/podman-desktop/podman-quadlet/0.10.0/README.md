# Podman Desktop Quadlet Extension

## Overview

![quadlet-list.png](https://github.com/axel7083/pd-extension-quadlet/blob/a5d3058be94aa5b8b0c784b3c2e3c81657e1e928/images/quadlet-list.png?raw=true)

## Install

You can install the Podman Quadlet Extension from the extension page and use `ghcr.io/axel7083/pd-extension-quadlet:latest`. See the instruction on [How to install an extension](https://podman-desktop.io/docs/extensions/install)

### Requirements

- Podman version 5 and above

## Generating Quadlets

This extension will allow you to list, generate, enable and delete podman quadlet in a given Podman Machine.

### Containers

You can generate Quadlet from the Podman Desktop containers page, as visible bellow

![generate-from-containers-list.png](https://github.com/axel7083/pd-extension-quadlet/blob/a5d3058be94aa5b8b0c784b3c2e3c81657e1e928/images/generate-from-containers-list.png?raw=true)

![quadlet-generate-container.png](https://github.com/axel7083/pd-extension-quadlet/blob/a5d3058be94aa5b8b0c784b3c2e3c81657e1e928/images/quadlet-generate-container.png?raw=true)

Once generated, the output can be edited before being loaded into the Podman Machine

![edit-podlet-output.png](https://github.com/axel7083/pd-extension-quadlet/blob/a5d3058be94aa5b8b0c784b3c2e3c81657e1e928/images/edit-podlet-output.png?raw=true)

### Compose

The extension has a partial support for create quadlet from an existing compose specification

> Podman Desktop group containers in the same compose project. 
> This allows us to determine which spec has been used by looking at the `com.docker.compose.project.config_files` containers label

![generate-from-compose.png](https://github.com/axel7083/pd-extension-quadlet/blob/a5d3058be94aa5b8b0c784b3c2e3c81657e1e928/images/generate-from-compose.png?raw=true)

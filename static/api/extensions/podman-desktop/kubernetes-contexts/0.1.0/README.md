# Kubernetes Contexts Podman Desktop Extension

![License: Apache 2.0](https://img.shields.io/badge/license-Apache%202.0-blue)

Kubernetes Contexts is an open source extension for Podman Desktop to manage Kubernetes contexts.

The extension displays the list of Kubernetes Contexts defined in your kubeconfig file. This kubeconfig file can be 
configured through the preference `Kubernetes > Kubeconfig`. 

## Operations on existing contexts

The operations you can execute on the existing contexts are:

- select the current kube contexts:  
  this will update the kubeconfig file, to set a specific context as the current one
- duplicate a context:  
  this will create a new kube context, with the same information as the duplicated context, except the name of the context to which a unique number will be added
- edit a context:  
  you can change the name of the context, its cluster, user and namespace
- delete a context:  
  remove the context from the kubeconfig file

## Importing contexts

You can import new contexts, by selecting a kubeconfig file. This will check for conflicts between the contexts in your current kubeconfig file and the contexts in the imported file, and propose you to select which contexts to import.

# Installation

## Install latest release

Install the custom extension `ghcr.io/podman-desktop/podman-desktop-extension-kubernetes-contexts:latest` to try the latest extension.

## Development version

Install the custom extension `ghcr.io/podman-desktop/podman-desktop-extension-kubernetes-contexts:next` to try the extension published after each commit.

# Contributing

First clone this repository on your disk, then run `pnpm i` in the root directory of the sources, then watch the changes in the `packages/webview` directory:

```
$ git clone git@github.com:podman-desktop/extension-kubernetes-contexts.git
$ cd extension-kubernetes-contexts
$ pnpm i
[...]
$ cd packages/webview
$ pnpm watch
[ do not stop this command, as it waiting for changes to rebuild the webview ]
```

## Using the production version of Podman Desktop

- In Settings > Preferences, in the Extensions section, enable the Development mode
- In Extensions > Local Extensions, select `Add a local folder extension...` and select the sub-directory `packages/extension` of the sources you cloned previously.

You can now make changes to the sources. The project is composed of two parts, which are built separately: the extension code, and the webview code. The extension code is rebuilt after each change by Podman Desktop itself, and the webview part is rebuilt by the `pnpm watch` command you started previously.

> Note that when you only change code in the webview part, the webview is built, and the result is included in the extension, which triggers the rebuild of the extension.

After each change, you may have to restart the extension from the `Extensions > Local Extensions` page.

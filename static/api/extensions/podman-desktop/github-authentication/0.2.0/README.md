# Podman Desktop GitHub Account Extension

## Overview

This extension helps authenticate to GitHub from Podman Desktop to increase the [GitHub API rate-limit](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28), and store the authentication information. When a user authenticates, other extensions in Podman Desktop can use the authentication information to use GitHub's API.

## Install
You can install the GitHub authentication extension for Podman Desktop from the extension page using `ghcr.io/podman-desktop/podman-desktop-github-ext:latest`.

## How to Use
After installing the extension on Podman Desktop, click on the `Accounts` section in the navigation bar or go to `Settings` > `Authentication`, click on the `sign in` button for GitHub authentication, and a pop-up will show.
There are a couple of ways to authenticate:
1. Using GitHub Personal Access Token (PAT)
2. Using web authentication

### PAT Authentication
In the pop-up, choose `Use PAT`, and enter the GitHub Personal Access Token in the input box that will show up on the top of the window.

### Web Authentication
In the pop-up, choose `Use Browser`, copy the code `XXXX-XXXX` that shows up in the info message, and click on `Continue to GitHub`. From there, you will be taken to a `Device Activation` GitHub page in your browser where it will prompt you to continue with your GitHub profile and enter the `XXXX-XXXX` code. Then, you will need to authorize `Podman Desktop GitHub Authentication` to access your account with the listed scopes.
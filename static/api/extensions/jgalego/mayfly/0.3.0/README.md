# Mayfly

Describe a small web app. Mayfly builds it and runs it on your machine in Podman, behind sign-in.

![Mayfly writes a lunch-splitting app, tries it, repairs it and runs it, then changes it, answers a question about it, and shows its history, code and usage](https://raw.githubusercontent.com/JGalego/mayfly/main/assets/demo.gif)

Mayfly is a preview. Expect rough edges, and please report them in [issues](https://github.com/JGalego/mayfly/issues).

## What you need

- A running Podman 5 machine.
- An API key for OpenAI, or any OpenAI-compatible endpoint.

## Use it

1. Open **Mayfly → Settings → Models**. The default is OpenAI. Add a key, or choose another provider and model.
2. Choose **New app** and describe what you need. You can attach images, such as a mockup, and text files with data.
3. Choose **Open app** and sign in with the email and password under **Sign-in details**.
4. Ask for changes in the app's conversation. Type `/` for commands, such as `/ask` a question without changing the app or `/undo` the last deploy.

**Settings → General → Enable developer mode** adds the code, version history, logs and usage reports.

## On your phone

**Settings → General → Open apps from my phone** lets your phone open the apps over HTTPS through [Tailscale](https://tailscale.com), installed on the computer and the phone with the same account. First, in Tailscale's admin console, open **DNS**, make sure MagicDNS is on, and choose **Enable HTTPS**. Each app's **On your phone** shows a QR code to scan. The apps keep their localhost address, and nothing listens on your network.

## How it works

The model writes only the app's routes, in one TypeScript file. Mayfly supplies sign-in, health checks, logs and the container settings, the same for every app. Before deploying a version, Mayfly builds it and tries it with no network and no privileges, and sends any failure back to the model.

Each app runs as one pod: oauth2-proxy in front, on `127.0.0.1` only, and the app behind it. Sign-in comes from a local Dex, also on `127.0.0.1`, which runs while any app does. It uses port 5556, or the next free one if another program holds that.

## What leaves your machine

Your requests, their attachments and your apps' code go to the model provider you choose, with your key, which Podman Desktop stores. Emails to people you share apps with go through the mail server you set up, if you set one up. Apart from pulling its images from ghcr.io and quay.io, Mayfly contacts nothing else and collects no telemetry.

With phone access on, Tailscale carries your phone's traffic, encrypted end to end, and the computer's Tailscale name appears in public certificate logs.

## Remove it

`/remove` each app, which takes its pod and images with it, and then uninstall Mayfly. Sign-in and Mayfly's Podman network go with the last app. The runtime, Dex and oauth2-proxy images stay under **Images** until you remove them.

## More

Source, design and the app contract: [github.com/JGalego/mayfly](https://github.com/JGalego/mayfly). Mayfly is licensed under the AGPL-3.0. The runtime your apps run on is MIT, so the apps you make are yours.

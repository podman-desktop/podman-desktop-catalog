# Podman Desktop Red Hat Account Extension

The Podman Desktop Red Hat Account Extension puts the [Red Hat Developers Subscription](https://developers.redhat.com/) and the Red Hat ecosystem at your fingertips. In just a few clicks, you can sign into your Red Hat account or create a new one with a custom email address or social login via your Google, Microsoft, or GitHub account. The Developer Subscription enables you to consume Red Hat content such as RHEL container images and RPM packages at no cost. The Podman Desktop Red Hat Account Extensions makes sure to only consume the no-cost Developer Subscriptions even if you already have paid subscriptions linked to your account. It is supported on Windows, MacOS and Linux.

# Usage

Once installed, you can find the extension in the Settings menu which you can find in the bottom left corner of Podman Desktop.  To sign into your Red Hat account, open the Authentication menu and click on the "Sign in" button:

![image](https://raw.githubusercontent.com/redhat-developer/podman-desktop-redhat-account-ext/v1.0.1/screenshots/authentication-menu.png)

To sign into your Red Had account, Podman Desktop will open Red Hat SSO in your browser of choice.  The SSO form will make sure that each user has accepted the terms and conditions, and has a valid Red Hat [developers subscription](https://developers.redhat.com/about?source=sso). If needed, you may also create a new Red Hat account and further use social login via an existing Google, Microsoft or GitHub account:

![image](https://raw.githubusercontent.com/redhat-developer/podman-desktop-redhat-account-ext/v1.0.1/screenshots/sso.png)

Once signed in, there is nothing further to be done. Podman Desktop will automatically use the SSO token to log into the Red Hat container registry and to register the Linux virtual machine (i.e., podman machine) via subscription-manager. The two tasks are listed in the Tasks menu which you can open on the bottom right of Podman Desktop:

![image](https://raw.githubusercontent.com/redhat-developer/podman-desktop-redhat-account-ext/v1.0.1/screenshots/tasks.png)

To verify that the sign-in process was successful, you may build the following Dockerfile:
```Dockerfile
FROM registry.redhat.io/rhel9/toolbox
RUN  dnf install -y kernel
````

Pulling the container image `registry.redhat.io/rhel9/toolbox` requires having logged into the Red Hat container registry.  Installing the `kernel` package requires access to protected content.

Once signed in, you can now see being logged into the Red Hat Container Registry `registry.redhat.io` in the Registries menu:
![image](https://raw.githubusercontent.com/redhat-developer/podman-desktop-redhat-account-ext/v1.0.1/screenshots/registries.png)

## Usage on Linux

The extension requires a running Podman Machine which grants root privileges required to run subscription-manager.  In order to create a Podman Machine you may run `podman machine init` in your terminal; Podman Desktop and the extension will then be able to use that Podman Machine.

From a technical perspective, the extension is not required when running on Linux.  You can run `podman login registry.redhat.io` and `subscription-manager register` with the credentials of your Red Hat account.  `subscription-manager` is available on Fedora, CentOS, and Red Hat Enterprise Linux.

# Installation

You can install the Red Hat Account Extension directly inside of Podman Desktop.  It is also part of the Red Hat Extension Pack:

![image](https://raw.githubusercontent.com/redhat-developer/podman-desktop-redhat-account-ext/v1.0.1/screenshots/installation.png)

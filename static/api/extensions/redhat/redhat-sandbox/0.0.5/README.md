# Podman Desktop Developer Sandbox Extension

This extension puts you to just few clicks away form deploying your application to [Developer Sandbox](https://developers.redhat.com/developer-sandbox), a 30 days no cost shared cluster on [OpenShift](https://www.redhat.com/en/technologies/cloud-computing/openshift).
After few simple configuration steps the extension allows you to push an image to Sandbox internal image registry, so you can create and start containers from that image in OpenShift cluster using Podman Desktop UI.

# Usage

Once installed, you can find the Sandbox resource added to the Resources settings page.

![1-sandbox-in-resource-settings](https://raw.githubusercontent.com/containers/podman-desktop-media/developer-sandbox/0.0.5/readme/327929183-133c684f-a09f-4aa4-8447-29e5700af51c.png)

To configure kubernetes context for your Sandbox click on 'Create new ...' button to see Sandbox kubernetes context configuration form.

![2-new-sandbox-form-annotated](https://raw.githubusercontent.com/containers/podman-desktop-media/developer-sandbox/0.0.5/readme/327929197-80e22375-7d69-43cb-ad06-4dd1dd1777ea.png)

Follow the description on top of the form to copy a login command from Sandbox Developer Console to `Login command from Developer Console` field. Then set desired kubernetes context name in corresponding field and press `Create` button.

![3-new-sandbox-form](https://raw.githubusercontent.com/containers/podman-desktop-media/developer-sandbox/0.0.5/readme/327929217-fc1cb010-4f86-46c6-853f-428c73f4544e.png)

There should be new Sandbox connection in 'running' state in Sandbox section after that.

![4-sandbox-connection-created](https://raw.githubusercontent.com/containers/podman-desktop-media/developer-sandbox/0.0.5/readme/327929224-45082f01-5cb7-4087-be31-d6ca8152f527.png)

To deploy your first application on OpenShift. Create `Containerfile` shown below

```
FROM --platform=linux/amd64 registry.access.redhat.com/ubi8/httpd-24:latest

LABEL org.opencontainers.image.title="Simple application with static content" \
        org.opencontainers.image.description="This is example of using Apache httpd 2.4 image to deploy web server with static content" \
        org.opencontainers.image.vendor="Red Hat"
```

Open Podman Desktop 'Build image' page and point `Containerfile path` to Containerfile above. Put `httpd-demo`
in `Image Name` field. Select `Intel and AMD x86_64` in platform section and press 'Build' button to build the image.

![5-build-image](https://raw.githubusercontent.com/containers/podman-desktop-media/developer-sandbox/0.0.5/readme/327929234-7ab6e96a-a5a4-4dde-991f-f9f372200e60.png)

After build is done pres `Done` button to swithch to `Images` page.

![6-build-image-result](https://raw.githubusercontent.com/containers/podman-desktop-media/developer-sandbox/0.0.5/readme/327929237-40754e69-7f90-460d-92fb-dc4dcd1cea11.png)

In the Images page find `httpd-demo` image and select item `Push to Developer Sandbox cluster` to tag image with
Sandbox internal registry name and then push tagged image to the registry.

![7-push-image-to-sandbox](https://raw.githubusercontent.com/containers/podman-desktop-media/developer-sandbox/0.0.5/readme/327929266-c2e2ada8-ca38-488d-b86e-1c1778a27d62.png)

After successfuly pushing the image to internal Sandbox image registry an information message with explanation should apperar.

![8-push-image-to-sandbox-message](https://raw.githubusercontent.com/containers/podman-desktop-media/developer-sandbox/0.0.5/readme/403705946-7d94f04b-9e6b-4f5f-aa0c-60793c3b0b56.png)

Close the message and run the image mentioned in it using run button on the right side of the image item.

![9-run-built-image](https://raw.githubusercontent.com/containers/podman-desktop-media/developer-sandbox/0.0.5/readme/327929340-d3a694e7-5b41-4ed0-972d-2bdcf134e7f0.png)

In `Create Container` leave all default values and press `Start Container` button.

![10-container-successfully-started](https://raw.githubusercontent.com/containers/podman-desktop-media/developer-sandbox/0.0.5/readme/327929345-2f85abd9-442e-477a-8c6f-641240c39526.png)

After container sucessfully started it can be deployed to kubernetes.

![11-run-built-image-form](https://raw.githubusercontent.com/containers/podman-desktop-media/developer-sandbox/0.0.5/readme/327929349-b9b41027-3da4-45be-b77a-94f94c07a9a9.png)

Make sure current kubernetes context is pointing to Sandbox and press `Deploy` button.

![12-deploy-container-to-kube-form](https://raw.githubusercontent.com/containers/podman-desktop-media/developer-sandbox/0.0.5/readme/327929355-ead4d044-3ca1-4b44-943d-453f36fe8a63.png)

After successful deployment application can be opened in browser.

![13-deploy-container-to-kube-result](https://raw.githubusercontent.com/containers/podman-desktop-media/developer-sandbox/0.0.5/readme/327929361-b68f5c2c-348d-4615-b10b-c64167723bf7.png)

The browser window should show default test page for the running HTTPD server.

![14-httpd-test-image](https://raw.githubusercontent.com/containers/podman-desktop-media/developer-sandbox/0.0.5/readme/327929375-1682f764-d722-43d9-a9ad-6278631c9d7a.png)

# Installation

You can install Developer Sandbox Extension directly from Podman Desktop Extension page.

![15-installing-ext-from-catalog](https://raw.githubusercontent.com/containers/podman-desktop-media/developer-sandbox/0.0.5/readme/403708082-6f1bb012-d595-4fb8-94ee-8ada8e1c042c.png)

# Nightly Build Installation

On the `Extension` page press 'Install custom ...'.

![image](https://raw.githubusercontent.com/containers/podman-desktop-media/developer-sandbox/0.0.5/readme/327929665-97b4a51a-8c3c-4663-9c17-291022cdb57b.png)

Paste `ghcr.io/redhat-developer/podman-desktop-sandbox-ext:latest` to the `OCI Image` field and press `Install` button.

![image](https://raw.githubusercontent.com/containers/podman-desktop-media/developer-sandbox/0.0.5/readme/327929876-65ccbbcd-6c86-4f06-9033-119ec6b1a990.png)



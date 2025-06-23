# Kreate: Podman Desktop Extension

The Kreate extension for Podman Desktop provides utilities to help developers create manifests for Kubernetes resources.

## Templates

The user can use templates to create various Kubernetes resources. The user fills the form
for a specific resource type, and the YAML manifest to create the resource is displayed. The user
can then update the YAML manifest if necessary, before to apply this YAML manifest to the current Kubernetes context.

The standard forms provided by Kreate are based on the commands `kubectl create ...`.

## Explain

When the user is editing the Kubernetes manifest for a resource, the documentation
for the resource being edited is displayed, focusing on the part of the manifest being edited.

## Extending forms

Kreate is extensible and you can provide your own commands with their own arguments
and flags.

The format to define a new command is:

```
{
  "name": "resource-name",
  "args": [
    {
      "name": "name",
      "label": "Name",
      "description": "Name of the resource to create",
      "required": true
    }
  ],
  "options": [
    {
      "flag": "--flag1",
      "label": "Flag 1",
      "description": "Description of flag 1",
      "type": "file",
      "multiple": false
    }    
  ],
  "cli": [
    "mycli",
    "create",
    "resource-name",
    "--dry-run=client",
    "-o",
    "yaml"
  ]
}
```

The `.name` value will be displayed in the GUI, in the dropdown menu in which the user can select 
which resource he wants to create.

The `args` are the manadory parameters added to the command (without flags), and are always of type `string`.

The `options` are the flags provided by the command. They can be of different types:

- `string`: a string value (single or multiple)
- `password`: a string value, which will be hidden in the UI
- `number`: a numeric value, with a default value
- `file`: a file path, the UI providing a dialog to select a file (single or multiple)
- `key-value`: a key/value pair (multiple)
- `key-fileOrDirectory`: a key and a file or directory (used by `kubectl create configmap --from-file`) (multiple)

The `repeatFlag` attribute for an option indicates if the flag must be repeated in the command line, for example `cli --flag1 value1 --flag1 value2`.

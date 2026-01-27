# Image Layers Explorer

The Image layers explorer is an extension for Podman Desktop.

When installed, Podman Desktop displays a new "Files" tab in the Details page of Images.

When you open this tab, the layers of the image are listed. By clicking on a specific layer,
you can display the files included in this layer.

Layers are displayed in the order of the operations in a Dockerfile / Containerfile: to illustrate, the first layer is the result of the `FROM <image>` placed in the first line of the Dockerfile / Containerfile.

Two modes are available for displaying files of a layer:
- normal mode: in this mode, the files displayed are the files that would be available 
  when creating a container based on this image, if the layer stack was finished at this layer.
- layer only: in this mode, the files displayed are the files added or deleted by this layer. 
  The deleted files are displayed in red.

## Layers sizes

Three sizes are displayed for each layer, for example:

  ```
  Layer 1
  4 MB | 4 MB | 4MB

  Layer 2
  100 kB | 100 kB | 4.1 MB
  
  Layer 3
  0 B  | -100 kB | 4 MB
  ````

- the first size indicates the size necessary to store the layer at rest (when stored by a registry for example).
- the second size indicates the contribution of the layer in the size of the files deployed in a container.
- the third size indicates the total size of the files deployed in a container.

In the example above:
- the first layer contains several files, for a total of 4 MB. If a container was created 
at this level, the files would occupy 4 MB in the container.
- the second layer adds a 100 kB file. For a container created at this level, the files would 
occupy 4.1 MB, and the contribution of this second layer in this size is 100 kB.
- the third layer removes the file introduced by the second layer (which was a 100 kB file). Because removing
a file is done by creating an **empty** file with a specific name, the size of the layer at rest is zero.
The total size of files in the created container is 4 MB, and the contribution of this third layer is -100 kB, because 
it reduces the total size in the container.

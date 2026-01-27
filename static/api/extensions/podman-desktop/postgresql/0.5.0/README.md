# PostgreSQL Extension for Podman Desktop

PostgreSQL extension gives the user tools to discover PostgreSQL services
running on Podman, and start new services, with advanced options.

## Discover PostgreSQL instances

The extension discovers existing PostgreSQL instances where configuration is set using environment variables.

![](https://github.com/containers/podman-desktop-media/raw/postgresql/videos/postgres1.gif)

## Start a PgAdmin instance connected to an existing PostgreSQL instance

From the Containers List page, you can start a PgAdmin instance connected to a discovered PostgreSQL instance.

![](https://github.com/containers/podman-desktop-media/raw/postgresql/videos/postgres2.gif)

## Start a new PostgreSQL instance, with optional PgAdmin

From the dashboard of the extension, you can create a new PostgreSQL instance, with your preferred postgres image, port, database name, user and password, and
optionally attach a PgAdmin instance to the PostgreSQL instance. 

If the PgAdmin option is chosen, two containers will be created in a Pod, one for the PostgreSQL instance and one for the PgAdmin instance.

![](https://github.com/containers/podman-desktop-media/raw/postgresql/videos/postgres3.gif)

## Start a new PostgreSQL instance, with initial scripts

You can pass init scripts (either shell or SQL), which will be executed the first time the container is started, to help you create the schema of your database, and populate the database.

![](https://github.com/containers/podman-desktop-media/raw/postgresql/videos/postgres4.gif)

# Docker-Compose Plugin

The Docker-Compose plugin will allow you to launch Docker-Compose commands from a Clarive instance.

## What is Docker-Compose

Compose is a tool for defining and running multi-container Docker applications.  With Compose, you use a Compose file
to configure your application’s services.  Then, using a single command, you create and start all the services from your
configuration.

## Requirements

This plugin requires Docker-Compose and Docker to be installed on the server to work properly.

To install Docker you need to click [here](https://docs.docker.com/engine/installation/linux/centos/) and follow
the instructions.  To install Docker-Compose you need to click [here](https://docs.docker.com/compose/install/) and
follow the instructions.

## Installion

To install the plugin, place the `cla-docker-compose-plugin` folder inside `CLARIVE_BASE/plugins` directory in a Clarive
instance.

## How to Use

Once the plugin is placed in its folder, you will be able to find this service in the Generic section of the Rule
Designer palette.

The configuration form contains the following fields:

- **Server** - The server that holds the remote file, and the server to connect to.
- **Project path** - The full path to the Docker-Compose project directory.
- **Command** - Here you will have different commands to launch with the service, or you may write a custom one.
- **Custom command or arguments** - Here you can write arguments for the selected command or write the commands you wish
  to perform.
- **Errors and output** - These two fields concern management of control errors. The options are:
   - **Fail and output error** - Search for the configured error pattern in the script output. If found, an error
     message is displayed in the monitor showing the match.
   - **Warn and output warn** - Search for the configured warning pattern in the script output. If found, an error
     message is displayed in the monitor showing the match.
   - **Custom** - Where combo errors is set to custom, a new form is displayed for defining behavior using the following
     fields:
   - **OK** - Range of return code values for the script to have succeeded. No message will be displayed in monitor.
   - **Warn** - Range of return code values to warn the user. A warning message will be displayed in the monitor.
   - **Error** - Range of return code values for the script to have failed. An error message will be displayed in
     monitor.

Example:


      Server: generic_server
      Command: Custom
      Project path: /Home/docker-project/
      Custom command or arguments: ps
      Error: fail
      Output:
            Error:
            Warn:
            Ok:
            Capture:

This service will return the console output for the command.

# Docker-Compose Plugin

<img src="https://cdn.jsdelivr.net/gh/clarive/cla-docker-compose-plugin@master/public/icon/logo-docker.svg?sanitize=true" alt="Docker-Compose Plugin" title="Docker-Compose Plugin" width="120" height="120">

The Docker-Compose plugin will allow you to launch Docker-Compose commands from a Clarive instance.

## What is Docker-Compose

Compose is a tool for defining and running multi-container Docker applications.  With Compose, you use a Dockerfile to
configure your application’s services. Then, using a single command, you create and start all the services from your
configuration.

## Requirements

This plugin requires Docker-Compose and Docker to be installed on the server to work properly.

To install Docker click [here](https://docs.docker.com/engine/installation/) and follow the
instructions.  To install Docker-Compose click [here](https://docs.docker.com/compose/install/) and follow
the instructions.

## Installation

To install the plugin, place the `cla-docker-compose-plugin` folder inside `$CLARIVE_BASE/plugins` directory in a Clarive
instance.

## Docker-Compose Task

The various parameters are:

- **Server (variable name: server)** - The server that holds the remote file, and the server to connect to.
- **User (user)** - User which will be used to connect to the server.
- **Project Path (path)** - The full path to the Docker-Compose project directory.
- **Command (command)** - List of commands to launch with the service:
    - **UP (detached) (option name: "up -d")** - Starts the application.
    - **Down ("down")** - Stops the application.
    - **Start ("start")** - Starts a specific service.
    - **Stop ("stop")** - Stops a specific service.
    - **Restart ("restart")** - Restarts a specific service.
    - **Status ("ps")** - Shows the status of the different services.
    - **Custom ("custom")** - Use to execute additional commands.
- **Custom command or arguments (command_parameters)** - Here you can write arguments for the selected command or write the commands you wish to perform.

**Only Clarive EE**

- **Errors and Output** - These two fields concern management of control errors. The options are:
   - **Fail and Output Error** - Search for the configured error pattern in the script output. If found, an error
     message is displayed in the monitor showing the match.
   - **Warn and Output Warn** - Search for the configured warning pattern in the script output. If found, an error
     message is displayed in the monitor showing the match.
   - **Custom** - Where combo errors is set to custom, a new form is displayed for defining behavior using the following
     fields:
   - **OK** - Range of return code values for the script to have succeeded. No message will be displayed in the monitor.
   - **Warn** - Range of return code values to warn the user. A warning message will be displayed in the monitor.
   - **Error** - Range of return code values for the script to have failed. An error message will be displayed in the
     monitor.

## How to use

### In Clarive EE

Once the plugin is placed in its folder, you can find this service in the palette in the section of generic service and can be used like any other palette op.

Op Name: **Docker-Compose Task**

Example:

```yaml
      Server: generic_server
      Command: Start
      Project path: /home/docker-project/
``` 

```yaml
      Server: generic_server
      Command: Custom
      Project path: /home/docker-project/
      Custom command or arguments: ps
``` 

### In Clarive SE

#### Rulebook

If you want to use the plugin through the Rulebook, in any `do` block, use this ops as examples to configure the different parameters:

Example:

```yaml
rule: Docker-Compose demo
do:
   - docker_compose_task:
       server: docker_compose_server    # Required. Use the mid set to the resource you created
       command: 'custom'                # Required   
       path: '/home/docker-project/'    # Required   
       command_parameters: ['ps']       
``` 

```yaml
rule: Yet another Docker-Compose demo
do:
   - docker_compose_task:
       server: docker_compose_server    # Required. Use the mid set to the resource you created
       command: 'start'                 # Required   
       path: '/home/docker-project/'    # Required   
       command_parameters: ['--verbose']   
```

##### Outputs

###### Success

The service will return the console output for the command.

###### Possible configuration failures

**Task failed**

You will get the error returned by the console.

**Variable required**

```yaml
Error in rulebook (compile): Required argument(s) missing for op "docker_compose_task": "command"
```

Make sure you have all required variables defined.

**Not allowed variable**

```yaml
Error in rulebook (compile): Argument `Command` not available for op "docker_compose_task"
```

Make sure you are using the correct paramaters (make sure you are writing the variable names correctly).

## More questions?

Feel free to join **[Clarive Community](https://community.clarive.com/)** to resolve any of your doubts.

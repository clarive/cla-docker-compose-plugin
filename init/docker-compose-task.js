var reg = require('cla/reg');

reg.register('service.docker-compose.task', {
    name: _('Docker-Compose Task'),
    icon: '/plugin/cla-docker-compose-plugin/icon/logo-docker.svg',
    form: '/plugin/cla-docker-compose-plugin/form/docker-task-form.js',
    rulebook: {
        moniker: 'docker_compose_task',
        description: _('Launch Docker Compose commands'),
        required: [ 'server', 'command', 'path'],
        allow: ['server', 'command', 'path', 'command_parameters', 'user', 'errors'],
        mapper: {
            'command_parameters':'commandParameters'
        },
        examples: [{
            docker_compose_task: {
                server: 'docker_server',
                command: 'custom',
                path: '/Home/docker-project/',
                command_parameters: ['ps']
            }
        },{
            docker_compose_task: {
                server: 'docker_server',
                command: 'start',
                path: '/Home/docker-project/',
                command_parameters: ['--verbose']
            }
        }]
    },
    handler: function(ctx, params) {

        var log = require('cla/log');
        var reg = require('cla/reg');
        var ci = require('cla/ci');

        var errorsType = params.errors || 'fail';
        var server = params.server;
        var path = params.path || ".";
        var command = params.command || "";
        var mainCommand = "cd " + path + ' && docker-compose ';
        var commandParameters = params.commandParameters || [];
        var fullCommand = "";
        var user = params.user || "";
        var response;

        var serverCheck = ci.findOne({
            mid: server + ''
        });
        if (!serverCheck){
            log.fatal(_("Server Resource doesn't exist"));
        }

        var launchDockerCommand = function(server, command, errorsType, params, user) {

            response = reg.launch('service.scripting.remote', {
                name: _('Docker-Compose Task'),
                config: {
                    errors: errorsType,
                    server: server,
                    user: user,
                    path: command,
                    output_error: params.output_error,
                    output_warn: params.output_warn,
                    output_capture: params.output_capture,
                    output_ok: params.output_ok,
                    meta: params.meta,
                    rc_ok: params.rcOk,
                    rc_error: params.rcError,
                    rc_warn: params.rcWarn
                }
            });

            return response;
        }

        if (command == "custom") {
            fullCommand = mainCommand + commandParameters.join(" ");
        } else if (command == "") {
            log.fatal(_("No option selected"));
        } else {
            fullCommand = mainCommand + command + " " + commandParameters.join(" ");
        }

        log.info(_("Launching command: ") + fullCommand);

        response = launchDockerCommand(server, fullCommand, errorsType, params, user);

        log.info(_("Command finished"));

        return response.output;
    }
});

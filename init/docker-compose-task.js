var reg = require('cla/reg');

reg.register('service.docker-compose.task', {
    name: _('Docker-Compose Task'),
    icon: 'plugin/cla-docker-compose-plugin/icon/logo-docker.svg',
    form: '/plugin/cla-docker-compose-plugin/form/docker-task-form.js',

    handler: function(ctx, params) {

        var log = require('cla/log');
        var reg = require('cla/reg');
        var errorsType = params.errors || 'fail';
        var server = params.server;
        var path = params.path || ".";
        var command = params.command;
        var mainCommand = "cd " + path + ' && docker-compose ';
        var commandParameters = params.commandParameters;
        var fullCommand = "";
        var response;


        var launchDockerCommand = function(server, command, errorsType, params) {

            response = reg.launch('service.scripting.remote', {
                name: _('Docker-Compose Task'),
                config: {
                    errors: errorsType,
                    server: server,
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

        response = launchDockerCommand(server, fullCommand, errorsType, params);

        log.info(_("Command finished"));

        return response.output;
    }
});
(function(params) {

    var data = params.data || {};

    var server = Cla.ui.ciCombo({
        name: 'server',
        role: 'Server',
        fieldLabel: _('Server'),
        value: data.server || '',
        allowBlank: false,
        with_vars: 1
    });

    var userTextField = Cla.ui.textField({
        name: 'user',
        fieldLabel: _('User'),
        value: data.user || '',
        allowBlank: true
    });

    var command = Cla.ui.comboBox({
        fieldLabel: _('Command'),
        name: 'command',
        value: data.command || '',
        data: [
            ['up -d', _('UP (detached)')],
            ['down', _('Down')],
            ['start', _('Start')],
            ['stop', _('Stop')],
            ['restart', _('Restart')],
            ['ps', _('Status')],
            ['custom', _('Custom')]
        ],
        singleMode: true,
        allowBlank: false
    });

    var pathText = Cla.ui.textField({
            name: 'path',
            fieldLabel: _('Project Path'),
            value: data.path || '',
            allowBlank: false
        });

    var commandParameters = Cla.ui.arrayGrid({
        fieldLabel: _('Custom command or arguments'),
        name: 'commandParameters',
        value: data.commandParameters,
        description: _('Custom command or arguments'),
        default_value: '.'
    });

    var errorBox = Cla.ui.errorManagementBox({
        errorTypeName: 'errors',
        errorTypeValue: params.data.errors || 'fail',
        rcOkName: 'rcOk',
        rcOkValue: params.data.rcOk,
        rcWarnName: 'rcWarn',
        rcWarnValue: params.data.rcWarn,
        rcErrorName: 'rcError',
        rcErrorValue: params.data.rcError,
        errorTabsValue: params.data
    })

    var panel = Cla.ui.panel({
        layout: 'form',
        items: [
            server,
            userTextField,
            pathText,
            command,
            commandParameters,
            errorBox
        ]
    });

    return panel;
})
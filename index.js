var system = require('system');
var page = require('webpage').create();

page.viewportSize = {
    width: 768, // 414 / 768
    height: 1024 // 736 / 1024
};

function renderBase64 (format) {

    format = format || 'png';

    return page.renderBase64(format);
}

function reply (response) {

    system.stdout.writeLine(response);

    listen();
}

function listen () {

    if (system.stdin.atEnd()) {

        phantom.exit();
        return;
    }

    var line = system.stdin.readLine();
    var tokens = line.split(' ');

    switch (tokens[0]) {

    /**
     * exit
     * quit
     */

    case 'exit':
    case 'quit':

        phantom.exit();
        return;

    /**
     * open http://example.com
     */

    case 'open':

        page.open(tokens[1], function (status) {

            reply(status);
        });

        break;

    /**
     * renderBase64
     */

    case 'renderBase64':

        var img = renderBase64();
        reply(img);

        break;

    /**
     * set viewportSize.width 1024
     * set viewportSize.height 768
     */

    case 'set':

        switch (tokens[1]) {

        case 'viewportSize.width':

            page.viewportSize.width = tokens[2];
            reply('OK');

            break;

        case 'viewportSize.height':

            page.viewportSize.height = tokens[2];
            reply('OK');

            break;
        }

        break;

    /**
     * foo bar
     */

    default:
        reply('ERROR Unknown command');
        break;
    }
}

listen();

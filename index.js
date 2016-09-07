var system = require('system');
var webpage = require('webpage');

function App () {

    this.page = null;

    this.settings = {
        viewportSize: {
            width: 768,
            height: 1024
        }
    };
}

App.prototype.start = function () {

    this.page = webpage.create();

    this.page.viewportSize = {
        width: 768, // 414 / 768
        height: 1024 // 736 / 1024
    };

    this.listen();
};

App.prototype.open = function (url) {

    var self = this;

    this.page.viewportSize = this.settings.viewportSize;

    this.page.open(url, function (status) {

        self.reply(status);
    });
};

App.prototype.set = function (parameter, value) {

    switch (parameter) {

    case 'viewportSize.width':

        this.settings.viewportSize.width = parseInt(value);

        break;

    case 'viewportSize.height':

        this.settings.viewportSize.height = parseInt(value);

        break;
    }

    this.reply('OK');
};

App.prototype.reply = function (response) {

    system.stdout.writeLine(response);

    this.listen();
};

App.prototype.listen = function () {

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

        break;

    /**
     * open http://example.com
     */

    case 'open':

        this.open(tokens[1]);

        break;

    /**
     * renderBase64
     */

    case 'renderBase64':

        var img = this.page.renderBase64('png');
        this.reply(img);

        break;

    /**
     * render
     */

    case 'render':

        this.page.render(tokens[1], tokens[2], tokens[3]);
        this.reply('OK');

        break;

    /**
     * set viewportSize.width 1024
     * set viewportSize.height 768
     */

    case 'set':

        this.set(tokens[1], tokens[2]);

        break;

    /**
     * foo bar
     */

    default:

        this.reply('ERROR Unknown command');
        break;
    }
};

var app = new App();
app.start();

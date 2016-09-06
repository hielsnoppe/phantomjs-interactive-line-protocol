# PhantomJS interactive line protocol

Running PhantomJS with this script starts a process that accepts commands on
stdin and sends responses on stdout.
This way other applications can use it e.g. to perform batch operations.

## Usage

Example session:

    $ phantomjs index.js
    open http://example.com
    success
    renderBase64
    ...
    quit

## Supported commands

### exit

Stop the process.

    exit

### open

Open a website.

    open http://example.com

### quit

Alias for `exit`.

    quit

### renderBase64

Create a Base64 encoded screenshot in PNG format.

    renderBase64

### set

Adjust settings.

    set viewportSize.width 800
    set viewportSize.height 600

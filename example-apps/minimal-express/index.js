const express = require('express');

const app = express();
app.get('/', (_, res) => {
    res.send('Hello, World!');
});

const server = app.listen(3000, () => {
    console.log('server listening on port 3000');
});

const shutdown = (whichSignal) => {
    console.log(`received signal to shutdown ${whichSignal}`);
    server.close((err) => {
        if (err) {
            console.error('error shutting down server', err);
            process.exit(1);
        } else {
            console.error('successfully closed server');
            process.exit(0);
        }
    });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

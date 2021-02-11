import express from 'express';

import config from './config/index';
import Logger from './loaders/logger';
async function startServer() {
    const app = express();

    app.listen(config.port, () => {
        Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
    }).on('error', err => {
        Logger.error(err);
        process.exit(1);
    });
}
startServer()
import expressLoader from './express';

import mongooseLoader from './mongoose';

import Logger from './logger';

// @ts-ignore
export default async ({ expressApp }) => {
    await mongooseLoader();
    Logger.info('✌️ DB loaded and connected!');

    /**
     * WTF is going on here?
     *
     * We are injecting the mongoose models into the DI container.
     * I know this is controversial but will provide a lot of flexibility at the time
     * of writing unit tests, just go and check how beautiful they are!
     */

    Logger.info('✌️ Dependency Injector loaded');

    Logger.info('✌️ Jobs loaded');

    await expressLoader({ app: expressApp });
    Logger.info('✌️ Express loaded');
};
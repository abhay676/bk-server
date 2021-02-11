import express, {Response, Request,NextFunction} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../api';
import config from '../config';
export default ({ app }: { app: express.Application }) => {

    app.get('/status', (req: Request, res:Response) => {
        res.status(200).end();
    });
    app.head('/status', (req: Request, res: Response) => {
        res.status(200).end();
    });


    // The magic package that prevents frontend developers going nuts
    // Alternate description:
    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors());

    // Middleware that transforms the raw string of req.body into json
    app.use(bodyParser.json());
    // Load API routes
    app.use(config.api.prefix, routes());

    /// catch 404 and forward to error handler
    app.use((req:Request, res: Response, next:NextFunction) => {
        const err = new Error('Not Found');
        // @ts-ignore
        err['status'] = 404;
        next(err);
    });

    /// error handlers
    // @ts-ignore
    app.use((err:Error, req:Request, res:Response, next:NextFunction): any => {
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === 'UnauthorizedError') {
            return res
                .status(err.status)
                .send({ message: err.message })
                .end();
        }
        return next(err);
    });
    app.use((err: Error, req:Request, res:Response) => {
        // @ts-ignore
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });
};
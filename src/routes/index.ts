import * as express from 'express';
import apiRoutes from './api';
import Logging from '../library/Logging';

export const register = (app: express.Application) => {
    // Logging middleware
    app.use((req, res, next) => {
        Logging.info(`Incoming -> Method: [${req.method}] - url : [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            /** Log the response */
            Logging.info(`Outgoing -> Method: [${req.method}] - url : [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        next();
    });
    // Setup routes
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    /** Rules of our API */
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });

    // Setup Api routes in 'src/routes/api.ts'
    app.use('/api', apiRoutes);

    // Setup Home routes'
    app.use('/',async (req, res, next) => {
        try {
            return res.status(200).json({
                status: "success",
                message: "Welcome to battle star 21 API"
            });
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    });

    /** Error Handling */
    app.use((req, res, next) => {
        const error = new Error('Not found');
        Logging.error(error);
        return res.status(404).json({
            message: error.message
        });
    });
};

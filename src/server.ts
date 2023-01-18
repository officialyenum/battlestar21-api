import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { config } from './config/config';
import * as routes from './routes';
import Logging from './library/Logging';
dotenv.config(); // load .env file

const app = express();

// Setup Mongoose
mongoose
    .connect(config.mongo.url, {
        retryWrites: true,
        w: 'majority'
    })
    .then(() => {
        Logging.info('Connected to MongoDB');
        StartServer();
    })
    .catch((err) => {
        Logging.error('Unable to connect to MongoDB');
        Logging.error(err);
    });

const StartServer = () => {
    /** Register Routes */
    routes.register(app);

    const PORT = process.env.SERVER_PORT || 3000;

    app.listen(PORT, () => {
        // tslint:disable-next-line:no-console
        console.log(`Server started at http://localhost:${PORT}`);
    });
};

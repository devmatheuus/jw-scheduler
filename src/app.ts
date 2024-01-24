import 'reflect-metadata';
import 'express-async-errors';

import express from 'express';
import { appRoutes } from './routes/index.routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
appRoutes(app);
app.use(errorHandler);

export { app };

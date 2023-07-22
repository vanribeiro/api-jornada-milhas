import express from 'express';
import "reflect-metadata";
import routes from './routes/index.js';
import { AppDataSource } from './config/data-source.js';
AppDataSource.initialize()
    .then(() => { })
    .catch((error) => console.log(error));
const app = express();
app.use(express.json());
routes(app);
export { app };

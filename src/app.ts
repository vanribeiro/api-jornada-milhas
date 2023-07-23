import express from 'express';
import routes from './routes';
import { appDataSource } from './config/data-source';
import "reflect-metadata";

appDataSource.initialize()
    .then(() => { console.log("Banco de dados conectado!"); })
    .catch((error) => console.log(error));

const app = express();

routes(app);
app.use(express.json());

export default app;
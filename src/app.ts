import express from 'express';
import routes from './routes';
import { appDataSource } from './config/data-source';
import "reflect-metadata";
import handle404 from './middlewares/handle404';
import handleErrors from './middlewares/handleErrors';

appDataSource.initialize()
    .then(() => { console.log("Banco de dados conectado!"); })
    .catch((error) => console.log(error));

const app = express();

routes(app);
app.use(express.json());
app.use(handle404);
app.use(handleErrors);

export default app;
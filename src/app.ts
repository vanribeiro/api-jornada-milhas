import express from 'express';
import routes from './routes';
import handle404 from './middlewares/handle404';
import handleErrors from './middlewares/handleErrors';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const whiteList = process.env.CORS_ORIGINS_ALLOWED.split(';');
const allowedMethods = process.env.CORS_METHOD_ALLOWED.split(',');

const corOptions : CorsOptions =  {
    methods: allowedMethods,
    origin: whiteList
}

const app = express();
app.use(cors(corOptions));
routes(app);
app.use(handle404);
app.use(handleErrors);


export default app;
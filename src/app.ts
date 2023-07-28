import express from 'express';
import routes from './routes';
import handle404 from './middlewares/handle404';
import handleErrors from './middlewares/handleErrors';

import dotenv from 'dotenv';

dotenv.config();

const app = express();
routes(app);
app.use(handle404);
app.use(handleErrors);


export default app;
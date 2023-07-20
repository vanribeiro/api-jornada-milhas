import express, { Request, Response } from 'express';
import testemonials from './testimonialsRoutes.js';

const routes = (app: any) => {

    app.route('/').get((_req: Request, res: Response) => {
        res.status(200).send({ titulo: 'Curso de Node' });
    });

    app.use(
        express.json(),
        testemonials
    );
};

export default routes;

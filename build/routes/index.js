import express from 'express';
import testemonials from './testimonialsRoutes.js';
const routes = (app) => {
    app.route('/').get((_req, res) => {
        res.status(200).send({ titulo: 'Curso de Node' });
    });
    app.use(express.json(), testemonials);
};
export default routes;

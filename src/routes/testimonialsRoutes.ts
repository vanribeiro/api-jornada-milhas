import express from "express";
import TestimonialsControllers from "../controllers/TestimonialsController.js";

const router = express.Router();

/**
 * PUT: /depoimentos/1
 */

router
    .get('/depoimentos', TestimonialsControllers.listAllTestimonials)
    .get('/depoimentos-home', TestimonialsControllers.listThreeRandomTestimonials)
    .get('/depoimentos/usuarios/:id', TestimonialsControllers.listAllTestimonialsByUser)
    .post('/depoimentos', TestimonialsControllers.addTestimonial)
    .put('/depoimentos/:id', TestimonialsControllers.updateTestimonial)
    .delete('/depoimentos/:id', TestimonialsControllers.deleteTestimonial);

export default router;
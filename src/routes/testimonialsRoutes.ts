import express from "express";
import TestimonialsControllers from "../controllers/TestimonialsControllers.js";

const router = express.Router();

/**
 * GET: /depoimentos
 * GET: /depoimentos/1
 * POST: /depoimentos
 * PUT: /depoimentos/1
 * DELETE: /depoimentos/1
 */

router
    .get('/depoimentos', TestimonialsControllers.listAllTestimonials);

export default router;
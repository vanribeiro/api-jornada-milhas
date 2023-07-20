import express from "express";
import TestimonialsControllers from "../controllers/TestimonialsControllers.js";
const router = express.Router();
router
    .get('/depoimentos', TestimonialsControllers.listAllTestimonials);
export default router;

import Testimonial from "../models/Testimonial.js";
import { AppDataSource } from "../config/data-source.js";
const testimonialRepository = AppDataSource.getRepository(Testimonial);
export { testimonialRepository };

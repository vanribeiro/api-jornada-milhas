import Testimonial from "../models/Testimonial.js";
import { AppDataSource } from "../config/data-source.js";
const testimonial = (text, user) => new Testimonial(text, user);
const testimonialRepository = AppDataSource.getRepository(Testimonial);
export { testimonial, testimonialRepository };

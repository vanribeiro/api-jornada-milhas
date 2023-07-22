import Testimonial from "../models/Testimonial.js";
import { AppDataSource } from "../config/data-source.js";
import { Repository } from "typeorm";

const testimonialRepository: Repository<Testimonial> =
	AppDataSource.getRepository(Testimonial);

export { testimonialRepository };

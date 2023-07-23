import Testimonial from "../models/Testimonial";
import { appDataSource } from "../config/data-source";
import { Repository } from "typeorm";

const testimonialRepository: Repository<Testimonial> =
	appDataSource.getRepository(Testimonial);

export { testimonialRepository };

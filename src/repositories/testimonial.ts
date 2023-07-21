import Testimonial from "../models/Testimonial.js";
import User from "../models/User.js";
import { AppDataSource } from "../config/data-source.js";
import { Repository } from "typeorm";

const testimonial: any = (text: string, user: User) =>
	new Testimonial(text, user);

const testimonialRepository: Repository<Testimonial> =
	AppDataSource.getRepository(Testimonial);

export { testimonial, testimonialRepository };

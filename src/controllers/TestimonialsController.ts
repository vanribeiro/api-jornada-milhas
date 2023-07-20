import { Request, Response } from "express";
import ITestimonials from "../interfaces/testimonial.js";
import { mockTestimonials } from "../testimonials-mock.js";

class TestimonialsControllers {

    static listAllTestimonials (_req: Request, res: Response) {
        try {
            const Testimonials: ITestimonials[] = mockTestimonials;
            return res.status(200).json(Testimonials);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

}

export default TestimonialsControllers;
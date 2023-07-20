import { mockTestimonials } from "../testimonials-mock.js";
class TestimonialsControllers {
    static listAllTestimonials(_req, res) {
        try {
            const Testimonials = mockTestimonials;
            return res.status(200).json(Testimonials);
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }
}
export default TestimonialsControllers;

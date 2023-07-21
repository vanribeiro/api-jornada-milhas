import { testimonial, testimonialRepository, } from "../repositories/testimonial.js";
import { findOneUser, userRepository } from "../repositories/user.js";
import { manager } from "../config/data-source.js";
class TestimonialsControllers {
    static async listAllTestimonials(_req, res) {
        try {
            const users = await userRepository
                .find({
                relations: {
                    testemonials: true,
                },
            })
                .then((users) => users.filter((user) => user.testemonials.length !== 0));
            return res.status(200).json(users);
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async listAllTestimonialsByUser(req, res) {
        const { id } = req.params;
        try {
            const users = await userRepository.findOne({
                where: { id: id },
                relations: { testemonials: true },
            });
            return res.status(200).json(users);
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async addTestimonial(req, res) {
        const { userId, text } = req.body;
        try {
            const user = await findOneUser(userId, true);
            const newTestimonial = testimonial(text, user);
            await testimonialRepository.save(newTestimonial);
            return res
                .status(200)
                .json({ message: "depoimento adicionado com sucesso!" });
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async updateTestimonial(req, res) {
        const { id } = req.params;
        const { text } = req.body;
        try {
            const testimonial = await testimonialRepository.findOneBy({ id });
            testimonial.text = text;
            await testimonialRepository.save(testimonial);
            return res
                .status(200)
                .json({ message: `depoimento atualizado com sucesso!` });
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async deleteTestimonial(req, res) {
        const { id } = req.params;
        try {
            const testimonial = await testimonialRepository.findOneBy({ id });
            await testimonialRepository.remove(testimonial);
            return res
                .status(200)
                .json({ message: `depoimento com o id ${id} foi deletado` });
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async listThreeRandomTestimonials(_req, res) {
        const SQL = `SELECT user.name, user.image, testimonial.id, testimonial.text, testimonial.userId 
                    FROM user INNER JOIN testimonial ON testimonial.userId = user.id ORDER BY RAND() LIMIT 3;`;
        try {
            const users = await manager.query(SQL);
            return res.status(200).json(users);
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }
}
export default TestimonialsControllers;
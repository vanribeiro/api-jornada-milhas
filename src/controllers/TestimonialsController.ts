import { NextFunction, Request, Response } from "express";
import { testimonialRepository } from "../repositories/testimonial";
import { findOneUser, userRepository } from "../repositories/user";
import Testimonial from "../models/Testimonial";
import { manager } from "../config/data-source";
import User from "../models/User";
import NotFound from "../errors/NotFound";

class TestimonialsControllers {
	static async listAllTestimonials(
		_req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const users: User[] = await userRepository
				.find({
					relations: {
						testemonials: true,
						photo: true,
					},
				})
				.then((users) =>
					users.filter((user) => user.testemonials.length !== 0)
				);

			return users.length > 0
				? res.status(200).json(users)
				: next(new NotFound());
		} catch (error) {
			next(error);
		}
	}

	static async listAllTestimonialsByUser(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { id }: any = req.params;

		try {
			const user: User = await userRepository.findOne({
				where: { id: id },
				relations: {
					testemonials: true,
					photo: true,
				},
			});

			return user
				? res.status(200).json(user)
				: next(new NotFound(`usuario com o id ${id} não encontrado`));
		} catch (error) {
			return next(error);
		}
	}

	static async addTestimonial(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { userId, text }: any = req.body;
		const message: string = "depoimento adicionado com sucesso!";

		try {
			const user: User = await findOneUser(userId, true);
			const newTestimonial = new Testimonial(text, user);
			await testimonialRepository.save(newTestimonial);

			return res.status(201).json({ message: message });
		} catch (error) {
			return next(error);
		}
	}

	static async updateTestimonial(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { id }: any = req.params;
		const { text }: any = req.body;
		const message: string = "depoimento atualizado com sucesso!";

		try {
			const testimonial: Testimonial =
				await testimonialRepository.findOneBy({ id });
			if (testimonial) {
				testimonial.text = text;
				await testimonialRepository.save(testimonial);
				return res.status(201).json({ message: message });
			} else {
				return next(
					new NotFound(`depoimento com o id ${id} não encontrado`)
				);
			}
		} catch (error) {
			console.log(error);
			return next(error);
		}
	}

	static async deleteTestimonial(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { id }: any = req.params;
		const message: string = "depoimento com o id ${id} foi deletado";

		try {
			const testimonial: Testimonial =
				await testimonialRepository.findOneBy({ id });
				
			if(testimonial){
				await testimonialRepository.remove(testimonial);
				return res.status(201).json({ message: message })
			} else {
				next(new NotFound(`depoimento com o id ${id} não encontrado`));
			}

		} catch (error) {
			return next(error);
		}
	}

	static async listThreeRandomTestimonials(
		_req: Request,
		res: Response,
		next: NextFunction
	) {
		const SQL = `SELECT testimonial.id, user.name, testimonial.text, image.photo AS avatar FROM user 
					INNER JOIN testimonial ON testimonial.userId = user.id 
					INNER JOIN image ON image.id = user.photoId ORDER BY RAND() LIMIT 3;`;
		try {
			const users: User[] = await manager.query(SQL);

			return users.length > 0
				? res.status(200).json(users)
				: res.status(404).send([]);
		} catch (error) {
			next(error);
		}
	}
}

export default TestimonialsControllers;

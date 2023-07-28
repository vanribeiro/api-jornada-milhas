import { NextFunction, Request, Response } from "express";
import { testimonialRepository } from "../repositories/testimonial";
import { findOneUser, userRepository } from "../repositories/user";
import Testimonial from "../models/Testimonial";
import { manager } from "../config/data-source";
import User from "../models/User";
import NotFound from "../errors/NotFound";
import ErrorBase from "../errors/ErrorBase";
import { mapTestimonial } from "../utils/mappers";

class TestimonialsControllers {
	static async listAllTestimonials(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const users: User[] = await userRepository
				.find({
					relations: {
						testimonials: true,
						photo: true,
					},
				})
				.then((users) =>
					users.filter((user) => user.testimonials.length !== 0)
				);

			if(users.length > 0) {

				const mappedTestimonials = users.map((user) =>
					mapTestimonial(req.hostname, user)
				);

				return res.status(200).json(mappedTestimonials);
			} else {
				return next(new NotFound());
			}

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
			const users: User = await userRepository.findOne({
				where: { id: id },
				relations: {
					testimonials: true,
					photo: true,
				},
			});

		if(users) {
			const mappedTestimonial = [users].map((user) =>
				mapTestimonial(req.hostname, user)
			);

			return res.status(200).json(mappedTestimonial)
			
		} else {
			return next(new NotFound(`usuário com id ${id} não encontrado`));
		}

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
			if (user) {
				const newTestimonial = new Testimonial(text, user);
				const addedTestimonial = await testimonialRepository.save(
					newTestimonial
				);
				return res.status(201).json({
					message: message,
					testimonialId: addedTestimonial.id,
				});
			} else {
				return next(
					new NotFound(
						`Não foi possível adicionar depoimento. Id ${userId} não encontrado.`
					)
				);
			}
		} catch (error) {
			if(!userId || !text) {
				return next(new ErrorBase('Corpo da requisição vazio', 400))
			}
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
				const updatedTestimonial = await testimonialRepository.save(
					testimonial
				);
				return res.status(204).json({
					message: message,
					testimonialId: updatedTestimonial.id,
				});
			} else {
				return next(
					new NotFound(`depoimento com o id ${id} não encontrado`)
				);
			}
		} catch (error) {
			return next(error);
		}
	}

	static async deleteTestimonial(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { id }: any = req.params;
		const message: string = `depoimento com o id ${id} foi deletado`;

		try {
			const testimonial: Testimonial =
				await testimonialRepository.findOneBy({ id });

			if (testimonial) {
				await testimonialRepository.remove(testimonial);
				return res.status(200).json({ message: message });
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

			if(users.length > 0) {
				return res.status(200).json(users);
			} else {
				return next(new NotFound());
			}

		} catch (error) {
			next(error);
		}
	}
}

export default TestimonialsControllers;

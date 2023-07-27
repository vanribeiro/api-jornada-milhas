import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import Image from "../models/Image";
import { userRepository } from "../repositories/user";
import { imageRepository } from "../repositories/image";
import ImagesController from "./ImagesController";
import NotFound from "../errors/NotFound";
import dotenv from "dotenv";
import ErrorBase from "../errors/ErrorBase";
import { mapUser } from "../utils/mappers";

dotenv.config();

class UsersController {
	static async listUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const users: User[] = await userRepository.find({
				relations: {
					photo: true,
				},
			});

			const usersMapped = users.map((user) =>
				mapUser(req.hostname, user)
			);

			return usersMapped.length > 0
				? res.status(200).json(usersMapped)
				: res.status(404).send([]);
		} catch (error) {
			next(error);
		}
	}

	static async findOneUser(req: Request, res: Response, next: NextFunction) {
		const { id }: any = req.params;

		try {
			const user: User[] = await userRepository.find({
				where: { id },
				relations: {
					photo: true,
				},
			});

			const userMapped = user.map((user) => mapUser(req.hostname, user));

			return userMapped.length > 0
				? res.status(200).json(userMapped)
				: res.status(404).send([]);
		} catch (error) {
			return next(error);
		}
	}

	static async addUser(req: Request, res: Response, next: NextFunction) {
		const { filename }: any = req.file;
		const { name }: any = req.body;
		const newImage: Image = new Image(filename);
		const newUser: User = new User(name, newImage);
		const message: string = "usuario adicionado com sucesso!";

		try {
			let imageAdded;
			let userAdded;

			if(name) userAdded = await userRepository.save(newUser);

			if(filename) imageAdded = await ImagesController.addImage(newImage);
			
			return res.status(201).json({
				message: message,
				userId: userAdded.id,
				imageId: imageAdded.id,
			});

		} catch (error) {
			if(name === '') {
				return next(new ErrorBase('Corpo da requisição vazio', 400));
			}
			return next(error);
		}
	}

	static async updateUser(req: Request, res: Response, next: NextFunction) {
		const { filename }: any = req.file || "";
		const { name }: any = req.body;
		const { id }: any = req.params;
		const message: string = "usuario atualizado com sucesso!";

		try {
			const user: User = await userRepository.findOneBy({ id });
			let imageUpdated: any;

			if (user) {
				user.name = name;

				await userRepository.save(user);

				if (filename) {
					imageUpdated = await ImagesController.updateImage(
						id,
						filename
					);
				}

				return res.status(201).json({
					message: message,
					userId: id,
					imageId: imageUpdated?.id,
				});
			} else {
				return next(
					new NotFound(`usuario com o id ${id} não encontrado`)
				);
			}
		} catch (error) {
			return next(error);
		}
	}

	static async deleteUser(req: Request, res: Response, next: NextFunction) {
		const { id }: any = req.params;

		const message: string = `usuario com o id ${id} foi deletado`;

		try {
			const user: User = await userRepository.findOne({
				where: { id: id },
			});

			if (user) {
				const photoId = user.photo.id;
				const photoName = user.photo.photo;

				const result = await imageRepository.delete(photoId);
				const imageToBeDeleted =
					await ImagesController?.deleteImageFromFolder(photoName);

				if (imageToBeDeleted && result.affected === 1) {
					return res.status(200).json({ message: message });
				}
			} else {
				return next(
					new NotFound(`usuario com o id ${id} não encontrado`)
				);
			}
		} catch (error) {
			return next(error);
		}
	}
}



export default UsersController;

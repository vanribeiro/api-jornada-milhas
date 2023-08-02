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
import { validate } from "class-validator";

dotenv.config();

class UsersController {
	static async listAllUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const users: User[] = await userRepository.find({
				relations: {
					photo: true,
				},
				take: 12
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

	static async findUserById(req: Request, res: Response, next: NextFunction) {
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
		const DEFAULT_NO_IMAGE = 'default-no-image.png';
		const newFileName = filename ? filename : DEFAULT_NO_IMAGE;

		const newImage: Image = new Image(newFileName);
		const newUser: User = new User(name, newImage);
		const message: string = "usuario adicionado com sucesso!";

		try {
			let imageAdded: Image | any;
			let userAdded: User;

			const errorsUser = await validate(newUser);

			if (errorsUser.length > 0) {

				const messages = errorsUser
					.map((errors) => errors.constraints.isNotEmpty)
					.join("; ");
				return next(new ErrorBase(messages, 400));

			} else {

				userAdded = await userRepository.save(newUser);
				imageAdded = await ImagesController.addImage(newImage);

				return res.status(201).json({
					message: message,
					userId: userAdded.id,
					imageId: imageAdded.id,
				});
			}
		} catch (error) {
			return next(error);
		}
	}

	static async updateUser(req: Request, res: Response, next: NextFunction) {
		const { filename }: any = req.file || "";
		const { name }: any = req.body;
		const { id }: any = req.params;
		const message: string = "usuario atualizado com sucesso!";
		const SQL_TABLE = "user";
		const SUBFOLDER_PATH_NAME = "users/avatars";

		try {
			const user: User = await userRepository.findOneBy({ id });
			let imageUpdated: any;

			if (user) {
				const errorsUser = await validate(user);
				if(errorsUser.length > 0) {
					const messages = errorsUser
						.map((errors) => errors.constraints.isNotEmpty)
						.join("; ");

					return next(new ErrorBase(messages, 400));
				} else {

					user.name = name;
					const userUpdated = await userRepository.save(user);
	
					if (filename) {
						
						imageUpdated = await ImagesController.updateImage(
							id,
							filename,
							SQL_TABLE,
							SUBFOLDER_PATH_NAME
						);

						return res.status(201).json({
							message: message,
							userId: id,
							imageId: imageUpdated?.id,
						});
					}
					
					return res.status(201).json({
						message: message,
						userId: userUpdated.id,
					});
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

	static async deleteUser(req: Request, res: Response, next: NextFunction) {
		const { id }: any = req.params;
		const SUBFOLDER_PATH_NAME = "users/avatars";

		const message: string = `usuario com o id ${id} foi deletado`;

		try {
			const user: User = await userRepository.findOne({
				where: { id: id },
			});

			if (user) {
				const photoId = user.photo.id;
				const photoName = user.photo.photo;

				const filenameToBeDeleted = await imageRepository.delete(
					photoId
				);
				const imageToBeDeletedFromFolder =
					await ImagesController?.deleteImageFromFolder(
						photoName,
						SUBFOLDER_PATH_NAME
					);

				if (
					imageToBeDeletedFromFolder &&
					filenameToBeDeleted.affected === 1
				) {
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

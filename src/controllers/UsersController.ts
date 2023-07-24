import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import Image from "../models/Image";
import { userRepository } from "../repositories/user";
import { imageRepository } from "../repositories/image";
import { addedFilename } from "../utils/multer-storage-setting";
import ImagesController from "./ImagesController";

class UsersController {

	static async listUsers(_req: Request, res: Response, next: NextFunction) {

		try {
			
			const users: User[] = await userRepository.find({
				relations: {
					photo: true,
				},
			});

			if(users.length > 0){
				return res.status(200).json(users);
			} else {
				return res.status(404).send([]);
			}
			
		} catch (error) {
			next(error);
		}
	}

	static async addUser(req: Request, res: Response) {
		const { name }: any = req.body;
		const newImage: Image = new Image(addedFilename);
		const newUser: User = new User(name, newImage);
		const message: string = "usuario adicionado com sucesso!";

		try {
			await userRepository.save(newUser);
			await ImagesController.addImage(newImage);

			return res.status(201).json({ message: message });
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async findOneUser(req: Request, res: Response) {
		const { id }: any = req.params;

		try {
			const user: User[] = await userRepository.find({
				where: { id },
				relations: {
					photo: true,
				},
			});

			if(user.length > 0) {
				return res.status(200).json(user);
			} else {
				return res.status(404).send([]);
			}

		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async updateUser(req: Request, res: Response) {
		const { name }: any = req.body;
		const { id }: any = req.params;
		const message: string = "usuario atualizado com sucesso!";

		try {

			const user: User = await userRepository.findOneBy({ id });

			if(user) {
				user.name = name;
	
				await userRepository.save(user);
				await ImagesController.updateImage(id, addedFilename);
	
				return res.status(201).json({ message: message });
			} else {
				return res.status(404).send({});
			}

		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async deleteUser(req: Request, res: Response) {
		const { id }: any = req.params;

		const message: string = `usuario com o id ${id} foi deletado`;

		try {

			const user: User = await userRepository.findOne({ where: { id: id } });
			
			if(user){
				const photoId = user.photo.id;
				const photoUrl = user.photo.photo;
				
				const result = await imageRepository.delete(photoId);
				const imageToBeDeleted = await ImagesController?.deleteImageFromFolder(photoUrl);
				
				if(imageToBeDeleted && result.affected === 1) {
					return res.status(200).json({ message: message });
				}
			} else {
				return res.status(404).send({});
			}

		} catch (error) {
			return res.status(500).json(error.message);
		}
	}
}

export default UsersController;

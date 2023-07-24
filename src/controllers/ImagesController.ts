import { manager } from "../config/data-source";
import Image from "../models/Image";
import { imageRepository } from "../repositories/image";
import deleteFile from "../utils/delete-file";

class ImagesController {
	static async addImage(newImage: Image) {

		try {
			await imageRepository.save(newImage);
		} catch (error) {
			throw error;
		}

	}

	static async updateImage(id: number, addedFileName: string) {

		try {
			const photoId: number = await ImagesController.findId(id);
			const image: Image = await imageRepository.findOneBy({
				id: photoId,
			});
			image.photo = addedFileName;

			await imageRepository.save(image);
		} catch (error) {
			throw error;
		}

	}

	static async deleteImageFromFolder(imagePath: string) {

		try {

			if(imagePath === null || imagePath === undefined) {
				return null;
			} else {
				const imageSplit = imagePath.split("/");
				const filename = imageSplit.at(-1);
				const result = await deleteFile(`uploads/users/avatars/${filename}`);
				console.log(result)
				return result;
			}

		} catch (error) {
			throw error;
		}
	}

	static async findId(id: number): Promise<number> {

		const SQL: string = `SELECT photoId FROM user WHERE id = ${id};`;
		try {
			return await manager
				.query(SQL)
				.then((id) => id[0].photoId)
				.catch((error) => {
					console.error(error);
				});
		} catch (error) {
			throw error;
		}

	}
}

export default ImagesController;

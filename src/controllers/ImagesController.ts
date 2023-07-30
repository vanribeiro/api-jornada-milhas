import { manager } from "../config/data-source";
import Image from "../models/Image";
import { imageRepository } from "../repositories/image";
import deleteFile from "../utils/delete-file";

class ImagesController {
	static async addImage(newImage: Image) {
		try {
			const image = await imageRepository.save(newImage);
			return { id: image.id };
		} catch (error) {
			throw error;
		}
	}

	static async updateImage(
		id: number,
		filename: string,
		sqlTableName: string
	) {

		try {
			const photoId: number = await ImagesController.findId(
				id,
				sqlTableName
			);

			const image: Image = await imageRepository.findOneBy({
				id: photoId,
			});
			image.photo = filename;

			const imageUpdated = await imageRepository.save(image);
			return { id: imageUpdated.id };
		} catch (error) {
			throw error;
		}
	}

	static async deleteImageFromFolder(photoName: string) {
		try {
			if (photoName === null || photoName === undefined) {
				return null;
			} else {
				const result = await deleteFile(
					`uploads/users/avatars/${photoName}`
				);
				return !result;
			}
		} catch (error) {
			throw error;
		}
	}

	static async findId(id: number, sqlTableName: string): Promise<number> {
		const SQL: string = `SELECT photoId FROM ${sqlTableName} WHERE id = ${id};`;
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

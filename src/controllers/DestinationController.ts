import { NextFunction, Request, Response } from "express";
import Destination from "../models/Destination";
import { destinationRepository } from "../repositories/destination";
import NotFound from "../errors/NotFound";
import Image from "../models/Image";
import { imageRepository } from "../repositories/image";
import { validate } from "class-validator";
import ErrorBase from "../errors/ErrorBase";
import ImagesController from "./ImagesController";
import { mapDestination } from "../utils/mappers";

class DestinationController {
	static async listAllDestinations(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { nome }: string | any = req.query;

		try {
			const [destinations, counted]: Destination[] | number | any =
				await destinationRepository.findAndCount({
					relations: { photo: true },
					where: { name: nome },
					take: 12,
				});

			const destinationMapped = destinations.map(
				(destination: Destination) => {
					return mapDestination(req.hostname, destination);
				}
			);

			return counted > 0
				? res.status(200).json({
						count: counted,
						destinations: destinationMapped,
				  })
				: next(new NotFound("Nenhum destino foi encontrado"));
		} catch (error) {
			next(error);
		}
	}

	static async findDestinationById(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { id }: any = req.params;

		try {
			const destination: Destination =
				await destinationRepository.findOne({
					where: { id },
					relations: {
						photo: true,
					},
				});

			return destination
				? res.status(200).json(destination)
				: next(new NotFound("Destino não encontrado"));
		} catch (error) {
			next(error);
		}
	}

	static async addDestination(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { filename }: any = req.file || "";
		const { name, price }: any = req.body;
		const newImage: Image = new Image(filename);
		const newDestination: Destination = new Destination(
			name,
			price,
			newImage
		);
		const message: string = "destino adicionado com sucesso!";

		try {
			let imageAdded: Image;
			let destinationAdded: Destination;

			const errorsDestination = await validate(newDestination);

			if (errorsDestination.length > 0) {
				const messages = errorsDestination
					.map((errors) => errors.constraints.isNotEmpty)
					.join("; ");
				return next(new ErrorBase(messages, 400));
			} else {
				destinationAdded = await destinationRepository.save(
					newDestination
				);
				imageAdded = await imageRepository.save(newImage);

				if (imageAdded && destinationAdded) {
					return res.status(201).json({
						message: message,
						destinationId: destinationAdded.id,
						imageId: imageAdded.id,
					});
				} else {
					return res.status(201).json({
						message: message,
						destinationId: destinationAdded.id,
					});
				}
			}
		} catch (error) {
			return next(error);
		}
	}

	static async updateDestination(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { filename }: any = req.file || "";
		const { name, price }: any = req.body;
		const { id }: any = req.params;
		const message: string = "destino atualizado com sucesso!";

		try {
			let imageUpdated: Image | any;
			const destination: Destination =
				await destinationRepository.findOneBy({ id });

			if (destination) {
				const errorsDestination = await validate(destination);
				if (errorsDestination.length > 0) {
					const messages = errorsDestination
						.map((errors) => errors.constraints.isNotEmpty)
						.join("; ");

					return next(new ErrorBase(messages, 400));
				} else {
					destination.name = name;
					destination.price = price;
					const destinationUpdated = await destinationRepository.save(
						destination
					);

					if (filename) {
						imageUpdated = await ImagesController.updateImage(
							id,
							filename,
							"destination"
						);

						return res.status(201).json({
							message: message,
							destinationId: destinationUpdated.id,
							imageId: imageUpdated.id,
						});
					}

					return res.status(201).json({
						message: message,
						destinationId: destinationUpdated.id,
					});
				}
			} else {
				return next(
					new NotFound(`usuario com o id ${id} não encontrado`)
				);
			}
		} catch (error) {
			next(error);
		}
	}

	static async deleteDestination(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { id }: any = req.params;
		const message: string = `destino com id ${id} deletado com sucesso`;
		const SUBFOLDER_PATH_NAME = "destinations";

		try {
			const destination = await destinationRepository.findOneBy({ id });

			if (destination) {
				const photoId = destination.photo.id;
				const photoName = destination.photo.photo;

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
					res.status(200).json({
						message: message,
						destinationId: destination.id,
						imageId: destination.photo.id,
					});
				}
			} else {
				return next(
					new NotFound(`destino com o id ${id} não encontrado`)
				);
			}
		} catch (error) {
			next(error);
		}
	}
}

export default DestinationController;

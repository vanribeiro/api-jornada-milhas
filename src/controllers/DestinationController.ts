import { NextFunction, Request, Response } from "express";
import Destination from "../models/Destination";
import { destinationRepository } from "../repositories/destination";
import NotFound from "../errors/NotFound";
import Image from "../models/Image";
import { imageRepository } from "../repositories/image";
import { validate } from "class-validator";
import ErrorBase from "../errors/ErrorBase";

//TODO
class DestinationController {
	static async listAllDestinations(
		_req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const destinations: Destination[] =
				await destinationRepository.find({
					relations: {
						photo: true,
					},
				});

			if (destinations.length > 0) {
				return res.status(200).json(destinations);
			} else {
				return next(new NotFound("Nenhum destino foi encontrado"));
			}
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

			if (destination) {
				return res.status(200).json(destination);
			} else {
				return next(new NotFound("Destino não encontrado"));
			}
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
			let imageAdded;
			let destinationAdded;

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
			next(error);
		}
	}

	static async updateDestination(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { id }: any = req.params;
		const { filename }: any = req.file;
		const { name, price }: any = req.body;
		try {
		} catch (error) {
			next(error);
		}
	}

	static async deleteDestination(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
		} catch (error) {
			next(error);
		}
	}
}

export default DestinationController;

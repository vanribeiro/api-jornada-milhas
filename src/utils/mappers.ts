import Destination from "../models/Destination";
import User from "../models/User";
import dotenv from "dotenv";
dotenv.config();

const PORT: string = `:${process.env.PORT}`;
const photoURI = (h: string, p:string, f: string) => `http://${h}${PORT}/${p}/${f}`;

const mapUser = (hostname: string, user: User) => {
	const filename: string = user.photo.photo;
	const FOLDER_PATH_NAME = 'users/avatars';

	return {
		id: user.id,
		name: user.name,
		photo: {
			id: user.photo.id,
			photo: photoURI(hostname, FOLDER_PATH_NAME, filename),
		},
	};
};

const mapDestination = (hostname: string, destination: Destination) => {
	const filename: string = destination.photo.photo;
	const FOLDER_PATH_NAME = 'destinos';

	return {
		id: destination.id,
		name: destination.name,
		price: destination.price,
		photo: {
			id: destination.photo.id,
			photo: photoURI(hostname, FOLDER_PATH_NAME, filename),
		},
	};
};

const mapTestimonial = (hostname: string, user: User) => {
	const filename: string = user.photo.photo;
	const FOLDER_PATH_NAME = 'users/avatars';

	return {
		id: user.id,
		name: user.name,
		photo: {
			id: user.photo.id,
			photo: photoURI(hostname, FOLDER_PATH_NAME, filename),
		},
		testimonials: user.testimonials.map(testimonial => {
			return {
				id: testimonial.id,
				text: testimonial.text
			}
		})
	};
};

export { mapUser, mapTestimonial, mapDestination };
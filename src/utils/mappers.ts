import User from "../models/User";
import dotenv from "dotenv";
dotenv.config();

const photoURI = (h: string, p: string, f: string, ) => `http://${h}${p}/users/avatars/${f}`;

const mapUser = (hostname: string, user: User) => {
	const PORT: string = `:${process.env.PORT}`;
	const filename: string = user.photo.photo;

	return {
		id: user.id,
		name: user.name,
		photo: {
			id: user.photo.id,
			photo: photoURI(hostname, PORT, filename),
		},
	};
};

const mapTestimonial = (hostname: string, user: User) => {
	const PORT: string = `:${process.env.PORT}`;
	const filename: string = user.photo.photo;

	return {
		id: user.id,
		name: user.name,
		photo: {
			id: user.photo.id,
			photo: photoURI(hostname, PORT, filename),
		},
		testimonials: user.testimonials.map(testimonial => {
			return {
				id: testimonial.id,
				text: testimonial.text
			}
		})
	};
};

export { mapUser, mapTestimonial };
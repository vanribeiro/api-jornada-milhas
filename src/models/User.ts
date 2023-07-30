import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	OneToOne,
	JoinColumn,
	Relation,
} from "typeorm";
import Testimonial from "./Testimonial";
import Image from "./Image";
import { IsNotEmpty } from "class-validator";

@Entity()
class User {
	constructor(name?: string, photo?: Image) {
		this.name = name;
		this.photo = photo;
	}

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@IsNotEmpty({ message: 'o campo name é obrigatório' })
	name: string;

	@OneToOne(() => Image, (image) => image.photo, {
		cascade: true,
		eager: true,
		onDelete: "CASCADE",
	})
	@JoinColumn()
	photo: Relation<Image>;

	@OneToMany(() => Testimonial, (testimonial) => testimonial.user, {
		cascade: true,
	})
	testimonials: Testimonial[];
}

export default User;

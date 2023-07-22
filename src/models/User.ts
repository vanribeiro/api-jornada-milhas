import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, JoinTable, Relation } from "typeorm";
import Testimonial from "./Testimonial.js";
import Image from "./Image.js";

@Entity()
class User {
    constructor (name?: string, photo?: Image) {
        this.name = name;
        this.photo = photo;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToOne(() => Image, (image) => image.photo, { cascade: true })
    @JoinColumn()
    photo: Relation<Image>;

    @OneToMany(() => Testimonial, (testimonial) => testimonial.user, { cascade: true })
    testemonials: Testimonial[];
}

export default User;
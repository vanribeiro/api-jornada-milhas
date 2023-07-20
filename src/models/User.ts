import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Testimonial from "./Testimonial.js";

@Entity()
class User {
    constructor (name?: string, image?: string) {
        this.name = name;
        this.image = image;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    name: string;

    @Column("text")
    image: string;

    @OneToMany(() => Testimonial, (testimonial) => testimonial.user)
    testemonials: Testimonial[];
}

export default User;
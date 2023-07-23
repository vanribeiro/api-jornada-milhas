import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, Relation } from "typeorm";
import Testimonial from "./Testimonial";
import Image from "./Image";

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
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Relation } from "typeorm";
import User from "./User.js";

@Entity()
class Testimonial {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('mediumtext')
    text: string;

    @ManyToOne(() => User, (user) => user.testemonials)
    user: Relation<User>;
}

export default Testimonial;
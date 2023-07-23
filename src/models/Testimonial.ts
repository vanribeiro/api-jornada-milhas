import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Relation } from "typeorm";
import User from "./User";

@Entity()
class Testimonial {
    constructor (text: string, user: User) {
        this.text = text;
        this.user = user;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column('mediumtext')
    text: string;

    @ManyToOne(() => User, (user) => user.testemonials)
    user: Relation<User>;
}

export default Testimonial;
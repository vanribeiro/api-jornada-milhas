import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import User from "./User";
import Destination from "./Destination";

@Entity()
class Image {
    constructor(photo: string){
        this.photo = photo;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    photo: string;

    @OneToOne(() => User, (user) => user.photo, { onDelete: "CASCADE" })
    user: Relation<User>;

    @OneToOne(() => Destination, (destination) => destination.photo)
    destination: Relation<Image>;
}

export default Image;
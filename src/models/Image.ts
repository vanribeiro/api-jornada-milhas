import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import User from "./User";

@Entity()
class Image {
    constructor(photo: string){
        this.photo = photo;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    photo: string;

    @OneToOne(() => User, (user) => user.photo)
    user: Relation<User>;
}

export default Image;
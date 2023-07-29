import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import Image from "./Image";
import { IsNotEmpty } from "class-validator";

@Entity()
class Destination {

    constructor(name: string, price: number, photo: Image) {
        this.name = name;
        this.price = price;
        this.photo = photo;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty({
        message: 'o campo name é obrigatório'
    })
    name: string;

    @Column()
    @IsNotEmpty({
        message: 'o campo price é obrigatório'
    })
    price: number;

    @OneToOne(() => Image, (image) => image.photo, {
        cascade: true,
        eager: true, 
        onDelete: "CASCADE"
    })
    @JoinColumn()
    photo: Relation<Image>;
}

export default Destination;
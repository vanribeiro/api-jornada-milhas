import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    name: string;

    @Column("text")
    image: string;
}

export default Person;
import { DataSource } from "typeorm";
import User from "../models/User";
import Image from "../models/Image";
import Testimonial from "../models/Testimonial";

const appDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "devenv",
    password: "envdev123",
    database: "jornada_de_milhas",
    entities: [User, Image, Testimonial],
    synchronize: true,
    logging: false,
});

const manager = appDataSource.manager;

export { appDataSource, manager };
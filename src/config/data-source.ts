import { DataSource } from "typeorm";
import User from "../models/User.js";
import Testimonial from "../models/Testimonial.js";

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "devenv",
    password: "envdev123",
    database: "jornada_de_milhas",
    entities: [User, Testimonial],
    synchronize: true,
    logging: false,
});

const manager = AppDataSource.manager;

export { AppDataSource, manager };
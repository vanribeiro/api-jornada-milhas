import { DataSource } from "typeorm";
import User from "../models/User";
import Image from "../models/Image";
import Testimonial from "../models/Testimonial";
import dotenv from 'dotenv';
import Destination from "../models/Destination";

dotenv.config();

const entities = [
    User, Image, Testimonial, Destination
];

const appDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    entities: entities,
    synchronize: true,
    logging: false,
});

const manager = appDataSource.manager;

export { appDataSource, manager };
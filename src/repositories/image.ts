import { AppDataSource } from "../config/data-source.js";
import { Repository } from "typeorm";
import Image from "../models/Image.js";

const imageRepository: Repository<Image> = AppDataSource.getRepository(Image);

export { imageRepository };

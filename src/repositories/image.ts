import { appDataSource } from "../config/data-source";
import { Repository } from "typeorm";
import Image from "../models/Image";

const imageRepository: Repository<Image> = appDataSource.getRepository(Image);

export { imageRepository };

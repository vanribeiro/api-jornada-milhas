import { AppDataSource } from "../config/data-source.js";
import Image from "../models/Image.js";
const imageRepository = AppDataSource.getRepository(Image);
export { imageRepository };

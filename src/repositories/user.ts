import User from "../models/User.js";
import { AppDataSource } from "../config/data-source.js";
import Image from "../models/Image.js";

const userRepository = AppDataSource.getRepository(User);

const findOneUser = async (id: number, isARelation: boolean) =>
	await userRepository.findOne({
		where: { id },
		relations: { testemonials: isARelation },
	});

export { userRepository, findOneUser };

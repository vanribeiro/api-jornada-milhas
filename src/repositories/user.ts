import User from "../models/User";
import { appDataSource } from "../config/data-source";

const userRepository = appDataSource.getRepository(User);

const findOneUser = async (id: number, isARelation: boolean) =>
	await userRepository.findOne({
		where: { id },
		relations: { testimonials: isARelation },
	});

export { userRepository, findOneUser };

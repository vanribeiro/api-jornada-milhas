import User from "../models/User.js";
import { AppDataSource } from "../config/data-source.js";

const user: any = (name: string, image: string) => new User(name, image);

const userRepository = AppDataSource.getRepository(User);

const findOneUser = async (id: number, isARelation: boolean) =>
	await userRepository.findOne({
		where: { id },
		relations: { testemonials: isARelation },
	});

export { user, userRepository, findOneUser };

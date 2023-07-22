import User from "../models/User.js";
import { AppDataSource } from "../config/data-source.js";
const userRepository = AppDataSource.getRepository(User);
const findOneUser = async (id, isARelation) => await userRepository.findOne({
    where: { id },
    relations: { testemonials: isARelation },
});
export { userRepository, findOneUser };

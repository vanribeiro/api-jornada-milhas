import User from "../models/User.js";
import AppDataSource from "../config/data-source.js";

const user: any = (name: string, image: string) => new User(name, image);

const userRepository = AppDataSource.getRepository(User);

const save = async (user: any) => await userRepository.save(user);
const findAll = async () => await userRepository.find();
const findOne = async (id: number) => await userRepository.findOneBy({ id });
const findBy = async (value: any) => await userRepository.findBy(value);
const remove = async (item: any) => await userRepository.remove(item);

export {
    user,
    save,
    findAll,
    findOne,
    findBy,
    remove
}

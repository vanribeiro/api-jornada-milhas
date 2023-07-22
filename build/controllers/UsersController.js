import User from "../models/User.js";
import Image from "../models/Image.js";
import { userRepository } from "../repositories/user.js";
import { imageRepository } from "../repositories/image.js";
import { addedFileName } from "../utils/multer-storage-setting.js";
import { manager } from "../config/data-source.js";
import deleteFile from "../utils/delete-file.js";
class UsersController {
    static async listUsers(_req, res) {
        try {
            const result = await userRepository.find({
                relations: {
                    photo: true,
                },
            });
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async addUser(req, res) {
        const { name } = req.body;
        const newImage = new Image(addedFileName);
        const newUser = new User(name, newImage);
        const message = "usuario adicionado com sucesso!";
        try {
            await userRepository.save(newUser);
            await imageRepository.save(newImage);
            return res.status(200).json({ message: message });
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async findOneUser(req, res) {
        const { id } = req.params;
        try {
            const result = await userRepository.find({
                where: { id },
                relations: {
                    photo: true
                }
            });
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async updateUser(req, res) {
        const { name } = req.body;
        const { id } = req.params;
        const SQL = `SELECT photoId FROM user WHERE id = ${id};`;
        const message = "usuario atualizado com sucesso!";
        try {
            const photoId = await manager
                .query(SQL)
                .then((id) => id[0].photoId)
                .catch((error) => {
                console.error(error);
            });
            const userToUpdate = await userRepository.findOneBy({ id });
            const imageToUpdate = await imageRepository.findOneBy({
                id: photoId,
            });
            imageToUpdate.photo = addedFileName;
            userToUpdate.name = name;
            await imageRepository.save(imageToUpdate);
            await userRepository.save(userToUpdate);
            return res.status(200).json({ message: message });
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async deleteUser(req, res) {
        const { id } = req.params;
        const SQL = `SELECT photoId FROM user WHERE id = ${id};`;
        const message = `pessoa com o id ${id} foi deletado`;
        try {
            const photoId = await manager
                .query(SQL)
                .then((id) => id[0].photoId)
                .catch((error) => {
                console.error(error);
            });
            const userToDelete = await userRepository.findOneBy({ id });
            const imageToDelete = await imageRepository.findOneBy({
                id: photoId,
            });
            const imageSplit = imageToDelete.photo.split('/');
            const filename = imageSplit.at(-1);
            await userRepository.remove(userToDelete);
            await imageRepository.remove(imageToDelete);
            await deleteFile(`uploads/users/avatars/${filename}`);
            return res.status(200).json({ message: message });
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }
}
export default UsersController;

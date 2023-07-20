import { findAll, findOne, user, remove, save } from "../repositories/user.js";
class UsersController {
    static async listUsers(_req, res) {
        try {
            const result = await findAll();
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async addUser(req, res) {
        const { name, image } = req.body;
        const newPerson = user(name, image);
        try {
            await save(newPerson);
            return res.status(200).json({ message: 'usuario adicionado com sucesso!' });
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async findOneUser(req, res) {
        const { id } = req.params;
        try {
            const result = await findOne(id);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const user = await findOne(id);
            await remove(user);
            return res.status(200).json({ message: `pessoa com o id ${id} foi deletado` });
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async updateUser(req, res) {
        const { name, image } = req.body;
        const { id } = req.params;
        try {
            const user = await findOne(id);
            user.name = name;
            user.image = image;
            await save(user);
            return res.status(200).json({ message: `usuario atualizado com sucesso!` });
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }
}
export default UsersController;

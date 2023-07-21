import { Request, Response } from "express";
import User from "../models/User.js";
import { user, userRepository } from "../repositories/user.js";

class UsersController{

    static async listUsers (_req: Request, res: Response){
        
        try {
            const result: User[] = await userRepository.find();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error.message);
        }

    }

    static async addUser (req: Request, res: Response) {
        const { name, image }: any  = req.body;
        const newPerson: User = user(name, image);

        try {
            await userRepository.save(newPerson);
            return res.status(200).json({ message: 'usuario adicionado com sucesso!'});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async findOneUser (req: Request, res: Response) {
        const { id }: any  = req.params;
        
        try {
            const result: User = await userRepository.findOneBy({ id });
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async updateUser (req: Request, res: Response) {
        const { name, image }: any  = req.body;
        const { id }: any = req.params;

        try {
            const user: User = await userRepository.findOneBy({ id });
            
            user.name = name;
            user.image = image;

            await userRepository.save(user);
            return res.status(200).json({message: `usuario atualizado com sucesso!`});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deleteUser (req: Request, res: Response) {
        const { id }: any = req.params;

        try {
            const user: User = await userRepository.findOneBy({ id });
            await userRepository.remove(user);
            return res.status(200).json({message: `pessoa com o id ${id} foi deletado`});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

}

export default UsersController;
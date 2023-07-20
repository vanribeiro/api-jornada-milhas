import { Request, Response } from "express";
import { findAll, findOne, user, remove, save } from "../repositories/user.js";
import User from "../models/User.js";

class UsersController{

    static async listUsers (_req: Request, res: Response){
        
        try {
            const result: User[] = await findAll();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error.message);
        }

    }

    static async addUser (req: Request, res: Response) {
        const { name, image }: any  = req.body;
        const newPerson = user(name, image);

        try {
            await save(newPerson);
            return res.status(200).json({ message: 'usuario adicionado com sucesso!'});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async findOneUser (req: Request, res: Response) {
        const { id }: any  = req.params;
        
        try {
            const result: User = await findOne(id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deleteUser (req: Request, res: Response) {
        const { id }: any = req.params;

        try {
            const user: User = await findOne(id);
            await remove(user);
            return res.status(200).json({message: `pessoa com o id ${id} foi deletado`});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async updateUser (req: Request, res: Response) {
        const { name, image }: any  = req.body;
        const { id }: any = req.params;

        try {
            const user: User = await findOne(id);
            
            user.name = name;
            user.image = image;

            await save(user);
            return res.status(200).json({message: `usuario atualizado com sucesso!`});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

export default UsersController;
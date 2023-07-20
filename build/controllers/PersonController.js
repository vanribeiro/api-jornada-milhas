import { findAll, findOne, person, remove, save } from "../repositories/person.js";
class PersonController {
    static async listPeople(_req, res) {
        try {
            const result = await findAll();
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async addPerson(req, res) {
        const { name, image } = req.body;
        const newPerson = person(name, image);
        try {
            await save(newPerson);
            return res.status(200);
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async findOnePerson(req, res) {
        const { id } = req.params;
        try {
            const result = await findOne(id);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async deletePerson(req, res) {
        const { id } = req.params;
        try {
            const person = await findOne(id);
            await remove(person);
            return res.status(200).json({ message: `pessoa com o id ${id} foi deletado` });
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }
}
export default PersonController;

import express from "express";
import UsersController from "../controllers/UsersController.js";
const router = express.Router();
router
    .get('/usuarios', UsersController.listUsers)
    .get('/usuarios/:id', UsersController.findOneUser)
    .post('/usuarios', UsersController.addUser)
    .put('/usuarios/:id', UsersController.updateUser)
    .delete('/usuarios/:id', UsersController.deleteUser);
export default router;

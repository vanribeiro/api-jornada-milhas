import express from "express";
import UserController from "../controllers/UserController.js";
const router = express.Router();
router
    .get('/usuarios', UserController.listUsers)
    .get('/usuarios/:id', UserController.findOneUser)
    .post('/usuarios', UserController.addUser)
    .put('/usuarios/:id', UserController.updateUser)
    .delete('/usuarios/:id', UserController.deleteUser);
export default router;

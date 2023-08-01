import express from "express";
import UsersController from "../controllers/UsersController";
import multer from 'multer';
import { storageSettingsUsersAvatar } from "../utils/multer-storage-setting";

const storage = multer.diskStorage(storageSettingsUsersAvatar);

const upload = multer({ storage });

const router = express.Router();

router
    .get('/usuarios', UsersController.listAllUsers)
    .get('/usuarios/:id', UsersController.findUserById)
    .post('/usuarios', upload.single('avatar'), UsersController.addUser)
    .put('/usuarios/:id', upload.single('avatar'), UsersController.updateUser)
    .delete('/usuarios/:id', UsersController.deleteUser);

export default router;

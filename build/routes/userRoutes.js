import express from "express";
import UsersController from "../controllers/UsersController.js";
import multer from 'multer';
import { storageSettingsUsersAvatar } from "../utils/multer-storage-setting.js";
const storage = multer.diskStorage(storageSettingsUsersAvatar);
const upload = multer({ storage });
const router = express.Router();
router
    .get('/usuarios', UsersController.listUsers)
    .get('/usuarios/:id', UsersController.findOneUser)
    .post('/usuarios', upload.single('avatar'), UsersController.addUser)
    .put('/usuarios/:id', upload.single('avatar'), UsersController.updateUser)
    .delete('/usuarios/:id', UsersController.deleteUser);
export default router;

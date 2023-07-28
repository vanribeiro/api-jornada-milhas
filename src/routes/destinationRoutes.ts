import express from "express";
import multer from 'multer';
import { storageSettingsDestinationAvatar } from "../utils/multer-storage-setting";
import DestinationController from "../controllers/DestinationController";

const storage = multer.diskStorage(storageSettingsDestinationAvatar);

const upload = multer({ storage });

const router = express.Router();
//TODO
router
    .get('/destinos', DestinationController.listAllDestinations)
    .get('/destinos/:id', DestinationController.listDestination)
    .post('/destinos', upload.array('destination'), DestinationController.addDestination)
    .put('/destinos/:id', upload.array('destination'), DestinationController.updateDestination)
    .delete('/destinos/:id', DestinationController.deleteDestination);

export default router;

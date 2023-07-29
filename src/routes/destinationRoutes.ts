import express from "express";
import multer from 'multer';
import { storageSettingsDestination } from "../utils/multer-storage-setting";
import DestinationController from "../controllers/DestinationController";

const storage = multer.diskStorage(storageSettingsDestination);

const upload = multer({ storage });

const router = express.Router();

router
    .get('/destinos', DestinationController.listAllDestinations)
    .get('/destinos/:id', DestinationController.findDestinationById)
    .post('/destinos', upload.single('destination'), DestinationController.addDestination)
    .put('/destinos/:id', upload.single('destination'), DestinationController.updateDestination)
    .delete('/destinos/:id', DestinationController.deleteDestination);

export default router;

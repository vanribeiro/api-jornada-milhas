import { appDataSource } from "../config/data-source";
import { Repository } from "typeorm";
import Destination from "../models/Destination";

const destinationRepository: Repository<Destination> = appDataSource.getRepository(Destination);

export { destinationRepository };

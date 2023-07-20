import { DataSource } from "typeorm";
import Person from "../models/Person";

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "devenv",
    password: "envdev123",
    database: "jornada_de_milhas",
    entities: [Person],
    synchronize: true,
    logging: false,
});

export default AppDataSource;
import "reflect-metadata";
import { DataSource } from "typeorm";
import Person from "./models/Person.js";

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

AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error));

export {
    AppDataSource
}
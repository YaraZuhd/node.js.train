import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "147296",
    database: "Users",
    entities: [
        "dist/entity/**/*.js"
      ],
    logging: true,
    synchronize: true,
})
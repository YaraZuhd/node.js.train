import "reflect-metadata"
import { DataSource } from "typeorm";
import { Cart } from "./entity/Cart";
import { Category } from "./entity/Category";
import { Order } from "./entity/Order";
import { OrderItems } from "./entity/orderItems";
import { Product } from "./entity/Product";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "147296",
  database: "Users 2",
  synchronize: true,
  entities: [User,Product,Category,Order,Cart,OrderItems],
});


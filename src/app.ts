import express from "express";
import morgan from "morgan";
//import cors from "cors";
import * as bodyParser from "body-parser";

import userRoutes from "./routes/user.routes";
import loginRoutes from "./routes/login.routes";
import productRoutes from "./routes/product.routes";
import CategoryRoutes from "./routes/category.routes";


const app = express();

//app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());


app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/products", productRoutes);
app.use("/categories", CategoryRoutes);




export default app;
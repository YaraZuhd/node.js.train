import express from "express";
import morgan from "morgan";
import cors from "cors";
import * as bodyParser from "body-parser";

import userRoutes from "./routes/user.routes";
import loginRoutes from "./routes/login.routes";
import registerRoutes from "./routes/register.routes"
import productRoutes from "./routes/product.routes";
import categoryRoutes from "./routes/category.routes";
import orderRoutes from "./routes/order.routes";
import cartRoutes from "./routes/cart.routes";



const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());


app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/signup", registerRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/orders",orderRoutes);
app.use("/carts",cartRoutes);




export default app;
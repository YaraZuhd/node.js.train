import { Request, Response } from "express";
import { Order } from "../entity/Order";
import { Product } from "../entity/Product";
import { User } from "../entity/User";
import OrderSchema from "../schemas/orderSchema";



export const getOrders = async (_: Request, res: Response) => {
  try {
    const order = await Order.find({relations : ['user', 'productItems']});
    return res.json(order);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const { id } =  req.params;
    const order = await Order.findOne({ where : {id : parseInt(id)}, relations : ['user', 'productItems']});
    if (!order) return res.status(404).json({ message: "Order not found" });
    return res.json(order);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const createOrder = async (
  req: Request,
  res: Response
) => {
  try{
    const validate = OrderSchema.validate(req.body);
    if(!validate.error?.message){
      let order = new Order();
      let Qsum = 0;
      let Psum = 0;
      for(let i = 0; i< req.body.productItems.length; i++){
        const product = await Product.findOne({ where : {id :parseInt(req.body.productItems[i].id)}, relations : ['categories']});
        if (!product) return res.status(404).json({ message: "Product not found" });
        if(product != null){
            if((product.quantity - req.body.productItems[i].quantity) < 0){
              return res.status(404).json({ message: `The Quantity you Entered Is More than The Product Quantity which is ${product.quantity}`});
            }else{
              Qsum = Qsum + parseInt(req.body.productItems[i].quantity);
              Psum = Psum + parseInt(req.body.productItems[i].quantity)* product.price;
              product.quantity = product.quantity - req.body.productItems[i].quantity;
              await product.save();
            }
          }
      }
      order.totalQuentities = Qsum;
      order.totalPrice = Psum;
      order.user = res.locals.jwtPayload.userId;
      const user = await User.findOneBy({ id: parseInt(res.locals.jwtPayload.userId) });
      if (user != null){
        const orders = [order];
        Object.assign(user, orders);
        await user.save();
        order.productItems = req.body.productItems;
        order = await Order.create({ ...req.body, ...order});
        await order.save();
        console.log(order);
      }
      return res.json(order);
    }else{
      return res.json({message : validate.error.message})
    }
  }catch(error){
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const order = await Order.findOneBy({ id: parseInt(id) });
    if (!order) return res.status(404).json({ message: "Order not found" });
    const validate = OrderSchema.validate(req.body);
    if(!validate.error?.message){
      await Order.update({ id: parseInt(id) }, req.body);
      return res.sendStatus(204);
    }else{
      return res.json({message : validate.error.message})
    }       
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await Order.delete({ id: parseInt(id) });

    if (result.affected === 0)
      return res.status(404).json({ message: "Order not found" });

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
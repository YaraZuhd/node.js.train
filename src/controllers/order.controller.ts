import { Request, Response } from "express";
import { Cart } from "../entity/Cart";
import { Order } from "../entity/Order";
import { OrderItems } from "../entity/orderItems";
import { User } from "../entity/User";
import OrderSchema from "../schemas/orderSchema";



export const getOrders = async (_: Request, res: Response) => {
  try {
    const order = await Order.find({relations : ['user', 'items','cart']});
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
    const order = await Order.findOne({ where : {id : parseInt(id)}, relations : ['user', 'items','cart']});
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
       const user = await User.findOne({where : {id : parseInt(res.locals.jwtPayload.userId)},relations : ['orders', 'cart']});
       const cart = await Cart.findOne({where: {id : user.cart.id}, relations : ['items']});
       const orderItems = await OrderItems.find({where: {cID : user.cart.id}, relations : ['order', 'cart']})
       if( user != null && cart != null && orderItems != null){
        order.totalPrice = cart.price;
        order.totalQuentities = cart.quentity;
        cart.quentity = 0;
        cart.price = 0;
        cart.status = "Empty";
        cart.items = [];
        await cart.save();
        user.cart = cart;
        await user.save();
        order.user = user;
        order.cart = cart;
        order = await Order.create({ ...req.body, ...order});
        await order.save();
        for(let i =0; i< orderItems.length;i++){
          orderItems[i].cart.id = null;
          orderItems[i].cID = null;
          orderItems[i].order = order;
          await orderItems[i].save();
        }   
        user.orders.push(order);
        await user.save();
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
    const order = await Order.findOne({where : {id : parseInt(id)}, relations : ['user','cart','items']});
    if (!order) return res.status(404).json({ message: "Order not found" });
    const validate = OrderSchema.validate(req.body);
    if(!validate.error?.message){
      await Order.update({id : parseInt(id)}, req.body)
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
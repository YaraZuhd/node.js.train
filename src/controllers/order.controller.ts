import { Request, Response } from "express";
import { Order } from "../entity/Order";
import OrderSchema from "../schemas/orderSchema";



export const getOrders = async (req: Request, res: Response) => {
  try {
    const order = await Order.find();
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
    const order = await Order.findOneBy({ id: parseInt(id) });

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
    const order = new Order();
    const validate = OrderSchema.validate(order);
    if(!validate.error?.message){
      await order.save();
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
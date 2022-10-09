import { Request, Response } from "express";
import { Order } from "../entity/Order";
import { Product } from "../entity/Product";
import OrderSchema from "../schemas/orderSchema";



export const getOrders = async (req: Request, res: Response) => {
  try {
    const order = await Order.find({relations : ['productItems']});
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
    const order = await Order.findOne({ where : {id : parseInt(id)}, relations : ['productItems']});
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
      console.log(req.body)
      let order = new Order();
      console.log(order.totalPrice , order.totalQuentities);
      let Qsum = 0;
      let Psum = 0;
      console.log(req.body.productItems[0].id);
      for(let i = 0; i< req.body.productItems.length; i++){
        const product = await Product.findOne({ where : {id :parseInt(req.body.productItems[i].id)}, relations : ['categories']});
        console.log(product);
        if(product != null){
          debugger;
            Qsum = Qsum + parseInt(req.body.productItems[i].quintity);
            Psum = Psum + parseInt(req.body.productItems[i].quintity)* product.price;
            console.log(Qsum, Psum, parseInt(req.body.productItems[i].quintity) ,product.price);
          }
      }
      console.log(Qsum,Psum);
      order.totalQuentities = Qsum;
      order.totalPrice = Psum;
      order.user = res.locals.jwtPayload.userId;
      order = await Order.create({ ...req.body, ...order})
      console.log(order);
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
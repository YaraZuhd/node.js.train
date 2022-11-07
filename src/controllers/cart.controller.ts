import { Request, Response  } from "express";
import { Cart } from "../entity/Cart";
import { OrderItems } from "../entity/orderItems";
import { Product } from "../entity/Product";
import { User } from "../entity/User";
import CartSchema from "../schemas/cartSchema ";

export const getCarts = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.find({relations : ['items']});    
    return res.json(cart);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getCart = async (req: Request, res: Response) => {
  try {
    const { id } =  req.params;
    const cart = await Cart.findOne({ where : {id : parseInt(id)}, relations : ['items']});

    if (!cart) return res.status(404).json({ message: "Cart not found" });
    
    return res.json(cart);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getCurrentUserCart = async (_: Request, res: Response) => {
    const id = res.locals.jwtPayload.userId;
    try {
      const user = await User.findOne({ where : {id : parseInt(id)} , relations : ['cart']});
      if(user != null){
        const cart = await Cart.findOne({where : {id : user.cart.id} , relations : ['items']})
        return res.json(cart);
      }
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };

  export const deletecartItems = async (req: Request, res: Response) => {
    const id = res.locals.jwtPayload.userId;
    try {
      const cart = await Cart.findOne({where : {id : parseInt(id)}, relations : ['items']}) ;
      if(cart != null){
        cart.items = [];
        cart.quentity = 0;
        cart.price = 0;
        cart.status = "Empty";
        await cart.save();
        return res.status(204).json({message : "Deleted Successfuly"});
      }else{
        return res.status(400).json({message : 'Cart is Empty'});
      } 
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };

  export const addProductToCart = async (req: Request, res: Response) => {
    const id = res.locals.jwtPayload.userId;
    try {
     const cart = await Cart.findOne({where : {id : parseInt(id)}, relations : ['items']});
     let items = new OrderItems();
     const validate = CartSchema.validate(req.body);
     if(!validate.error?.message){
      if(cart != null && items != null) {
          let Qsum = 0;
          let Psum = 0;
          for(let i = 0; i< req.body.items.length; i++){
            const product = await Product.findOne({ where : {id :parseInt(req.body.items[i].id)}, relations : ['categories']});
            if (!product) return res.status(404).json({ message: "Product not found" });
            if(product != null){
                Qsum = Qsum + parseInt(req.body.items[i].quantity);
                Psum = Psum + parseInt(req.body.items[i].quantity)* product.price;
              }
            cart.items.push(req.body.items[i]);
          }
          cart.quentity = cart.quentity + Qsum;
          cart.price = cart.price + Psum;
          cart.status = "Pending";
          await cart.save();
          items.quantity = Qsum;
          items.cID = cart.id;
          items.price = Psum;
          items.cart = cart;
          items = await OrderItems.create({ ...items});
          await items.save();
      }
      return res.json(cart);
     }else{
      return res.json({message : validate.error.message})
    }
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };
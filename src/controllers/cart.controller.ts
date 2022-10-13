import { Request, Response  } from "express";
import { Cart } from "../entity/Cart";
import { User } from "../entity/User";

export const getCarts = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.find({relations : ['orders']});    
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
    const cart = await Cart.findOne({ where : {id : parseInt(id)}, relations : ['orders']});

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
        const cart = await Cart.findOne({where : {id : user.cart.id} , relations : ['orders']})
        return res.json(cart);
      }
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };

  export const deletecartItems = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const cart = await Cart.findOne({where : {id : parseInt(id)}, relations : ['orders']}) ;
      if(cart != null){
        cart.orders = [];
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

//   export const updateCartItems = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     try {
//       const cart = await Cart.findOne({where : {id : parseInt(id)}, relations : ['orders']}) ;
//       if(cart != null){
//         for(let i = 0; i< cart.orders.length; i++){
//            if(req.body.orders[i].id == cart.orders[i].id){
//                 cart.quentity = cart.quentity - req.body.orders[i].totalQuentities;
//                 cart.price = cart.price - req.body.orders[i].totalPrice;
//                 cart.orders = cart.orders.filter((element) => {
//                     return element !== req.body.orders[i];
//                 });
//                 console.log(cart.orders);
//                 console.log(cart);
//                 await cart.save();
//            }
//         }
//         return res.status(204).json({message : "Updated Successfuly"});
//       }else{
//         return res.status(400).json({message : 'Cart is Empty'});
//       } 
//     } catch (error) {
//       if (error instanceof Error) {
//         return res.status(500).json({ message: error.message });
//       }
//     }
//   };
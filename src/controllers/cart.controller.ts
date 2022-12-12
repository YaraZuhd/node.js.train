import { Request, Response  } from "express";
import { Cart } from "../entity/Cart";
import { OrderItems } from "../entity/orderItems";
import { Product } from "../entity/Product";
import { User } from "../entity/User";
import CartSchema , {UpdateCartSchema} from "../schemas/cartSchema ";

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
        return res.json(cart);
      }else{
        return res.status(400).json({message : 'Cart is Empty'});
      } 
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };

  export const deletecartItem = async (req: Request, res: Response) => {
    const id = res.locals.jwtPayload.userId;
    const proId = +req.params.productId;
    try {
      const cart = await Cart.findOne({where : {id : parseInt(id)}, relations : ['items']}) ;
      if(cart != null){
        const oldCartItem =cart.items.find(({productId}) => productId == proId);
        console.log(oldCartItem);
       cart.quentity = cart.quentity - oldCartItem.quantity;
       cart.price = cart.price - oldCartItem.price;
        cart.items = cart.items.filter((item)=>{
          if(item.productId != proId){
            return item
          }
        });
        console.log(cart.items);
        await cart.save();
        console.log(cart);
        return res.json(cart);
      }else{
        return res.status(400).json({message : 'Cart is Empty'});
      } 
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };


  export const updateCartItem = async (req: Request, res: Response) => {
    const id = res.locals.jwtPayload.userId;
    const proId = +req.params.productId;
    try {
      const cart = await Cart.findOne({where : {id : parseInt(id)}, relations : ['items']}) ;
      let item: OrderItems[];
      let productItem = [];
      let index = 0;
      const validate = UpdateCartSchema.validate(req.body);
      if(!validate.error?.message){
        if(cart != null){
          let Qsum = 0;
          let Psum = 0;
          for(let i = 0; i< cart.items.length; i++){
            if(cart.items[i].productId == proId){
              productItem.push(cart.items[i]);
              index = i;
            }
        }
        console.log(req.body, productItem)
           for(let i = 0; i< req.body.items.length; i++){
              const product = await Product.findOne({ where : {id :proId}, relations : ['categories']});
              if (!product) return res.status(404).json({ message: "Product not found" });
              //increase
              if(parseInt(req.body.items[i].newQuantity) > parseInt(req.body.items[i].oldQuantity)){
                item = await OrderItems.find({where: {id : productItem[0].id}, relations : ['order', 'cart']});
                console.log(item)
                Qsum = Qsum + (parseInt(req.body.items[i].newQuantity) - parseInt(req.body.items[i].oldQuantity));
                item[0].quantity = Qsum + cart.items[index].quantity;
                Psum = Psum + Qsum * product.price;
                item[0].price = Psum + cart.items[index].price;
                await item[0].save();
                cart.quentity = cart.quentity + Qsum;
                cart.price = cart.price + Psum;
                cart.items.map((ele) => {
                  if(ele.id == item[0].id){
                    return item[0]
                  }else{
                    return ele;
                  }
                });
                cart.items[index] = item[0]
                await cart.save();
             }
           //dcrease
              if(parseInt(req.body.items[i].newQuantity) < parseInt(req.body.items[i].oldQuantity)){
                item = await OrderItems.find({where: {id : productItem[0].id}, relations : ['order', 'cart']});
                Qsum = Qsum + (parseInt(req.body.items[i].oldQuantity) - parseInt(req.body.items[i].newQuantity));
                item[0].quantity = cart.items[index].quantity - Qsum;
                Psum = Psum + Qsum * product.price;
                item[0].price = cart.items[index].price - Psum;
                await item[0].save();
                cart.quentity = cart.quentity - Qsum;
                cart.price = cart.price - Psum;
                cart.items.map((ele) => {
                  if(ele.id == item[0].id){
                    return item[0]
                  }else{
                    return ele;
                  }
                });
                cart.items[index] = item[0]
                await cart.save();
              }
          }
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

  export const addProductToCart = async (req: Request, res: Response) => {
    const id = res.locals.jwtPayload.userId;
    try {
     const cart = await Cart.findOne({where : {id : parseInt(id)}, relations : ['items']});
     let items = new OrderItems();
     let itemm: OrderItems[];
     let productItem = [];
     let index = 0;
     const validate = CartSchema.validate(req.body);
     if(!validate.error?.message){
      if(cart != null && items != null) {
          let Qsum = 0;
          let Psum = 0;
          for(let i = 0; i< req.body.items.length; i++){
            const product = await Product.findOne({ where : {id :parseInt(req.body.items[i].id)}, relations : ['categories']});
            if (!product) return res.status(404).json({ message: "Product not found" });
            if(cart.items.length != 0){
              for(let i = 0; i< cart.items.length; i++){
                 if(cart.items[i].productId == product.id){
                   productItem.push(cart.items[i]);
                   index = i;
                 }
              }
            }
            if(productItem.length == 0){
              if(product != null){
                Qsum = Qsum + parseInt(req.body.items[i].quantity);
                Psum = Psum + parseInt(req.body.items[i].quantity)* product.price;
                items.productName = req.body.items[i].productName;
                items.productId = req.body.items[i].id;
              }
             cart.items.push(req.body.items[i]);
            }else{
              itemm = await OrderItems.find({where: {id : productItem[0].id}, relations : ['order', 'cart']});
              console.log(itemm);
              Qsum = Qsum + parseInt(req.body.items[i].quantity) ;
              itemm[0].quantity = Qsum + cart.items[index].quantity;
              Psum = Psum + parseInt(req.body.items[i].quantity)* product.price;
              itemm[0].price = Psum + cart.items[index].price;
              await itemm[0].save();
            }
          }
          if(productItem.length > 0){
            cart.quentity = cart.quentity + Qsum;
            cart.price = cart.price + Psum;
            cart.items.map((item) => {
              if(item.id == itemm[0].id){
                 return itemm[0]
              }else{
                return item;
              }
            });
            cart.items[index] = itemm[0]
            await cart.save();
          }
          if(productItem.length == 0){
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
 import Joi from "joi";


const ProductSchema =  Joi.object().keys({ 
      id: Joi.number().required(),
      quantity : Joi.number().required(),
      productName: Joi.string().required()
});

const CartSchema =  Joi.object().keys({ 
      id: Joi.number(),
      status : Joi.string().valid('Pending', 'Empty'),
      items : Joi.array().items(ProductSchema).required()
});

export default CartSchema;

const ProductInfoSchema = Joi.object().keys({ 
      id: Joi.number().required(),
      cID : Joi.number().required(),
      price : Joi.number().required(),
      newQuantity : Joi.number().required(),
      oldQuantity : Joi.number().required(),
      productName: Joi.string().required(),
      productId : Joi.number().required()
});


export const UpdateCartSchema = Joi.object().keys({
      items :Joi.array().items(ProductInfoSchema).required()
});
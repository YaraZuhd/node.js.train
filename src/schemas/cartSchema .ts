 import Joi from "joi";


const ProductSchema =  Joi.object().keys({ 
      id: Joi.number().required(),
      quantity : Joi.number().required()
});

const CartSchema =  Joi.object().keys({ 
      id: Joi.number(),
      status : Joi.string(),
      items : Joi.array().items(ProductSchema).required()
});

export default CartSchema;
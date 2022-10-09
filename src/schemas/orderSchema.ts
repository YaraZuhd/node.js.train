import Joi from "joi";


const ProductSchema =  Joi.object().keys({ 
      id: Joi.number().required(),
      quintity : Joi.number().required()
});

const OrderSchema =  Joi.object().keys({ 
      id: Joi.number(),
      totalPrice: Joi.number(), 
      totalQuentities: Joi.number(),
      productItems : Joi.array().items(ProductSchema).required()
});

export default OrderSchema;
import Joi from "joi";


const ProductSchema =  Joi.object().keys({ 
      id: Joi.number().required(),
      quantity : Joi.number().required()
});

const OrderSchema =  Joi.object().keys({ 
      id: Joi.number(),
      totalPrice: Joi.number(), 
      name : Joi.string().required(),
      totalQuentities: Joi.number(),
      productItems : Joi.array().items(ProductSchema).required()
});

export default OrderSchema;
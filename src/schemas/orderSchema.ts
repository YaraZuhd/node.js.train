import Joi from "joi";

const OrderSchema =  Joi.object().keys({ 
      id: Joi.number(),
      totalPrice: Joi.number(), 
      name : Joi.string().required(),
      totalQuentities: Joi.number(),
      status : Joi.string()
});

export default OrderSchema;
import Joi from "joi";

const OrderSchema =  Joi.object().keys({ 
      id: Joi.number(),
      totalPrice: Joi.number().required(), 
      totalQuentities: Joi.number().required()
});

export default OrderSchema;
import Joi from "joi";

const productSchema =  Joi.object().keys({ 
      id: Joi.number(),
      name: Joi.string().required(), 
      price: Joi.number().required(), 
      desription : Joi.string().required()
});

export default productSchema;
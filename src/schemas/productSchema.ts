import Joi from "joi";

const CategorySchema =  Joi.object().keys({ 
      id: Joi.number().required(),
});

const productSchema =  Joi.object().keys({ 
      id: Joi.number(),
      name: Joi.string().required(), 
      price: Joi.number().required(),
      quantity : Joi.number().required(), 
      desription : Joi.string().required(),
      categories : Joi.array().items(CategorySchema)
});

export default productSchema;
import Joi from "joi";

const CategorySchema =  Joi.object().keys({ 
      id: Joi.number(),
      name: Joi.string().required(), 
});

export default CategorySchema;
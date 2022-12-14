import Joi from "joi";

const userDetail =  Joi.object().keys({ 
      id: Joi.number(),
      firstname: Joi.string().required(), 
      lastname: Joi.string().required(), 
      gender : Joi.string().valid('male', 'female').required(),
      phone : Joi.string().required(),
      email : Joi.string().email().required(),
      password: Joi.string().required(),
      address : Joi.string().required(),
      role : Joi.string().valid('user', 'admin', 'product admin'),
});

export default userDetail;
import * as Joi from 'joi';

export const createCustomer= Joi.object({
    email: Joi.string().optional(),
    userName: Joi.string().optional(),
    customerName:Joi.string().optional(),
    // imageUrl:Joi.string().optional(),

});

// export const login= Joi.object({
//     email: Joi.string().optional(),
//     username: Joi.string().optional(),
//     password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
// });
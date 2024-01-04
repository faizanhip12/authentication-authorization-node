import * as Joi from 'joi';

export const userSchema = Joi.object({
    username: Joi.string().required(),
    role: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

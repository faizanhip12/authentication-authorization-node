import * as Joi from 'joi';

export const signup= Joi.object({
    email: Joi.string().optional(),
    username: Joi.string().optional(),
    role: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

export const login= Joi.object({
    email: Joi.string().optional(),
    username: Joi.string().optional(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});
import Joi from "joi";

export const addUserSchema = Joi.object({
    name:Joi.string().required(),
    email: Joi.string().email().required(),
    password:Joi.string().required(),
    phone: Joi.number().min(10000000000).max(99999999999).required(),
    cep: Joi.number().min(10000000).max(99999999).required(),
    address: Joi.number().min(0).required(),
    complement: Joi.string().required(),
    picture: Joi.optional()
})

export const LoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})
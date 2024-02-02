import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string()
    .max(50)
    .required()
    .messages({ "any.required": "Missing required name field" }),
  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "Missing required email field" }),
  phone: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({ "any.required": "Missing required phone field" }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().max(50),
  email: Joi.string().email(),
  phone: Joi.string().min(3).max(50),
});
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const exceptionMessages = {
  'string.base': '{{#label}} should be a type of \'text\'',
  'string.empty': '{{#label}} cannot be an empty field',
  'string.min': '{{#label}} should have a minimum length of {#limit}',
  'any.required': '{{#label}} is a required field',
};

const createUserSchema = Joi.object({
  name: Joi.string()
    .min(3).max(40).required()
    .messages(exceptionMessages),
  username: Joi.string()
    .min(3).max(20).required()
    .messages(exceptionMessages),
  password: Joi.string()
    .min(8).required()
    .messages(exceptionMessages),
});

function CreateUserValidator(req:Request, res:Response, next: NextFunction) {
  const { error } = createUserSchema.validate(req.body);

  if (error) {
    const { details } = error;
    const errorMessages = details.map(({ message }) => message);
    return res.status(400).json({ status: 'Validation error', details: errorMessages });
  }

  return next();
}

export { CreateUserValidator };

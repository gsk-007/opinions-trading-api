import Joi from "joi";

export const tradeValidationSchema = Joi.object({
  event: Joi.string().required(),
  choice: Joi.string().valid("yes", "no").required(),
  amount: Joi.number().min(1).required(),
  odds: Joi.number().min(1).required(),
});

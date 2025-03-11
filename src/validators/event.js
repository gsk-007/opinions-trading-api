import Joi from "joi";

export const eventValidationSchema = Joi.object({
  eventName: Joi.string().min(3).max(100).required(),
  eventType: Joi.string()
    .valid("sports", "politics", "entertainment")
    .required(),
  odds: Joi.object({
    yes: Joi.number().positive().required(),
    no: Joi.number().positive().required(),
  }),
  status: Joi.string()
    .valid("upcoming", "live", "completed")
    .default("upcoming"),
  result: Joi.string().valid("yes", "no", "pending").default("pending"),
  startTime: Joi.date().iso().required(),
  endTime: Joi.date().iso().required(),
});

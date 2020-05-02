const Joi = require('@hapi/joi')

const productSchema = Joi.object({
  name: Joi.string().min(3).required(),
  sku: Joi.string().required(),
  price: Joi.number().required(),
  image: Joi.optional(),
  description: Joi.optional()
})

module.exports = productSchema
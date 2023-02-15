const joi = require('joi')

const registerValidation = (data) => {
  const schema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
  })
  return schema.validate(data)
}

const loginValidation = (data) => {
  const schema = joi.object({
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
  })
  return schema.validate(data)
}

module.exports = {
  registerValidation: registerValidation,
  loginValidation: loginValidation,
}

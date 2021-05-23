const Joi = require('joi')
const mongoose = require('mongoose')

const addingContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  phone: Joi.string().length(10).required(),
})

const updatingContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .optional(),
  phone: Joi.string().length(10).optional(),
})

const contactUpdateFavoriteStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const validation = async (schema, contactObject, next) => {
  const { name, email, phone } = contactObject
  try {
    await schema.validateAsync({ name, email, phone })
    return next()
  } catch (error) {
    next({
      status: 400,
      message: error.message,
    })
  }
}

module.exports = {
  addValidationContact: async (req, res, next) => {
    return await validation(addingContactSchema, req.body, next)
  },
  updateValidationContact: async (req, res, next) => {
    return await validation(updatingContactSchema, req.body, next)
  },
  validationUpdateContactFavoriteSatus: async (req, res, next) => {
    return await validation(contactUpdateFavoriteStatusSchema, req.body, next)
  },
  validationObjectId: async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
      return next({
        status: 400,
        message: 'Invalid ObjectId',
      })
    }
    next()
  },
}

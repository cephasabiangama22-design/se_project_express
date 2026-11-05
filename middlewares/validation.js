const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

module.exports.validateItemId = celebrate({
  params: Joi.object().keys({
    ItemId: Joi.string().hex().length(24).required(),
  }),
});

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }

  return helpers.error("string.url");
};

module.exports.validateClothingItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).message({
      "string.min": 'The minimum length of the"name" field is 2',
      "string.max": 'The maxium length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    imageUrl: Joi.string().required().custom(validateURL).message({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.url": 'The "imageUrl" field must be a valid URL',
    }),
  }),
});

module.exports.validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).message({
      "string.min": 'The minimum length of the"name" field is 2',
      "string.max": 'The maxium length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.url": 'The "avatarUrl" field must be a valid URL',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email address',
    }),
    password: Joi.string().required().message({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports.authenticateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email address',
    }),
    password: Joi.string().required().message({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

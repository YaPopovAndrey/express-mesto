/* eslint-disable linebreak-style */
const { celebrate, Joi } = require('celebrate');
const errorMessages = require('../errors/ErrorMessages');

const {
  wrongName, wrongAbout, wrongLink, wrongAuth, wrongId, wrongMail, wrongPassword,
} = errorMessages;

const link = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i;

module.exports.validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required()
      .error(new Joi.ValidationError(wrongName)),
    about: Joi.string().min(2).required()
      .error(new Joi.ValidationError(wrongAbout)),
  }).unknown(true),
});

module.exports.validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(link).required()
      .error(new Joi.ValidationError(wrongLink)),
  }).unknown(true),
});

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required()
      .alphanum()
      .error(new Joi.ValidationError(wrongId)),
  }).unknown(true),
});

module.exports.validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .error(new Joi.ValidationError(wrongName)),
    link: Joi.string().pattern(link).required()
      .error(new Joi.ValidationError(wrongLink)),
  }).unknown(true),
});

module.exports.validateSigIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .error(new Joi.ValidationError(wrongAuth)),
    password: Joi.string().required().min(4)
      .error(new Joi.ValidationError(wrongAuth)),
  }).unknown(true),
});

module.exports.validateSigUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .error(new Joi.ValidationError(wrongName)),
    about: Joi.string().min(2).max(30)
      .error(new Joi.ValidationError(wrongAbout)),
    avatar: Joi.string().pattern(link)
      .error(new Joi.ValidationError(wrongLink)),
    email: Joi.string().required().email()
      .error(new Joi.ValidationError(wrongMail)),
    password: Joi.string().required().min(4)
      .error(new Joi.ValidationError(wrongPassword)),
  }).unknown(true),
});

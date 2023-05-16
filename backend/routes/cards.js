const cardRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
// eslint-disable-next-line
const regURL =/^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/;
const {
  createCard,
  getCards,
  deleteCard,
  onLikedCard,
  offLikedCard,
} = require('../controllers/cards');

// запрос карточек
cardRouter.get('/', getCards);

// запрос на отправление карточки в бд
cardRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().regex(regURL).required(),
    }),
  }),
  createCard,
);

// запрос на удаление карточки из бд
cardRouter.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  deleteCard,
);

// запрос на установку лайка
cardRouter.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24).required(),
    }),
  }),
  onLikedCard,
);

// запрос на удаление лайка
cardRouter.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24).required(),
    }),
  }),
  offLikedCard,
);

module.exports = cardRouter;

const cardRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
// eslint-disable-next-line
const regURL =/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
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

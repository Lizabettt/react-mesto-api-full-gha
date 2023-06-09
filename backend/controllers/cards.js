const Card = require('../models/cards');
const { NotFound, BadRequest, Forbiden } = require('../errors');

// создание карточки
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  return Card.create({ name, link, owner })
    .then((newCard) => res.status(201).send(newCard))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequest('Переданы некорректные данные при создании карточки.'),
        );
        return;
      }
      next(err);
    });
};

// получение всех карточек
const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards.reverse()))
    .catch(next);
};

// удаление карточки
const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        next(new NotFound('Карточка с указанным _id не найдена.'));
      } else {
        const owner = card.owner.toString();
        if (req.user._id === owner) {
          Card.deleteOne(card).then(() => {
            res.send(card);
          });
          return;
        }
        next(new Forbiden('Чужие карточки удалить нельзя!'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new BadRequest('Переданы некорректные данные для удаления карточки.'),
        );
        return;
      }
      next(err);
    });
};

// ставим лайк карточке
const onLikedCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        next(new NotFound('Карточка с указанным _id не найдена.'));
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new BadRequest('Переданы некорректные данные для постановки лайка'),
        );
        return;
      }
      next(err);
    });
};

// убираем лайк картоке
const offLikedCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        next(new NotFound('Карточка с указанным _id не найдена.'));
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные для снятия лайка'));
        return;
      }
      next(err);
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  onLikedCard,
  offLikedCard,
};

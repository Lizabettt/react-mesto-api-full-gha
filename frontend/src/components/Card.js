import CurrentUserContext from "../contexts/CurrentUserContext";
import { useContext } from "react";

export default function Card({ 
  card, 
  showСard, 
  onCardLike, 
  onCardDelete }) {
    
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(
    (selectedCard) => selectedCard._id === currentUser._id
  );
  const cardDeliteButtonClassName = isOwn
    ? "elements__basket"
    : "elements__basket-none";
  const cardLikeButtonClassName = isLiked
    ? "elements__like-add"
    : "elements__like";

  return (
    <li className="elements__card">
      <img
        className="elements__pic"
        src={card.link}
        alt={card.name}
        onClick={() => showСard(card)}
      />
      <button
        type="button"
        className={cardDeliteButtonClassName}
        onClick={() => onCardDelete(card)}
      ></button>
      <div className="elements__box">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__like-box">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={() => onCardLike(card)}
          ></button>
          <span className="elements__like-span">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

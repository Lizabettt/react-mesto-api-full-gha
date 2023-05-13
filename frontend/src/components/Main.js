import changeName from "../images/change.svg";
import addCard from "../images/add.svg";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useContext } from "react";

export default function Main({
  changeAvatar,
  changeProfile,
  addPlace,
  showСard,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__foto-box">
          <img
            className="profile__foto"
            src={currentUser.avatar}
            alt="Аватар"
          />
          <div className="profile__foto-btn" onClick={changeAvatar}></div>
        </div>
        <div className="profile__name-box">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button className="profile__change-name" type="button">
            <img
              className="profile__change-name-pic"
              src={changeName}
              alt="Изменить"
              onClick={changeProfile}
            />
          </button>
          <p className="profile__info">{currentUser.about}</p>
        </div>
        <button
          className="profile__button-add"
          type="button"
          onClick={addPlace}
        >
          <img
            className="profile__button-add-pic"
            src={addCard}
            alt="Добавить"
          />
        </button>
      </section>
      <section className="elements">
        <ul className="elements__grid">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              showСard={showСard}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

import closeIcon from "../images/Close_Icon.png";
import { useEffect } from "react";

export default function ImagePopup({ 
  name, 
  card, 
  isOpen, 
  onClose 
}) {
  //закрытие по esc
  function handleEscClose(evt) {
    evt.key === "Escape" && onClose();
  }

  useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
    return () => 
    document.removeEventListener("keydown", handleEscClose);
  });

  return (
    <div
      className={`popup popup_type-${name} 
    ${isOpen ? "popup_opened" : ""}`}
    onClick={onClose}
    >
      <figure 
      className="popup__img-box"
      onClick={(evt) => evt.stopPropagation()}
      >
        <img 
        className="popup__img-max" 
        src={card.link} 
        alt={card.name} 
        />
        <figcaption className="popup__img-title">{card.name}</figcaption>
        <button className="popup__btn-close" type="button">
          <img
            className="popup__btn-close-pic"
            src={closeIcon}
            alt="Закрыть"
            onClick={onClose}
          />
        </button>
      </figure>
    </div>
  );
}

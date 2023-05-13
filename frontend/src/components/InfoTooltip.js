import luck from "../images/luck.svg";
import fatal from "../images/fatal.svg";
import closeIcon from "../images/Close_Icon.png";
import { useEffect } from "react";

export default function InfoTooltip({ isOpen, onClose, luckRegister }) {
  //закрытие по esc
  function handleEscClose(evt) {
    evt.key === "Escape" && onClose();
  }

  useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  });

  return (
    <div
      className={`popup popup_type-infoTooltip 
  ${isOpen ? "popup_opened" : ""}`}
      onClick={onClose}
    >
      <div
        className="popup__container popup__container_type-light"
        onClick={(evt) => evt.stopPropagation()}    
      >
        <button className="popup__btn-close_type-light" type="button">
          <img
            className="popup__btn-close-pic"
            src={closeIcon}
            alt="Закрыть"
            onClick={onClose}
          />
        </button>
        <div className="popup__box-luckRegister">
        <img 
          className="popup__pic-luckRegister"
          src={luckRegister ? luck : fatal}
          alt={
            luckRegister
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."
          }
        />
        <h2 className="popup__title popup__title_type-light"
        >
          {luckRegister
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
        </div>
      </div>
    </div>
  );
}

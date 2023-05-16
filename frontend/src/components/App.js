import { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import ProtectedRouteElement from "./ProtectedRoute";

import api from "../utils/api";
import auth from "../utils/auth.js";

import CurrentUserContext from "../contexts/CurrentUserContext";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";

import InfoTooltip from "./InfoTooltip";

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDataCards, setDataCards] = useState({});
  const [chooseCard, setChooseCard] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [emailUserHeader, setEmailUserHeader] = useState("");

  const navigate = useNavigate();

  const [luckRegister, setLuckRegister] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);

  //авторизация
  function handleLogin(dataLog) {
    auth
      .login(dataLog.email, dataLog.password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          navigate("/");
        }
      })
      .catch((err) => {
        setLuckRegister(false);
      setInfoTooltipPopupOpen(true);
        console.log(err);
      });
  }

  //регистрация
  function handleRegister(dataReg) {
    auth
    .register(dataReg.email, dataReg.password)
    .then((data) => {
      if (data) {
        console.log("reg");
        setLoggedIn(true);
        navigate("/signin");
        setLuckRegister(true);
        setInfoTooltipPopupOpen(true)
      }
    })
    .catch((err) => {
      setLuckRegister(false);
      setInfoTooltipPopupOpen(true)
      console.log(err);
    });
    
  }

  //сверим токен и авторизацию
  function handleToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmailUserHeader(res.email);
            navigate("/");
            console.log("token");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  useEffect(() => {
    handleToken();
  }, [loggedIn]);

  //выход
  function handleExit() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/signin");
  }

  //смена аватара
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  //смена профиля
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  //добавление новой карточки
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  //посмотреть карточку поближе:)
  const handleShowСardClick = (card) => {
    setChooseCard(true);
    setDataCards(card);
  };

  // 1.Есть лайк? 2. запрос в апи на обновление
  function handleCardLike(card) {
    const isLiked = card.likes.some(
      (selectedCard) => selectedCard._id === currentUser._id
    );
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((selectedCard) =>
            selectedCard._id === card._id ? newCard : selectedCard
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //удаляем карточку
  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(() =>
          cards.filter((selectedCard) => selectedCard._id !== card._id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //все закрой
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setChooseCard(null);
    setInfoTooltipPopupOpen(false);
  }

  //грузим карточки и инфо пользователя с сервера
  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserData(), api.getAllCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  //меняем инфо пользователя
  function handleUpdateUser(data) {
    api
      .changeUserData(data)
      .then(setCurrentUser, closeAllPopups())
      .catch((err) => {
        console.log(err);
      });
  }

  //меняем аватарку
  function handleUpdateUserAvatar(data) {
    api
      .changeAvatar(data)
      .then(setCurrentUser, closeAllPopups())
      .catch((err) => {
        console.log(err);
      });
  }
  //
  function handleAddPlaceSubmit(data) {
    api
      .createNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //разметка
  return (
    <div>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header 
          onExit={handleExit} 
          email={emailUserHeader} 
          />
          <Routes>
            <Route path="/signin" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Register onRegister={handleRegister} />}/>
            <Route
              path="/"
              element={
                <ProtectedRouteElement
                  element={Main}
                  loggedIn={loggedIn}
                  changeAvatar={handleEditAvatarClick}
                  changeProfile={handleEditProfileClick}
                  addPlace={handleAddPlaceClick}
                  cards={cards}
                  showСard={handleShowСardClick}
                  onCardDelete={handleCardDelete}
                  onCardLike={handleCardLike}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatarUser={handleUpdateUserAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          btnText="Да"
        ></PopupWithForm>

        <ImagePopup
          name="img"
          card={isDataCards}
          isOpen={chooseCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            luckRegister={luckRegister}  />
      </CurrentUserContext.Provider>
    </div>
  );
}

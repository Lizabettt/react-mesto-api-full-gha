class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  //проверка на выполнение
  _result(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  //получаем данные пользователя
  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._result(res));
  }

  //получаем все карочки с сервера
  getAllCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._result(res));
  }

  //меняем имя пользователя
  changeUserData(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._result(res));
  }

  //меняем аватарку
  changeAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._result(res));
  }

  //отправляем новую карточку на сервер
  //данные берем из попапа добавления новой карточки
  createNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._result(res));
  }

  //удаление карточки
  deleteCard(idCard) {
    return fetch(`${this._url}/cards/${idCard}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._result(res));
  }

  //лайк?
  changeLikeCardStatus(idCard, isLiked) {
    return fetch(`${this._url}/cards/likes/${idCard}`, {
      method: !isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    }).then((res) => this._result(res));
  }
}
const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-58",
  headers: {
    authorization: "5e82f2f9-4ad1-4820-bbab-0c86035a81ab",
    "Content-Type": "application/json",
  },
});

export default api;

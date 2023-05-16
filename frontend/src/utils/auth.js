class Auth {
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
  //авторизация
  login(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then((res) => this._result(res));
  }cd
  //регистрация
  register(email, password) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then((res) => this._result(res));
  }
  //токен
  getToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._result(res));
  }
}
const auth = new Auth({
  url: "https://api.mesto-kuskova.nomoredomains.monster",
  headers: {
    "Content-Type": "application/json",
  },
});

export default auth;

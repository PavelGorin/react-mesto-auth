class Api {
  constructor({ baseUrl, token, loginUrl }) {
    this._baseUrl = baseUrl;
    this._token = token;
    //   this._headers = headers;
    this._loginUrl = loginUrl;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, { headers: { authorization: this._token } })
      .then(res => this._getResponseData(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: { authorization: this._token } })
      .then(res => this._getResponseData(res));
  }

  setUserInfo(title, subtitle) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: title,
        about: subtitle
      })
    })
      .then(res => this._getResponseData(res));
  }

  sendNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => this._getResponseData(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: { authorization: this._token }
    })
      .then(res => this._getResponseData(res));
  }

  setLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: { authorization: this._token }
    })
      .then(res => this._getResponseData(res));
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: { authorization: this._token }
    })
      .then(res => this._getResponseData(res));
  }

  updateAvatar(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
      .then(res => this._getResponseData(res));
  }

  handleError(err) {
    console.error(err);
  }

  registration({ email, password }) {
    return fetch(`${this._loginUrl}signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        { email, password }
      )
    })
      .then(res => {
        return this._getResponseData(res);
      })
  }

  login({ email, password }) {
    return fetch(`${this._loginUrl}signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        { email, password }
      )
    })
      .then(res => {
        return this._getResponseData(res);
      })
  }

  checkToken(token) {
    return fetch(`${this._loginUrl}users/me`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => {
        return this._getResponseData(res);
      })
  }

}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
  token: '534a01fb-4115-4a8d-993b-e26c3c7e9d82',
  loginUrl: 'https://auth.nomoreparties.co/',
});

export default api;
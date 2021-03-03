class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
      .then(res => this._getResponseData(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
      .then(res => this._getResponseData(res));
  }

  setUserInfo(title, subtitle) {
    return fetch(`${this._baseUrl}/users/me`, { 
      method: 'PATCH',
      headers: this._headers,
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
      headers: this._headers,
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
      headers: this._headers
    })
    .then(res => this._getResponseData(res));
  }

  setLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(res => this._getResponseData(res));
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._getResponseData(res));
  }

  updateAvatar(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, { 
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
      .then(res => this._getResponseData(res));
  }

  handleError(err) {
    console.error(err);
  }

}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
  headers: {
    authorization: '534a01fb-4115-4a8d-993b-e26c3c7e9d82',
    'Content-Type': 'application/json'
  }
});

export default api;
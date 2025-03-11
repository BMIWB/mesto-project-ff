const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-33',
  headers: {
    authorization: '77fa157e-52f2-456e-826c-823bfeed0a26',
    'Content-Type': 'application/json'
  }
};

// Проверка ответа сервера
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// Загрузка информации о пользователе с сервера
export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
}

// Загрузка карточек с сервера
export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
}

// Редактирование профиля
export function updateUserInfo(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then(checkResponse);
}

// Добавление новой карточки
export function addNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(checkResponse);
}

// Удаление карточки
export function deleteCards(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(checkResponse);
}

// Постановка лайка
export function likeCards(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
    method: 'PUT',
    headers: config.headers,
  }).then(checkResponse);
}

// Снятие лайка
export function unlikeCards(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(checkResponse);
}

//Обновление аватара пользователя
export function updateAvatar(avatarUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  }).then(checkResponse);
}
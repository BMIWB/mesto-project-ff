// Обработка лайка карточки
function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

// Удаление карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// Создание карточки
function createCard(cardData, { deleteCard, likeCard, handleImageClick }) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  // Данные карточки
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Обработчик клика на кнопку лайка
  likeButton.addEventListener('click', () => {
    likeCard(likeButton); // Вызываем переданную функцию для обработки лайка
  });

  // Обработчик клика на кнопку удаления
  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement); // Вызываем переданную функцию для удаления карточки
  });

  // Обработчик клика по изображению
  cardImage.addEventListener('click', () => {
    handleImageClick(cardData); // Вызываем переданную функцию для обработки клика по изображению
  });

  return cardElement;
}

export { createCard, likeCard, deleteCard };
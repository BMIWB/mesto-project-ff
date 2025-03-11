import { likeCards, unlikeCards, deleteCards } from '../components/api';

// Функция удаления карточки
export function handleDeleteClick(cardId, cardElement) {
  deleteCards(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => console.error(`Ошибка при удалении карточки: ${err}`));
}

// Функция обработки лайка
export function handleLikeClick(cardId, likeButton, likesContainer) {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    unlikeCards(cardId)
      .then((updatedCard) => {
        likeButton.classList.remove('card__like-button_is-active');
        likesContainer.textContent = updatedCard.likes.length;
      })
      .catch((err) => console.error(`Ошибка при удалении лайка: ${err}`));
  } else {
    likeCards(cardId)
      .then((updatedCard) => {
        likeButton.classList.add('card__like-button_is-active');
        likesContainer.textContent = updatedCard.likes.length;
      })
      .catch((err) => console.error(`Ошибка при добавлении лайка: ${err}`));
  }
}

// Создание карточки
export function createCard(cardData, userId, { handleDeleteClick, handleLikeClick, handleImageClick }) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likesContainer = cardElement.querySelector('.card__like-count');

  cardImage.src = cardData.link;
  cardImage.alt = `Изображение ${cardData.name}`;
  cardTitle.textContent = cardData.name;
  likesContainer.textContent = cardData.likes.length || 0;

  if (cardData.likes.some((user) => user._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', () => {
    handleLikeClick(cardData._id, likeButton, likesContainer);
  });

  if (cardData.owner._id === userId) {
    deleteButton.addEventListener('click', () => {
      handleDeleteClick(cardData._id, cardElement);
    });
  } else {
    deleteButton.remove();
  }

  cardImage.addEventListener('click', () => {
    handleImageClick(cardData);
  });

  return cardElement;
}
// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// Исходный массив карточек

const cardTemplate = document.querySelector('#card-template').content;

const cardContainer = document.querySelector('.places__list');

function createCard(cardData, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);
  
  return cardElement;
}

function deleteCard(event) {
  event.target.closest('.card').remove();
}

initialCards.forEach((dataCard) => {
  const cardElement = createCard(dataCard, deleteCard);
  cardContainer.append(cardElement);
});
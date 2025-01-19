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
  const cardImage = cardElement.querySelector('.card__image');
  
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardElement.querySelector('.card__title').textContent = cardData.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  
  deleteButton.addEventListener('click', () => deleteCard(cardElement));

  return cardElement;
}

function deleteCard(card) { 
  card.remove(); 
}

initialCards.forEach((dataCard) => {
  const cardElement = createCard(dataCard, deleteCard);
  cardContainer.append(cardElement);
});
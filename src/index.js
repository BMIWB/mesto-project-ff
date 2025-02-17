// Импорты
import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, likeCard, deleteCard } from './components/card.js';
import { openModal, closeModal, closeModalOnOverlayClick, addCloseButtonHandler } from './components/modal.js';

// DOM-узлы

// Карточки
const cardList = document.querySelector('.places__list'); // Контейнер для карточек

// Редактирование профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const profileForm = profilePopup.querySelector('.popup__form');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Добавление карточек
const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');
const addCardForm = addCardPopup.querySelector('.popup__form');
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');

// Попап изображения
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

// Функции

// Обработка клика по изображению карточки
function handleImageClick(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(imagePopup);
}

// Рендеринг карточек
function renderCards() {
  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, {
      likeCard,
      deleteCard,
      handleImageClick,
    });
    cardList.append(cardElement);
  });
}

// Слушатели событий

// Открытие попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profilePopup);
});

// Обработчик отправки формы редактирования профиля
profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profilePopup);
});

// Открытие попапа добавления карточки
addCardButton.addEventListener('click', () => {
  openModal(addCardPopup);
});

// Обработчик отправки формы добавления карточки
addCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCard = createCard(
    {
      name: cardNameInput.value,
      link: cardLinkInput.value,
    },
    {
      likeCard,
      deleteCard,
      handleImageClick,
    }
  );
  cardList.prepend(newCard);
  closeModal(addCardPopup);
  addCardForm.reset();
});

// Закрытие попапа кликом на оверлей
closeModalOnOverlayClick(profilePopup);
closeModalOnOverlayClick(addCardPopup);
closeModalOnOverlayClick(imagePopup);

// Обработчики для кнопок закрытия
addCloseButtonHandler(profilePopup);
addCloseButtonHandler(addCardPopup);
addCloseButtonHandler(imagePopup);

// Инициализация
renderCards();

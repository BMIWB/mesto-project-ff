// Импорты
import './pages/index.css';
import { createCard, handleLikeClick, handleDeleteClick } from './components/card.js';
import { openModal, closeModal, closeModalOnOverlayClick, addCloseButtonHandler } from './components/modal.js';
import { enableValidation, clearValidation, validationConfig } from './components/validation.js';
import {
  getUserInfo,
  getCards,
  updateUserInfo,
  addNewCard,
  updateAvatar
} from './components/api.js';

// --- DOM-узлы ---
const cardList = document.querySelector('.places__list');

// Профиль
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const profileForm = profilePopup.querySelector('.popup__form');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const activityInput = profileForm.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileSaveButton = profileForm.querySelector('.popup__button');

// Карточки
const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');
const addCardForm = addCardPopup.querySelector('.popup__form');
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');
const addSaveButton = addCardForm.querySelector('.popup__button');

// Аватар
const profileAvatar = document.querySelector('.profile__image');
const avatarPopup = document.querySelector('.popup_type_update-avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarInput = avatarForm.querySelector('.popup__input_type_avatar-url');
const avatarSaveButton = avatarForm.querySelector('.popup__button');

// Попап изображения
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

// Коллекция попапов
const popups = document.querySelectorAll('.popup');

let userId;

// --- Функции ---

function handleImageClick(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(imagePopup);
}

function renderCards(cards) {
  cards.forEach((cardData) => {
    const cardElement = createCard(cardData, userId, { handleDeleteClick, handleLikeClick, handleImageClick });
    cardList.append(cardElement);
  });
}

function openProfilePopup() {
  clearValidation(profileForm, validationConfig);
  nameInput.value = profileName.textContent;
  activityInput.value = profileDescription.textContent;
  openModal(profilePopup);
}

function openAvatarPopup() {
  clearValidation(avatarForm, validationConfig);
  openModal(avatarPopup);
}

// --- Слушатели событий ---

// Редактирование профиля
profileEditButton.addEventListener('click', openProfilePopup);
profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileSaveButton.textContent = 'Сохранение...';
  updateUserInfo(nameInput.value, activityInput.value)
    .then((userData) => {
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(profilePopup);
    })
    .catch((err) => console.error(`Ошибка при обновлении профиля: ${err}`))
    .finally(() => {
      profileSaveButton.textContent = 'Сохранить';
    });
});

// Добавление карточки
addCardButton.addEventListener('click', () => openModal(addCardPopup));
addCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addSaveButton.textContent = 'Сохранение...';
  addNewCard(cardNameInput.value, cardLinkInput.value)
    .then((cardData) => {
      const cardElement = createCard(cardData, userId, { handleDeleteClick, handleLikeClick, handleImageClick });
      cardList.prepend(cardElement);
      closeModal(addCardPopup);
      addCardForm.reset();
    })
    .catch((err) => console.error(`Ошибка при добавлении карточки: ${err}`))
    .finally(() => {
      addSaveButton.textContent = 'Сохранить';
    });
});

// Обновление аватара
profileAvatar.addEventListener('click', openAvatarPopup);
avatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  avatarSaveButton.textContent = 'Сохранение...';
  updateAvatar(avatarInput.value)
    .then((userData) => {
      profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(avatarPopup);
      avatarForm.reset();
    })
    .catch((err) => console.error(`Ошибка при обновлении аватара: ${err}`))
    .finally(() => {
      avatarSaveButton.textContent = 'Сохранить';
    });
});

// Закрытие попапов
popups.forEach((popup) => {
  addCloseButtonHandler(popup);
  closeModalOnOverlayClick(popup);
});

// --- Инициализация ---
const getInfo = async () => {
  try {
    const [userData, cards] = await Promise.all([getUserInfo(), getCards()]);
    userId = userData._id;
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    renderCards(cards);
  } catch (err) {
    console.error(`Ошибка при загрузке данных: ${err}`);
  }
};

enableValidation(validationConfig);
getInfo();

// Открытие модального окна
function openModal(modal) {
  modal.classList.add('popup_is-animated');
  document.addEventListener('keydown', handleEscClose);
  setTimeout(() => {
      modal.classList.add('popup_is-opened');
  }, 0);
}

// Закрытие модального окна
function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
  modal.addEventListener('transitionend', function handleTransitionEnd() {
      modal.classList.remove('popup_is-animated');
      modal.removeEventListener('transitionend', handleTransitionEnd);
  });
}

// Обработка закрытия модального окна клавишей Esc
function handleEscClose(evt) {
  if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) {
          closeModal(openedPopup);
      }
  }
}

// Закрытие модального окна при клике на оверлей
function closeModalOnOverlayClick(modal) {
  modal.addEventListener('mousedown', (evt) => {
      if (evt.target === modal) {
          closeModal(modal);
      }
  });
}

// Добавление обработчика закрытия модального окна кнопкой
function addCloseButtonHandler(modal) {
  const closeButton = modal.querySelector('.popup__close');
  closeButton.addEventListener('click', () => closeModal(modal));
}

export {openModal, closeModal, closeModalOnOverlayClick, addCloseButtonHandler}
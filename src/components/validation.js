const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  name: {
    minLength: 2,
    maxLength: 40,
    regex: /^[a-zA-Zа-яА-ЯёЁ\s-]+$/
  },
  description: {
    minLength: 2,
    maxLength: 200,
  },
  'place-name': {
    minLength: 2,
    maxLength: 30,
  },
  link: {
    regex: /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/
  },
  'avatar': {
    regex: /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/
  }
};

function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.name}`);
  if (!errorElement) return;
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.name}`);
  if (!errorElement) return;
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
}

function checkInputValidity(formElement, inputElement, config) {
  const fieldConfig = config[inputElement.name]
  if (fieldConfig) {
    if (inputElement.type === 'url' && fieldConfig.regex && !inputElement.value.match(fieldConfig.regex)) {
      showInputError(formElement, inputElement, 'Введите адрес сайта', config);
      return;
    } else if (inputElement.value.length === 0) {
      showInputError(formElement, inputElement, 'Вы пропустили это поле', config);
      return;
    } else if (inputElement.value.length < fieldConfig.minLength) {
      showInputError(
        formElement,
        inputElement,
        `Минимальное число символов: ${fieldConfig.minLength}. Длина текста: ${inputElement.value.length}`,
        config
      );
      return;
    } else if (inputElement.value.length > fieldConfig.maxLength) {
      showInputError(
        formElement,
        inputElement,
        `Максимальное число символов: ${fieldConfig.maxLength}. Длина текста: ${inputElement.value.length}`,
        config
      );
      return;
    } else if (fieldConfig.regex && !inputElement.value.match(fieldConfig.regex)) {
      showInputError(formElement, inputElement, 'Неверный формат. Используйте только латинские или кириллические буквы, пробелы и дефисы.', config);
      return;
    }
    hideInputError(formElement, inputElement, config);
  }
}

function toggleButtonState(inputList, buttonElement, config) {
  const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid);
  if (hasInvalidInput) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });
  toggleButtonState(inputList, buttonElement, config);
}

export { enableValidation, clearValidation, validationConfig };
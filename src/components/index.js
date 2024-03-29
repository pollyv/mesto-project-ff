import "../styles/index.css";
import { createCard, deleteCard, addLike } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { clearValidation, enableValidation } from "./validation.js";
import {
  patchServerProfile,
  postServerCard,
  patchServerAvatar,
  getServerProfile,
  getServerCards,
} from "./api.js";

// переименованы переменные

const cardsList = document.querySelector(".places__list");
const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button"); // тут

const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

const popupBigImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const profileUserTitle = document.querySelector(".profile__title");
const profileUserDescription = document.querySelector(".profile__description");
const profileUserImage = document.querySelector(".profile__image");

const formEditProfile = document.forms["edit-profile"]; //тут
const formAddCard = document.forms["new-place"]; // тут

const formEditAvatar = document.forms["edit-avatar"]; // здесь
const avatarInputFormLink = document.forms["edit-avatar"]["link-avatar"]; // вот здесь

const profileNameInput = formEditProfile.name; // тут тоже
const profileDescriptionInput = formEditProfile.description; // и здесь

const newCardInputName = formAddCard["place-name"]; // эта тоже
const newCardInputUrl = formAddCard.link; // и вот эта

const buttonEditAvatar = document.querySelector(".profile__image-edit-button");
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button-inactive",
  inputErrorClass: "popup__input-type-error",
  errorClass: "popup__input-error-active",
};

function addCard(cardElement) {
  cardsList.prepend(cardElement);
}

formAddCard.addEventListener("submit", handleCardFormSubmit);

formEditProfile.addEventListener("submit", handleProfileFormSubmit);

buttonOpenPopupProfile.addEventListener("click", function () {
  profileNameInput.value = profileUserTitle.textContent;
  profileDescriptionInput.value = profileUserDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  openPopup(popupEdit);
});

buttonAddCard.addEventListener("click", function () {
  openPopup(popupAddCard);
});

buttonEditAvatar.addEventListener("click", function () {
  openPopup(popupEditAvatar);
});

formEditAvatar.addEventListener("submit", editAvatarFormSubmit);

function viewFullImage(evt) {
  openPopup(popupImage);
  popupBigImage.src = evt.target.closest(".card__image").src;
  popupBigImage.alt = evt.target.closest(".card__image").alt;
  popupCaption.textContent = evt.target.closest(".card__image").alt;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const button = evt.target.querySelector(".popup__button");
  button.textContent = "Сохранение...";
  patchServerProfile(profileNameInput, profileDescriptionInput)
    .then(() => {
      profileUserTitle.textContent = profileNameInput.value;
      profileUserDescription.textContent = profileDescriptionInput.value;
      clearValidation(formEditProfile, validationConfig);
      closePopup(popupEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = "Сохранить";
    });
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const item = {};
  item.likes = new Array();
  item.name = newCardInputName.value;
  item.link = newCardInputUrl.value;

  const button = evt.target.querySelector(".popup__button");
  button.textContent = "Сохранение...";

  postServerCard(item)
    .then((result) => {
      const cardElement = createCard(
        result,
        profileUserTitle,
        deleteCard,
        addLike,
        viewFullImage
      );
      addCard(cardElement);
      formAddCard.reset();
      clearValidation(formAddCard, validationConfig);
      closePopup(popupAddCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = "Сохранить";
    });
}

function editAvatarFormSubmit(evt) {
  evt.preventDefault();

  const button = evt.target.querySelector(".popup__button");
  button.textContent = "Сохранение...";

  patchServerAvatar(avatarInputFormLink.value)
    .then(() => {
      profileUserImage.style.backgroundImage =
        "url(" + avatarInputFormLink.value + ")";
      formEditAvatar.reset();
      clearValidation(formEditAvatar, validationConfig);
      closePopup(popupEditAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = "Сохранить";
    });
}

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

enableValidation(validationConfig);

// удален fetchProfile с первой итерации

Promise.all([getServerProfile(), getServerCards()])
  .then((results) => {
    profileUserTitle.textContent = results[0]["name"];
    profileUserTitle._id = results[0]["_id"];
    profileUserDescription.textContent = results[0]["about"];
    profileUserImage.style.backgroundImage =
      "url(" + results[0]["avatar"] + ")";
    results[1].reverse();
    results[1].forEach((element) => {
      const cardElement = createCard(
        element,
        profileUserTitle,
        deleteCard,
        addLike,
        viewFullImage
      );
      addCard(cardElement);
    });
  })
  .catch((err) => {
    console.log(err);
  });

export { addCard };

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

const cardsList = document.querySelector(".places__list");
const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

const popupBigImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const profileUserTitle = document.querySelector(".profile__title");
const profileUserDescription = document.querySelector(".profile__description");
const profileUserImage = document.querySelector(".profile__image");

const editProfileForm = document.forms["edit-profile"];
const addCardForm = document.forms["new-place"];

const editAvatarForm = document.forms["edit-avatar"];
const inputAvatarFormLink = document.forms["edit-avatar"]["link-avatar"];

const inputProfileName = editProfileForm.name;
const inputProfileDescription = editProfileForm.description;

const inputNameNewCard = addCardForm["place-name"];
const inputUrlNewCard = addCardForm.link;

const editAvatarButton = document.querySelector(".profile__image-edit-button");
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

addCardForm.addEventListener("submit", handleCardFormSubmit);

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

buttonOpenPopupProfile.addEventListener("click", function () {
  inputProfileName.value = profileUserTitle.textContent;
  inputProfileDescription.value = profileUserDescription.textContent;
  clearValidation(editProfileForm, validationConfig);
  openPopup(popupEdit);
});

addCardButton.addEventListener("click", function () {
  openPopup(popupAddCard);
});

editAvatarButton.addEventListener("click", function () {
  openPopup(popupEditAvatar);
});

editAvatarForm.addEventListener("submit", editAvatarFormSubmit);

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
  patchServerProfile(inputProfileName, inputProfileDescription)
    .then(() => {
      profileUserTitle.textContent = inputProfileName.value;
      profileUserDescription.textContent = inputProfileDescription.value;
      clearValidation(editProfileForm, validationConfig);
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
  item.name = inputNameNewCard.value;
  item.link = inputUrlNewCard.value;

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
      addCardForm.reset();
      clearValidation(addCardForm, validationConfig);
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

  patchServerAvatar(inputAvatarFormLink.value)
    .then(() => {
      profileUserImage.style.backgroundImage =
        "url(" + inputAvatarFormLink.value + ")";
      editAvatarForm.reset();
      clearValidation(editAvatarForm, validationConfig);
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

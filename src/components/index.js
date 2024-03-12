import "../styles/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard, addLike } from "./card.js";
import {
  openPopup,
  closePopup,
  closePopupButton,
  closePopupByOverlay,
} from "./modal.js";

const cardsList = document.querySelector(".places__list");

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupBigImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popupCloseButtons = document.querySelectorAll(".popup__close");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const editProfileForm = document.forms["edit-profile"];
const addCardForm = document.forms["new-place"];

const inputProfileName = editProfileForm.name;
const inputProfileDescription = editProfileForm.description;

const inputNameNewCard = addCardForm["place-name"];
const inputUrlNewCard = addCardForm.link;

function addCard(cardElement) {
  cardsList.prepend(cardElement);
}

initialCards.forEach(function (element) {
  const cardElement = createCard(element, deleteCard, addLike, viewFullImage);
  addCard(cardElement);
});

addCardForm.addEventListener("submit", handleCardFormSubmit);
editProfileForm.addEventListener("submit", handleProfileFormSubmit);

editProfileButton.addEventListener("click", function () {
  inputProfileName.value = profileTitle.textContent;
  inputProfileDescription.value = profileDescription.textContent;
  openPopup(popupEdit);
});

addCardButton.addEventListener("click", function () {
  openPopup(popupAddCard);
});

function viewFullImage(evt) {
  openPopup(popupImage);
  popupBigImage.src = evt.target.closest(".card__image").src;
  popupBigImage.alt = evt.target.closest(".card__image").alt;
  popupCaption.textContent = evt.target.closest(".card__image").alt;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;
  closePopup(popupEdit);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const item = {};
  item.name = inputNameNewCard.value;
  item.link = inputUrlNewCard.value;
  const cardElement = createCard(item, deleteCard, addLike, viewFullImage);
  addCard(cardElement);
  addCardForm.reset();
  closePopup(popupAddCard);
}

popupCloseButtons.forEach(function (item) {
  item.addEventListener("click", closePopupButton);
});

popups.forEach(function (item) {
  item.addEventListener("click", closePopupByOverlay);
});

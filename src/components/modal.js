export { openPopup, closePopup, closePopupButton, closePopupByOverlay };

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEscape);
}

function closePopupButton(evt) {
  if (evt.target === evt.target.closest(".popup__close")) {
    const popup = document.querySelector(".popup_is-opened");
    closePopup(popup);
  }
}

function closePopupByEscape(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closePopup(popup);
  }
}

function closePopupByOverlay(evt) {
  const popup = document.querySelector(".popup_is-opened");
  if (popup === evt.target) {
    closePopup(popup);
  }
}

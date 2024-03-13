function openPopup(popup) {
  popup.classList.add("popup_is-animated");
  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 1);
  document.addEventListener("keydown", closePopupByEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEscape);
}

function closePopupButton(evt) {
  const closeIcon = evt.target.closest(".popup__close");
  if (evt.target === closeIcon) {
    const popup = closeIcon.closest(".popup_is-opened");
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
  if (evt.target.classList.contains("popup_is-opened")) {
    closePopup(evt.target);
  }
}

export { openPopup, closePopup, closePopupButton, closePopupByOverlay };

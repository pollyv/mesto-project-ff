function openPopup(popup) {
  // добавила этот класс в разметку, тут закомментировала
  // popup.classList.add("popup_is-animated");
  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 1);
  document.addEventListener("keydown", closePopupByEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEscape);
}

function closePopupByEscape(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closePopup(popup);
  }
}

export { openPopup, closePopup, closePopupByEscape };

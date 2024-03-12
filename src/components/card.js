const cardTemplate = document.querySelector("#card-template").content;

function createCard(item, deleteCard, addLike, viewFullImage) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardElement.querySelector(".card__title").textContent = item.name;
  deleteButton.addEventListener("click", () => {
    deleteCard(deleteButton);
  });
  likeButton.addEventListener("click", addLike);
  cardImage.addEventListener("click", viewFullImage);
  return cardElement;
}

function deleteCard(button) {
  button.closest(".card").remove();
}

function addLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, addLike };

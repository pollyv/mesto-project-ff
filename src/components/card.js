//импорт элемента профиля с предыдущей итерации удален
import { deleteServerCard, addServerLike, deleteServerLike } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;

function createCard(
  item,
  profileUserTitle,
  deleteCard,
  addLike,
  viewFullImage
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeSum = cardElement.querySelector(".card__like-sum");
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardElement._id = item._id;
  cardElement.owner_id = item.owner._id;
  likeSum.textContent = item.likes.length;

  item.likes.forEach(function (obj) {
    if (obj["_id"] === profileUserTitle["_id"]) {
      likeButton.classList.add("card__like-button_is-active");
    }
  });
  cardElement.querySelector(".card__title").textContent = item.name;
  deleteButton.addEventListener("click", function () {
    deleteCard(deleteButton);
  });
  if (!(cardElement.owner_id === profileUserTitle._id)) {
    deleteButton.remove();
  }
  likeButton.addEventListener("click", addLike);
  cardImage.addEventListener("click", viewFullImage);
  return cardElement;
}

// при успехе запроса вызывается метод удаления (с первой итерации)
function deleteCard(button) {
  const card = button.closest(".card");
  deleteServerCard(card)
    .then(() => {
      card.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

// при успехе запроса вызывается метод удаления (с первой итерации)
function addLike(evt) {
  const likeButton = evt.target;
  const card = likeButton.closest(".card");
  if (!likeButton.classList.contains("card__like-button_is-active")) {
    addServerLike(card)
      .then((result) => {
        likeButton.classList.toggle("card__like-button_is-active");
        const likeSum = card.querySelector(".card__like-sum");
        likeSum.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    deleteServerLike(card)
      .then((result) => {
        likeButton.classList.toggle("card__like-button_is-active");
        const likeSum = card.querySelector(".card__like-sum");
        likeSum.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export { createCard, deleteCard, addLike };

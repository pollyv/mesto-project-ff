const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-9",
  headers: {
    authorization: "cae6b17f-dc7c-4f62-be70-77791022effa",
    "Content-Type": "application/json",
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function getServerProfile() {
  return request(config["baseUrl"] + "/users/me", {
    headers: config["headers"],
  });
}

function getServerCards() {
  return request(config["baseUrl"] + "/cards", {
    headers: config["headers"],
  });
}

function patchServerProfile(inputProfileName, inputProfileDescription) {
  return request(config["baseUrl"] + "/users/me", {
    method: "PATCH",
    headers: config["headers"],
    body: JSON.stringify({
      name: inputProfileName.value,
      about: inputProfileDescription.value,
    }),
  });
}

function postServerCard(item) {
  return request(config["baseUrl"] + "/cards", {
    method: "POST",
    headers: config["headers"],
    body: JSON.stringify({
      name: item.name,
      link: item.link,
    }),
  });
}

function deleteServerCard(item) {
  return request(config["baseUrl"] + "/cards/" + item["_id"], {
    method: "DELETE",
    headers: config["headers"],
  });
}

function addServerLike(item) {
  return request(config["baseUrl"] + "/cards/likes/" + item["_id"], {
    method: "PUT",
    headers: config["headers"],
  });
}

function deleteServerLike(item) {
  return request(config["baseUrl"] + "/cards/likes/" + item["_id"], {
    method: "DELETE",
    headers: config["headers"],
  });
}

function patchServerAvatar(link) {
  return request(config["baseUrl"] + "/users/me/avatar", {
    method: "PATCH",
    headers: config["headers"],
    body: JSON.stringify({
      avatar: link,
    }),
  });
}

export {
  getServerProfile,
  getServerCards,
  patchServerProfile,
  postServerCard,
  deleteServerCard,
  addServerLike,
  deleteServerLike,
  patchServerAvatar,
};

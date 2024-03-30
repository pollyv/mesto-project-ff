(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-9",headers:{authorization:"cae6b17f-dc7c-4f62-be70-77791022effa","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))}function n(e,n){return fetch(e,n).then(t)}var o=document.querySelector("#card-template").content;function r(e,t,n,r,c){var a=o.querySelector(".card").cloneNode(!0),i=a.querySelector(".card__image"),u=a.querySelector(".card__delete-button"),s=a.querySelector(".card__like-button"),l=a.querySelector(".card__like-sum");return i.src=e.link,i.alt=e.name,a._id=e._id,a.owner_id=e.owner._id,l.textContent=e.likes.length,e.likes.forEach((function(e){e._id===t._id&&s.classList.add("card__like-button_is-active")})),a.querySelector(".card__title").textContent=e.name,u.addEventListener("click",(function(){n(u)})),a.owner_id!==t._id&&u.remove(),s.addEventListener("click",r),i.addEventListener("click",c),a}function c(t){var o,r=t.closest(".card");(o=r,n(e.baseUrl+"/cards/"+o._id,{method:"DELETE",headers:e.headers})).then((function(){r.remove()})).catch((function(e){console.log(e)}))}function a(t){var o,r=t.target,c=r.closest(".card");r.classList.contains("card__like-button_is-active")?function(t){return n(e.baseUrl+"/cards/likes/"+t._id,{method:"DELETE",headers:e.headers})}(c).then((function(e){r.classList.toggle("card__like-button_is-active"),c.querySelector(".card__like-sum").textContent=e.likes.length})).catch((function(e){console.log(e)})):(o=c,n(e.baseUrl+"/cards/likes/"+o._id,{method:"PUT",headers:e.headers})).then((function(e){r.classList.toggle("card__like-button_is-active"),c.querySelector(".card__like-sum").textContent=e.likes.length})).catch((function(e){console.log(e)}))}function i(e){setTimeout((function(){e.classList.add("popup_is-opened")}),1),document.addEventListener("keydown",s)}function u(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",s)}function s(e){"Escape"===e.key&&u(document.querySelector(".popup_is-opened"))}function l(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));o&&(t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent="")}function d(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(n.removeAttribute("disabled",!1),n.classList.remove(t.inactiveButtonClass)):(n.setAttribute("disabled",!0),n.classList.add(t.inactiveButtonClass))}function p(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){return l(e,n,t)})),d(n,t,o)}var _=document.querySelector(".places__list"),f=document.querySelector(".profile__edit-button"),m=document.querySelector(".profile__add-button"),v=document.querySelectorAll(".popup"),y=document.querySelector(".popup_type_edit"),h=document.querySelector(".popup_type_new-card"),S=document.querySelector(".popup_type_image"),b=document.querySelector(".popup__image"),g=document.querySelector(".popup__caption"),q=document.querySelector(".profile__title"),k=document.querySelector(".profile__description"),C=document.querySelector(".profile__image"),E=document.forms["edit-profile"],L=document.forms["new-place"],x=document.forms["edit-avatar"],A=document.forms["edit-avatar"]["link-avatar"],w=E.name,U=E.description,T=L["place-name"],B=L.link,P=document.querySelector(".profile__image-edit-button"),D=document.querySelector(".popup_type_edit-avatar"),N={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button-inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"};function O(e){_.prepend(e)}function j(e){i(S),b.src=e.target.closest(".card__image").src,b.alt=e.target.closest(".card__image").alt,g.textContent=e.target.closest(".card__image").alt}L.addEventListener("submit",(function(t){t.preventDefault();var o={};o.likes=new Array,o.name=T.value,o.link=B.value;var i=t.target.querySelector(".popup__button");i.textContent="Сохранение...",function(t){return n(e.baseUrl+"/cards",{method:"POST",headers:e.headers,body:JSON.stringify({name:t.name,link:t.link})})}(o).then((function(e){O(r(e,q,c,a,j)),L.reset(),p(L,N),u(h)})).catch((function(e){console.log(e)})).finally((function(){i.textContent="Сохранить"}))})),E.addEventListener("submit",(function(t){t.preventDefault();var o=t.target.querySelector(".popup__button");o.textContent="Сохранение...",function(t,o){return n(e.baseUrl+"/users/me",{method:"PATCH",headers:e.headers,body:JSON.stringify({name:t.value,about:o.value})})}(w,U).then((function(){q.textContent=w.value,k.textContent=U.value,p(E,N),u(y)})).catch((function(e){console.log(e)})).finally((function(){o.textContent="Сохранить"}))})),f.addEventListener("click",(function(){w.value=q.textContent,U.value=k.textContent,p(E,N),i(y)})),m.addEventListener("click",(function(){i(h)})),P.addEventListener("click",(function(){i(D)})),x.addEventListener("submit",(function(t){t.preventDefault();var o,r=t.target.querySelector(".popup__button");r.textContent="Сохранение...",(o=A.value,n(e.baseUrl+"/users/me/avatar",{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:o})})).then((function(){C.style.backgroundImage="url("+A.value+")",x.reset(),p(x,N),u(D)})).catch((function(e){console.log(e)})).finally((function(){r.textContent="Сохранить"}))})),v.forEach((function(e){e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_is-opened")&&u(e),t.target.classList.contains("popup__close")&&u(e)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.error):t.setCustomValidity(""),t.validity.valid?l(e,t,n):function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),o.textContent=t.validationMessage,o.classList.add(n.errorClass)}(e,t,n)}(e,r,t),d(n,t,o)}))}))}(t,e)}))}(N),Promise.all([n(e.baseUrl+"/users/me",{headers:e.headers}),n(e.baseUrl+"/cards",{headers:e.headers})]).then((function(e){q.textContent=e[0].name,q._id=e[0]._id,k.textContent=e[0].about,C.style.backgroundImage="url("+e[0].avatar+")",e[1].reverse(),e[1].forEach((function(e){O(r(e,q,c,a,j))}))})).catch((function(e){console.log(e)}))})();
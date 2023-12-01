let cardsArray = [];
const list = document.querySelector('.todo-list');
let todoArray = [];

const API_BASE = 'https://fakestoreapi.com';

fetch(`${API_BASE}/users`)

  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log(json);
    createCards(json);
  })
  .catch((error) => {
    console.log(error);
  })


function createCards(arrayEl) {
  const main = document.body.querySelector('main');


  for (const element of arrayEl) {

    const arayFemaleName = ['miriam', 'kate'];
    const card = createHTMLel('div', main, 'card');
    cardsArray.push(new Card(card, element.id));
    card.addEventListener('click', selectCard, true);


    const cardContent = createHTMLel('div', card, 'card-content');

    const mainInfo = createHTMLel('div', cardContent, 'main-info');
    const userIcon = createHTMLel('img', mainInfo, 'user-icon');
    if (arayFemaleName.includes(String(element.name.firstname).toLowerCase())){
      userIcon.setAttribute('src', './assets/img/woman.png');
    }
    else{
    userIcon.setAttribute('src', './assets/img/man.png');
    }
    const userInfo = createHTMLel('div', mainInfo, 'user-info');
    const fullName = createHTMLel('div', userInfo, 'full-name');
    const firstName = createHTMLel('p', fullName, 'name');
    firstName.textContent = element.name.firstname;
    const lastName = createHTMLel('p', fullName, 'name');
    lastName.textContent = element.name.lastname;
    const password = createHTMLel('p', userInfo, 'password');
    password.textContent = 'password_ :' + element.password;

    const addInfo = createHTMLel('div', cardContent, 'addiction-info');
    const contacts = createHTMLel('div', addInfo, 'contacts');
    const wrapEmail = createHTMLel('div', contacts, 'wrap-contacts');
    const iconEmail = createHTMLel('img', wrapEmail, 'img-icon');
    iconEmail.setAttribute('src', './assets/img/mail.png');
    const email = createHTMLel('p', wrapEmail);
    email.textContent = element.email;
    const wrapPhone = createHTMLel('div', contacts, 'wrap-contacts');
    const iconPhone = createHTMLel('img', wrapPhone, 'img-icon');
    iconPhone.setAttribute('src', './assets/img/phone-call.png');
    const phone = createHTMLel('p', wrapPhone);
    phone.textContent = element.phone;
    const wrapLocation = createHTMLel('div', contacts, 'wrap-contacts');
    const iconLocation = createHTMLel('img', wrapLocation, 'img-icon');
    iconLocation.setAttribute('src', './assets/img/location.png');
    const location = createHTMLel('p', wrapLocation);
    location.textContent = element.address.city + ' ' + element.address.street + ' ' + element.address.number;
    const id = createHTMLel('div', addInfo, 'id');
    id.textContent = 'ID: ' + element.id;

  }




}

function createHTMLel(elType, elFather, elClass = '') {
  const newElement = document.createElement(elType);
  if (elClass){
  newElement.classList.add(elClass);
  }
  elFather.append(newElement);
  return newElement;
}

function selectCard(event){
  event.stopPropagation();
  event.currentTarget.classList.toggle('border-red');
  if (event.currentTarget.classList.contains('border-red')){
    const [firstName, lastName] = event.currentTarget.querySelectorAll('.name');
    const todoText = firstName.textContent + ' ' + lastName.textContent;
    let cardId = cardsArray.find(el => el.card === event.currentTarget).id;
    if (todoText){
      todoArray.push({
          text: todoText,
          id: cardId
      });
  }
}
  else{
    let cardId = cardsArray.find(el => el.card === event.currentTarget).id;
    let elDelete = todoArray.find(el => el.id === cardId);
    todoArray = todoArray.filter((el) => el !== elDelete);
  }

    updateView(todoArray);

}

function updateView(todoArray) {
    const liArray = todoArray.map(todoObj => {
        const li = document.createElement('li');
        li.append(todoObj.text);
        li.dataset.id = todoObj.id;
        const button = document.createElement('button');
        button.textContent = 'X';
        button.addEventListener('click', deleteButtonHandler)
        li.append(button);
        return li;
    });
    list.replaceChildren(...liArray);
}

function deleteButtonHandler(event) {
  const parentLi = event.target.parentElement;
  todoArray = todoArray.filter(elem => elem.id !== Number(parentLi.dataset.id));
  let card = cardsArray.find(el => el.id === Number(parentLi.dataset.id)).card;
  card.classList.remove('border-red');
  updateView(todoArray);
}


class Card {
  constructor(card, id) {
    this._card = card;
    this._id = id;
  }

  get card() {
    return this._card;
  }

  get id() {
    return this._id;
  }

}

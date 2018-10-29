// Veraibles of DOM elements

const submitBut = document.getElementById('submitBut');
const name = document.getElementById('name');
const mail = document.getElementById('mail');
const title = document.getElementById('title');
const size = document.getElementById('size');
const design = document.getElementById('design');
const colorsJsPuns = document.getElementById('colors-js-puns');
const payment = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const activities = document.querySelector('.activities');
const morning = [...document.querySelectorAll('.morning')];
const day = [...document.querySelectorAll('.day')];
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
const labels = [...activities.querySelectorAll('label')];
const ccNum = document.getElementById('cc-num');
const zip = document.getElementById('zip');
const cvv = document.getElementById('cvv');


// create elements to view total price

const totalPriceElement = document.createElement('p');
totalPriceElement.innerHTML = `<p id="totalPriceText" class='is-hidden'>Total price: <span id="totalPrice"></span>$</p>`;
activities.appendChild(totalPriceElement);
const totalPriceText = document.querySelector('#totalPriceText');


// ficus on name input

name.focus();


// adds input fileld for job role options

title.onchange = (el) => {
   const jobRole = document.querySelector('.jobRole');
   if (el.target.value === 'other')  document.querySelector('.jobRole').style.display = 'block';
   else jobRole.style.display = 'none';
};

// adds features for design input

design.onchange = (el) => {
   const master = document.getElementById('color');
   master.options.length = 0;

   if (el.target.value === 'Select Theme') {
      colorsJsPuns.style.display = 'none'
   }
   if (el.target.value === 'js puns') {
      createOption (0, 'Cornflower Blue', 'cornflowerblue');
      createOption (1, 'Dark Slate Grey', 'darkslategrey');
      createOption (2, 'Gold', 'gold');
      colorsJsPuns.style.display = 'block';
   }
   if (el.target.value === 'heart js') {
      createOption (0, 'Tomato', 'tomato');
      createOption (1, 'Steel Blue', 'steelblue');
      createOption (2, 'Dim Grey', 'dimgrey');
      colorsJsPuns.style.display = 'block';
   }
   function createOption (index, text, value){
      master.options[index] = new Option(text, value, true, false);
   }
}

// fetures for radio input

let sum = 0;
activities.addEventListener('change', (el) => {

   if (el.target.classList[0] === 'morning' && el.target.checked) {
      disabledTrue (morning, el.target);
   }
   if (el.target.classList[0] === 'morning' && !el.target.checked) {
      disabledFalse (morning);
   }
   if (el.target.classList[0] === 'day' && el.target.checked) {
      disabledTrue (day, el.target);
   }
   if (el.target.classList[0] === 'day' && !el.target.checked) {
      disabledFalse (day);
   }

   // adds price of courses
   if(el.target.checked){
      sum += +formatTelephone(el.target.nextSibling.textContent);
   }
   if(!el.target.checked){
      sum -= +formatTelephone(el.target.nextSibling.textContent);
   }
   if(sum > 0){
      totalPriceText.classList.remove('is-hidden');
      const totalPrice = document.querySelector('#totalPrice');
      totalPrice.innerHTML = sum;
   } else totalPriceText.classList.add('is-hidden');


   labels.map(el => {
      if (el.firstChild.checked) {
         activities.firstChild.nextSibling.style.color = '#184f68';
      }
   });

   // functions to disable radio button
   function disabledTrue (arr, el) {
      arr.map(element => {
         if (element !== el) {
            element.setAttribute('disabled', true);
            element.parentNode.style.color = 'grey';
         }
      });
   }
   function disabledFalse (arr) {
      arr.map(element => {
            element.removeAttribute("disabled");
            element.parentNode.style.color = '#000';
      });
   }
   // function to catch price-number from text

   function formatTelephone(setence) {
     const expression = /[^@]+\$(\d+)/;
     return setence.replace(expression, "$1");
   }
});



hideArr (paypal, bitcoin);
payment.options[0].setAttribute('disabled', true);
payment.options[1].setAttribute('selected', true);

   payment.addEventListener('change', el => {
      if (el.target.value === 'credit card') {
         removeIsHidden (creditCard);
         hideArr (paypal, bitcoin);
      }
      if (el.target.value === 'paypal') {
         removeIsHidden (paypal)
         hideArr (bitcoin, creditCard);
      }
      if (el.target.value === 'bitcoin') {
         removeIsHidden (bitcoin);
         hideArr (paypal, creditCard);
      }
      if (el.target.value === 'select_method') {
         hideArr (paypal, creditCard, bitcoin);
      }
   });

   function addIsHidden (el) {
      el.classList.add('is-hidden');
   }
   function removeIsHidden (el) {
      el.classList.remove('is-hidden');
   }

   function hideArr (el1, el2, el3) {
      let arr = [el1, el2, el3];
      arr.map(el =>{
         if (el) el.classList.add('is-hidden');
      });
   }

// check validation for username

name.addEventListener('input', el => {
   name.previousSibling.previousSibling.style.color = 'black';

   if (!isValidUsername(el.target.value)) {
      el.target.style.border = '2px red solid';
      name.previousSibling.previousSibling.innerHTML = `<i>Please enter [a-z] symbols</i>`;
      name.previousSibling.previousSibling.classList.add('not-valid');
   } if (isValidUsername(el.target.value) || el.target.value.length <= 0){
      el.target.style.border = '2px solid #c1deeb';
      name.previousSibling.previousSibling.innerHTML = 'Name:';
      name.previousSibling.previousSibling.classList.remove('not-valid');
   }
});

// check validation for email

mail.addEventListener('input', el => {
   mail.previousSibling.previousSibling.style.color = 'black';
   if (!isValidEmail(el.target.value)) {
      el.target.style.border = '2px red solid';
      mail.previousSibling.previousSibling.innerHTML = `<i>Please enter valid email</i>`;
   } if (isValidEmail(el.target.value) || el.target.value.length <= 0){
      el.target.style.border = '2px solid #c1deeb';
      mail.previousSibling.previousSibling.innerHTML = 'Email:';
   }
});

ccNum.addEventListener('input', el => {
   const cardNumber = ccNum.previousSibling.previousSibling;


   if (isValidCardNumber(ccNum.value) || ccNum.value.length <= 0) {
      ccNum.style.border = '2px solid #c1deeb';
      cardNumber.innerHTML = `Card Number:`;
   }
   else {
      ccNum.style.border = '2px red solid';
      cardNumber.innerHTML = `<i>Valid number from 13 to 16 digits long</i>`;
   }
});

zip.addEventListener('input', el => {
   const zipText = zip.previousSibling.previousSibling;
   if (isValidZip(zip.value) || zip.value.length <= 0) {
      zip.style.border = '2px solid #c1deeb';
      zipText.innerHTML = `Zip Code:`;
   }
   else {
      zip.style.border = '2px red solid';
      zipText.innerHTML = `<i>Only 5 digits</i>`;
   }
});

cvv.addEventListener('input', el => {
   const cvvText = cvv.previousSibling.previousSibling;
   if (isValidCVV(cvv.value) || cvv.value.length <= 0) {
      cvv.style.border = '2px solid #c1deeb';
      cvvText.innerHTML = `CVV:`;
   }
   else {
      cvv.style.border = '2px red solid';
      cvvText.innerHTML = `<i>Only 3 digits</i>`;
   }
});

//functions for validation

function isValidUsername(username) {
   return /^[a-z|A-Z]+\s?([a-z|A-Z]+)?$/.test(username);
}
function isValidEmail(email) {
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}
function isValidCardNumber(CardNumber) {
  return /^\d{13,16}$/.test(CardNumber);
}
function isValidZip(CardNumber) {
  return /^\d{5}$/.test(CardNumber);
}
function isValidCVV(CardNumber) {
  return /^\d{3}$/.test(CardNumber);
}

submitBut.addEventListener('click', el => {
   // checks input fileds for name, mail
   let checkRadio = 0;
   if (name.value.length <= 0 || !isValidUsername(name.value)){
      name.style.border = '2px solid red';
      name.previousSibling.previousSibling.innerHTML = `<i>Name should be filled out. Please enter [a-z] symbols</i>`;
      el.preventDefault();
   }
   if (mail.value.length <= 0 || !isValidEmail(mail.value)){
      mail.style.border = '2px solid red';
      mail.previousSibling.previousSibling.innerHTML = `<i>Email should be filled out. Please enter valid email</i>`;
      el.preventDefault();
   }
   //checks if at least one of radio chaked
   labels.map(el => {
      if (el.firstChild.checked) checkRadio += 1;
   });
   if (checkRadio) activities.firstChild.nextSibling.style.color = '#184f68';
   else {
      activities.firstChild.nextSibling.style.color = 'red';
      el.preventDefault();
   }

   // checks input filed card number

   if (payment.options[1].selected) {
      if (!isValidCardNumber(ccNum.value) || ccNum.value.length <= 0) {
         ccNum.style.border = '2px solid red';
         el.preventDefault();
      }
      if (!isValidZip(zip.value) || zip.value.length <= 0) {
         zip.style.border = '2px solid red';
         el.preventDefault();
      }
      if (!isValidCVV(cvv.value) || cvv.value.length <= 0) {
         cvv.style.border = '2px solid red';
         el.preventDefault();
      }
   }
});






// console.log(formatTelephone(text));

import './styles.css';
import './js/notifications';
import debounce from 'lodash.debounce';
import fetchCountries from './js/fetchCountries';
import itemsTemplate from './templates/li-items.hbs';
import coutryTemplate from './templates/country.hbs';

let inputValue = null;
const inputRef = document.querySelector('#inputRef');
const ulRef = document.querySelector('.js-menu');
const liRef = document.querySelector('.item');
const divRef = document.querySelector('.card');

const renderPage = data => {
  inputRef.textContent = '';
  ulRef.innerHTML = '';
  divRef.innerHTML = coutryTemplate(data);
  // mySuccess();
};
const renderList = data => {
  ulRef.innerHTML = itemsTemplate(data);
  inputRef.textContent = '';
  divRef.innerHTML = '';
  liRef.addEventListener('click', renderPage);
};
const dataHandler = data => {
  if (inputValue) {
    if (data.length === 1) {
      renderPage(data);
    } else if (data.length > 1 && data.length < 11) {
      renderList(data);
    } else if (data.length > 11) {
      console.log(data.length);
      console.log('too much data');
    }
  }
};

const handleInput = event => {
  inputValue = event.target.value;
  fetchCountries(inputValue).then(data => dataHandler(data));
};
inputRef.addEventListener('input', debounce(handleInput, 500));

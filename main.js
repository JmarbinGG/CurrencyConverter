import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import CurrencyAPI from '@everapi/currencyapi-js';

const currencyApi = new CurrencyAPI('PUT YOUR CURRENCY API KEY HERE LOL');
const latestRatesForm = document.getElementById('latest_rates_form');
const baseCurrencyInput = document.getElementById('base_currency_input');
const currenciesInput = document.getElementById('currencies');
const latestRatesDisplay = document.getElementById('latest_rates_display');
latestRatesForm.addEventListener('submit', (e) => {
    e.preventDefault();

    currencyApi.latest({
        base_currency: baseCurrencyInput.value.trim(),
        currencies: currenciesInput.value.replaceAll(' ', '')
    }).then(response => {
        let currencies = Object.keys(response.data);
        let resultHTML = '';

        for (let currency of currencies) {
            resultHTML += `<div class="flex items-center justify-between py-2">
                <strong>${currency}:</strong>
                <span>${response.data[currency].value}</span>
            </div>`;
        }
        latestRatesDisplay.innerHTML = resultHTML;
    });
});


document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))

// async & await
// call with browser
const baseUrl = 'https://api.coinmarketcap.com/v1/ticker/bitcoin/';

function getData() {
  fetch(baseUrl)
    .then(response => response.json())
    .then(data => console.log(data))
  ;
}

async function getAsyncData() {
    const response = await fetch(baseUrl);
    const json = await response.json();
    console.log(json);
}

getData();
getAsyncData();

var coinCard = document.querySelector("#coin-card");
var gif1 = document.querySelector("#gif1");
var gif2 = document.querySelector("#gif2");

// Function for displaying price results
function printPriceResults(priceObj) {

    // set up `<div>` to hold result content
    var priceBody = document.createElement('div');
    priceBody.setAttribute('id', 'price-body');

    var titleEl = document.createElement('h3');
    titleEl.textContent = priceObj.data.coin.name + priceObj.data.coin.symbol;

    var bodyContentEl = document.createElement('div');
    bodyContentEl.innerHTML =
        'Price: ' + priceObj.data.coin.price + '<br/>' +
        'Price Change: ' + priceObj.data.coin.change


    var icon = priceObj.data.coin.iconUrl
    var img = document.createElement('img');
    img.src = icon;

    var imgDiv = document.createElement('div');
    imgDiv.setAttribute('id', 'icon');
    imgDiv.appendChild(img);

    priceBody.append(titleEl, bodyContentEl);

    coinCard.append(priceBody);
    coinCard.appendChild(imgDiv);
}

// Function for displaying GIF
// function printGifResults(gifObj) {
//     console.log(gifObj);

//     var gifBody = document.createElement('div');

//     var bodyContentEl = document.createElement('div');
//     bodyContentEl.innerHTML =
//         gifObj + '<br/>';

//     gifBody.append(bodyContentEl);
// ''
//     coinCard.append(gifBody);
// }

// options value for the fetch headers and method
const options = {
    method: 'GET',

    headers: {
        'X-RapidAPI-Key': 'ca0f9543cemshc837d4d0216102bp14f67cjsn5bb262bfcf80',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
};
var coinNameUUID = [];
// getCoinsUUID function is a fetch that stores coins in local storage, 
//  and their specific URL parameters... also makes an array of objects for
//  future project ideas...
function getCoinsUUID() {
    fetch('https://coinranking1.p.rapidapi.com/coins?' +
        'referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&' +
        'orderBy=marketCap&orderDirection=desc&limit=50&offset=0', options)
        .then(function (response) {
            return response.json()
        })
        .then(function (response) {
            console.log(response);
            for (i = 0; i < 50; i++) {
                var name = response.data.coins[i].name;
                var uuid = response.data.coins[i].uuid;
                localStorage.setItem(name, JSON.stringify(uuid));
                var NameUUID = {
                    name: response.data.coins[i].name,
                    uuid: response.data.coins[i].uuid
                }
                coinNameUUID.push(NameUUID);
            }
            console.log(coinNameUUID);
        })
}
getCoinsUUID();

var coinName;
var uuid;

// this getUUID function is getting the uuid value from local storage,
//  related to a specific coin, then runs the searchingCoin function with that uuid.
function getUUID() {
    uuid = JSON.parse(localStorage.getItem(coinName));
    console.log(uuid);
    searchingCoin(uuid);
}

var coinInfo;

// searchingCoin function uses the uuid of a coin to search a specific coin,
//  then uses the data returned from that to run the display functions...
function searchingCoin(input) {
    fetch('https://coinranking1.p.rapidapi.com/coin/' + input +
        '?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h', options)
        .then(function (response) {
            // response.json()
            return response.json()
        })
        .then(function (response) {
            console.log(response)
            coinInfo = response;
            printPriceResults(coinInfo);
            var coinChange = coinInfo.data.coin.change;
            // gifDisplay(coinChange);
            let placeholderImg = new Image(400, 400);
            placeholderImg.src = './images/placeholder.jpg';
            priceBody.appendChild(placeholderImg);
        })
        .catch(function (err) {
            console.error(err)
        });
    return coinInfo
}

// clearPageResults function is for resetting the page when a new coin is searched.
function clearPageResults() {
    coinCard.innerHTML = "";
    console.log("clearPageResults");
    console.log(gif1);
    gif1.innerHTML = "";
    gif2.innerHTML = "";
}

//GIF fetch  
//var GifAPIkey = 'S3VasUEiDf5XXAyFPT9xCzfa0unw9jt3' <---this key is already included in the GifURLrequest
//var GifURLrequest = 'https://api.giphy.com/v1/gifs/search?api_key=S3VasUEiDf5XXAyFPT9xCzfa0unw9jt3&q=' + cryptoValue + '&limit=25&offset=0&rating=g&lang=en';

// function gifDisplay(cryptoValue) {
// var randomNum = Math.floor(Math.random() * (Math.floor(26) - Math.ceil(0)) + Math.ceil(0));
//     if (cryptoValue > 1) {
//         //search for Gifs labeled with the tag 'celebrate'
//         var GifURLrequest = 'https://api.giphy.com/v1/gifs/search?api_key=S3VasUEiDf5XXAyFPT9xCzfa0unw9jt3&q=celebrate&limit=25&offset=0&rating=g&lang=en';
//         fetch(GifURLrequest)
//             //return json results
//             .then(function (response) {
//                 return response.json();
//             })
//             .then(function (data) {
//                           // set up `<div>` to hold result content
//                 // var gifCard = document.querySelector('#gif1');
//                 gifimg = new Image(400, 400);
//                 gifimg.setAttribute("id", "gif");
//                 gifimg.src = data.data[randomNum].images.original.url;  //<--- this is the path to the url for the mp4 that will be displayed
//                 coinCard.appendChild(gifimg);
//             })
//     } else if (cryptoValue < -1) {
//         //searhc for Gifs labeled with the tag 'oh no'
//         var GifURLrequest = 'https://api.giphy.com/v1/gifs/search?api_key=S3VasUEiDf5XXAyFPT9xCzfa0unw9jt3&q=oh+no&limit=25&offset=0&rating=g&lang=en';
//         fetch(GifURLrequest)
//             //return json results
//             .then(function (response) {
//                 return response.json();
//             })
//             .then(function (data) {
//                         //   var gifCard = document.querySelector('#gif1');
//                 gifimg = new Image(400, 400);
//                 gifimg.setAttribute("id", "gif");
//                 gifimg.src = data.data[randomNum].images.original.url;  //<--- this is the path to the url for the mp4 that will be displayed
//                 coinCard.appendChild(gifimg);
//             })
//     } else {
//         //searhc for Gifs labeled with the tag 'unsure'
//         var GifURLrequest = 'https://api.giphy.com/v1/gifs/search?api_key=S3VasUEiDf5XXAyFPT9xCzfa0unw9jt3&q=unsure&limit=25&offset=0&rating=g&lang=en';
//         fetch(GifURLrequest)
//             //return json results
//             .then(function (response) {
//                 return response.json();
//             })
//             .then(function (data) {
//                         // var gifCard = document.querySelector('#gif1');
//                 gifimg = new Image(400, 400);
//                 gifimg.setAttribute("id", "gif");
//                 gifimg.src = data.data[randomNum].images.original.url;  //<--- this is the path to the url for the mp4 that will be displayed
//                 coinCard.appendChild(gifimg);
//             })
//     };
// }

var searchButton = document.querySelector(".button");
var input = document.querySelector(".input");
// this event listener takes the input value from the user when the search button is clicked
// and converts the first letter to capital; to work with saved local storage.
// this is also where the functions to get coin data and reset page are called.
searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    var inputValue = input.value;
    var typedInput = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    coinName = typedInput;
    clearPageResults()
    getUUID();
    // searchingCoin(typedInput);


});

let coinBtns = document.querySelector('.coinbuttons');

let bitcoinBtn = document.querySelector("#bitcoinbtn");
let ethereumBtn = document.querySelector("#ethereumbtn");
let tetherBtn = document.querySelector("#tetherbtn");
let binanceBtn = document.querySelector("#binancebtn");
let dogeBtn = document.querySelector("#dogebtn");

coinBtns.addEventListener("click", function (event) {
    event.preventDefault();
    if (event.target === bitcoinBtn) {
        coinName = 'Bitcoin';
    } else if (event.target === ethereumBtn) {
        coinName = 'Ethereum';
    } else if (event.target === tetherBtn) {
        coinName = 'Tether USD';
    } else if (event.target === binanceBtn) {
        coinName = 'Binance USD';
    } else if (event.target === dogeBtn) {
        coinName = 'Dogecoin';
    }
    getUUID();
});


// this event listener is to close the opening modal when hitting the "x" in the top right corner.
// var modalXButton = document.querySelector("#modal-x-button");
// var modal = document.querySelector("#modal");
// modalXButton.addEventListener("click", function (event) {
//     event.preventDefault();
//     modal.classList.remove("is-active");
// });

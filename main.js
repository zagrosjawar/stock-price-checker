/*
Task 2: Stock Price Display

-Make a JASON  request to the Alpha Vantage API to get the stock price of a company and
present the result on the webpage.

Details:
-you need to make a webpage that can display:
    -> the current stock price for the selected stock symbols using Alphavantage API 
    -> the stock symbol should be entered by the user in an input field
    -> the stock price should be displayed on the webpage

-You receive an HTML and javascript skeleton
and need to fill in some parts of code that
retrieve the necessary information from the API and display it on the webpage. 
*/

log = console.log;
function addStockSymbol() {
    let stockSymbolInput = document.getElementById('stockSymbol'); // get the stock symbol from the input field
    let stockSymbol = stockSymbolInput.value.trim().toUpperCase(); // convert the stock symbol to uppercase and remove any leading/trailing whitespaces

    if (!stockSymbol) {
        alert('Please enter a stock symbol.');
        return;
    }

    // If the current API key would not work for you, request your own key at https://www.alphavantage.co/support/#api-key
    // and replace 'A2AMU5WV3XAX8U3K' with your own Alpha Vantage API key.
    //let apiKey = "IWD4Q74QCR7Y771E";
    let apiKey = "A2AMU5WV3XAX8U3K";

    // YOUR CODE HERE: Set up a request link.
    // An example link is here: https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=A2AMU5WV3XAX8U3K
    // NB! Alpha Vantage! standard API rate limit is 25 requests per day.
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${apiKey}`;
    fetch(url)
        .then(function (response) {
            // parse the response as JSON
            return response.json()
        })
        .then(function (data) {
            // YOUR CODE HERE: process response and select the necessary data for displaying
            log(data);
            if (!data["Global Quote"]) {
                alert('Failed to fetch stock price. the stock symbol might be invalid. the limit of requests might be reacheed(25 requests per day). Please try again.');                return;
            } else {
                displayStockPrice(data["Global Quote"], stockSymbol);
            }
        })
        .catch(function(error) {
            console.error('Error fetching stock price:', error);
            
        });
}

function displayStockPrice(data, stockSymbol) {
    // YOUR CODE HERE: display the stock information for selected symbol
    let displayDiv = document.getElementById('stockPrices');
    let stockInfoDiv = document.createElement('div');
    stockInfoDiv.classList.add('stock-info'); // add a class to the div for styling

    let infoHTML = `
        <h3>Stock Infromation for ${stockSymbol}</h3>
        <p>Open: $${data["02. open"]}</p>
        <p>High: $${data["03. high"]}</p>
        <p>Low: $${data["04. low"]}</p>
        <p>Current Price: $${data["05. price"]}</p>
        <p>Volume: ${data["06. volume"]}</p>
        <p>Latest Trading Day: ${data["07. latest trading day"]}</p>
        <p>Previous Close: $${data["08. previous close"]}</p>
        <p>Change: ${data["09. change"]}</p>
        <p>Change Percent: ${data["10. change percent"]}</p>
    `;

    stockInfoDiv.innerHTML = infoHTML;
    displayDiv.appendChild(stockInfoDiv);
}

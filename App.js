const convertBtn = document.getElementById("convert-btn");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const result = document.getElementById("converted-amount");

const apiKey = "4369ed8973507d5f7e188cf4";
const apiUrl = `https://v6.exchangerate-api.com/v6/4369ed8973507d5f7e188cf4/latest/USD`;

const populateCurrencies = () => {
  const currencies = ["USD", "EUR", "INR", "GBP", "AUD", "CAD", "JPY"];

  currencies.forEach((currency) => {
    const optionFrom = document.createElement("option");
    optionFrom.value = currency;
    optionFrom.textContent = currency;
    fromCurrency.appendChild(optionFrom);

    const optionTo = document.createElement("option");
    optionTo.value = currency;
    optionTo.textContent = currency;
    toCurrency.appendChild(optionTo);
  });
};

const getExchangeRate = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return data.conversion_rates;
  } catch (error) {
    console.error("Error fetching exchange rate data:", error);
  }
};

const convertCurrency = async () => {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  const rates = await getExchangeRate();

  if (rates) {
    const fromRate = rates[from];
    const toRate = rates[to];
    const convertedAmount = (amount / fromRate) * toRate;
    result.textContent = convertedAmount.toFixed(2);
  } else {
    result.textContent = "Error fetching conversion rate.";
  }
};

convertBtn.addEventListener("click", convertCurrency);
window.onload = populateCurrencies;
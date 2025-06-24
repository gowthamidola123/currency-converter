// script.js 
const amountInput = document.getElementById("amount");
const fromCurrencySelect = document.getElementById("fromCurrency");
const toCurrencySelect = document.getElementById("toCurrency");
const convertButton = document.getElementById("convertButton");
const resultDiv = document.getElementById("result");

const apiUrl = "https://api.exchangerate-api.com/v4/latest";

convertButton.addEventListener("click", () => {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (isNaN(amount)) {
        resultDiv.textContent = "Please enter a valid amount.";
        resultDiv.classList.remove("success-message");
        resultDiv.classList.add("error-message");
        return;
    }

    const query = `${apiUrl}/${fromCurrency}`;

    fetch(query)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const exchangeRate = data.rates[toCurrency];
            if (exchangeRate) {
                const convertedAmount = amount * exchangeRate;
                resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
                resultDiv.classList.remove("error-message");
                resultDiv.classList.add("success-message");
            } else {
                resultDiv.textContent = "Currency not found.";
                resultDiv.classList.remove("success-message");
                resultDiv.classList.add("error-message");
            }
        })
        .catch((error) => {
            resultDiv.textContent = "Error fetching exchange rates.";
            resultDiv.classList.remove("success-message");
            resultDiv.classList.add("error-message");
            console.error("Error:", error);
        });
});

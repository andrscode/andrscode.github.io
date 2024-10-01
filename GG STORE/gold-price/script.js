async function loadPrices() {
    const response = await fetch('config.json');
    const prices = await response.json();
    return prices;
}

async function convertGoldToUSD() {
    const prices = await loadPrices();
    const goldPricePerGram = prices.goldPricePerGram;
    const vesExchangeRate = 38;

    const goldGrams = document.getElementById('gold').value;
    const result = goldGrams * goldPricePerGram;
    const vesResult = result * vesExchangeRate;
    document.getElementById('result').innerText = `USD $${result.toFixed(2)}`;
    document.getElementById('vesResult').innerText = `VES ${vesResult.toFixed(2)}`;
}

async function sellGold() {
    const prices = await loadPrices();
    const sellGoldPricePerGram = prices.sellGoldPricePerGram;
    const vesExchangeRate = 38;

    const sellGoldGrams = document.getElementById('sellGold').value;
    const result = sellGoldGrams * sellGoldPricePerGram;
    const vesResult = result * vesExchangeRate;
    document.getElementById('sellResult').innerText = `USD $${result.toFixed(2)}`;
    document.getElementById('sellVesResult').innerText = `VES ${vesResult.toFixed(2)}`;
}

function allowOnlyNumbersAndDecimal(event) {
    const charCode = event.which ? event.which : event.keyCode;
    const char = String.fromCharCode(charCode);
    if (!/^\d*\.?\d*$/.test(char)) {
        event.preventDefault();
    }
}

function createOrderMessage(quantity, usdAmount, vesAmount, paymentMethod) {
    return `Orden creada: Compra de ${quantity} gramos, Precio en dólares: $${usdAmount.toFixed(2)}, Precio en bolívares: VES ${vesAmount.toFixed(2)}, Método de pago: ${paymentMethod}.`;
}

document.getElementById('gold').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        convertGoldToUSD();
    }
});
document.getElementById('gold').addEventListener('input', convertGoldToUSD);
document.getElementById('gold').addEventListener('keypress', allowOnlyNumbersAndDecimal);

document.getElementById('sellGold').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sellGold();
    }
});
document.getElementById('sellGold').addEventListener('input', sellGold);
document.getElementById('sellGold').addEventListener('keypress', allowOnlyNumbersAndDecimal);

let selectedPaymentMethod = '';

document.querySelectorAll('.payment-icon').forEach(icon => {
    icon.addEventListener('click', function() {
        selectedPaymentMethod = this.dataset.method;
        document.querySelectorAll('.payment-icon').forEach(icon => {
            icon.style.border = '';
        });
        this.style.border = '2px solid #000';
    });
});

document.getElementById('buyButton').addEventListener('click', async function() {
    const prices = await loadPrices();
    const goldPricePerGram = prices.goldPricePerGram;
    const vesExchangeRate = 38;

    const goldGrams = document.getElementById('gold').value;
    const result = goldGrams * goldPricePerGram;
    const vesResult = result * vesExchangeRate;

    if (selectedPaymentMethod && goldGrams) {
        const orderMessage = createOrderMessage(goldGrams, result, vesResult, selectedPaymentMethod);
        document.getElementById('orderMessage').innerText = orderMessage;
    } else {
        document.getElementById('orderMessage').innerText = 'Por favor, seleccione un método de pago y una cantidad válida de oro.';
    }
});

document.getElementById('sellButton').addEventListener('click', async function() {
    const prices = await loadPrices();
    const sellGoldPricePerGram = prices.sellGoldPricePerGram;
    const vesExchangeRate = 38;

    const sellGoldGrams = document.getElementById('sellGold').value;
    const result = sellGoldGrams * sellGoldPricePerGram;
    const vesResult = result * vesExchangeRate;

    if (selectedPaymentMethod && sellGoldGrams) {
        const orderMessage = createOrderMessage(sellGoldGrams, result, vesResult, selectedPaymentMethod);
        document.getElementById('sellOrderMessage').innerText = orderMessage;
    } else {
        document.getElementById('sellOrderMessage').innerText = 'Por favor, seleccione un método de pago y una cantidad válida de oro.';
    }
});

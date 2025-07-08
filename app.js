
const priceDisplay = document.getElementById("price");
const signalDisplay = document.getElementById("signal");
const slDisplay = document.getElementById("sl");
const tpDisplay = document.getElementById("tp");
const statusDisplay = document.getElementById("status");

function getRandomPrice(base = 1.0850, range = 0.0020) {
    return (base + (Math.random() - 0.5) * range).toFixed(5);
}

function updateSignal() {
    const price = getRandomPrice();
    const direction = Math.random() > 0.5 ? "BUY" : "SELL";
    const sl = (parseFloat(price) + (direction === "BUY" ? -0.0015 : 0.0015)).toFixed(5);
    const tp = (parseFloat(price) + (direction === "BUY" ? 0.0020 : -0.0020)).toFixed(5);

    priceDisplay.textContent = `EUR/USD: ${price}`;
    signalDisplay.textContent = direction;
    slDisplay.textContent = `Stop Loss: ${sl}`;
    tpDisplay.textContent = `Take Profit: ${tp}`;
    statusDisplay.textContent = "LIVE";
}

setInterval(updateSignal, 5000);
updateSignal();

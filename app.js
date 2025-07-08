const priceEl = document.getElementById('price');
const signalEl = document.getElementById('signal');
const slEl = document.getElementById('sl');
const tpEl = document.getElementById('tp');
const statusEl = document.getElementById('status');
const timeframeEl = document.getElementById('timeframe');
const refreshBtn = document.getElementById('refresh');

async function fetchData() {
  statusEl.textContent = 'Fetching…';
  try {
    const res = await fetch('https://api.exchangerate.host/latest?base=EUR&symbols=USD');
    const { rates } = await res.json();
    const price = rates.USD;
    priceEl.textContent = price.toFixed(5);

    // Simulate advanced signal logic
    const timeframe = timeframeEl.value;
    let signalWeight = Math.random();
    if (timeframe === "5m") signalWeight += 0.2;

    const signal = signalWeight > 0.5 ? 'BUY' : 'SELL';
    signalEl.textContent = signal;

    const sl = signal === 'BUY'
      ? (price - 0.0015).toFixed(5)
      : (price + 0.0015).toFixed(5);
    const tp = signal === 'BUY'
      ? (price + 0.0030).toFixed(5)
      : (price - 0.0030).toFixed(5);

    slEl.textContent = sl;
    tpEl.textContent = tp;

    statusEl.textContent = '✅ Live';
  } catch (err) {
    statusEl.textContent = '⚠️ Error';
    priceEl.textContent = '--';
    signalEl.textContent = '--';
    slEl.textContent = '--';
    tpEl.textContent = '--';
    console.error(err);
  }
}

fetchData();
let interval = setInterval(fetchData, 10000);

refreshBtn.addEventListener('click', () => {
  clearInterval(interval);
  fetchData();
});

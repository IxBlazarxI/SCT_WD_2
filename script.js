const display = document.getElementById('display');
let timer = null;
let startTime = 0;
let elapsed = 0;
let isRunning = false;
let laps = [];
let lastElapsedTime = 0;
let lastLapTime = 0;

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - elapsed;
        timer = setInterval(updateStopwatch, 100);
        isRunning = true;
    }
}

function stopStopwatch() {
    if (isRunning) {
        clearInterval(timer);
        elapsed = Date.now() - startTime;
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(timer);
    timer = null;
    startTime = 0;
    elapsed = 0;
    isRunning = false;
    
    display.textContent = '00:00:00:00';
    document.getElementById('laps').innerHTML = "";
}

function updateStopwatch() {
    const currentTime = Date.now();
    elapsed = currentTime - startTime;

    let hours = Math.floor(elapsed / (1000 * 60 * 60));
    let minutes = Math.floor(elapsed / (1000 * 60)) % 60;
    let seconds = Math.floor(elapsed / 1000) % 60;
    let milliseconds = Math.floor(elapsed % 1000 / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function formatTime(elapsed) {
    let hours = Math.floor(elapsed / (1000 * 60 * 60));
    let minutes = Math.floor(elapsed / (1000 * 60)) % 60;
    let seconds = Math.floor(elapsed / 1000) % 60;
    let milliseconds = Math.floor(elapsed % 1000 / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function lapTime() {
    if (isRunning) {
        const currentElapsed = Date.now() - startTime;
        const lapElapsed = currentElapsed - lastLapTime;
        laps.push(formatTime(lapElapsed));
        lastLapTime = currentElapsed;
        updateLaps();
    }
}

function updateLaps() {
    let lapsHtml = '<ul>';
    laps.forEach((lap, index) => {
        lapsHtml += `<li>Lap ${index + 1}: ${lap}</li>`;
    });
    lapsHtml += '</ul>';
    document.getElementById('laps').innerHTML = lapsHtml;
}

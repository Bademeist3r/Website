const BackButton = document.getElementById("BackButton");

BackButton.addEventListener("click", function() {
    window.location.href = "question.html";
});

const startTime = new Date();
const timerElement = document.getElementById("timer");

setInterval(function() {
    const now = new Date();
    const totalSeconds  = (now - startTime) / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    timerElement.textContent = String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
}, 1000)


const ImgButton = document.getElementById("ImgButton")
ImgButton.addEventListener("click", function() {
    window.location.href = "album.html";
});
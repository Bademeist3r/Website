const BackButton = document.getElementById("BackButton");

BackButton.addEventListener("click", function() {
    window.location.href = "question.html";
});


const timerElement = document.getElementById("timer");
const togetherElement = document.getElementById("together");

let startTime = localStorage.getItem("startTime");

if (!startTime) {
    startTime = new Date().toISOString();
    localStorage.setItem("startTime", startTime);
}

startTime = new Date(startTime);

let dots = 0;


function updateTimer() {

    const now = new Date();

    let years = now.getFullYear() - startTime.getFullYear();
    let months = now.getMonth() - startTime.getMonth();
    let days = now.getDate() - startTime.getDate();

    let hours = now.getHours() - startTime.getHours();
    let minutes = now.getMinutes() - startTime.getMinutes();
    let seconds = now.getSeconds() - startTime.getSeconds();


    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }

    if (minutes < 0) {
        minutes += 60;
        hours--;
    }

    if (hours < 0) {
        hours += 24;
        days--;
    }

    if (days < 0) {
        months--;

        const previousMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            0
        );

        days += previousMonth.getDate();
    }

    if (months < 0) {
        months += 12;
        years--;
    }


    let parts = [];

    if (years > 0) {
        parts.push(years + (years === 1 ? " Jahr" : " Jahre"));
    }

    if (months > 0) {
        parts.push(months + (months === 1 ? " Monat" : " Monate"));
    }

    if (days > 0) {
        parts.push(days + (days === 1 ? " Tag" : " Tage"));
    }

    parts.push(hours + (hours === 1 ? " Stunde" : " Stunden"));
    parts.push(minutes + (minutes === 1 ? " Minute" : " Minuten"));
    parts.push(seconds + (seconds === 1 ? " Sekunde" : " Sekunden"));


    dots++;

    if (dots > 3) {
        dots = 1;
    }

    let loadingDots = "";

    for (let i = 0; i < dots; i++) {
        loadingDots += ".";
    }


    let text = "Wir sind seit ";

    if (parts.length === 1) {
        text += parts[0];
    } else if (parts.length === 2) {
        text += parts[0] + " und " + parts[1];
    } else {
        text += parts.slice(0, -1).join(", ");
        text += " und " + parts[parts.length - 1];
    }

    timerElement.textContent = text + loadingDots;


    togetherElement.textContent =
        "Seit dem " + startTime.toLocaleDateString("de-DE");
}


updateTimer();

setInterval(updateTimer, 1000);


const ImgButton = document.getElementById("ImgButton");

ImgButton.addEventListener("click", function() {
    window.location.href = "album.html";
});

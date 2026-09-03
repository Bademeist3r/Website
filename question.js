const noButton = document.getElementById("NoButton");

function moveNoButton() {
    const maxX = window.innerWidth - noButton.offsetWidth;
    const maxY = window.innerHeight - noButton.offsetHeight;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    noButton.style.left = newX + "px";
    noButton.style.top = newY + "px";
}

noButton.addEventListener("mouseover", function() {
    moveNoButton();
});

noButton.addEventListener("click", function() {
    moveNoButton();
});


/* =========================
   JA BUTTON
   ========================= */

const yesButton = document.getElementById("YesButton");

yesButton.addEventListener("click", function() {

    const colors = [
        "#9bbb83",
        "#e39a78",
        "#f5d6b3",
        "#fff3d6",
        "#d8bfa8",
        "#c8ad91",
        "#f4b6a6",
        "#b8c9a8"
    ];

    for (let i = 0; i < 200; i++) {

        const confettiParticle = document.createElement("div");

        const angle = Math.random() * 2 * Math.PI;
        const distance = 300 + Math.random() * 700;

        const targetX = Math.cos(angle) * distance;
        const targetY = Math.sin(angle) * distance;

        const size = 5 + Math.random() * 8;

        confettiParticle.style.width = size + "px";
        confettiParticle.style.height = size + "px";

        confettiParticle.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        confettiParticle.style.position = "fixed";

        confettiParticle.style.left =
            (window.innerWidth / 2) + "px";

        confettiParticle.style.top =
            (window.innerHeight / 2) + "px";

        confettiParticle.style.borderRadius =
            Math.random() > 0.5 ? "50%" : "3px";

        confettiParticle.style.pointerEvents = "none";

        confettiParticle.style.transition =
            "all 1.2s cubic-bezier(0.2, 0.8, 0.3, 1)";

        document.body.appendChild(confettiParticle);

        setTimeout(function() {

            confettiParticle.style.left =
                (window.innerWidth / 2 + targetX) + "px";

            confettiParticle.style.top =
                (window.innerHeight / 2 + targetY) + "px";

            confettiParticle.style.transform =
                "rotate(" + Math.random() * 720 + "deg)";

            confettiParticle.style.opacity = "0";

        }, 10);

        setTimeout(function() {
            confettiParticle.remove();
        }, 1200);
    }

    setTimeout(function() {
        window.location.href = "pleasure.html";
    }, 1500);

});
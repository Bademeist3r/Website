const PreviousButton = document.getElementById("PreviousButton");
const NextButton = document.getElementById("NextButton");
const AddButton = document.getElementById("AddButton");
const BackButton = document.getElementById("BackButton");
const FlipHint = document.getElementById("FlipHint");
const ImageUpload = document.getElementById("ImageUpload");
const AlbumImage = document.getElementById("AlbumImage");

const polaroidInner = document.querySelector(".polaroid-inner");
const polaroidBack = document.querySelector(".polaroid-back");

const Note = document.getElementById("Note");

const QuotesButton =
    document.getElementById("QuotesButton");

const ClickHint =
    document.getElementById("ClickHint");

const defaultPictures = [
    "pics/elevator.png",
    "pics/castle.png",
    "pics/paddl.png"
];

let album = JSON.parse(
    localStorage.getItem("album")
) || [];

if (album.length === 0) {

    album = defaultPictures.map(function(image) {
        return {
            image: image,
            note: ""
        };
    });

    saveAlbum();
}

let currentPicture = 0;

function saveAlbum() {

    localStorage.setItem(
        "album",
        JSON.stringify(album)
    );
}

function showPicture() {

    if (album.length === 0) {
        return;
    }

    AlbumImage.src =
        album[currentPicture].image;

    Note.value =
        album[currentPicture].note;

    polaroidInner.classList.remove("flipped");
}

AlbumImage.addEventListener(
    "click",
    function() {

        polaroidInner.classList.add("flipped");

        ClickHint.classList.add("hidden");

        FlipHint.textContent =
            "Hier klicken, um es wieder umzudrehen ♡";
    }
);

polaroidBack.addEventListener(
    "click",
    function(event) {

        if (event.target !== Note) {

            polaroidInner.classList.remove(
                "flipped"
            );

            FlipHint.textContent =
                "Zum Umdrehen hier klicken ♡";
        }
    }
);

Note.addEventListener(
    "click",
    function(event) {

        event.stopPropagation();
    }
);

Note.addEventListener(
    "input",
    function() {

        album[currentPicture].note =
            Note.value;

        saveAlbum();
    }
);

PreviousButton.addEventListener(
    "click",
    function() {

        currentPicture--;

        if (currentPicture < 0) {

            currentPicture =
                album.length - 1;
        }

        showPicture();
    }
);

NextButton.addEventListener(
    "click",
    function() {

        currentPicture++;

        if (currentPicture >= album.length) {

            currentPicture = 0;
        }

        showPicture();
    }
);

AddButton.addEventListener(
    "click",
    function() {

        ImageUpload.click();
    }
);

ImageUpload.addEventListener(
    "change",
    function(event) {

        const file =
            event.target.files[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            return;
        }

        const reader =
            new FileReader();

        reader.onload =
            function(e) {

                album.push({
                    image: e.target.result,
                    note: ""
                });

                currentPicture =
                    album.length - 1;

                saveAlbum();
                showPicture();

                AlbumImage.style.transform =
                    "scale(1.03)";

                setTimeout(
                    function() {

                        AlbumImage.style.transform =
                            "scale(1)";

                    },
                    300
                );
            };

        reader.readAsDataURL(file);

        ImageUpload.value = "";
    }
);

QuotesButton.addEventListener(
    "click",
    function() {

        window.location.href =
            "quotes.html";
    }
);

BackButton.addEventListener(
    "click",
    function() {

        window.location.href =
            "pleasure.html";
    }
);

let touchStartX = 0;
let touchEndX = 0;

AlbumImage.addEventListener(
    "touchstart",
    function(event) {

        touchStartX =
            event.changedTouches[0].screenX;
    }
);

AlbumImage.addEventListener(
    "touchend",
    function(event) {

        touchEndX =
            event.changedTouches[0].screenX;

        const swipeDistance =
            touchEndX - touchStartX;

        if (Math.abs(swipeDistance) < 50) {
            return;
        }

        if (swipeDistance < 0) {

            currentPicture++;

            if (currentPicture >= album.length) {
                currentPicture = 0;
            }

        } else {

            currentPicture--;

            if (currentPicture < 0) {
                currentPicture =
                    album.length - 1;
            }
        }

        showPicture();
    }
);

showPicture();
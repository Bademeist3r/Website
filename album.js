const PreviousButton = document.getElementById("PreviousButton");
const NextButton = document.getElementById("NextButton");
const AddButton = document.getElementById("AddButton");
const ImageUpload = document.getElementById("ImageUpload");

const AlbumImage = document.getElementById("AlbumImage");
const polaroidInner = document.querySelector(".polaroid-inner");
const polaroidBack = document.querySelector(".polaroid-back");
const Note = document.getElementById("Note");

const defaultPictures = [
    "pics/elevator.png",
    "pics/castle.png",
    "pics/paddl.png"
];

let album = JSON.parse(localStorage.getItem("album")) || [];

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
    localStorage.setItem("album", JSON.stringify(album));
}

function showPicture() {
    AlbumImage.src = album[currentPicture].image;
    Note.value = album[currentPicture].note;

    polaroidInner.classList.remove("flipped");
}

AlbumImage.addEventListener("click", function() {
    polaroidInner.classList.add("flipped");
});

polaroidBack.addEventListener("click", function(event) {
    if (event.target !== Note) {
        polaroidInner.classList.remove("flipped");
    }
});

Note.addEventListener("click", function(event) {
    event.stopPropagation();
});

Note.addEventListener("input", function() {
    album[currentPicture].note = Note.value;
    saveAlbum();
});

PreviousButton.addEventListener("click", function() {
    currentPicture--;

    if (currentPicture < 0) {
        currentPicture = album.length - 1;
    }

    showPicture();
});

NextButton.addEventListener("click", function() {
    currentPicture++;

    if (currentPicture >= album.length) {
        currentPicture = 0;
    }

    showPicture();
});

AddButton.addEventListener("click", function() {
    ImageUpload.click();
});

ImageUpload.addEventListener("change", function(event) {
    const file = event.target.files[0];

    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        album.push({
            image: e.target.result,
            note: ""
        });

        currentPicture = album.length - 1;

        saveAlbum();
        showPicture();
    };

    reader.readAsDataURL(file);

    ImageUpload.value = "";
});

showPicture();
const PreviousButton = document.getElementById("PreviousButton");
const NextButton = document.getElementById("NextButton");
const AddButton = document.getElementById("AddButton");

const ImageUpload = document.getElementById("ImageUpload");

const AlbumImage = document.getElementById("AlbumImage");

const polaroidInner = document.querySelector(".polaroid-inner");
const polaroidBack = document.querySelector(".polaroid-back");

const Note = document.getElementById("Note");
const ClickHint = document.getElementById("ClickHint");
const QuotesButton = document.getElementById("QuotesButton");

// =========================================
// STANDARD-BILDER
// =========================================

const defaultPictures = [
    "pics/elevator.png",
    "pics/castle.png",
    "pics/paddl.png"
];


//=========================================
///Quotes
///=========================================

QuotesButton.addEventListener("click", function() {

    window.location.href = "quotes.html";

});

// =========================================
// ALBUM LADEN
// =========================================

let album = JSON.parse(
    localStorage.getItem("album")
) || [];


// Falls noch kein Album existiert
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


// =========================================
// ALBUM SPEICHERN
// =========================================

function saveAlbum() {

    localStorage.setItem(
        "album",
        JSON.stringify(album)
    );
}


// =========================================
// BILD ANZEIGEN
// =========================================

function showPicture() {

    if (album.length === 0) {
        return;
    }

    AlbumImage.src =
        album[currentPicture].image;

    Note.value =
        album[currentPicture].note;

    // Immer Vorderseite anzeigen
    polaroidInner.classList.remove("flipped");
}


// =========================================
// FOTO → RÜCKSEITE
// =========================================

AlbumImage.addEventListener("click", function() {

    polaroidInner.classList.add("flipped");
    ClickHint.classList.add("hidden");

});


// =========================================
// RÜCKSEITE → VORDERSEITE
// =========================================

polaroidBack.addEventListener("click", function(event) {

    if (event.target !== Note) {

        polaroidInner.classList.remove("flipped");

    }

});


// Verhindert, dass ein Klick
// in das Textfeld die Karte zurückdreht

Note.addEventListener("click", function(event) {

    event.stopPropagation();

});


// =========================================
// NOTIZ SPEICHERN
// =========================================

Note.addEventListener("input", function() {

    album[currentPicture].note =
        Note.value;

    saveAlbum();

});


// =========================================
// VORHERIGES BILD
// =========================================

PreviousButton.addEventListener("click", function() {

    currentPicture--;

    if (currentPicture < 0) {

        currentPicture =
            album.length - 1;
    }

    showPicture();

});


// =========================================
// NÄCHSTES BILD
// =========================================

NextButton.addEventListener("click", function() {

    currentPicture++;

    if (currentPicture >= album.length) {

        currentPicture = 0;
    }

    showPicture();

});


// =========================================
// + BUTTON
// =========================================

AddButton.addEventListener("click", function() {

    ImageUpload.click();

});


// =========================================
// BILD HINZUFÜGEN
// =========================================

ImageUpload.addEventListener("change", function(event) {

    const file = event.target.files[0];

    if (!file) {
        return;
    }


    // Nur Bilder erlauben
    if (!file.type.startsWith("image/")) {

        return;
    }


    const reader = new FileReader();


    reader.onload = function(e) {

        album.push({

            image: e.target.result,

            note: ""

        });


        // Neues Bild auswählen
        currentPicture =
            album.length - 1;


        saveAlbum();

        showPicture();


        // Kleiner romantischer Effekt
        AlbumImage.style.transform =
            "scale(1.03)";


        setTimeout(function() {

            AlbumImage.style.transform =
                "scale(1)";

        }, 300);

    };


    reader.readAsDataURL(file);


    // Damit dasselbe Bild
    // direkt nochmal gewählt werden kann
    ImageUpload.value = "";

});


// =========================================
// ALBUM STARTEN
// =========================================

showPicture();
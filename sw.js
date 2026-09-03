const CACHE_NAME = "unsere-erinnerungen-v1";

const FILES = [
    "question.html",
    "pleasure.html",
    "album.html",
    "quotes.html",
    "style.css",
    "question.js",
    "pleasure.js",
    "album.js",
    "quotes.js",
    "pics/elevator.png",
    "pics/castle.png",
    "pics/paddl.png",
    "pics/back.png",
    "pics/add.png"
];


self.addEventListener("install", function(event) {

    event.waitUntil(

        caches.open(CACHE_NAME).then(function(cache) {

            return cache.addAll(FILES);

        })

    );

});


self.addEventListener("fetch", function(event) {

    event.respondWith(

        caches.match(event.request).then(function(response) {

            return response ||
                fetch(event.request);

        })

    );

});
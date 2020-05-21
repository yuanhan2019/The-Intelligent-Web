var dataCacheName = 'finalData-v1';
var cacheName = 'finalPWA-step-8-1';
var filesToCache = [
    '/',
    '/javascripts/edit.js',
    '/javascripts/initHome.js',
    '/javascripts/login.js',
    '/javascripts/profile.js',
    '/javascripts/signup.js',
    '/javascripts/upload_story.js',
    '/javascripts/idb.js',
    '/javascripts/database.js',
    '/javascripts/app.js',
    '/imaages/bg.jpeg',
    '/imaages/delete.png',
    '/imaages/post1.jpg',
    '/imaages/post2.jpg',
    '/imaages/post3.jpg',
    '/imaages/story1.jpg',
    '/imaages/story2.jpeg',
    '/imaages/story3.jpg',
    '/imaages/bg.jpeg',
    '/imaages/bg.jpeg',
    '/stylesheets/style.css',
    '/stylesheets/fontawesome-free-5.12.1-web/css/all.min.css',
    '/scripts/idb.js',
];
/**
 * installation event: it adds all the files to be cached
 */
self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});


/**
 * activation of service worker: it removes all cashed files if necessary
 */
self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName && key !== dataCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

var dataCacheName = 'finalData-v1';
var cacheName = 'finalPWA-step-8-1';
var filesToCache = [
    '/',
    '/javascripts/app.js',
    '/javascripts/database.js',
    '/javascripts/edit.js',
    '/javascripts/initHome.js',
    '/javascripts/login.js',
    '/javascripts/profile.js',
    '/javascripts/signup.js',
    '/javascripts/upload_story.js',
    '/javascripts/idb.js',
    '/images/bg.jpeg',
    '/images/delete.png',
    '/images/post1.jpg',
    '/images/post2.jpg',
    '/images/post3.jpg',
    '/images/story1.jpg',
    '/images/story2.jpeg',
    '/images/story3.jpg',
    '/stylesheets/style.css',
    '/stylesheets/fontawesome-free-5.12.1-web/css/all.min.css',
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

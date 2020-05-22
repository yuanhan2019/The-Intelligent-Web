if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./javascripts/service-worker.js')
        .then(function () {
            console.log('Service Worker Registered');
        })
        .catch (function (error){
            console.log('Service Worker NOT Registered '+ error.message);
        });
}
//check for support
if ('indexedDB' in window) {
    initDatabase();
}
else {
    console.log('This browser doesn\'t support IndexedDB');
}
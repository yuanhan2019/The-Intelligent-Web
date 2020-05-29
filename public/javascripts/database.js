var dbPromise;
var dbPromise1;

const FINAL_DB_NAME= 'db_final_1';
const USER_STORE_NAME= 'store_users';
const STORIES_STORE_NAME= 'store_userstories';
/**
 * it clears the database
 */
function clearData(){
    idb.deleteDb(FINAL_DB_NAME);
}

/**
 * /**
 * it clears the database
 */
function clearstoriesData(){
    if (dbPromise) {
        dbPromise.then(async db => {
            var tx = db.transaction(STORIES_STORE_NAME, 'readwrite');
            var store = tx.objectStore(STORIES_STORE_NAME);
            //console.log(store.get(storiesObject._id));
            // var index = store.index('stories');
            // var request = store.get(storiesObject._id);
            // console.log(index.get(storiesObject._id).result);
            //addstoriesstate(store,storiesObject._id);
            await store.clear();

        }).then(function () {
            // console.log('added item to the store! ' + JSON.stringify(storiesObject));
        }).catch(function (error) {
        });
    }
}
/**
 * it inits the database
 */
function initDatabase(){
    dbPromise = idb.openDb(FINAL_DB_NAME, 1, function (upgradeDb) {
        if (!upgradeDb.objectStoreNames.contains(USER_STORE_NAME)) {
            var userDB = upgradeDb.createObjectStore(USER_STORE_NAME, {keyPath: 'id', autoIncrement: true});
            userDB.createIndex('username', 'username', {unique: false, multiEntry: true});
        }
        if (!upgradeDb.objectStoreNames.contains(STORIES_STORE_NAME)) {
            var userstoriesDB = upgradeDb.createObjectStore(STORIES_STORE_NAME, {keyPath: 'id', autoIncrement: true});
            userstoriesDB.createIndex('stories', 'username', {unique: false, multiEntry: true});
        }
    });
}
//user store
function userstoreCachedData(userObject) {
    if (dbPromise) {
        dbPromise.then(async db => {
            var tx = db.transaction(USER_STORE_NAME, 'readwrite');
            var store = tx.objectStore(USER_STORE_NAME);
            await store.put(userObject[0]);
        }).then(function () {
            //console.log('added item to the store! '+ JSON.stringify(userObject[0]));
            localStorage.user=JSON.stringify(userObject[0]);
        }).catch(function (error) {
            localStorage.user=JSON.stringify(userObject[0]);
        });
    }
    else
           localStorage.user=JSON.stringify(userObject[0]);
}

//userstories store
function userstoriesstoreCachedData(storiesObject) {
        if (dbPromise) {
            dbPromise.then(async db => {
                var tx = db.transaction(STORIES_STORE_NAME, 'readwrite');
                var store = tx.objectStore(STORIES_STORE_NAME);
                //console.log(store.get(storiesObject._id));
               // var index = store.index('stories');
               // var request = store.get(storiesObject._id);
                // console.log(index.get(storiesObject._id).result);
                //addstoriesstate(store,storiesObject._id);
                await store.put(storiesObject);


            }).then(function () {
               // console.log('added item to the store! ' + JSON.stringify(storiesObject));
            }).catch(function (error) {
            });
        }
}

function getCachedData() {
    if (dbPromise) {
        dbPromise.then(async db => {
            var tx = db.transaction(STORIES_STORE_NAME, 'readonly');
            var store = tx.objectStore(STORIES_STORE_NAME);
            //var index = store.index('stories');
           // CachedData=index.getAll();
            var index = store.index('stories');
            var resultIdb = await index.getAll();
            return resultIdb;
        }).then(async function (value_object) {
            // console.log('added item to the store! ' + JSON.stringify(storiesObject));
                if(value_object && value_object.length>0) {
                  initdatas(value_object);
                }
        }).catch(function (error) {
        });
    }
}


/**
 * it retrieves the forecasts data for a city from the database
 * @param username
 * @param storyid
 * @returns {*}
 */
// function getCachedData(username, storyid) {
//     if (dbPromise) {
//         dbPromise.then(function (db) {
//             console.log('fetching: '+username);
//             var tx = db.transaction(STORIES_STORE_NAME, 'readonly');
//             var store = tx.objectStore(STORIES_STORE_NAME);
//             var index = store.index('stories');
//             return index.getAll(IDBKeyRange.only(username));
//         }).then(function (readingsList) {
//             if (readingsList && readingsList.length>0){
//                 var max;
//                 for (var elem of readingsList)
//                     if (!max || elem.date>max.date)
//                         max= elem;
//                 if (max) addToResults(max);
//             } else {
//                 const value = localStorage.getItem(city);
//                 if (value == null)
//                     addToResults({city: city, date: date});
//                 else addToResults(value);
//             }
//         });
//     } else {
//         const value = localStorage.getItem(city);
//         if (value == null)
//             addToResults( {city: city, date: date});
//         else addToResults(value);
//     }
// }
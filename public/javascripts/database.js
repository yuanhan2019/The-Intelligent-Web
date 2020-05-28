var dbPromise;
var dbPromise1;

const FINAL_DB_NAME= 'db_final_1';
const USER_STORE_NAME= 'store_users';
const STORIES_STORE_NAME= 'store_userstories';
/**
 * it clears the database
 */
function clearData(){
    dbPromise1 = idb.openDb(FINAL_DB_NAME, 1, function (upgradeDb) {
        if (upgradeDb.objectStoreNames.contains(USER_STORE_NAME)) {
            var tx = db.transaction(USER_STORE_NAME, 'readwrite');
            var store = tx.objectStore(USER_STORE_NAME);
            store.clear();
        }
        if (upgradeDb.objectStoreNames.contains(STORIES_STORE_NAME)) {
            var tx = db.transaction(STORIES_STORE_NAME, 'readwrite');
            var store = tx.objectStore(STORIES_STORE_NAME);
            store.clear();
        }
    });
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
            return tx.complete;
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
function userstoriesstoreCachedData(username, storiesObject) {
        if (dbPromise) {
            dbPromise.then(async db => {
                var tx = db.transaction(STORIES_STORE_NAME, 'readwrite');
                var store = tx.objectStore(STORIES_STORE_NAME);
                await store.put(storiesObject);
                return tx.complete;
            }).then(function () {
               // console.log('added item to the store! ' + JSON.stringify(storiesObject));
            }).catch(function (error) {
            });
        }
        //else
}

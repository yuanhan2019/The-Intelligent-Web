var dbPromise;

const FINAL_DB_NAME= 'db_final_1';
const USER_STORE_NAME= 'store_users';
const STORIES_STORE_NAME= 'store_userstories';

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
            userstoriesDB.createIndex('username', 'username', {unique: false, multiEntry: true});
        }
    });
}
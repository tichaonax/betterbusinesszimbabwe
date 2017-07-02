/**
 * Created by tichaona on 7/1/17.
 */
var {BBZ_DATABASE_PATH} = require('../../constants/Database');
var bbzSqlite = require('../../dao/sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var updateFirebaseUserProfile = (firebaseId, displayName, email, photoURL, providerId) => {
    let sql = `UPDATE users SET 
    displayName = '${displayName}', 
    email = '${email}', 
    photoURL = '${photoURL}', 
    providerId = '${providerId}', 
    WHERE firebaseId = '${firebaseId}';`;
    return db.prepare(sql).run();
}

module.exports = updateFirebaseUserProfile;
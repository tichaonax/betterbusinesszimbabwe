/**
 * Created by tichaona on 6/29/17.
 */
var {BBZ_DATABASE_PATH} = require ('../../constants/Database');
var bbzSqlite = require('../../dao/sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var insertUser = (firebaseId, displayName, email, photoURL, providerId, uid, reviewCount) => {
    let sql = `INSERT INTO users 
    (firebaseId, displayName, email, photoURL, providerId, uid, reviewCount)
     VALUES ('${firebaseId}', '${displayName}', '${email}', '${photoURL}', '${providerId}', '${uid}', ${reviewCount})`;
    return db.prepare(sql).run();
}

module.exports = insertUser;

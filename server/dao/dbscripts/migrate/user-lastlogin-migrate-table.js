/**
 * Created by tichaona on 6/30/17.
 */
var firebase = require('firebase');
var {getFirebaseConfig} = require('../../../../playground/firebaseConfig');

var {BBZ_DATABASE_PATH} = require('../../../constants/Database');
var bbzSqlite = require('../../../dao/sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);
try {
    firebase.initializeApp(getFirebaseConfig());
} catch (e) {

}

var migrateUserLastLoginTable = (userId, city, country, ipAddress, loginAt) => {
    let sql = `UPDATE users SET 
    city = '${city}', 
    country = '${country}', 
    ipAddress = '${ipAddress}',
    loginAt = '${loginAt}' 
    WHERE userId = ${userId};`;
    //console.log("sql",sql);
    return db.prepare(sql).run();
}

module.exports = migrateUserLastLoginTable;
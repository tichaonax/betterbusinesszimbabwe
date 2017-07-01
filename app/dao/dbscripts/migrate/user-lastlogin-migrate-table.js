/**
 * Created by tichaona on 6/30/17.
 */
var firebase = require('firebase');
var {getFirebaseConfig} = require('../../../../playground/firebaseConfig');

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
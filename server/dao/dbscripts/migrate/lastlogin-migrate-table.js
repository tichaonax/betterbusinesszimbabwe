/**
 * Created by tichaona on 6/30/17.
 */
var firebase = require('firebase');
var insertLastLogin = require('../../lastlogin/insertLastLogin');
var {findLastLoginById, findLastLoginById} = require('../../lastlogin/findLastLoginById');
var {getFirebaseConfig} = require('../../../../playground/firebaseConfig');

try {
    firebase.initializeApp(getFirebaseConfig());
} catch (e) {

}

var migrateLastLoginTable = (userId, city, country, ipAddress, loginAt) => {
    var insertRow = insertLastLogin(userId, city, country, ipAddress, loginAt);
   // console.log("insertRow:", findLastLoginById(insertRow.lastInsertROWID));
}

module.exports = migrateLastLoginTable;
/**
 * Created by tichaona on 6/30/17.
 */
var moment = require('moment');
var firebase = require('firebase');
var insertUser = require('../../users/insertUser');
var findUserById = require('../../users/findUserById');
var {getFirebaseConfig} = require('../../../../playground/firebaseConfig');
var migrateLastLoginTable = require('./lastlogin-migrate-table');
var migrateUserLastLoginTable = require('./user-lastlogin-migrate-table');
try {
    firebase.initializeApp(getFirebaseConfig());
} catch (e) {

}

var parseLastLogin = (lastLogins) => {
    var parsedLastLogins = [];

    Object.keys(lastLogins).forEach((lastLogin) => {
        parsedLastLogins.push({
            id: lastLogin,
            city: lastLogins[lastLogin].city,
            country: lastLogins[lastLogin].country,
            ipAddress: lastLogins[lastLogin].ipAddress,
            loginAt: lastLogins[lastLogin].loginAt
        });
    })

    return parsedLastLogins;
}


var migrateUsersTable = () => {
    var firebaseRef = firebase.database().ref();
    var userItemRef = firebaseRef.child(`users`);
    console.log("migrate Users Table");
    return userItemRef.once('value').then((snapshot) => {
        var userItems = snapshot.val() || {}; //return available data or empty object

        var parsedUserItems = [];

        Object.keys(userItems).forEach((userItemId) => {
            parsedUserItems.push({
                userItemId: userItemId,
                userProfile: userItems[userItemId].userProfile,
                reviewCount: userItems[userItemId].reviewCount
            });
        });

        parsedUserItems.map((userItem) => {
            if (userItem.userProfile) {
                let obj = userItem.userProfile;
                let firebaseId = userItem.userItemId;
                let displayName = obj.displayName;
                let email = obj.email;
                let photoURL = obj.photoURL;
                let providerId = obj.providerId;
                let uid = obj.userId;
                let reviewCount = (userItem.reviewCount) ? parseInt(userItem.reviewCount, 10) : 0;
                let isSuperUser = (obj.isSuperUser) ? 1 : 0;
                let isAdmin = (obj.isAdmin) ? 1 : 0;
                let lastLogins = userItem.userProfile.lastLogins;
                var insertRow = insertUser(firebaseId, displayName, email, photoURL, providerId, uid, reviewCount, isSuperUser, isAdmin);

                let lastlogins = parseLastLogin(lastLogins);

                if (lastlogins.length > 0) {
                    let city = lastlogins[0].city;
                    let country = lastlogins[0].country;
                    let ipAddress = lastlogins[0].ipAddress;
                    let loginAt = moment.unix(lastlogins[0].loginAt).format('YYYY-MM-DD HH:MM:SS');
                    if (lastlogins.length > 1) {
                        migrateLastLoginTable(insertRow.lastInsertROWID, city, country, ipAddress, loginAt);
                        city = lastlogins[1].city;
                        country = lastlogins[1].country;
                        ipAddress = lastlogins[1].ipAddress;
                        loginAt = moment.unix(lastlogins[1].loginAt).format('YYYY-MM-DD HH:MM:SS');
                        migrateUserLastLoginTable(insertRow.lastInsertROWID, city, country, ipAddress, loginAt);
                    } else {
                        migrateUserLastLoginTable(insertRow.lastInsertROWID, city, country, ipAddress, loginAt);
                    }
                }
            }
        });
    })
}

module.exports = migrateUsersTable;
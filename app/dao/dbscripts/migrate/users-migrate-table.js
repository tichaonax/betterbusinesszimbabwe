/**
 * Created by tichaona on 6/30/17.
 */
var firebase = require('firebase');
var insertUser = require('../../users/insertUser');
var findUserById = require('../../users/findUserById');
var {getFirebaseConfig} = require('../../../../playground/firebaseConfig');
var migrateLastLoginTable = require('./lastlogin-migrate-table');

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
            ipAddress: lastLogins[lastLogin].ipAddress
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

        //console.log("parsedUserItems",parsedUserItems);
        parsedUserItems.map((userItem) => {
            if (userItem.userProfile) {
                let obj = userItem.userProfile;
                let firebaseId = userItem.userItemId;
                let displayName = obj.displayName;
                let email = obj.email;
                let photoURL = obj.photoURL;
                let providerId = obj.providerId;
                let uid = obj.userId;
                let reviewCount = (userItem.reviewCount) ? parseInt(userItem.reviewCount, 10) :0;
                let lastLogins = userItem.userProfile.lastLogins;
                //console.log("firebaseId",firebaseId, displayName, email, photoURL, providerId, uid, reviewCount);

                var insertRow = insertUser(firebaseId, displayName, email, photoURL, providerId, uid, reviewCount);

                //console.log("insertRow:", findUserById(insertRow.lastInsertROWID));
                let lastlogins = parseLastLogin(lastLogins);
                //console.log("lastlogins",lastlogins);

                if (lastlogins) {
                    if (lastlogins.length === 2) {
                        migrateLastLoginTable(
                            insertRow.lastInsertROWID,
                            lastlogins[1].city,
                            lastlogins[1].country,
                            lastlogins[1].ipAddress,
                            (lastlogins[1].loginAt) ? parseInt(lastlogins[1].loginAt, 10) : 1497742583);
                    } else {
                        migrateLastLoginTable(
                            insertRow.lastInsertROWID,
                            lastlogins[0].city,
                            lastlogins[0].country,
                            lastlogins[0].ipAddress,
                            (lastlogins[0].loginAt) ? parseInt(lastlogins[0].loginAt, 10) : 1497742583);
                    }
                }
            }
        });
    })
}

module.exports = migrateUsersTable;
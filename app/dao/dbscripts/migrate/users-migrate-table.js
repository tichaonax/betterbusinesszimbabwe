/**
 * Created by tichaona on 6/30/17.
 */
var firebase = require('firebase');
var insertUser = require('../../users/insertUser');
var findUserById = require('../../users/findUserById');
var {getFirebaseConfig} = require('../../../../playground/firebaseConfig');

try {
    firebase.initializeApp(getFirebaseConfig());
} catch (e) {

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
                var insertRow = insertUser(firebaseId, displayName, email, photoURL, providerId, uid, reviewCount);
                //console.log("insertRow:", findUserById(insertRow.lastInsertROWID));
            }
        });
    })
}

module.exports = migrateUsersTable;
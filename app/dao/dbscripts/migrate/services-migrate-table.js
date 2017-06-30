/**
 * Created by tichaona on 6/30/17.
 */
var firebase =require('firebase');
var insertService = require('../../services/insertService');
var findServiceById = require('../../services/findServiceById');
var {getFirebaseConfig} = require('../../../../playground/firebaseConfig');

try {
    firebase.initializeApp(getFirebaseConfig());
} catch (e) {

}

var migrateServicesTable = () => {
    var firebaseRef = firebase.database().ref();
    var serviceItemRef = firebaseRef.child(`services`);
    console.log("migrate Services Table");
    serviceItemRef.orderByChild("serviceTitle").startAt("A").endAt("Z").on("child_added", function (data) {
        let serviceItemId = data.val().serviceId;
        let serviceCategory = data.val().serviceTitle;

        var insertRow = insertService(serviceItemId, serviceCategory);
        //console.log("insertRow:", findServiceById(insertRow.lastInsertROWID));
    });
}

module.exports = migrateServicesTable;
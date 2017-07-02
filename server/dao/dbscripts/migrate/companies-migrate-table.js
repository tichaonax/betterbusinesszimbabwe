/**
 * Created by tichaona on 6/30/17.
 */
var moment = require('moment');
var firebase = require('firebase');

var findUserByFirebaseId = require('../../users/findUserByFirebaseId');
var findServiceByItemId = require('../../services/findServiceByItemId');
var insertCompany = require('../../companies/insertCompany');
var insertReview = require('../../reviews/insertReview');
var findcCmpanyById = require('../../companies/findCompanyById');
var {getFirebaseConfig} = require('../../../../playground/firebaseConfig');

try {
    firebase.initializeApp(getFirebaseConfig());
} catch (e) {

}

var migrateCompaniesTable = () => {
    var firebaseRef = firebase.database().ref();
    var companyItemRef = firebaseRef.child(`companies`);
    console.log("migrate Companies Table");
    return companyItemRef.once('value').then((snapshot) => {
        var companyItems = snapshot.val() || {}; //return available data or empty object

        var parsedCompanyItems = [];

        Object.keys(companyItems).forEach((companyItemId) => {
            parsedCompanyItems.push({
                companyItemId: companyItemId,
                companyDesc: companyItems[companyItemId].companyDesc,
                companyTitle: companyItems[companyItemId].companyTitle,
                createAt: companyItems[companyItemId].createAt,
                isApproved: companyItems[companyItemId].isApproved,
                rating: companyItems[companyItemId].rating,
                reviewCount: companyItems[companyItemId].reviewCount,
                serviceCategory: companyItems[companyItemId].serviceCategory,
                serviceItemId: companyItems[companyItemId].serviceItemId,
                uid: companyItems[companyItemId].uid,
                updateAt: companyItems[companyItemId].updateAt,
            });
        });

        parsedCompanyItems.map((companyItem) => {

            //1 Need to get the userId
            let userId = findUserByFirebaseId(companyItem.uid).userId;

            //console.log("userId", userId);
            // get serviceId of the company

            let serviceId;
            var serviceItemRef = firebaseRef.child(`services/${companyItem.serviceItemId}`);
            return serviceItemRef.once('value').then((snapshot) => {
                var serviceItem = snapshot.val() || {};
                //console.log("serviceItem", companyItem.serviceItemId, serviceItem.serviceId);
                serviceId = findServiceByItemId(serviceItem.serviceId).serviceId;
                //console.log("serviceId",serviceId);

                isApproved = (companyItem.isApproved) ? 1 : 0;
                createAt = moment.unix(companyItem.createAt).format('YYYY-MM-DD HH:MM:SS');

                let insertRow = insertCompany(userId, serviceId,
                    companyItem.companyTitle, companyItem.companyDesc,
                    companyItem.rating, companyItem.reviewCount,
                    isApproved, createAt);
                return (insertRow.lastInsertROWID);
            }).then((companyId) => {
                //we need to migrate all reviews for this company
                var reviewItemRef = firebaseRef.child(`reviews`);
                console.log("migrate Review Table");
                return reviewItemRef.once('value').then((snapshot) => {
                    var reviewItems = snapshot.val() || {}; //return available data or empty object

                    var parsedReviewItems = [];

                    Object.keys(reviewItems).forEach((reviewItemId) => {
                        if (reviewItems[reviewItemId].companyItemId == companyItem.companyItemId) {
                            parsedReviewItems.push({
                                //reviewItemId: reviewItemId,
                                adminUid: reviewItems[reviewItemId].adminUid,
                                companyItemId: reviewItems[reviewItemId].companyItemId,
                                companyTitle: reviewItems[reviewItemId].companyTitle,
                                //displayName: reviewItems[reviewItemId].displayName,
                                //email: reviewItems[reviewItemId].email,
                                isApproved: reviewItems[reviewItemId].isApproved,
                                //photoURL: reviewItems[reviewItemId].photoURL,
                                rating: reviewItems[reviewItemId].rating,
                                uid: reviewItems[reviewItemId].uid,
                                //updateAt: reviewItems[reviewItemId].updateAt,
                                createAt:  reviewItems[reviewItemId].createAt,
                                review: reviewItems[reviewItemId].review
                            });
                        }
                    });
                    //console.log("parsedReviewItems",parsedReviewItems);

                    parsedReviewItems.map((reviewItem) => {

                        let reviewIsApproved = (reviewItem.isApproved) ? 1 : 0;
                        let reviewCreateAt = moment.unix(reviewItem.createAt).format('YYYY-MM-DD HH:MM:SS');
                        let reviewUserId = findUserByFirebaseId(reviewItem.uid).userId;
                        let reviewAdminUserId = findUserByFirebaseId(reviewItem.adminUid).userId;
                        insertReview(reviewUserId, reviewAdminUserId,
                            companyId, reviewItem.rating,
                            reviewItem.review,
                            reviewIsApproved, reviewCreateAt);
                    });
                })
            });
        });
    })
}

module.exports = migrateCompaniesTable;
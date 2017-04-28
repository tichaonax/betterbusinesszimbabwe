import moment from 'moment';
var errorActions = require('errorActions');

import firebase, {firebaseRef, githubProvider} from 'app/firebase/index';

export var addReviewItem = (reviewItem) => {
    return {
        type: 'ADD_REVIEW_ITEM',
        reviewItem
    };
};

export var startAddNewReviewItem = (uid, companyItemId, review, rating) => {
    return (dispatch, getState) => {
        var reviewItem = {
            uid: uid,
            companyItemId: companyItemId,
            review: review,
            rating: rating,
            createAt: moment().unix(),
            updateAt: null,
            approved: false
        }

        //This will add a mew review item to firebase and dispatch the newly created
        var reviewItemRef = firebaseRef.child(`reviews`).push(reviewItem);
        return reviewItemRef.then(() => {
            dispatch(addReviewItem({
                ...reviewItem,
                reviewItemId: reviewItemRef.key
            }));
        }, (error) => {
            console.log("Unable to add new review", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            return dispatch(errorActions.bbzReportError(errorObj));
        });
    };
};

export var addReviewItems = (reviewItems) => {
    return {
        type: 'ADD_REVIEW_ITEMS',
        reviewItems
    };
};

export var startAddReviewItems = () => {
    return (dispatch, getState) => {
        var reviewItemRef = firebaseRef.child(`reviews`);
        return reviewItemRef.once('value').then((snapshot) => {
            var reviewItems = snapshot.val() || {}; //return available data or empty object

            var parsedReviewItems = [];

            Object.keys(reviewItems).forEach((reviewItemId) => {
                parsedReviewItems.push({
                    reviewItemId: reviewItemId,
                    ...reviewItems[reviewItemId]
                });
            });

            dispatch(addReviewItems(parsedReviewItems));
        }, (error) => {
            console.log("Unable to fetch reviews", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            return dispatch(errorActions.bbzReportError(errorObj));
        });
    };
};

export var deleteReviewItem = (reviewItemId) => {
    return {
        type: 'DELETE_REVIEW_ITEM',
        reviewItemId
    };
};

export var startDeleteReviewItem = (reviewItemId) => {
    return (dispatch, getState) => {
        var reviewItemRef = firebaseRef.child(`reviews/${reviewItemId}`); //ES6 syntax

        return reviewItemRef.remove().then(() => {
            dispatch(deleteReviewItem(reviewItemId));
        }, (error) => {
            console.log("Unable to fetch reviews", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            return dispatch(errorActions.bbzReportError(errorObj));
        });
    };
};

export var updateReviewItem = (reviewItemId, updates) => {
    return {
        type: 'UPDATE_REVIEW_ITEM',
        reviewItemId,
        updates
    };
};

export var startUpdateReviewItem = (reviewItemId, title, description) => {
    return (dispatch, getState) => {
        var reviewItemRef = firebaseRef.child(`reviews/${reviewItemId}`); //ES6 syntax

        var updates = {
            updateAt: moment().unix(),
            reviewTitle: title,
            reviewDesc: description
        };

        return reviewItemRef.update(updates).then(() => {  //return needed to chain our tests
            dispatch(updateReviewItem(reviewItemId, updates));
        }, (error) => {
            console.log("Unable to update review", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            return dispatch(errorActions.bbzReportError(errorObj));
        });
    };
};

export var setAddReviewOperation = (data, operation = 'ADD') => {
    return {
        type: 'SET_REVIEW_OPERATION',
        data,
        operation
    };
};

export var setUpdateReviewOperation = (data, operation = 'UPDATE') => {
    return {
        type: 'SET_REVIEW_OPERATION',
        data,
        operation
    };
};
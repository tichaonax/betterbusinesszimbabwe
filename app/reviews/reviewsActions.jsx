import moment from 'moment';
var errorActions = require('errorActions');
var companiesActions = require('companiesActions');

import firebase, {firebaseRef, githubProvider} from 'app/firebase/index';

export var addReviewItem = (reviewItem) => {
    return {
        type: 'ADD_REVIEW_ITEM',
        reviewItem
    };
};

export var startAddNewReviewItem = (uid, companyItemId, review, rating, companyTitle, displayName, email) => {
    return (dispatch, getState) => {
        var reviewItem = {
            uid: uid,
            companyItemId: companyItemId,
            companyTitle: companyTitle,
            review: review,
            rating: rating,
            createAt: moment().unix(),
            updateAt: null,
            isApproved: false,
            displayName: displayName,
            email: email
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
            console.debug("Unable to fetch reviews", error);
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
            console.debug("Unable to fetch reviews", error);
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

export var startUpdateReviewItem = (reviewItemId, review, rating, companyItemId) => {
    return (dispatch, getState) => {
        var reviewItemRef = firebaseRef.child(`reviews/${reviewItemId}`); //ES6 syntax

        var updates = {
            updateAt: moment().unix(),
            review: review,
            rating: rating,
            isApproved: false
        };

        return reviewItemRef.update(updates).then(() => {
                return dispatch(updateReviewItem(reviewItemId, updates));
            }
        ).then(
            () => {
                return dispatch(recalculateCompanyReview(companyItemId));
            }
        ).catch(
            (error) => {
                console.debug("Unable to update review", error);
                var errorObj = {
                    errorCode: error.code,
                    errorMessage: error.message
                };
                return dispatch(errorActions.bbzReportError(errorObj));
            });
    };
};


export var startApproveUpdateReviewItem = (reviewItemId, isApproved, companyItemId) => {
    return (dispatch, getState) => {
        var reviewItemRef = firebaseRef.child(`reviews/${reviewItemId}`);

        var updates = {
            isApproved: isApproved
        };

        return reviewItemRef.update(updates).then(() => {
            dispatch(updateReviewItem(reviewItemId, updates));
        }).then(
            () => {
                return dispatch(recalculateCompanyReview(companyItemId));
            }
        ).catch(
            (error) => {

                console.debug("Unable to update review", error);
                var errorObj = {
                    errorCode: error.code,
                    errorMessage: error.message
                };
                return dispatch(errorActions.bbzReportError(errorObj));
            }
        );
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

export var recalculateCompanyReview = (companyItemId) => {
    return (dispatch, getState) => {
        var reviewItemRef = firebaseRef.child(`reviews`);
        return reviewItemRef.once('value').then((snapshot) => {
            var reviewItems = snapshot.val() || {};

            var parsedReviewItems = [];

            Object.keys(reviewItems).forEach((reviewItemId) => {
                parsedReviewItems.push({
                    reviewItemId: reviewItemId,
                    ...reviewItems[reviewItemId]
                });
            });
            return (parsedReviewItems);
        }).then(
            (reviews) => {

                //we want to update the company affected based on currently approved reviews
                console.debug("Need to sumu all reviews of companyItemId", companyItemId);
                console.debug("Company reviews:", reviews);

                var ratingsTotal = 0;
                var newReviewCount = 0;

                reviews.map((review) => {
                    if (review.companyItemId == companyItemId && review.isApproved) {
                        ratingsTotal = ratingsTotal + review.rating;
                        newReviewCount++;
                    }
                });

                //round down to 0.5
                //rating of 2.74 becomes 2.5
                var newRating = 0;
                if (newReviewCount > 0) {
                    newRating = Math.round(ratingsTotal / newReviewCount * 2) / 2;
                }

                console.debug("Company reviews found:", newReviewCount);
                console.debug("Company new rating:", newRating);


                var updates = {
                    rating: newRating,
                    reviewCount: newReviewCount
                };

                var companyItemRef = firebaseRef.child(`companies/${companyItemId}`);
                return companyItemRef.update(updates).then(() => {
                    dispatch(companiesActions.updateCompanyItem(companyItemId, updates))
                })
            }
        );
    }
}
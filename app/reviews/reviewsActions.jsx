import moment from 'moment';
var errorActions = require('errorActions');
var companiesActions = require('companiesActions');
var usersActions = require('usersActions');
var loadingActions = require('loadingActions');

import firebase, {firebaseRef, githubProvider} from 'app/firebase/index';

export var addReviewItem = (reviewItem) => {
    return {
        type: 'ADD_REVIEW_ITEM',
        reviewItem
    };
};

export var startAddNewReviewItem = (uid, companyItemId, review, rating, companyTitle, displayName, email, photoURL) => {
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
            email: email,
            photoURL: photoURL
        }

        //This will add a mew review item to firebase and dispatch the newly created
        var reviewItemRef = firebaseRef.child(`reviews`).push(reviewItem);
        return reviewItemRef.then(() => {
            dispatch(addReviewItem({
                ...reviewItem,
                reviewItemId: reviewItemRef.key
            }));

            //clear recently addedCompany so the review select is deselected
            dispatch(companiesActions.clearRecentlyAddedCompany());

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
        dispatch(loadingActions.setLoadingStatus(true));
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

            dispatch(loadingActions.setLoadingStatus(false));
            dispatch(addReviewItems(parsedReviewItems));
        }, (error) => {
            console.debug("Unable to fetch reviews", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            dispatch(loadingActions.setLoadingStatus(false));
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

export var startUpdateReviewItem = (reviewItemId, review, rating, companyItemId, photoURL, uid, isApproved) => {
    //console.debug(" photoURL, uid, isApproved", photoURL, uid, isApproved);
    return (dispatch, getState) => {
        var reviewItemRef = firebaseRef.child(`reviews/${reviewItemId}`); //ES6 syntax

        var updates = {
            updateAt: moment().unix(),
            review: review,
            rating: rating,
            isApproved: false
        };

        if (photoURL) {
            updates["photoURL"] = photoURL;
        }

        return reviewItemRef.update(updates).then(() => {
                return dispatch(updateReviewItem(reviewItemId, updates));
            }
        ).then(()=>{
            if (isApproved) {
                return dispatch(recalculateUserReviewCount(uid, !isApproved))
            } else {
                return (null);
            }
        }).then(() => {
                return dispatch(recalculateCompanyReview(companyItemId));
            }
        ).catch((error) => {
                console.debug("Unable to update review", error);
                var errorObj = {
                    errorCode: error.code,
                    errorMessage: error.message
                };
                return dispatch(errorActions.bbzReportError(errorObj));
            });
    };
};

export var startApproveUpdateReviewItem = (reviewItemId, isApproved, companyItemId, uid, adminUid) => {
    //console.debug("startApproveUpdateReviewItem",reviewItemId, isApproved, companyItemId);
    return (dispatch, getState) => {
        var reviewItemRef = firebaseRef.child(`reviews/${reviewItemId}`);

        var updates = {
            isApproved: isApproved,
            adminUid: adminUid
        };

        return reviewItemRef.update(updates).then(() => {
            dispatch(updateReviewItem(reviewItemId, updates));
        }).then(
            () => {
                return dispatch(recalculateCompanyReview(companyItemId));
            }
        ).then(() => {
            return dispatch(recalculateUserReviewCount(uid, isApproved))
        }).catch(
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

export var recalculateUserReviewCount = (userItemId, isApproved) => {
    return (dispatch, getState) => {
        var userItemRef = firebaseRef.child(`users/${userItemId}`);
        return userItemRef.once('value').then((snapshot) => {
            var user = snapshot.val() || {};
            //console.debug("user", user);
            return (user);
        }).then(
            (user) => {
                if (user) {
                    //we want to update review count based on the isApproved flag
                    var newReviewCount = 0;

                    if (user.reviewCount) {
                        newReviewCount = user.reviewCount;
                    }

                    if (isApproved) {
                        newReviewCount = newReviewCount + 1;
                    } else {
                        newReviewCount = newReviewCount - 1;
                    }

                    if (newReviewCount < 0) {
                        newReviewCount = 0;
                    }

                    var updates = {
                        reviewCount: newReviewCount
                    };

                    return userItemRef.update(updates).then(() => {
                        dispatch(usersActions.updateUserItem(userItemId, updates))
                    })
                }
            }
        );
    }
}

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
                //console.debug("Need to sum up all reviews of companyItemId", companyItemId);
                //console.debug("Company reviews:", reviews);

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

                //console.debug("Company reviews found:", newReviewCount);
                //console.debug("Company new rating:", newRating);

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
import moment from 'moment';
var errorActions = require('errorActions');
var companiesSqliteActions = require('companiesSqliteActions');
var usersActions = require('usersActions');
var loadingActions = require('loadingActions');
var ReviewsApi = require('../api/reviewsApi');
var reviewsApi = new ReviewsApi();
var UsersApi = require('../api/usersApi');
var usersApi = new UsersApi();
var CompaniesApi = require('../api/companiesApi');
var companiesApi = new CompaniesApi();

import firebase, {firebaseRef, githubProvider} from 'app/firebase/index';

export var addReviewItem = (reviewItem) => {
    return {
        type: 'ADD_REVIEW_ITEM',
        reviewItem
    };
};

export var startAddNewReviewItem = (userId, companyId, review, rating) => {
    return (dispatch, getState) => {
        dispatch(loadingActions.setLoadingStatus(true));
        return reviewsApi.addNewReview(userId, companyId, review, rating).then((review) => {
            //console.debug("review", review.data);
            dispatch(addReviewItem(review.data));
            dispatch(loadingActions.setLoadingStatus(false));
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
        return reviewsApi.findAllReviews().then((reviews) => {
            //console.debug("reviews",reviews.data);
            dispatch(addReviewItems(reviews.data));
            dispatch(loadingActions.setLoadingStatus(false));
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

export var updateReviewItem = (reviewId, updates) => {
    //console.log("action updateReviewItem",reviewId, updates);
    return {
        type: 'UPDATE_REVIEW_ITEM',
        reviewId,
        updates
    };
};

export var startUpdateReviewItem = (reviewId, review, rating, userId, companyId, isApproved) => {
    console.log("***update review",reviewId, review, rating, userId, companyId, isApproved);
    return (dispatch, getState) => {
        dispatch(loadingActions.setLoadingStatus(true));
        return reviewsApi.updateReviewItem(reviewId, review, rating, userId).then((review) => {
                console.debug("review updated", review.data);
                let reviewItem = review.data;
                dispatch(updateReviewItem(reviewId, reviewItem));
                dispatch(loadingActions.setLoadingStatus(false));
                return (reviewItem);
            }
        ).then(() => {
            if (isApproved) {
                return dispatch(recalculateUserReviewCount(userId, !isApproved))
            } else {
                return (null);
            }
        }).then(() => {
                return dispatch(recalculateCompanyReview(companyId));
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

export var startApproveUpdateReviewItem = (reviewId, isApproved, companyId, userId, adminUserId) => {
    console.debug("startApproveUpdateReviewItem", reviewId, isApproved, companyId, userId, adminUserId);
    return (dispatch, getState) => {
        dispatch(loadingActions.setLoadingStatus(true));
        return reviewsApi.updateReviewIsApprovedFlag(reviewId, isApproved, adminUserId).then((review) => {
            //console.debug("review", review.data);
            let reviewItem = review.data;
            dispatch(updateReviewItem(reviewId, reviewItem));
            return dispatch(loadingActions.setLoadingStatus(false));
        }).then(
            () => {
                return dispatch(recalculateCompanyReview(companyId));
            }
        ).then(() => {
            return dispatch(recalculateUserReviewCount(userId, isApproved))
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

export var recalculateUserReviewCount = (userId, isApproved) => {
    return (dispatch, getState) => {
        dispatch(loadingActions.setLoadingStatus(true));
        return usersApi.findUserById(userId).then((reponse) => {
            let user = reponse.data;
            console.debug("user", user);
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

                    return usersApi.updateUserReviewCount(userId, newReviewCount).then((reponse) => {
                        let user = reponse.data;
                        console.debug("user updateUserReviewCount", user);
                        //dispatch(addReviewItems(reviews.data));
                        dispatch(loadingActions.setLoadingStatus(false));

                        dispatch(usersActions.updateUserItem(userId, user))
                    })
                }
            }
        );
    }
}

export var recalculateCompanyReview = (companyId) => {
    return (dispatch, getState) => {
        return reviewsApi.findCompanyReviewsById(companyId).then((response)=>{
            return (response.data);
        }).then(
            (reviews) => {
                console.log("company reviews", reviews);
                //we want to update the company affected based on currently approved reviews
                //console.debug("Need to sum up all reviews of companyItemId", companyItemId);
                //console.debug("Company reviews:", reviews);

                var ratingsTotal = 0;
                var newReviewCount = 0;

                reviews.map((review) => {
                    if (review.companyId == companyId && review.isApproved == 1) {
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

                //now update company

                return companiesApi.updateCompanyRatingInfo(companyId, newRating, newReviewCount).then((response) => {
                    console.log("ratings updated", response.data);
                    dispatch(companiesSqliteActions.updateCompanyItem(companyId, response.data))
                })
            }
        );
    }
}
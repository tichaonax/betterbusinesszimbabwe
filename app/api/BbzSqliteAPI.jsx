var React = require('react');
var $ = require('jquery');

module.exports = {

    getFilteredUsers: function (userItems, showApprovalPending, searchText, userId = 0) {
        //console.debug("searchText", searchText);
        var filteredUserItems = userItems;

        //filter by showApprovalPending

        filteredUserItems = filteredUserItems.filter((userItem) => {
            let approved = (userItem.isApproved == 1);
            return approved || showApprovalPending || userProfile.userId == userId
        });

        //filter by searchText

        if (searchText.length > 0 && userItems.length > 0) {
            filteredUserItems = filteredUserItems.filter((userItem) => {
                var userProfile = (userItem) ? userItem : {};
                //console.debug("userProfile**", userItem);
                const firebaseId = (userProfile.firebaseId) ? userProfile.firebaseId : "";
                const displayName = (userProfile.displayName) ? userProfile.displayName.toLowerCase() : "";
                const email = (userProfile.email) ? userProfile.email.toLowerCase() : "";
                const providerId = (userProfile.providerId) ? userProfile.providerId.toLowerCase() : "";
                var user = userProfile.userId;

                if (displayName.indexOf(searchText.toLowerCase()) > -1) {
                    return userProfile.displayName;
                } else if (email.indexOf(searchText.toLowerCase()) > -1) {
                    return userProfile.email;
                } else if (firebaseId.indexOf(searchText) > -1) {
                    return userProfile.firebaseId;
                } else if (providerId.indexOf(searchText) > -1) {
                    return userProfile.providerId;
                } else if (user == searchText) {
                    return userProfile.userId;
                }
            });


            //sort by with Admins first

            filteredUserItems.sort((a, b) => {
                if ((a.userItem && a.userItem.isAdmin == 1) && !(b.userItem && b.userItem.isAdmin == 1)) {
                    //take a first
                    return -1
                } else if (!(a.userItem && a.userItem.isAdmin == 1) && (b.userItem && b.userItem.isAdmin == 1)) {
                    // take b first
                    return 1;
                } else {
                    //a === b
                    //no change
                    return 0;
                }
            });
        }
        return (filteredUserItems);
    },

    getFilteredCompanies: function (companyItems, showApprovalPending, searchText, userId = 0) {
        //console.debug("getFilteredCompanies companyItems", companyItems);
        //console.debug("showApprovalPending", showApprovalPending);
        //console.debug("getFilteredCompanies userId", userId);
        var filteredCompanyItems = companyItems;

        //filter by showApprovalPending

        filteredCompanyItems = filteredCompanyItems.filter((companyItem) => {
            let approved = (companyItem.isApproved == 1);
            //console.log("isApproved, approved", companyItem.isApproved, approved);
            return approved || showApprovalPending || companyItem.userId === userId
        });

        //console.debug("getFilteredCompanies companyItems", filteredCompanyItems);

        //filter by searchText
        //we want to also search by company description and others
        //and company id which is stored as unix createAt date time
        if (searchText.length > 0) {
            filteredCompanyItems = filteredCompanyItems.filter((companyItem) => {
                const serviceCategory = (companyItem.serviceCategory) ? companyItem.serviceCategory.toLowerCase() : "";
                const companyTitle = (companyItem.companyTitle) ? companyItem.companyTitle.toLowerCase() : "";
                const companyDesc = (companyItem.companyDesc) ? companyItem.companyDesc.toLowerCase() : "";
                const companyId = companyItem.companyId;
                const rating = ((companyItem.rating) ? companyItem.rating : 0).toString();

                if (companyTitle.indexOf(searchText.toLowerCase()) > -1) {
                    return companyItem.companyTitle;
                } else if (companyDesc.indexOf(searchText.toLowerCase()) > -1) {
                    return companyItem.companyDesc;
                } else if (serviceCategory.indexOf(searchText.toLowerCase()) > -1) {
                    return companyItem.companyDesc;
                } else if (companyId == searchText) {
                    return companyItem.companyId;
                } else if (rating.indexOf(searchText.toLowerCase()) > -1) {
                    return companyItem.companyItemId;
                }
            });
        }


        //sort by recently updated first
        filteredCompanyItems.sort((a, b) => {
            if (a.updateAt > b.updateAt) {
                //take a first
                return -1
            } else if (a.updateAt < b.updateAt) {
                // take b first
                return 1;
            } else {
                //a === b
                //no change
                return 0;
            }
        });


        if(showApprovalPending){
            //sort companyItems with Approval Pending first
            filteredCompanyItems.sort((a, b) => {
                if (a.isApproved == 0 && b.isApproved == 1) {
                    //take a first
                    return -1
                } else if (a.isApproved == 1 && b.isApproved == 0) {
                    // take b first
                    return 1;
                } else {
                    //a === b
                    //no change
                    return 0;
                }
            });
        }


        filteredCompanyItems.sort((a, b) => {
            if (new Date(a.updateAt).getTime() > new Date(b.updateAt).getTime()) {
                //take a first
                return -1
            } else if (new Date(a.updateAt).getTime() < new Date(b.updateAt).getTime()) {
                // take b first
                return 1;
            } else {
                //a === b
                //no change
                return 0;
            }
        });


        return (filteredCompanyItems);
    },

    getFilteredReviews: function (reviewItems, showApprovalPending, searchText, userId = 0,
                                  showUserReviews = false, showCompanyReviews, companyId = 0) {
        var filteredReviewItems = reviewItems;

        //filter by showApprovalPending
        filteredReviewItems = filteredReviewItems.filter((reviewItem) => {
            let approved = (reviewItem.isApproved == 1);
            return approved || showApprovalPending || reviewItem.userId === userId
        });

        //console.log("getFilteredReviews showApprovalPending", filteredReviewItems);

        if (showUserReviews) {
            //just get the reviews of the passed user
            filteredReviewItems = filteredReviewItems.filter((reviewItem) => {
                return reviewItem.userId === userId
            });
        }

        //console.log("getFilteredReviews showUserReviews", filteredReviewItems);

        //filter by searchText
        //we want to also search by review description
        //and review id stored as unix createAt date time
        if (searchText.length > 0 && !showUserReviews) {
            filteredReviewItems = filteredReviewItems.filter((reviewItem) => {
                var companyTitle = reviewItem.companyTitle.toLowerCase();
                var review = reviewItem.review.toLowerCase();
                var reviewId = reviewItem.reviewId;
                var companyId = reviewItem.companyId;
                var user = reviewItem.userId;
                var displayName = reviewItem.displayName.toLowerCase();
                var email = reviewItem.email;

                let companyIdSearch = parseInt(searchText, 10) ? parseInt(searchText, 10) : 0;

                if (companyTitle.indexOf(searchText.toLowerCase()) > -1) {
                    return reviewItem.companyTitle;
                } else if (review.indexOf(searchText.toLowerCase()) > -1) {
                    return reviewItem.review;
                } else if (reviewId == searchText) {
                    return reviewItem.createAt;
                } else if (companyId == companyIdSearch) {
                    return reviewItem.companyId;
                } else if (user == searchText) {
                    return reviewItem.userId;
                }else if (displayName.indexOf(searchText.toLowerCase()) > -1) {
                    return reviewItem.displayName;
                }else if (email.indexOf(searchText.toLowerCase()) > -1) {
                    return reviewItem.email;
                }
            });
        }

        //console.log("searchText.length > 0 && !showUserReviews", filteredReviewItems);

        //sort by recently updated first
        filteredReviewItems.sort((a, b) => {
            if (new Date(a.updateAt).getTime() > new Date(b.updateAt).getTime()) {
                //take a first
                return -1
            } else if (new Date(a.updateAt).getTime() < new Date(b.updateAt).getTime()) {
                // take b first
                return 1;
            } else {
                //a === b
                //no change
                return 0;
            }
        });

        //sort reviewItems with Approval Pending first
        if (showApprovalPending) {
            filteredReviewItems.sort((a, b) => {
                if (a.isApproved == 0 && b.isApproved == 1) {
                    //take a first
                    return -1
                } else if (a.isApproved == 1 && b.isApproved == 0) {
                    // take b first
                    return 1;
                } else {
                    //a === b
                    //no change
                    return 0;
                }
            });
        }

        //return only reviews of a particular company
        if (showCompanyReviews && companyId > 0) {
            filteredReviewItems = filteredReviewItems.filter((reviewItem) => {
                if (companyId == reviewItem.companyId) {
                    return reviewItem.companyId;
                }
            });
        }

        return filteredReviewItems;
    },

    getFilteredServices: function (serviceItems, searchText) {
        var filteredServiceItems = serviceItems;

        filteredServiceItems = filteredServiceItems.filter((serviceItem) => {
            return serviceItem.isApproved
        });

        //filter by searchText

        if (searchText.length > 0) {
            filteredServiceItems = filteredServiceItems.filter((serviceItem) => {
                // console.debug("serviceItem", serviceItem);
                const serviceId = (serviceItem.serviceId) ? serviceItem.serviceId.toString().toLowerCase() : "";
                const serviceTitle = (serviceItem.serviceCategory) ? serviceItem.serviceCategory.toLowerCase() : "";

                if (serviceId.indexOf(searchText.toLowerCase()) > -1) {
                    return serviceItem.serviceId;
                } else if (serviceTitle.indexOf(searchText.toLowerCase()) > -1) {
                    return serviceItem.serviceCategory;
                }
            });
        }
        //console.debug("filteredServiceItems",filteredServiceItems);

        //sort by with serviceId first

        filteredServiceItems.sort((a, b) => {
            if (a.serviceId < b.serviceId) {
                //take a first
                return -1
            } else if (a.serviceId > b.serviceId) {
                // take b first
                return 1;
            } else {
                //a === b
                //no change
                return 0;
            }
        });


        //sort by recently updated first
        filteredServiceItems.sort((a, b) => {
            if (new Date(a.updateAt).getTime() > new Date(b.updateAt).getTime()) {
                //take a first
                return -1
            } else if (new Date(a.updateAt).getTime() < new Date(b.updateAt).getTime()) {
                // take b first
                return 1;
            } else {
                //a === b
                //no change
                return 0;
            }
        });

        return (filteredServiceItems);
    },
};

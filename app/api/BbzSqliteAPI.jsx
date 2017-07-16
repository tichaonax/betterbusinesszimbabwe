var React = require('react');
var $ = require('jquery');

module.exports = {

    getFilteredUsers: function (userItems, showApprovalPending, searchText, uid = 0) {
        //console.debug("searchText", searchText);
        //console.debug("userItems", userItems);
        var filteredUserItems = userItems;

        //filter by showApprovalPending

        filteredUserItems = filteredUserItems.filter((userItem) => {
            var userProfile = (userItem.userProfile) ? userItem.userProfile : {};
            return userProfile.isApproved || showApprovalPending || userProfile.uid == uid
        });

        //filter by searchText

        if (searchText.length > 0 && userItems.length >0) {
            filteredUserItems = filteredUserItems.filter((userItem) => {
                var userProfile = (userItem.userProfile) ? userItem.userProfile : {};
                //console.debug("userProfile", userProfile);
                const userItemId = (userItem.userItemId) ? userItem.userItemId : "";
                const displayName = (userProfile.displayName) ? userProfile.displayName.toLowerCase() : "";
                const email = (userProfile.email) ? userProfile.email.toLowerCase() : "";
                const providerId = (userProfile.providerId) ? userProfile.providerId.toLowerCase() : "";
                const userId = (userProfile.userId) ? userProfile.userId.toLowerCase() : "";

                if (displayName.indexOf(searchText.toLowerCase()) > -1) {
                    return userProfile.displayName;
                } else if (email.indexOf(searchText.toLowerCase()) > -1) {
                    return userProfile.email;
                } else if (userItemId.indexOf(searchText) > -1) {
                    return userItem.userItemId;
                } else if (providerId.indexOf(searchText) > -1) {
                    return userProfile.providerId;
                } else if (userId.indexOf(searchText) > -1) {
                    return userProfile.userId;
                }
            });


            //sort by with Admins first

            filteredUserItems.sort((a, b) => {
                if (a.userProfile.isAdmin && !b.userProfile.isAdmin) {
                    //take a first
                    return -1
                } else if (!a.userProfile.isAdmin && b.userProfile.isAdmin) {
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
        var filteredCompanyItems = companyItems;

        //filter by showApprovalPending

        filteredCompanyItems = filteredCompanyItems.filter((companyItem) => {
            let approved = (companyItem.isApproved == 1);
            //console.log("isApproved, approved", companyItem.isApproved, approved);
            return approved || showApprovalPending || companyItem.userId === userId
        });

        //filter by searchText
        //we want to also search by company description and others
        //and company id which is stored as unix createAt date time
        if (searchText.length > 0 ) {
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

        return (filteredCompanyItems);
    },

    getFilteredReviews: function (reviewItems, showApprovalPending, searchText, userId = 0, showMyReviews = false) {
        var filteredreviewItems = reviewItems;

        //filter by showApprovalPending

        filteredreviewItems = filteredreviewItems.filter((reviewItem) => {
            let approved = (reviewItem.isApproved == 1);
            return approved || showApprovalPending || reviewItem.userId === userId
        });

        if(showMyReviews){
            //just get the reviews of the passed user
            filteredreviewItems = filteredreviewItems.filter((reviewItem) => {
                return reviewItem.userId === userId
            });
        }

        //filter by searchText
        //we want to also search by review description
        //and review id stored as unix createAt date time
        if (searchText.length > 0) {
            filteredreviewItems = filteredreviewItems.filter((reviewItem) => {
                var companyTitle = reviewItem.companyTitle.toLowerCase();
                var review = reviewItem.review.toLowerCase();
                var reviewId = reviewItem.reviewId;
                var companyId = reviewItem.companyId;
                var user = reviewItem.userId;

                if (companyTitle.indexOf(searchText.toLowerCase()) > -1) {
                    return reviewItem.companyTitle;
                } else if (review.indexOf(searchText.toLowerCase()) > -1) {
                    return reviewItem.review;
                } else if (reviewId == searchText) {
                    return reviewItem.createAt;
                } else if (companyId == searchText) {
                    return reviewItem.companyItemId;
                } else if (user == searchText) {
                    return reviewItem.userId;
                }
            });
        }

        //sort reviewItems with latest additions at the top

    /*    filteredreviewItems.sort((a, b) => {
            if (parseInt(a.createAt) > parseInt(b.createAt)) {
                //take a first
                return -1
            } else if (parseInt(a.createAt) < parseInt(b.createAt)) {
                // take b first
                return 1;
            } else {
                //a === b
                //no change
                return 0;
            }
        });*/


        //sort by recently updated first
        filteredreviewItems.sort((a, b) => {
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



        //sort reviewItems with Approval Pending first

        filteredreviewItems.sort((a, b) => {
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

        return filteredreviewItems;
    },

    getFilteredServices: function (serviceItems, searchText) {
        //console.debug("searchText", searchText);
        //console.debug("serviceItems", serviceItems);
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

        return (filteredServiceItems);
    },
};

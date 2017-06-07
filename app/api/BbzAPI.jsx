var React = require('react');
var $ = require('jquery');

module.exports = {

    getFilteredUsers: function (userItems, searchText, uid = 0) {
        //console.debug("searchText", searchText);
        //console.debug("userItems", userItems);
        var filteredUserItems = userItems;

        //filter by searchText

        if (searchText.length > 0) {
            filteredUserItems = filteredUserItems.filter((userItem) => {
                const userProfile = userItem.userProfile;
                const userItemId = (userItem.userItemId) ? userItem.userItemId : "";
                const displayName = (userProfile.displayName) ? userProfile.displayName.toLowerCase() : "";
                const email = (userProfile.email) ? userProfile.email.toLowerCase() : "";
               // const isAdmin = (userProfile.isAdmin) ? userProfile.isAdmin : false;

                if (displayName.indexOf(searchText.toLowerCase()) > -1) {
                    return userItem.displayName;
                } else if (email.indexOf(searchText.toLowerCase()) > -1) {
                    return userItem.email;
                }else if (userItemId.indexOf(searchText) > -1) {
                    return userItem.userItemId;
                } //else if (isAdmin.indexOf(searchText.toLowerCase()) > -1) {
                //return userItem.isAdmin;
               // }
            });
        }

        return (filteredUserItems);
    },

    getFilteredCompanies: function (companyItems, showApprovalPending, searchText, uid = 0) {
        //console.debug("searchText", searchText);
        //console.debug("showApprovalPending", showApprovalPending);
        var filteredCompanyItems = companyItems;

        //filter by showApprovalPending

        filteredCompanyItems = filteredCompanyItems.filter((companyItem) => {
            return companyItem.isApproved || showApprovalPending || companyItem.uid == uid
        });

        //filter by searchText
        //we want to also search by company description and others
        //and company id which is stored as unix createAt date time
        if (searchText.length > 0) {
            filteredCompanyItems = filteredCompanyItems.filter((companyItem) => {
                const serviceCategory = (companyItem.serviceCategory) ? companyItem.serviceCategory.toLowerCase() : "";
                const companyTitle = (companyItem.companyTitle) ? companyItem.companyTitle.toLowerCase() : "";
                const companyDesc = (companyItem.companyDesc) ? companyItem.companyDesc.toLowerCase() : "";
                const companyId = (companyItem.createAt) ? companyItem.createAt.toString() : "";
                const companyItemId = (companyItem.companyItemId) ? companyItem.companyItemId : "";

                if (companyTitle.indexOf(searchText.toLowerCase()) > -1) {
                    return companyItem.companyTitle;
                } else if (companyDesc.indexOf(searchText.toLowerCase()) > -1) {
                    return companyItem.companyDesc;
                } else if (serviceCategory.indexOf(searchText.toLowerCase()) > -1) {
                    return companyItem.companyDesc;
                } else if (companyId.indexOf(searchText.toLowerCase()) > -1) {
                    return companyItem.createAt;
                }else if (companyItemId.indexOf(searchText) > -1) {
                    return companyItem.companyItemId;
                }
            });
        }

        //sort companyItems with Approval Pending first

        filteredCompanyItems.sort((a, b) => {
            if (!a.isApproved && b.isApproved) {
                //take a first
                return -1
            } else if (a.isApproved && !b.isApproved) {
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

    getFilteredReviews: function (reviewItems, showApprovalPending, searchText, uid=0) {
        //console.debug("reviewItems", reviewItems);
        //console.debug("showApprovalPending", showApprovalPending);
        var filteredreviewItems = reviewItems;

        //filter by showApprovalPending

        filteredreviewItems = filteredreviewItems.filter((reviewItem) => {
            return reviewItem.isApproved || showApprovalPending || reviewItem.uid == uid
        });

        //filter by searchText
        //we want to also search by review description
        //and review id stored as unix createAt date time
        if (searchText.length > 0) {
            filteredreviewItems = filteredreviewItems.filter((reviewItem) => {
                var companyTitle = reviewItem.companyTitle.toLowerCase();
                var review = reviewItem.review.toLowerCase();
                var reviewId = reviewItem.createAt.toString();
                var companyItemId = reviewItem.companyItemId;
                var user = reviewItem.uid;

                if (companyTitle.indexOf(searchText.toLowerCase()) > -1) {
                    return reviewItem.companyTitle;
                } else if (review.indexOf(searchText.toLowerCase()) > -1) {
                    return reviewItem.review;
                } else if (reviewId.indexOf(searchText.toLowerCase()) > -1) {
                    return reviewItem.createAt;
                } else if (companyItemId.indexOf(searchText) > -1) {
                    return reviewItem.companyItemId;
                }else if (user.indexOf(searchText) > -1) {
                    return reviewItem.uid;
                }
            });
        }

        //sort reviewItems with latest additions at the top

        filteredreviewItems.sort((a, b) => {
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
        });

        //sort reviewItems with Approval Pending first

        filteredreviewItems.sort((a, b) => {
            if (!a.isApproved && b.isApproved) {
                //take a first
                return -1
            } else if (a.isApproved && !b.isApproved) {
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

};

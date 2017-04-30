var React = require('react');
var $ = require('jquery');

module.exports = {
    getFilteredCompanies: function (companyItems, showApprovalPending, searchText, uid=0) {
        console.debug("companyItems", companyItems);
        console.debug("showApprovalPending", showApprovalPending);
        var filteredCompanyItems = companyItems;

        //filter by showApprovalPending

        filteredCompanyItems = filteredCompanyItems.filter((companyItem) => {
            return companyItem.isApproved || showApprovalPending || companyItem.uid == uid
        });

        //filter by searchText
        //we want to also search by company description
        //and company id which is stored as unix createAt date time
        if (searchText.length > 0) {
            filteredCompanyItems = filteredCompanyItems.filter((companyItem) => {
                var companyTitle = companyItem.companyTitle.toLowerCase();
                var companyDesc = companyItem.companyDesc.toLowerCase();
                var companyId = companyItem.createAt.toString();

                if (companyTitle.indexOf(searchText.toLowerCase()) > -1) {
                    return companyItem.companyTitle;
                } else if (companyDesc.indexOf(searchText.toLowerCase()) > -1) {
                    return companyItem.companyDesc;
                } else if (companyId.indexOf(searchText.toLowerCase()) > -1) {
                    return companyItem.createAt;
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
        return filteredCompanyItems;
    },

    getFilteredTodoItems: function (todoItems, showCompleted, searchText) {

        var filteredTodoItems = todoItems;

        //filter by showCompleted

        filteredTodoItems = filteredTodoItems.filter((todoItem) => {
            return !todoItem.completed || showCompleted;
        })

        //filter by searchText
        if(searchText.length>0) {
            filteredTodoItems = filteredTodoItems.filter((todoItem) => {
                var text = todoItem.text.toLowerCase();
                if(text.indexOf(searchText.toLowerCase()) > -1){
                    return todoItem.text;
                }
            });
        }

        //sort todoItems with non-completed first

        filteredTodoItems.sort((a, b) => {
            if (!a.completed && b.completed) {
                //take a first
                return -1
            } else if (a.completed && !b.completed) {
                // take b first
                return 1;
            } else {
                //a === b
                //no change
                return 0;
            }
        });
        return filteredTodoItems;
    },

    getFilteredReviews: function (reviewItems, showApprovalPending, searchText, uid=0) {
        console.debug("reviewItems", reviewItems);
        console.debug("showApprovalPending", showApprovalPending);
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

                if (companyTitle.indexOf(searchText.toLowerCase()) > -1) {
                    return reviewItem.companyTitle;
                } else if (review.indexOf(searchText.toLowerCase()) > -1) {
                    return reviewItem.review;
                } else if (reviewId.indexOf(searchText.toLowerCase()) > -1) {
                    return reviewItem.createAt;
                }
            });
        }

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

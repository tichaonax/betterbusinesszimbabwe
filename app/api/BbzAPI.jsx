var React = require('react');
var $ = require('jquery');

module.exports = {

    // setTodoItems: function (todoItems) {
    //     if ($.isArray(todoItems)) {
    //         localStorage.setItem('todoItems', JSON.stringify(todoItems));
    //         return (todoItems);
    //     }
    // },

    // getTodoItems: function () {
    //     //debugger;
    //     var strTodoItems = localStorage.getItem('todoItems');
    //     var todoItems = [];
    //
    //     try {
    //         todoItems = JSON.parse(strTodoItems);
    //     } catch (e) {
    //         //do nothing send default array
    //     }
    //
    //     return $.isArray(todoItems) ? todoItems : [];
    // },

    getFilteredCompanies: function (companyItems, showApprovalPending, searchText, uid=0) {
        console.debug("companyItems", companyItems);
        console.debug("showApprovalPending", showApprovalPending);
        var filteredCompanyItems = companyItems;

        //filter by showApprovalPending

        filteredCompanyItems = filteredCompanyItems.filter((companyItem) => {
            return companyItem.isApproved || showApprovalPending || companyItem.uid ==uid
        })

        //filter by searchText
        if(searchText.length>0) {
            filteredCompanyItems = filteredCompanyItems.filter((companyItem) => {
                var text = companyItem.companyTitle.toLowerCase();
                if(text.indexOf(searchText.toLowerCase()) > -1){
                    return companyItem.companyTitle;
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
    }
};

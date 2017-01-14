var React = require('react');
var $ = require('jquery');

module.exports = {

    setTodoItems: function (todoItems) {
        if ($.isArray(todoItems)) {
            localStorage.setItem('toodoItems', JSON.stringify(todoItems));
            return (todoItems);
        }
    },

    getTodoItems: function () {
        var strTodoItems = localStorage.getItem('toodoItems');
        var todoItems = [];

        try {
            todoItems = JSON.parse(strTodoItems);
        } catch (e) {
            //do nothing send default array
        }

        return $.isArray(todoItems) ? todoItems : [];

    }
};

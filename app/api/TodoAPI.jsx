var React = require('react');
var $ = require('jquery');

module.exports = {

    setTodoItems: function (todoItems) {
        if ($.isArray(todoItems)) {
            localStorage.setItem('todoItems', JSON.stringify(todoItems));
            return (todoItems);
        }
    },

    getTodoItems: function () {
        var strTodoItems = localStorage.getItem('todoItems');
        var todoItems = [];

        try {
            todoItems = JSON.parse(strTodoItems);
        } catch (e) {
            //do nothing send default array
        }

        return $.isArray(todoItems) ? todoItems : [];

    }
};

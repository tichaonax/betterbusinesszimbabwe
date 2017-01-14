var React = require('react');
var TodoItem = require('TodoItem');

class TodoList extends React.Component {
    constructor(props) {
        super(props);
    }

renderTodos =(todos)=>{

        return todos.map((todo) => {

            return (
                <TodoItem key={todo.id} {...todo}/>
            )
        });
}

    render() {

        var {todos} = this.props;

        return (
            <div>
                {this.renderTodos(todos)}
            </div>
        );
    }
}

module.exports = TodoList;
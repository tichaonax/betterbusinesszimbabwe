var React = require('react');
var Todo = require('Todo');

class TodoList extends React.Component {
    constructor(props) {
        super(props);
    }

renderTodos =(todos)=>{

        return todos.map((todo) => {

            return (
                <Todo key={todo.id} {...todo}/>
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
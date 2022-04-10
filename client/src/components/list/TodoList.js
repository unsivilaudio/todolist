import React from 'react';
import { connect } from 'react-redux';
import {
    updateTodo,
    saveTodo,
    fetchTodos,
    deleteTodo,
} from 'store/todos/todoActions';

import '../../assets/stylesheets/todolist.scss';
import Card from '../ui/Card';
import ListItem from './ListItem';
import FormItem from './FormItem';
import TodoForm from './TodoForm';

class TodoList extends React.Component {
    state = {
        newTodo: '',
        editTodo: '',
        editingTodo: null,
        todos: [],
        finishedTodos: [],
    };

    componentDidMount() {
        if (!this.props.todos.length) {
            this.props.fetchTodos();
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleAddNewTodo = e => {
        const content = this.state.newTodo;
        this.props.saveTodo({ content });
        this.setState({ newTodo: '' });
    };

    handleUpdateTodo = item => {
        this.props.updateTodo(item);
    };

    handleRemoveTodo = id => {
        this.props.deleteTodo(id);
    };

    toggleCompleted = item => {
        item = { ...item, isCompleted: !item.isCompleted };
        this.props.updateTodo(item);
    };

    handleEditTodo = item => {
        const { _id, content } = item;
        this.setState({ editingTodo: _id, editTodo: content });
    };

    handleEditChange = e => {
        this.setState({ editTodo: e.target.value });
    };

    handleEditSubmit = item => {
        item.content = this.state.editTodo;
        this.props.updateTodo(item);
        this.setState({ editTodo: '', editingTodo: null });
    };

    renderTodoItems = (todos = []) => {
        return todos.map((item, i) => {
            const { content, isCompleted } = item;
            const id = item._id;
            const editingTodo = this.state.editingTodo;
            if (id === editingTodo) {
                return (
                    <FormItem
                        key={id}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleEditSubmit.bind(null, item)}
                        value={this.state.editTodo}
                    />
                );
            }
            return (
                <ListItem
                    id={id}
                    key={id}
                    completed={isCompleted}
                    clicked={this.toggleCompleted.bind(null, item)}
                    deleteItem={this.handleRemoveTodo.bind(null, id)}
                    editItem={this.handleEditTodo.bind(null, item)}>
                    {content}
                </ListItem>
            );
        });
    };

    render() {
        return (
            <Card>
                <div className='TodoList'>
                    <h1 className='Header'>Todo List!</h1>
                    <h3 className='SubHeader'>A Simple React Todo List App</h3>
                    <hr />
                    <ul className='List'>
                        {this.renderTodoItems(this.props.todos)}
                    </ul>
                </div>
                <TodoForm
                    content={this.state.newTodo}
                    handleChange={this.handleChange}
                    handleNewTodo={this.handleAddNewTodo}
                />
            </Card>
        );
    }
}

TodoList.defaultProps = {
    todos: [],
};

const mapStateToProps = ({ todos }) => {
    return { todos };
};

export default connect(mapStateToProps, {
    saveTodo,
    updateTodo,
    fetchTodos,
    deleteTodo,
})(TodoList);

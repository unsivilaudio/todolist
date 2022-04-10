import React from 'react';

import '../../assets/stylesheets/todolist.scss';
import Card from '../ui/Card';
import ListItem from './ListItem';
import FormItem from './FormItem';
import TodoForm from './TodoForm';

class TodoList extends React.Component {
    state = {
        newTodo: '',
        editTodo: '',
        updateTodo: null,
        todos: [],
        finishedTodos: [],
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    addNewTodo = e => {
        e.preventDefault();
        const newTodo = this.state.newTodo;
        this.setState(prevState => {
            return {
                ...prevState,
                todos: prevState.todos.concat(newTodo),
                newTodo: '',
            };
        });
    };

    editTodo = item => {
        this.setState(prevState => ({
            ...prevState,
            updateTodo: item,
            editTodo: item,
        }));
    };

    removeTodo = item => {
        const updatedTodos = this.state.todos.filter(el => el !== item);
        this.setState(prevState => {
            return { ...prevState, todos: updatedTodos };
        });
    };

    toggleCompleted = e => {
        const item = e.target.textContent;
        const finishedTodos = [...this.state.finishedTodos];
        let updatedFinishedTodos;
        if (finishedTodos.includes(item)) {
            updatedFinishedTodos = finishedTodos.filter(el => el !== item);
        } else {
            updatedFinishedTodos = finishedTodos.concat(item);
        }
        this.setState(prevState => {
            return { ...prevState, finishedTodos: updatedFinishedTodos };
        });
    };

    handleEditChange = e => {
        this.setState({ editTodo: e.target.value });
    };

    handleEditSubmit = item => {
        const updatedItem = this.state.editTodo;
        const todos = this.state.todos.map(el => {
            if (el === item) return updatedItem;
            return el;
        });
        this.setState({ todos, editTodo: '', updateTodo: null });
    };

    renderTodoItems = () => {
        return this.state.todos.map((item, i) => {
            const id = `${i}-${item.replace(' ', '_')}`;
            const completedTodos = [...this.state.finishedTodos];
            const updateTodo = this.state.updateTodo;
            if (item === updateTodo) {
                return (
                    <FormItem
                        key={id}
                        handleChange={this.handleChange}
                        handleSubmit={() => this.handleEditSubmit(item)}
                        value={this.state.editTodo}
                    />
                );
            }
            return (
                <ListItem
                    id={id}
                    key={id}
                    completed={completedTodos.includes(item)}
                    clicked={this.toggleCompleted}
                    deleteItem={() => this.removeTodo(item)}
                    editItem={() => this.editTodo(item)}>
                    {item}
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
                    <ul className='List'>{this.renderTodoItems()}</ul>
                </div>
                <TodoForm
                    handleChange={this.handleChange}
                    todo={this.state.newTodo}
                    handleNewTodo={this.addNewTodo}
                />
            </Card>
        );
    }
}

export default TodoList;

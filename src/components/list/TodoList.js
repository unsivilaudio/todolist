import React from 'react';

import '../../assets/stylesheets/todolist.css';
import Card from '../ui/Card';
import Input from '../ui/Input';
import ListItem from './listItem';

class TodoList extends React.Component {
    state = {
        newTodo: '',
        todos: ['Buy Groceries', 'Feed the Dogs'],
        finishedTodos: [],
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    addNewTodo = () => {
        const newTodo = this.state.newTodo;
        this.setState(prevState => {
            return {
                ...prevState,
                todos: prevState.todos.concat(newTodo),
                newTodo: '',
            };
        });
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

    renderTodoItems = () => {
        return this.state.todos.map((item, i) => {
            const id = `${i}-${item.replace(' ', '_')}`;
            const completedTodos = [...this.state.finishedTodos];
            return (
                <ListItem
                    id={id}
                    key={id}
                    completed={completedTodos.includes(item)}
                    clicked={this.toggleCompleted}
                    deleteItem={() => this.removeTodo(item)}>
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
                <div className='TodoForm'>
                    <h2 className='InputHeader'>New Todo</h2>
                    <Input
                        name='newTodo'
                        handleChange={this.handleChange}
                        value={this.state.newTodo}
                        placeholder='Enter a new todo...'
                        btnLabel='ADD TODO'
                        submitted={this.addNewTodo}
                    />
                </div>
            </Card>
        );
    }
}

export default TodoList;

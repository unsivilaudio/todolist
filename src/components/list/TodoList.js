import React from 'react';

import '../../assets/stylesheets/todolist.css';
import Card from '../ui/Card';
import Input from '../ui/Input';
import ListItem from './listItem';

class TodoList extends React.Component {
    state = { newTodo: '', todos: [] };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <Card>
                <div className='TodoList'>
                    <h1 className='Header'>Todo List!</h1>
                    <h3 className='SubHeader'>A Simple React Todo List App</h3>
                    <hr />
                    <ul className='List'>
                        <ListItem>Buy Groceries</ListItem>
                        <ListItem completed>Feed the Dogs</ListItem>
                    </ul>
                </div>
                <div className='TodoForm'>
                    <h2 className='InputHeader'>New Todo</h2>
                    <Input
                        name='newTodo'
                        handleChange={this.handleChange}
                        value={this.state.newTodo}
                        placeholder='Enter a new todo...'
                        btnLabel='ADD TODO'
                    />
                </div>
            </Card>
        );
    }
}

export default TodoList;

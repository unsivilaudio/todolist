import { Request, Response, NextFunction } from 'express';
import catchAsync from '../util/catch-async';
import Todo, { TodoDoc } from '../models/todo';

export const getTodos = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const todos = await Todo.find({});

        res.status(200).send({
            status: 'success',
            data: todos,
        });
    }
);

export const createTodo = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { content } = req.body;
        if (!content) throw new Error('You must provide some content.');

        const todo = await Todo.create({ content });

        res.status(201).json({
            status: 'success',
            message: 'Sucessfully created new todo.',
            data: todo,
        });
    }
);

export const updateTodo = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { content, isCompleted } = req.body;
        const { id } = req.params;
        if (!id) throw new Error('You must provide a valid id.');

        let todo = await Todo.findById(id);
        if (!todo) throw new Error('No todo found with that id');
        if (content) todo.content = content;
        if (isCompleted !== undefined) todo.isCompleted = isCompleted;
        todo = await todo.save();

        res.status(200).json({
            status: 'success',
            message: 'Successfully updated todo.',
            data: todo,
        });
    }
);

export const deleteTodo = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        const todo = await Todo.findById(id);

        if (!todo) throw new Error('No todo found matching that id.');
        await todo.remove();

        res.status(200).json({
            status: 'success',
            message: 'Successfully deleted todo.',
            data: todo,
        });
    }
);

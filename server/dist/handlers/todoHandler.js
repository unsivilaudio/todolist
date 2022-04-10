"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodos = void 0;
const catch_async_1 = __importDefault(require("../util/catch-async"));
const todo_1 = __importDefault(require("../models/todo"));
exports.getTodos = (0, catch_async_1.default)(async (req, res, next) => {
    const todos = await todo_1.default.find({});
    res.status(200).send({
        status: 'success',
        data: todos,
    });
});
exports.createTodo = (0, catch_async_1.default)(async (req, res, next) => {
    const { content } = req.body;
    if (!content)
        throw new Error('You must provide some content.');
    const todo = await todo_1.default.create({ content });
    res.status(201).json({
        status: 'success',
        message: 'Sucessfully created new todo.',
        data: todo,
    });
});
exports.updateTodo = (0, catch_async_1.default)(async (req, res, next) => {
    const { content, isCompleted } = req.body;
    const { id } = req.params;
    if (!id)
        throw new Error('You must provide a valid id.');
    let todo = await todo_1.default.findById(id);
    if (!todo)
        throw new Error('No todo found with that id');
    if (content)
        todo.content = content;
    if (isCompleted !== undefined)
        todo.isCompleted = isCompleted;
    todo = await todo.save();
    res.status(200).json({
        status: 'success',
        message: 'Successfully updated todo.',
        data: todo,
    });
});
exports.deleteTodo = (0, catch_async_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const todo = await todo_1.default.findById(id);
    if (!todo)
        throw new Error('No todo found matching that id.');
    await todo.remove();
    res.status(200).json({
        status: 'success',
        message: 'Successfully deleted todo.',
        data: todo,
    });
});

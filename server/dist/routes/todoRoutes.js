"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todoHandler_1 = require("../handlers/todoHandler");
const router = (0, express_1.Router)({ mergeParams: true });
router.route('/:id').post(todoHandler_1.updateTodo).delete(todoHandler_1.deleteTodo);
router.route('/').get(todoHandler_1.getTodos).post(todoHandler_1.createTodo);
exports.default = router;

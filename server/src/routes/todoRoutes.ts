import { Router } from 'express';
import {
    createTodo,
    deleteTodo,
    getTodos,
    updateTodo,
} from '../handlers/todoHandler';

const router = Router({ mergeParams: true });

router.route('/:id').post(updateTodo).delete(deleteTodo);
router.route('/').get(getTodos).post(createTodo);

export default router;

const express = require('express');
const { body } = require('express-validator');
const verifyToken = require('../middleware/auth.middleware');
const {
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo
} = require('../controllers/todo.controller');

const router = express.Router();

router.use(verifyToken);


router.post(
  '/',
  [
    body('task').notEmpty().withMessage('Task is required'),
    body('dueDate').notEmpty().withMessage('Due date is required'),
  ],
  createTodo
);


router.get('/', getTodo);


router.put(
  '/:id',
  [
    body('task').notEmpty().withMessage('Task is required'),
    body('dueDate').notEmpty().withMessage('Due date is required'),
  ],
  updateTodo
);


router.delete('/:id', deleteTodo);

module.exports = router;

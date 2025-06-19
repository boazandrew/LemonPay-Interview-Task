const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.middleware');
const validateRequest = require('../middleware/validate.middleware')
const {
  registerValidation,
  loginValidation
} = require('../validators/user.validator');
const {
  registerUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');

// Public
router.post('/register',registerValidation,validateRequest, registerUser);
router.post('/login',loginValidation, validateRequest,  loginUser);

// Protected
router.get('/users', verifyToken, getAllUsers);
router.put('/users/:id', verifyToken, updateUser);
router.delete('/users/:id', verifyToken, deleteUser);

module.exports = router;

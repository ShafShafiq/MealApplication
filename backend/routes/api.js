const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');
const mealPlanController = require('../controllers/mealPlanController');
const authenticateToken = require('../middleware/auth');

// User Routes
router.post('/users', userController.createUser);
router.post('/users/login', userController.loginUser);

// Meal Plan Routes
router.get('/mealplans', authenticateToken, mealPlanController.getMealPlans);

// Endpoint for Zapier
router.post('/make', userController.handleZapierData);
router.post('/update-mealplans', mealPlanController.updateMealPlans);

module.exports = router;
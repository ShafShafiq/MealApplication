const User = require('../models/users');
const MealPlan = require('../models/MealPlan');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const generateMealPlan = require('../utils/generateMealPlan');
const sendEmail = require('../utils/sendEmail');

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, dietaryRestrictions } = req.body;
    const user = new User({ name, email, password, dietaryRestrictions });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.handleZapierData = async (req, res) => {
  try {
    const { name, email, dietary_restrictions } = req.body;
    console.log("Inside zap function")
    let user = await User.findOne({ email });

    if (!user) {
      const password = Math.random().toString(36).slice(-8); // Generate random password
      user = new User({
        name,
        email,
        password,
        dietaryRestrictions: dietary_restrictions,
      });
      await user.save();

      // Generate meal plan
      const plan = await generateMealPlan(dietary_restrictions);
      const mealPlan = new MealPlan({ user: user._id, plan });
      await mealPlan.save();

      // Send email notification with login credentials
      await sendEmail(
        email,
        'Your Account and Meal Plan',
        `Hello ${name},\n\nYour account has been created. Here is your meal plan:\n\n${plan}\n\nYour login credentials are:\nEmail: ${email}\nPassword: ${password}\n\nPlease log in to view your dashboard.\n\nBest regards,\nMeal Planning App`
      );
      console.log("Sent")

      res.status(201).json({ message: 'User created and meal plan generated' });
    } else {
      res.status(400).json({ error: 'User already exists' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

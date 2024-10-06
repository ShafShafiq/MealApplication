const MealPlan = require('../models/MealPlan');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const generateUpdatedMealPlan = require('../utils/generateUpdatedMealPlan');
const sendEmail = require('../utils/sendEmail');

exports.getMealPlans = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const mealPlans = await MealPlan.find({ user: decoded.id });
    res.json(mealPlans);
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

exports.updateMealPlans = async (req, res) => {
  try {
    console.log(req.body);
    const { secretKey } = req.body;
    if (secretKey !== process.env.SCHEDULE_SECRET_KEY) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const users = await User.find({});
    const createdPlans = [];

    for (const user of users) {
      // Get the most recent meal plan for the user
      const latestMealPlan = await MealPlan.findOne({ user: user._id }).sort({ createdAt: -1 });

      if(latestMealPlan){
        console.log(
        "fouind tthe plan"
        )
      }
      else{
        console.log("didntt found the plan")
      }
      
      const updatedPlan = await generateUpdatedMealPlan(user.dietaryRestrictions, latestMealPlan ? latestMealPlan.plan : null);
      const newMealPlan = new MealPlan({
        user: user._id,
        plan: updatedPlan,
        createdAt: new Date()
      });

      const savedMealPlan = await newMealPlan.save();
      createdPlans.push(savedMealPlan);

      await sendEmail(
        user.email,
        'Your Updated Weekly Meal Plan',
        `Hello ${user.name},\n\nHere is your updated meal plan:\n\n${updatedPlan}\n\nBest regards,\nMeal Planning App`
      );
    }

    res.json({ message: 'Meal plans updated successfully', plans: createdPlans });
  } catch (err) {
    console.error('Error updating meal plans:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
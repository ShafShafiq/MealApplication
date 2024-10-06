const mongoose = require('mongoose');

const MealPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  plan: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MealPlan', MealPlanSchema);

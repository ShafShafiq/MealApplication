const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async function generateMealPlan(dietaryRestrictions) {
  console.log("inside generate function");
  const prompt = `Create a 7-day meal plan with breakfast, lunch, and dinner for a person with the following dietary restrictions: ${dietaryRestrictions}. Ensure meals are diverse and balanced.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
      temperature: 0.7,
    });
    console.log(response.choices[0].message.content.trim());
    return response.choices[0].message.content.trim();
  } catch (err) {
    console.error('Error generating meal plan:', err);
    return 'We encountered an error generating your meal plan. Please try again later.';
  }
};


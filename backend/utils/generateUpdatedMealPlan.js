const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async function generateUpdatedMealPlan(dietaryRestrictions, existingPlan) {
    console.log("Generating updated meal plan");
    let prompt = `Create a 7-day meal plan with breakfast, lunch, and dinner for a person with the following dietary restrictions: ${dietaryRestrictions}. Ensure meals are diverse and balanced.`;
  
    if (existingPlan) {
      prompt += `\n\nHere is the existing meal plan:\n\n${existingPlan}\n\nPlease create an updated version of this plan, keeping some meals the same but introducing variety where appropriate.`;
    }
  
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1000, // Increased token limit to accommodate longer responses
        temperature: 0.7,
      });
      console.log(response.choices[0].message.content.trim());
      return response.choices[0].message.content.trim();
    } catch (err) {
      console.error('Error generating updated meal plan:', err);
      return 'We encountered an error generating your updated meal plan. Please try again later.';
    }
  }
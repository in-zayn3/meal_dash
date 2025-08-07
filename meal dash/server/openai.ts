import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export interface FoodRecommendation {
  recommendations: string[];
  reasoning: string;
}

export async function getFoodRecommendations(
  userMessage: string,
  context?: { restaurants?: any[], menuItems?: any[] }
): Promise<FoodRecommendation> {
  try {
    const systemPrompt = `You are FoodBot, a helpful AI assistant for a food delivery app called FoodHub. Your role is to help users find the perfect meal based on their preferences, dietary restrictions, and cravings.

Available restaurants and menu items:
${context ? JSON.stringify(context) : 'Use general food knowledge'}

Guidelines:
- Be friendly and conversational
- Ask clarifying questions when needed
- Provide specific recommendations when possible
- Consider dietary restrictions and preferences
- Suggest popular and highly-rated items
- Keep responses concise but helpful
- Focus on food recommendations and ordering assistance

Respond with JSON in this format: { "recommendations": ["item1", "item2"], "reasoning": "explanation" }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    
    return {
      recommendations: result.recommendations || [],
      reasoning: result.reasoning || "I'd be happy to help you find something delicious!"
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    return {
      recommendations: [],
      reasoning: "I'm having trouble processing your request right now. Please try asking about specific cuisines or dietary preferences!"
    };
  }
}

export async function generateChatResponse(
  userMessage: string,
  conversationHistory: { role: string; content: string }[] = []
): Promise<string> {
  try {
    const systemPrompt = `You are FoodBot, a helpful AI assistant for FoodHub food delivery app. Help users with:
- Food recommendations based on preferences
- Menu questions and dietary information
- Order assistance and suggestions
- General food-related queries

Be friendly, concise, and food-focused. If asked about non-food topics, politely redirect to food delivery assistance.`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory,
      { role: "user", content: userMessage }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages as any,
      max_tokens: 200,
    });

    return response.choices[0].message.content || "I'm here to help with your food delivery needs!";
  } catch (error) {
    console.error("OpenAI API error:", error);
    return "I'm having trouble right now, but I'm here to help you find great food! Try asking about specific cuisines or restaurants.";
  }
}

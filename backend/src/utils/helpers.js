const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const config = new Configuration({
  apiKey: process.env.OPEN_AI_SECRET_API_KEY,
});

const openai = new OpenAIApi(config);

const runPrompt = async (comment) => {
  const prompt = `sentiment analysis: This comment is "${comment}" either positive or negative?`;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 2048,
      temperature: 1,
    });
    const parsableJSONresponse = response.data.choices[0].text
      .trim()
      .toLowerCase();
    // console.log(typeof(parsableJSONresponse));
    console.log(`Your comment is ${parsableJSONresponse}`);
    return parsableJSONresponse;
  } catch (error) {
    console.log(error);
  }
};

module.exports = runPrompt;

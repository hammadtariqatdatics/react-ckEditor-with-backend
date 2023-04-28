const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const config = new Configuration({
  apiKey: process.env.OPEN_AI_SECRET_API_KEY,
});

const openai = new OpenAIApi(config);

const commentPrompt = async (comment) => {
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

const summerizePrompt = async (content) => {
  const prompt = `Summerize the content "${content}" \n\nTl;dr`;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 1,
    });
    const text = response.data.choices[0].text.trim();
    // console.log(response.data.choices[0]);
    console.log(`Your summerize text is ${text}`);
    return text;
  } catch (error) {
    console.log(error);
  }
};

const translatePrompt = async (content, translateVal) => {
  const prompt = `Translate this "${content}" into "${translateVal}" while maintaining the same content length`;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 1,
    });
    const text = response.data.choices[0].text.trim();
    console.log(`Your translated text is ${text}`);
    return text;
  } catch (error) {
    console.log(error);
  }
};

const chatPrompt = async (prompt) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 2048,
    });
    const text = response.data.choices[0].text.trim();
    console.log(`Your prompted response is ${text}`);
    return text;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  summerizePrompt,
  commentPrompt,
  translatePrompt,
  chatPrompt,
};

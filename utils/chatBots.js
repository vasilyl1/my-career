const { Configuration, OpenAIApi } = require("openai");
  

// this is how to request this from the front end JavaScript
// const botResponse = require('../utils/chatBots');
// const testResponse = await botResponse(`Provide 3 most important items on how can I achieve my development goal named as: ${goal.name}`);
//
const configuration = new Configuration({
    apiKey: process.env.openAI,
  });

const openai = new OpenAIApi(configuration);

const botResponse = async (input) => {
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: input,
      max_tokens: 2000,
      temperature: 0
    });

    return completion.data.choices[0].text;
  } catch (err) {
    if (err.response) {
      console.log(err.response.status);
      console.log(err.response.data);
    } else {
      console.log(err.message);
    }
  }};

module.exports = botResponse;
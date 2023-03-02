const { Configuration, OpenAIApi } = require("openai");
  
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
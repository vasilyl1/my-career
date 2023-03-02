module.exports = {
    botResponse: async (input) => {
        const { Configuration, OpenAIApi } = require("openai");

        const configuration = new Configuration({
          apiKey: process.env.openAI,
        });

        const openai = new OpenAIApi(configuration);
        try {
        const completion = await openai.createCompletion({
          model: "text-davinci-002",
          prompt: input,
        });
        console.log(completion.data.choices[0].text);

      return completion.data.choices[0].text;
    } catch (err) {
        if (err.response) {
            console.log(err.response.status);
            console.log(err.response.data);
          } else {
            console.log(err.message);
          }
    }
    }
  };
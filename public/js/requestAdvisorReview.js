const requestAdvisorReview = async (event) => {
  event.preventDefault();
  const botResponse = require('../utils/chatBots');

  //get the goal ID from the URL
  //get the advisor ID from the drop down list
  //update the goal advice field with advisor ID
  //check if the ChatGPT ID is in the advisor side then run the bot request and update the comment
  // chatGPT model input
  const testResponse = await botResponse(`Provide 3 most important items on how can I achieve my development goal named as: ${ goal.name }`);

};
document
  .getElementById('requestReview')
  .addEventListener('click', requestAdvisorReview); // add event listener for when the add goal button is clicked
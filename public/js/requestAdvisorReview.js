const requestAdvisorReview = async (event) => {
event.preventDefault();
const botResponse = require('../utils/chatBots');

// chatGPT model input
const testResponse = await botResponse(`Provide 3 most important items on how can I achieve my development goal named as: ${goal.name}`);

//document
//  .getElementById('addGoalButton')
//  .addEventListener('click', requestAdvisorReview); // add event listener for when the add goal button is clicked
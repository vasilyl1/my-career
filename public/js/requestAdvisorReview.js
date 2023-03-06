const botResponse = require('../utils/chatBots');

const advisorMenuHandler = async (event) => { // request review button clicked and drop down list activated
  event.preventDefault();
  const menu = document.getElementById('advisorDropdownMenu').children[0]; // menu of dropdown items
  for (let i = 0; (i < menu.children.length); i++) { // add event listener for every advisor menu item
    menu.children[i].addEventListener('click', advisorMenuItemHandler);
  }
};

const advisorMenuItemHandler = async (event) => { // advisor to comment item clicked
  event.preventDefault();

  // todays date
  const date = new Date();

  //get the advisor ID from the drop down list
  const advisorId = event.currentTarget.id.substring(document.location.href.lastIndexOf('menuItem') + 1);
  //get the goal ID from the URL
  const goalId = document.location.href.substring(document.location.href.lastIndexOf('/') + 1);
  //update the goal advice field with advisor ID in the database
  const response = await fetch(`/goal/${ goalId }`, {
    method: 'PUT',
    body: JSON.stringify({ advice: advisorId }),
    headers: { 'Content-Type': 'application/json' }
  });
  if (response.ok) {
    //document.location.replace(`/goal/${ goalId }`);
  } else {
    alert('requestAdvisorReview: Failed to update adviser filed for user to request the goal in the DB');
  }
  //check if the ChatGPT ID is in the advisor side then run the bot request and update the comment
  if (advisorId === '3') { // chatGPT advisor
    // chatGPT model input
    const testResponse = await botResponse(`Provide 3 most important items on how can I achieve my development goal named as: ${ goal.name }`);
    // attach the comment to the goal in the database
    const responseCommentAttach = await fetch('/comment', {
      method: 'POST',
      body: JSON.stringify(
        {
          goalId: goalId,
          userId: advisorId,
          body: testResponse
        }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (responseCommentAttach.ok) {
      document.location.replace(`/goal/${ goalId }`);
    } else {
      alert('requestAdvisorReview: Failed to add comment to DB');
    }
  }
};


document
  .getElementById('advisorDropdownBtn')
  .addEventListener('click', advisorMenuHandler); // loop to add listeners for dropdown list items once request review button is clicked

const advisorMenuHandler = async (event) => { // request review button clicked and drop down list activated
  event.preventDefault();
  console.log('drop down button click event');
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
  const advisorId = event.currentTarget.id.substring(event.currentTarget.id.lastIndexOf('m') + 1);
  //get the goal ID from the URL
  const goalId = document.location.href.substring(document.location.href.lastIndexOf('/') + 1);
  //update the goal advice field with advisor ID in the database
  const response = await fetch(`/api/goals/${ goalId }`, {
    method: 'PUT',
    body: JSON.stringify({ advice: advisorId }),
    headers: { 'Content-Type': 'application/json' }
  });
  if (response.ok) {
    //document.location.replace(`/goal/${ goalId }`);
    alert('Review from the advisor has been requested.');
  } else {
    alert('requestAdvisorReview: Failed to update adviser field for user to request the goal in the DB');
  }
  //check if the ChatGPT ID is in the advisor side then 
  // request API to run the bot and add the comment
  if (advisorId === '3') { // chatGPT advisor
    // goal name
    const goalName = document.getElementById('singleGoal').children[0].children[0].children[0].children[1].textContent;
    // attach the comment to the goal in the database
    const responseCommentAttach = await fetch('/api/comments/chatbot', {
      method: 'POST',
      body: JSON.stringify(
        {
          goalId: goalId,
          userId: advisorId,
          goalName: goalName,
          date: date
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
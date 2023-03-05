const addGoalClickHandler = async (event) => {

  event.preventDefault();
  const today = new Date();
  const responseNewGoal = await fetch('api/goals/goal', {//call API to create a new goal
    method: 'POST',
    body: JSON.stringify(
      {
        name: 'my new development goal',
        body: 'please add some details about your new development goal here',
        date: today
      }),
    headers: { 'Content-Type': 'application/json' }
  });
  if (responseNewGoal.ok) {
    const response = await fetch(`/goal/${ responseNewGoal.id }`, {//call the single goal homeRoute for the user to add the details of the goal
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
  } else {
    console.log(responseNewGoal.statusText);
  }
};


document
  .getElementById('createGoalBtn')
  .addEventListener('click', addGoalClickHandler); // add event listener for when the add goal button is clicked

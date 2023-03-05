const requestAdvisorReview = async (event) => {

  event.preventDefault();
  const responseNewGoal = await fetch('api/goals', {//call API to create a new goal
    method: 'POST',
    body: JSON.stringify({ name: 'my new development goal', body: 'please add some details about your new development goal here' }),
    headers: { 'Content-Type': 'application/json' }
  });
  if (responseNewGoal.ok) {
    //possibly change responseNewGoal.id to just newGoal.id
    const response = await fetch(`/goal/${ responseNewGoal.id }`, {//call the single goal homeRoute for the user to add the details of the goal
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
  } else {
    console.err(responseNewGoal.statusText);
  }
};


document
  .getElementById('addGoalButton')
  .addEventListener('click', requestAdvisorReview); // add event listener for when the add goal button is clicked
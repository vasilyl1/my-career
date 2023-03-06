/* eslint-disable no-alert */
const addGoalClickHandler = async (event) => {
  event.preventDefault();
  // Collect values from the form
  const name = document.querySelector('#newGoalName').value.trim();
  const date = document.querySelector('#newGoalDate').value.trim();
  const body = document.querySelector('#newGoalBody').value.trim();
  if (name && date && body) {
    const responseNewGoal = await fetch('/api/goals', { // call API to create a new goal
      method: 'POST',
      body: JSON.stringify(
        {
          name: name,
          body: body,
          date: date
        }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (res.ok) {
      // If successful, redirect the browser to the profile page
      const newGoal = `/goal/${ res.id }`;
      document.location.replace(newGoal);
    } else {
      alert(responseNewGoal.statusText);
    }
  } else {
    alert('all fields are required for the new goal');

  }
};
document
  .getElementById('createGoalBtn')
  .addEventListener('click', addGoalClickHandler); // add event listener for when the add goal button is clicked

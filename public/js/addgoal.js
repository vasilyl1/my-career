/* eslint-disable no-alert */
const addGoalClickHandler = async (event) => {
  event.preventDefault();
  // Collect values from the form
  const name = await document.querySelector('#newGoalName').value.trim();
  const date = await document.querySelector('#newGoalDate').value.trim();
  const body = await document.querySelector('#newGoalBody').value.trim();
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
    })
      .then(response => {
        if (response.ok) {
          // If successful, redirect the browser to the profile page
          document.location.replace('/');
        } else {
          alert(responseNewGoal.statusText);
        }
      })
      .catch(err => console.log(err));
  } else {
    alert('all fields are required for the new goal');

  }
};
document
  .getElementById('createGoalBtn')
  .addEventListener('click', addGoalClickHandler); // add event listener for when the add goal button is clicked
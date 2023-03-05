/* eslint-disable no-alert */
const deleteGoalClickHandler = async (event) => {
  event.preventDefault();
  const goalId = event.target.getAttribute('data-id');
  try {
    const responseDeleteGoal = await fetch(`/api/goals/${ goalId }`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    if (responseDeleteGoal.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace('/dashboard');
    } else {
      alert(responseDeleteGoal.statusText);
    }
  } catch (err) {
    console.log(err);
    alert('Failed to delete goal');
  }
};

document
  .getElementById('singleGoal')
  .addEventListener('click', (event) => {
    if (event.target.matches('#deleteGoalBtn')) {
      deleteGoalClickHandler(event);
    }
  });

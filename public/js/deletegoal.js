/* eslint-disable no-alert */
const deleteGoalClickHandler = async (event) => {
  event.preventDefault();

  //get the goal ID from the URL
  const goalId = document.location.href.substring(document.location.href.lastIndexOf('/') + 1);

  try {
    const responseDeleteGoal = await fetch(`/api/goals/${ goalId }`, {
      method: 'DELETE'
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
  .getElementById('deleteGoalBtn')
  .addEventListener('click', deleteGoalClickHandler); // add event listener for when the add goal button is clicked

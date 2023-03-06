const deleteGoalBtn = document.querySelector('#deleteGoalBtn');

deleteGoalBtn.addEventListener('click', async (event) => {
  event.preventDefault();

  try {
    const response = await fetch(`/api/goals/${ goalId }`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete goal');
    }

    // Redirect the user to the homepage after deleting the goal
    window.location.href = '/';
  } catch (error) {
    console.error(error);
  }
});

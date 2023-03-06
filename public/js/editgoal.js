const editGoalBtn = document.querySelector('#editGoalBtn');

editGoalBtn.addEventListener('click', async (event) => {
  event.preventDefault();

  // Get the updated goal data from the form inputs
  const newGoalData = {
    name: document.querySelector('#newGoalName').value,
    date: document.querySelector('#newGoalDate').value,
    body: document.querySelector('#newGoalBody').value
  };

  // Send the updated goal data to the API endpoint
  try {
    const response = await fetch(`/api/goals/${ goalId }`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newGoalData)
    });

    if (!response.ok) {
      throw new Error('Failed to update goal');
    }

    // Redirect the user to the updated goal page
    window.location.href = `/goals/${ goalId }`;
  } catch (error) {
    console.error(error);
  }
});

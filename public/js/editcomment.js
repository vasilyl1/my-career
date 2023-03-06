const editCommentBtn = document.querySelector('#editCommentForm');

editGoalBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  const date = new Date();

  // Get the updated comment data from the form inputs
  const commentData = {
    //name: document.querySelector('#newGoalName').value,
    date: date,
    //body: document.querySelector('#newGoalBody').value
  };

  // Send the updated comment data to the API endpoint
  try {
    return;
    const response = await fetch(`/api/comments/${ goalId }`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newGoalData)
    });

    if (!response.ok) {
      throw new Error('Failed to update comment');
    }

    // Redirect the user to the updated goal page
    document.location.reload();
  } catch (error) {
    console.error(error);
  }
});

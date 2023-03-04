$(function() {

  $('#newGoalBtn').click(() => {
    $('#scrollable-window').hide();
    $('#newGoalBtn').hide();
    $('#createGoalContainer').show();
  });
  $('#createGoalBtn').click(() => {
    $('#createGoalContainer').hide();
    $('#scrollable-window').show();
    $('#newGoalBtn').show();
  });

  $('#createGoalContainer').hide();
  $( '#newGoalDate' ).datepicker();


  // const goalIds = await fetch('/api/goals').then(res => res.json()).then(data => data.map(goal => goal._id));
  // console.log(goalIds);
});
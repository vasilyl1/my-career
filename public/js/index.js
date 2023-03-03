$(function() {
  $( '#newGoalDate' ).datepicker();
});

$(function() {
  $('#newGoal').click(function() {
    $('#scrollable-window').hide();
    $('#newGoal').hide();
    $('#createGoalContainer').show();
  });
  $('#create').click(function() {
    $('#createGoalContainer').hide();
    $('#scrollable-window').show();
    $('#newGoal').show();
  });
});

$('#createGoalContainer').hide();
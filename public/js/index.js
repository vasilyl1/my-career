$(function() {
  $( '#newGoalDate' ).datepicker();
});

$(function() {
  $('#newGoalBtn').click(function() {
    $('#scrollable-window').hide();
    $('#newGoalBtn').hide();
    $('#createGoalContainer').show();
  });
  $('#createGoalBtn').click(function() {
    $('#createGoalContainer').hide();
    $('#scrollable-window').show();
    $('#newGoalBtn').show();
  });
});

$('#createGoalContainer').hide();
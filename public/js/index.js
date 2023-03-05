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

  $('#btnContainer').show();
  $('#createGoalContainer').hide();
  $('#addCommentContainer').hide();
  $('#editGoalContainer').hide();
  $( '#editGoalDate' ).datepicker();
  $( '#newGoalDate' ).datepicker();

  $('#editGoalForm').click(() => {
    $('#btnContainer').hide();
    $('#singleGoal').hide();
    $('#editGoalContainer').show();
  });

  $('#addCommentForm').click(() => {
    $('#btnContainer').hide();
    $('#singleGoal').hide();
    $('#addCommentContainer').show();
  });

  // const goalIds = await fetch('/api/goals').then(res => res.json()).then(data => data.map(goal => goal._id));
  // console.log(goalIds);
});

async function showPartial(objId) {
  const source = await getSource(objId);
  const template = await Handlebars.compile(source);
  const context = {};
  const htmlString = template(context);
  document.getElementById('partialContainer').innerHTML = await htmlString;
}

async function getSource(objId) {
  const id = `goal${ objId }`;
  return document.getElementById(id).innerHTML;
}

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
/* eslint-disable eqeqeq */
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

function toggleDropdown () {
  // Toggle the 'aria-expanded' attribute
  $(this).attr('aria-expanded', function(index, attr) {
    return attr == 'true' ? 'false' : 'true';
  });

  // Toggle the 'aria-hidden' attribute
  $('#advisorDropdownMenu').attr('aria-hidden', function(index, attr) {
    return attr == 'true' ? 'false' : 'true';
  });

  // select the SVG element and its parent container
  const svg = $('#chevronDown');
  const svgContainer = svg.parent();

  // toggle the flipped class on click
  svgContainer.toggleClass('flipped');

  // Toggle the visibility of the dropdown menu
  $('#advisorDropdownMenu').toggleClass('hidden');
};
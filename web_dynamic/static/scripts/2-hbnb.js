$(document).ready(function () {
  const amenities = {};
  $('input[type="checkbox"]').click(function () {
    if ($(this).prop('checked') === true) {
      amenities[$(this).data('name')] = $(this).data('id');
    } else if ($(this).prop('checked') === false) {
      delete amenities[$(this).data('name')];
    }
    console.log(amenities);
    const H4 = $(this).closest('.amenities').find('h4');
    const list1 = [];
    for (const i in amenities) {
      list1.push(i);
    }
    console.log(list1);
    H4.text(list1);
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function(data, Status) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
      $('#api_status').addClass('noavailable');
    }
  });
});

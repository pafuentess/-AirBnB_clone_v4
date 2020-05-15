document.ready(function () {
  const amenities = {};
  $('input[type="checkbox']).click(function () {
    if ($(this).prop('checked') == true) {
      amenities[$(this).data('name')] = $(this).data('id');
    } else if ($(this).prop('checked') == false) {
      delete amenities[$(this).data('name')];
    }
    console.log(amenities);
  });
});

$(document).ready(function () {
  const amenities = {};
  const ids = [];
  $('input[type="checkbox"]').click(function () {
    if ($(this).prop('checked') === true) {
      amenities[$(this).data('name')] = $(this).data('id');
    } else if ($(this).prop('checked') === false) {
      delete amenities[$(this).data('name')];
    }
//    console.log(amenities);
    const H4 = $(this).closest('.amenities').find('h4');
    const list1 = [];
    for (const i in amenities) {
      list1.push(i);
      ids.push(amenities[i]);
    }
//    console.log(list1);
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
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'post',
    data: '{}',
    headers: {
      'Content-Type': 'application/json'
    },
    dataType: 'json'
  }).done(function (data) {
  //  console.log(data);
    for (const place of data) {
      $('.places').append(`
        <article>
          <div class='title_box'>
            <h2>${place.name}</h2>
            <div class='price_by_night'>${place.price_by_night}</div>
          </div>
          <div class='information'>
            <div class='max_guest'>${place.max_guest} Guests</div>
            <div class='number_rooms'>${place.number_rooms} Bedrooms</div>
            <div class='number_bathrooms'>${place.number_bathrooms} Bathroom</div>
          </div>
          <div class='user'>
            <b>Owner:</b> ${place.user_id}
          </div>
          <div class='description'>
            ${place.description}
          </div>
        </article>`);
    }
  });
  $('.filters > button').click(function () {
    $('.places > article').remove();
    $.ajax({
      type: 'post',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: JSON.stringify({ amenities: ids }),
      headers: {
        'Content-Type': 'application/json'
      },
      dataType: 'json'
    }).done(function (data) {
      console.log(data);
      for (const place of data) {
        $('.places').append(`
          <article>
            <div class='title_box'>
              <h2>${place.name}</h2>
              <div class='price_by_night'>${place.price_by_night}</div>
            </div>
            <div class='information'>
              <div class='max_guest'>${place.max_guest} Guests</div>
              <div class='number_rooms'>${place.number_rooms} Bedrooms</div>
              <div class='number_bathrooms'>${place.number_bathrooms} Bathroom</div>
            </div>
            <div class='user'>
              <b>Owner:</b> ${place.user_id}
            </div>
            <div class='description'>
              ${place.description}
            </div>
          </article>`);
      }
    });
  });
});

var breeds = {};

function getLatestPuppyList(){
  $.ajax({
    url: "https://pacific-stream-9205.herokuapp.com/puppies.json",
    type: 'GET',
    dataType: 'json',
    success: function(puppies) { populatePuppyList(puppies); },
    error: function() { console.log("error"); }
  });
}

function populatePuppyList(puppies) {
  // var yourObject = JSON.parse(json);
  $('#puppies').siblings().empty();
  for(var i=0; i < puppies.length; i++){
    var name = puppies[i].name;
    var breed = puppies[i].breed['name'];
    // $('#puppies').append('<tr> <td>'+name+'</td><td>'+breed+'</td> </tr>');

    // Refactor: Build a tag in a function
    var link = '<a href=# class=\"adopt-link\" id=\"' + puppies[i].id + '\">adopt<\a>';
    $('<tr> <td>'+name+'</td><td>'+breed+'</td> <td>'+link+'</td></tr>').insertAfter('#puppies');
  }
}

function sortedNewPuppyData(){
  // var inputs = $('form').serialize();
  // console.log(inputs);
  var name = $('#name').val();
  var breed = $('#breed').val();
  var data = {name: name, breed_id: breed};
  return data;
}

function addPuppy(){
  var data = sortedNewPuppyData();
  $.ajax({
    url: "https://pacific-stream-9205.herokuapp.com/puppies.json",
    data: JSON.stringify(data),
    type: 'POST',
    dataType: 'json',
    contentType: "application/json",
    headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000'},
    success: function(new_puppy) { addPuppyToList(new_puppy); },
    error: function(obj, status, msg) { displayError(msg); }
  });
}

function addPuppyToList(puppy) {
  console.log(puppy);
  var name = puppy.name;
  var breed_id = puppy.breed_id;
  // $('#puppies').prepend('<tr> <td>'+name+'</td><td>'+breed[breed_id]+'</td> </tr>');
  $('<tr> <td>'+name+'</td><td>'+breeds[breed_id]+'</td> <td>'+link+'</td> </tr>').insertAfter('#puppies');
}

function breedList(){
  $.ajax({
    url: "https://pacific-stream-9205.herokuapp.com/breeds.json",
    type: 'GET',
    dataType: 'json',
    success: function(breeds) { populateBreedList(breeds); },
    error: function() { console.log("error"); }
  });
}

function populateBreedList(returnedBreeds){
  for(var i = 0; i < returnedBreeds.length; i++){
    breeds[returnedBreeds[i].id] = returnedBreeds[i].name;
  }
}

function displayError(msg){
  $('#error-msg').text(msg);
}

function adoptPuppy(id) {
  var baseUrl = 'https://pacific-stream-9205.herokuapp.com/puppies/';
  var url = baseUrl + id + '.json';
  $.ajax({
    url: url,
    data: JSON.stringify({id: id}),
    type: 'DELETE',
    contentType: "application/json",
    headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000'},
    success: function() { console.log("success"); },
    error: function() { console.log("error"); }
  });
}

$(document).ready(function(){

  breedList();

  $('#puppy-list').click(function(e){
    e.preventDefault();
    getLatestPuppyList();
  });

  $('form').submit(function(e){
    e.preventDefault();
    addPuppy();
  });

  $('#puppy-table').on('click', '.adopt-link', function(e) {
    e.preventDefault();
    adoptPuppy($(this).attr('id'));
  });

});


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
  // console.log(puppies);
  $('#puppies').empty();
  for(var i=0; i < puppies.length; i++){
    var name = puppies[i].name;
    var breed = puppies[i].breed['name'];
    $('#puppies').append('<tr> <td>'+name+'</td><td>'+breed+'</td> </tr>');
  }
  // console.log(typeof json);
  // $("#puppy-list").text(json.html);
}

function sortedNewPuppyData(){
  var inputs = $('form').serialize();
  return JSON.parse(inputs);
  // console.log(input);
  // var name = $('#name').val();
  // console.log(name);
  // var breed = $('#breed').val();
  // console.log(breed);
}

function addPuppy(){
  sortedNewPuppyData();
  $.ajax({
    url: "https://pacific-stream-9205.herokuapp.com/puppies.json",
    type: 'POST',
    dataType: 'json',
    success: function(puppies) { populatePuppyList(puppies); },
    error: function() { console.log("error"); }
  });
}

$(document).ready(function(){

  $("#puppy-list").click(function(e){
    e.preventDefault();
    getLatestPuppyList();
  });

  $('#submit').click(function(e){
    e.preventDefault();
    addPuppy();
  });

});


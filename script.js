$(document).ready(function(){



$("#puppy-list").click(function(e){
  e.preventDefault();
  getLatestPuppyList();
})

function getLatestPuppyList(){
  console.log("test");
  $.ajax({
    url: "https://pacific-stream-9205.herokuapp.com/puppies.json",
    type: 'GET',
    dataType: 'json',
    success: function(json) { populatePuppyList(json) },
    error: function() { console.log("error"); }
  })
}

function populatePuppyList(json) {
  // var yourObject = JSON.parse(json);
  // console.log(yourObject[0]);
  // console.log(typeof json);
  $("#puppy-list").text(json.html);
}


});
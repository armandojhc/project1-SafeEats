<<<<<<< HEAD
function tacoGenerator() {
=======
M.AutoInit();//This just initializes the modal, leave here please

$(document).ready(function() {

  $("button").on("click", function(event) {
    event.preventDefault();
    var x = $(this).data("search");
    console.log(x);

>>>>>>> e41eda6d3f60c14f804f24026698cf831b832768
    var queryURL = "https://taco-randomizer.herokuapp.com/random/";
    var tmp = "";

    $.ajax({ url: queryURL, method: "GET" })
        .done(function(response) {

            //
            tmp += "<h5>Base Layer:</h5>";
            tmp += "<p>" + response.base_layer.name + "</P>"
            tmp += "<h5>Seasoning:</h5>";
            tmp += "<p>" + response.seasoning.name + "</p>";
            tmp += "<h5>Mixing:</h5>";
            tmp += "<p>" + response.mixin.name + "</P>"
            tmp += "<h5>Shell:</h5>";
            tmp += "<p>" + response.shell.name + "</p>";
            tmp += "<h5>Condiment:</h5>";
            tmp += "<p>" + response.condiment.name + "</P>";

            //
            $("#sideTaco").html(tmp);

        });
<<<<<<< HEAD



}
tacoGenerator();
=======
  });

  // TEMPORARY TEST
  var queryURL = "https://taco-randomizer.herokuapp.com/random/";

  $.ajax({ url: queryURL, method: "GET" })
      .done(function(response) {
          console.log(response);

  });

});
>>>>>>> e41eda6d3f60c14f804f24026698cf831b832768

// M.AutoInit();//This just initializes the modal, leave here please

$(document).ready(function() {

// Search button Event Listener
  M.AutoInit();
$('select').formSelect();
  $("#mainSearchButton").on("click", function(event) {
    event.preventDefault();
    var x = $(this).data("search");
    console.log(x);
      
      // Grabs Selected Values from drop down 
        var instance = M.FormSelect.getInstance($('#healthExclusion'));
        var healthExclusionList = instance.getSelectedValues();
        console.log(healthExclusionList);
        // Turns those values that are actually put on an array and with the .join method makes them one big string.
        var healthExclusionString = healthExclusionList.join(",");
        console.log(healthExclusionString);

      // Calling the searchRecipe function which makes the API call to extract the recipies based on the search criteria 

        searchRecipe($('#recipeSearchBar').val() , healthExclusionString , $('#exludingSearch').val())

    // var queryURL = "https://taco-randomizer.herokuapp.com/random/";

    // // $.ajax({ url: queryURL, method: "GET" })
    // //     .done(function(reponse) {
    // //         console.log(response);

    // //     });
  });

  // TEMPORARY TEST
  var queryURL = "https://taco-randomizer.herokuapp.com/random/";

  $.ajax({ url: queryURL, method: "GET" })
      .done(function(response) {
          console.log(response);

  });

});
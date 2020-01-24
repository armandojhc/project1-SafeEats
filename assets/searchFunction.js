function searchRecipe (recipeTerm , ingredientExclusion ) {
    if (!recipeTerm) {
        //maybe we can show a message that says "This field is required" 
        //for now we can use alert but we want to remove that eventually (alerts look bad)
        $("#recipe-required").show();
    } else {
        $("#recipe-required").hide();
        
        console.log("searchRecipe....")
        var queryUrl = 'https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=' + recipeTerm.trim() + '&app_id=d549832b&app_key=ac5f304327def26f67da0b1d135b5c0e&from=0&to=10'// + '&excluded=' + ingredientExclusion.trim() + '&health=' + healthExclusion.trim();
        if ( ingredientExclusion ) {
            queryUrl += '&excluded=' + ingredientExclusion.trim();
        }
        
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).done( function (response) {

            console.log(response.hits);

            // showResults(response.hits);


        });
    }

 }

//  Recommend to create a new function that loops through the response.hits array and then popula

function showResults(results) {

}

//  searchRecipe();

// $("body").append(
//     $("<button type='button'>").text("test api call").click(function(){
//     searchRecipe("","","");
//  }));

// for loop to go over the ten recipies to create list 
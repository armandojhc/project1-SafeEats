function searchRecipe (recipeTerm , healthExclution , ingredientExclution ) {

    var queryUrl = 'https://api.edamam.com/search?q=' + 'ar' + '&app_id=d549832b&app_key=ac5f304327def26f67da0b1d135b5c0e&from=0&to=10&health=' + 'peanut-free' + '&excluded=' + 'shrimp';
    console.log("wut");
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).done( function (response) {

        console.log(response);


    });

 }

 searchRecipe();

// $("body").append(
//     $("<button type='button'>").text("test api call").click(function(){
//     searchRecipe("","","");
//  }));

// for loop to go over the ten recipies to create list 
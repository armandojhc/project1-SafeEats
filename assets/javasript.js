M.AutoInit();//This just initializes the modal, leave here please

$(document).ready(function() {
  //loadRecipes();
  
  tacoGenerator();

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
  
      searchRecipe($('#recipeSearchBar').val() , healthExclusionString , $('#exludingSearch').val());
  
  });

  $("#recipeBtn").click(function() {
    if($("#header").hasClass("greenSwitch")) {
        savedPage();
        //createList();
    } else {
        searchPage();
    }
    return;
  });
  
  $(document).on("click", ".view", function() {
      //var recipe = $(this).attr('id');
      //search() -- use what it returns
      getGif("cat");//instead of cat recipe var
      $("#modalHeader").text("new header text");
      $("#recipeContainer").text("new recipe content");
      M.Modal.getInstance(recipeModal).open();
      return;
  });

  $(document).on("click", ".add", function() {
      //var recipe = $(this).attr('id');
      $(this).css("visibility", "hidden");
      //saveRecipes(this thingy)
      return;
  });

  $(document).on("click", ".delete", function() {
      //var recipe = $(this).attr('id');
      //deleteRecipe(this thingy)
      $("#main").empty();
      //createList();
      return;
  });

});

function searchPage() {
    $("#main").empty();
    $("#btnTxt").text("recipes");
    $(".md-24").text("menu_book");
    if($("#header").hasClass("blueSwitch")){
        $("#header").toggleClass("blueSwitch");
    }
    if($("#header").hasClass("yellowSwitch")){
        $("#header").toggleClass("yellowSwitch");
    }
    $("#header").toggleClass("greenSwitch");
    return;
}

function resultPage() {
    $("#main").empty();
    $("#btnTxt").text("back");
    $(".md-24").text("keyboard_backspace");
    if($("#header").hasClass("greenSwitch")){
        $("#header").toggleClass("greenSwitch");
    }
    if($("#header").hasClass("yellowSwitch")){
        $("#header").toggleClass("yellowSwitch");
    }
    $("#header").toggleClass("blueSwitch");
    return;
}

function savedPage() {
    $("#main").empty();
    $("#btnTxt").text("back");
    $(".md-24").text("keyboard_backspace");
    if($("#header").hasClass("greenSwitch")){
        $("#header").toggleClass("greenSwitch");
    }
    if($("#header").hasClass("blueSwitch")){
        $("#header").toggleClass("blueSwitch");
    }
    $("#header").toggleClass("yellowSwitch");
    return;
}

function getGif(searchTerm) {
    
    var linkUrl = "https://api.giphy.com/v1/gifs/search?q="+searchTerm+"&limit=1&api_key=aNaCVPYDVjQethaqMIIwbmIElaUThThF";
    var tmp = "<img id='gifImg' src='";

    $.ajax({
        url: linkUrl,
        method: "GET"
    }).then(function(response) {
        var link = response.data[0].images.original.url;
        tmp +=  link + "' alt='A gif of your selected recipe' >";
        $("#gifContainer").html(tmp);
    });
}

function tacoGenerator() {
    var queryURL = "https://taco-randomizer.herokuapp.com/random/";
    var tmp = "";

    $.ajax({ url: queryURL, method: "GET" })
        .done(function(response) {

            tmp += "<h6>Base Layer:</h6>";
            tmp += "<p>" + response.base_layer.name + "</P>"
            tmp += "<h6>Seasoning:</h6>";
            tmp += "<p>" + response.seasoning.name + "</p>";
            tmp += "<h6>Mixing:</h6>";
            tmp += "<p>" + response.mixin.name + "</P>"
            tmp += "<h6>Shell:</h6>";
            tmp += "<p>" + response.shell.name + "</p>";
            tmp += "<h6>Condiment:</h6>";
            tmp += "<p>" + response.condiment.name + "</P>";

            $("#sideTaco").html(tmp);

        });
}
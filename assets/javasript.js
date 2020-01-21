M.AutoInit();//This just initializes the modal, leave here please

$(document).ready(function() {
  //loadRecipes();
  
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
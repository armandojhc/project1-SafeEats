M.AutoInit();//This just initializes the modal, leave here please


$(document).ready(function() {
    $("#header").toggleClass("greenSwitch");
    tacoGenerator();
    searchPage();

  $("#recipeBtn").click(function() {
    if($("#header").hasClass("greenSwitch")) {
        savedPage();
        createList(true);
    } else {
        searchPage();
    }
    return;
  });
  
  $(document).on("click", ".mainSearchButton", function() {
    console.log("click");
    if(!validateInput($("#recipeSearch").val())) {
        $(".hlpTxt1").css("color", "red");
        $(".hlpTxt1").text("Please only enter letters");

        console.log("invalid");
        return;
    }
    search();
    return;
  });
  
  $(document).on("click", ".view", function() {
      var pointer = parseInt($(this).attr('id'));
      if($(this).hasClass("search")) {
        var load = JSON.parse(localStorage.getItem("searched"));
      } else {
        var load = loadRecipes();
      }
      var tmp = "";
      for(var i = 0; i < load[pointer].ingredients.length; i++) {
        tmp +=  load[pointer].ingredients[i];
        tmp += "<br>";
      }
      var newUrl = load[pointer].url;
      console.log(newUrl);
      $("#modalHeader").text(load[pointer].name);
      getGif(load[pointer].name);
      $("#recipeContainer").html(tmp);
      $("#recipeLink").attr("href", newUrl);
      M.Modal.getInstance(recipeModal).open();
      return;
  });
  
  $(document).on("click", ".add", function() {
    var pointer = parseInt($(this).attr('id'));
    saveRecipes(pointer);
    $(this).css("visibility", "hidden");
    return;
  });

  $(document).on("click", ".delete", function() {
      var pointer =  parseInt($(this).attr('id'));
      deleteRecipe(pointer);
      $("#main").empty();
      createList(true);
      return;
  });

});

function searchPage() {
    $("#main").empty();
    $("#main").css("overflow", "hidden");
    $("#btnTxt").text("recipes");
    $(".md-24").text("menu_book");
    if($("#header").hasClass("blueSwitch")){
        $("#header").toggleClass("blueSwitch");
    }
    if($("#header").hasClass("yellowSwitch")){
        $("#header").toggleClass("yellowSwitch");
    }
    $("#header").toggleClass("greenSwitch");
    $("#main").html("<div class='row' id='searchContainer'><form class='col s12'><div class='row'><div class='input-field col s12'><input id='recipeSearch' type='text'><label for='recipeSearch'>Recipe?</label><span class='helper-text hlpTxt1'></span></div><div class='input-field col s12'><input id='excludingSearch' type='text' class='validate'><label for='excludingSearch'>Unwanted ingredients?</label><span class='helper-text hlpTxt2' style='text-align: left;'>Optional</span></div><div class='input-field col s12'><a class='waves-effect waves-light btn-small mainSearchButton'>Search</a></div></div></form></div>");
    return;
}

function resultPage() {
    $("#main").empty();
    $("#main").css("overflow", "scroll");
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
    $("#main").css("overflow", "scroll");
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
            tmp += "<h5>TACO OF THE DAY</h6>"
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


function search() {
    var searchTerm = $("#recipeSearch").val();
    var excluded = $("#excludingSearch").val();
    $("#main").html("<div class='preloader-wrapper big active'><div class='spinner-layer spinner-green-only'><div class='circle-clipper left'><div class='circle'></div></div><div class='gap-patch'><div class='circle'></div></div><div class='circle-clipper right'><div class='circle'></div></div></div></div>");
    apiLink = "https://api.edamam.com/search?q="+ searchTerm +"&app_id=d549832b&app_key=ac5f304327def26f67da0b1d135b5c0e";
    if(validateInput(excluded)) {
        apiLink += "&excluded=" + excluded;
    } else {
        console.log("No exclusions");
    }
    $.ajax({
        url: apiLink,
        method: "GET"
    }).done(function (response) {
        responseGlobal = response;
        console.log(response);
        resultPage();
        createList(false);
        return;
    });
}

function loadRecipes() {
    if(localStorage.getItem("savedRecipes") !== null) {
        var storedRecipes = JSON.parse(localStorage.getItem("savedRecipes"));
        if(storedRecipes.length === 0) {
            return false;
        }
        return storedRecipes;
    } else {
        return false;
    }
}

function saveRecipes(pointer) {
    var response = responseGlobal;
    if(localStorage.getItem("savedRecipes") !== null) {
        var storedRecipes = JSON.parse(localStorage.getItem("savedRecipes"));
    } else {
        var storedRecipes = [];
    }
    var newRecipe = {
        name : response.hits[pointer].recipe.label,
        url : response.hits[pointer].recipe.url,
        ingredients : response.hits[pointer].recipe.ingredientLines
    };
    storedRecipes.push(newRecipe);
    console.log(storedRecipes);
    localStorage.setItem("savedRecipes", JSON.stringify(storedRecipes));
    return true;
}

function deleteRecipe(pointer) {
    var storedRecipes = JSON.parse(localStorage.getItem("savedRecipes"));
    var deletedItem = storedRecipes.splice(pointer, 1);
    console.log(deletedItem);
    localStorage.setItem("savedRecipes", JSON.stringify(storedRecipes));
    return;
}

function validateInput(usrEntry) {
    if(!usrEntry.replace(/\s/g, '').length) {
        console.log("contains space / no data");
        return false;
    } else if(usrEntry.match(/[0-9]/g)) {
        console.log("contains numbers");
        return false;
    } else {
        return true;
    }
}

function createList(isSave) {
    if(loadRecipes() || isSave === false) {
        var tmp = "<div class='row'><div class='col m12'>";
        if(isSave === true) {
            var recipes = loadRecipes();
        } else {
            var response = responseGlobal;
            var recipes = [];
            for(var i = 0; i < 10; i++) {
                var newRecipe = {
                    name : response.hits[i].recipe.label,
                    url : response.hits[i].recipe.url,
                    ingredients : response.hits[i].recipe.ingredientLines
                };
                recipes.push(newRecipe);
            }
        }
        for(var i = 0; i < recipes.length; i++) {
            if(i % 2 == 0) {
                tmp += "<div class='saved1'>";
            } else {
                tmp += "<div class='saved2'>";
            }
            tmp += "<div class='row'><div class='col m6 recipeName'>";
            tmp += recipes[i].name;
            tmp += "</div><div class='col m6'>";
            if(isSave === true) {
                tmp += "<button class='view recBtn' id='" + i + "v'>View</button>";
                tmp += "<button class='delete recBtn' id='" + i + "d'>Delete</button>";
            } else {
                tmp += "<button class='view recBtn search' id='" + i + "v'>View</button>";
                tmp += "<button class='add recBtn' id='" + i + "a'>Add</button>";
            }
            tmp += "</div></div></div>";
            // tmp += "<br>";
        }
        tmp += "</div></div>";
        localStorage.setItem("searched", JSON.stringify(recipes));
        $("#main").html(tmp);
        console.log(recipes);
    } else {
        console.log("returned " + isSave);
        return;
    }
}
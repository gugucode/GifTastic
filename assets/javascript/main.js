var labels = ["sushi","pizza","dumpling","apple","yogurt"];
var api_key = "QcEoE1Z2Sq2zbYKLnb1LParbGCJtqYaT";

function renderBnt(label){
    var bnt = $("<button>").addClass("bnt").text(label);
    $("#bntlabels").append(bnt);
}

// access API to get data and print
function getAndPrint(key){
    var url_link = "http://api.giphy.com/v1/gifs/search?q=" + key + "&api_key=" + api_key + "&limit=10";
    $.ajax({
        url: url_link,
        method: "GET"
    }).then(function(response){
        console.log(response);
        var results = response.data;
        $("#giphys").empty()
        for (var i = 0; i < results.length; i++) {
          var giphyDiv = $("<div>").addClass("giphydiv");
          var p = $("<p>").text("Rating: "+results[i].rating);
          var foodImage = $("<img>").attr("src",results[i].images.fixed_height_still.url);
          giphyDiv.append(p,foodImage);
          $("#giphys").prepend(giphyDiv);
        }
    })
}

$(document).ready(function() {
    
    for(var i = 0; i < labels.length; i++){
        renderBnt(labels[i]);
    }

    $("#addbnt").on("click",function(event){
        event.preventDefault();
        var label = $("#search_term").val().trim();
        if(label !== ""){
            renderBnt(label);
            getAndPrint(label);
            $("#search_term").val("");
        }
    })

    $(".bnt").click(function(){
        var label = $(this).text();
        getAndPrint(label);
    })




})
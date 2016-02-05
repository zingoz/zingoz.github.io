//?api_key=61284f62-b108-40a4-a31f-5a30fc27bc78
/*Made by Ludvig Roxin*/
var allchampions = new Array();
var ajax1 = new Array();
var hejhej = new Array();
var ajax2 = {};
var MyKey = "61284f62-b108-40a4-a31f-5a30fc27bc78";

$("#btnload").click(function(){
  var ul = document.getElementById("ultest");
  ul.innerHTML = "";
  allchampions = [];
  //https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion?api_key=
    $.getJSON("https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion/?champData=tags,image&api_key="+ MyKey, function(test1){
      hejhej = test1;
      $.each(test1.data, function(i,test2){
        if (test2.tags.length == 2) {
          allchampions.push({"name": test2.name, "id": test2.id, "imglink": test2.image.full,"title": test2.title, "roles": test2.tags[0]+" & "+test2.tags[1]});
        }
        else {
          allchampions.push({"name": test2.name, "id": test2.id, "imglink": test2.image.full,"title": test2.title, "roles": test2.tags});
        }
      });
    });
    document.getElementById("ultest").innerHTML = "";
    allchampions.sort(function(thename, theid) {
      return ((thename.name < theid.name) ? -1 : ((thename.name == theid.name) ? 0 : 1));
    });
    for (var i = 0; i < allchampions.length; i++) {
      NewItem(allchampions[i].name);
    }
      ul.addEventListener("click", function(wasclicked) {
        if (wasclicked.target.tagName === "LI"){
          otherchamp(wasclicked.target.textContent);
        }
      });
});

function otherchamp(w){
  for (var i = 0; i < allchampions.length; i++) {
    if (allchampions[i].name == w) {
      finishedloading(w);
      break;
    }
  }
document.getElementById("squareimg").style.display = "block";
}

function finishedloading(u) {
  $("#champroles").empty();
  $("#chosenchamp").empty();
  $("#champtitle").empty();
  $.each(allchampions, function( i, val ) {
    if (u==val.name){
      $("#chosenchamp").append(val.name);
      $("#champtitle").append(val.title);
      $("#champroles").append(val.roles);
      changechampimg(val.imglink.slice(0,-4));
    }
  });
}

$("#btnwrite").click(function(){
    document.getElementById("ultest").innerHTML = "";
    allchampions.sort(function(thename, theid) {
      return ((thename.name < theid.name) ? -1 : ((thename.name == theid.name) ? 0 : 1));
    });
    for (var i = 0; i < allchampions.length; i++) {
      NewItem(allchampions[i].name);
    }
});

function changechampimg(ojojoj) {
  var imagesquare = document.getElementById("squareimg");
  imagesquare.src = "http://ddragon.leagueoflegends.com/cdn/6.2.1/img/champion/" + ojojoj + ".png";
}

$("#squareimg").click(function(){
  var imageload = document.getElementById("bigimg");
  imageload.src = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + document.getElementById("chosenchamp").textContent + "_0.jpg";
  showimage();
});
function showimage(){
  document.getElementById("bigimg").style.display = "block";
}
function NewItem(thename) {
  var ul = document.getElementById("ultest");
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(thename));
  ul.appendChild(li);
}
function extractinfo(theinfo){
  $.each(theinfo, function(i, val1){
    $.each(val1, function(o, val2){
      console.log(o, val2);
    });
  });
}

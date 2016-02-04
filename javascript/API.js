//?api_key=61284f62-b108-40a4-a31f-5a30fc27bc78
//https://developer.riotgames.com/api/methods
//https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion?api_key=61284f62-b108-40a4-a31f-5a30fc27bc78
//Champions (Splash Art):
//http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg
var allchampions = new Array();
var allofit = new Array();
var champname = "";
var champnumber = 1;
var ul = document.getElementById("list");
$("#btnload").click(function(){
    $.getJSON("https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion?api_key=61284f62-b108-40a4-a31f-5a30fc27bc78", function(test1){
      allofit.push(test1);
      $.each(test1.data, function(i,test2){
        allchampions.push({"name": test2.name, "id": test2.id});
      });
    });
    var ul = document.getElementById("ultest");
    ul.addEventListener("click", function(wasclicked) {
      if (wasclicked.target.tagName === "LI"){
        document.getElementById("chosenchamp").innerHTML = wasclicked.target.textContent;
        changechampimg(wasclicked.target.textContent);
      }
    });
});

$("#btnwrite").click(function(){
    var temporary;
    document.getElementById("ultest").innerHTML = "";
    allchampions.sort(function(thename, theid) {
      return ((thename.name < theid.name) ? -1 : ((thename.name == theid.name) ? 0 : 1));
    });
    for (var i = 0; i < allchampions.length; i++) {
      temporary = allchampions[i].name;
      NewItem(temporary);
    }
});

function changechampimg(name) {
  var image = document.getElementById("championimg");
  image.src = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + name + "_0.jpg";
}

function NewItem(thename) {
  var ul = document.getElementById("ultest");
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(thename));
  ul.appendChild(li);
}

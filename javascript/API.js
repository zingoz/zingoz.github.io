//?api_key=61284f62-b108-40a4-a31f-5a30fc27bc78
//https://developer.riotgames.com/api/methods
var allchampions = new Array();
var champname = "";
var champnumber = 1;
var ul = document.getElementById("list");
$("#btnload").click(function(){
    $.getJSON("https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion?api_key=61284f62-b108-40a4-a31f-5a30fc27bc78", function(test1){
      $.each(test1.data, function(i,test2){
        champname = test2.name;
        allchampions.push(champname);
      });
    });
});

$("#btnwrite").click(function(){
    document.getElementById("ultest").innerHTML = "";
    allchampions.toString();
    allchampions.sort();
    for (var i = 0; i < allchampions.length; i++) {
      NewItem(allchampions[i]);
    }
});

function NewItem(thename) {
  var ul = document.getElementById("ultest");
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(thename));
  li.setAttribute("id", "hejsan");
  ul.appendChild(li);
}

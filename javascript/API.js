/*Made by Ludvig Roxin*/
var allchampions = [];
var CurChamp = [];
var MyKey = "61284f62-b108-40a4-a31f-5a30fc27bc78";          //applied key to varaiable to make it easier
window.onload=function(){                                   //loads when the site is visited
  var ul = document.getElementById("ultest");
  ul.innerHTML = "";
    $.getJSON("https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion/?champData=tags,image,skins&api_key="+ MyKey, function(Maininfo){
      $.each(Maininfo.data, function(i,test2){         //adds the json info into a new object with all that is needed
        if (test2.tags.length == 2) {
          allchampions.push({"name": test2.name, "id": test2.id, "imglink": test2.image.full,"title": test2.title,"skins": test2.skins, "roles": test2.tags[0]+" & "+test2.tags[1]});
        }
        else {
          allchampions.push({"name": test2.name, "id": test2.id, "imglink": test2.image.full,"title": test2.title,"skins": test2.skins, "roles": test2.tags});
        }
      });
    })
    .done(function() {                                        //after the ajax request is done, sorts the objects in alfabetical order
      document.getElementById("ultest").innerHTML = "";
      allchampions.sort(function(thename, theid) {
        return ((thename.name < theid.name) ? -1 : ((thename.name == theid.name) ? 0 : 1));
      });
      for (var i = 0; i < allchampions.length; i++) {
        NewItem(allchampions[i].name,"ultest");
      }
    });
      ul.addEventListener("click", function(wasclicked) {            //makes possible to detect what champion was clicked
        if (wasclicked.target.tagName === "LI"){
          finishedloading(wasclicked.target.textContent);
        }
      });
}
function finishedloading(u) {
  var ul = document.getElementById("noidea");
  ul.addEventListener("click", function(wasclicked) {               //detects if a skin was clicked
    if (wasclicked.target.tagName === "LI"){
      skinlist(wasclicked.target.textContent);
    }
  });
  var ajaxdone = false;
  $.each(allchampions, function( i, val ) {             //cycles through to find what champion to check
    if (u==val.name){
      $.ajax({                                          //ajax command to check if a champion is free to play this week
              url: "https://euw.api.pvp.net/api/lol/euw/v1.2/champion/"+ val.id+"?api_key=" + MyKey,
              type: "GET",
              dataType: "json",
              data: {},
              success: function (json1) {
                $("#f2pstatus").empty();
                if (json1.freeToPlay) {
                  $("#f2pstatus").append("Is free to play");
                }
                ajaxdone = true;
              },
              error: function () {                     //just incase something goes wrong
                  console.log("error getting Summoner data!");
                  ajaxdone = false;
              },
              complete: function () {                     //clears & changes all the fields most of the fields after ajax request was a success
                if (ajaxdone == true) {
                    $("#chosenchamp").empty();
                    $("#champtitle").empty();
                    $("#champroles").empty();
                    $("#noidea").empty();
                    $("#chosenchamp").append(val.name);
                    $("#champtitle").append(val.title);
                    $("#champroles").append(val.roles);
                    changechampimg(val.imglink.slice(0,-4));
                    CurChamp=(val.skins);
                    $("#noidea").hide();
                    $.each(val.skins, function(o, val2){
                      NewItem(val2.name, "noidea");
                    });
                    document.getElementById("squareimg").style.display = "block";
                    return false;
                }
              }
    });
    }
  });
}
function changechampimg(ojojoj) {                                      //changes the champion icon based on your pick
  var imagesquare = document.getElementById("squareimg");
  imagesquare.src = "http://ddragon.leagueoflegends.com/cdn/6.2.1/img/champion/" + ojojoj + ".png";
  imagesquare.alt = ojojoj;
}
$("#squareimg").click(function(){                                         //calibrate position & toggle skin menu
  if ($("#noidea").position().top != 125 && !$("#f2pstatus").text()=="") {
    $("#noidea").css("top", -145 + "px");
  }
  else {
    $("#noidea").css("top", -125 + "px");
  }
  $("#noidea").toggle();
});
function skinlist(selectedskin){                                        //compares clicked skin name to get the right number for the image link
  $.each(CurChamp, function(i, o){
    if (selectedskin == o.name) {
      var imageload = document.getElementById("bigimg");
      imageload.src = "http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + document.getElementById("squareimg").alt + "_"+o.num+".jpg";
      imageload.alt = document.getElementById("squareimg").alt;
      showimage();
      return false;
    }
  });
}
function showimage(){                                     //Shows the big image of chosen champ+skin
  document.getElementById("bigimg").style.display = "block";
}
function NewItem(thename,listid) {                        //fills lists based on input
  var ul = document.getElementById(listid);
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(thename));
  ul.appendChild(li);
}
$("#dropbutton").click(function(){                        //shows & hides the championlist
  $("#outeruldiv").toggle();
});
document.onmouseup = function(event) {                     //hides the skin list after you've clicked anywhere
  $("#noidea").hide();
}

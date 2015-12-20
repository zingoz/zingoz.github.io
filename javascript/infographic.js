$(document).ready(function(){
  changeimg()
});

function stage(type){
  var image = document.getElementById('pokeimage');

  if (document.getElementById("radiofirst").checked==true) {
    image.src = "img/" + type + "_one.png";
    $("#pokeinfo").load("txt/" + type +"_one.txt");
  }
  else if (document.getElementById("radiosecond").checked==true) {
    image.src = "img/" + type + "_two.png";
    $("#pokeinfo").load("txt/" + type +"_two.txt");
  }
  else if (document.getElementById("radiothird").checked==true) {
    image.src = "img/" + type + "_three.png";
    $("#pokeinfo").load("txt/" + type +"_three.txt");
  }
}

function menuanimate(percent) {
  percent=percent + "%";
  $("#pokestage ul").animate({
      "padding-left": percent
  });/*
  $("#radiosecond:checked +label").css("background-color","grey");*/
}

function changeimg() {
  if (document.getElementById("radiograss").checked==true) {
    stage("grass");
    menuanimate(3);
  }
  else if (document.getElementById("radiowater").checked==true) {
    stage("water");
    menuanimate(37);
  }
  else if (document.getElementById("radiofire").checked==true) {
    stage("fire");
    menuanimate(70);
  }
}

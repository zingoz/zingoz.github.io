$(document).ready(function(){
  $(".b2button").click(function(){
    $(".b2div").toggle();
    $(".b3div").hide();
  });
  $(".b3button").click(function(){
    $(".b3div").toggle();
    $(".b2div").hide();
  });
});

function stage(type){
    var image = document.getElementById('pokeimage');
  if (document.getElementById("radiofirst").checked==true) {
    image.src = "img/" + type + "_one.png";
  }
  else if (document.getElementById("radiosecond").checked==true) {
    image.src = "img/" + type + "_two.png";
  }
  else if (document.getElementById("radiothird").checked==true) {
    image.src = "img/" + type + "_three.png";
  }
}

function changeimg() {
  if (document.getElementById("radiograss").checked==true) {
    stage("grass");
  }
  else if (document.getElementById("radiowater").checked==true) {
    stage("water");
  }
  else if (document.getElementById("radiofire").checked==true) {
    stage("fire");
  }
}

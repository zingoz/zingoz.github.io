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

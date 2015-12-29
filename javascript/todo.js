var OldText ="";
var running = true;
function NewClick(){
  var NewTodo = document.getElementById("TextArea").value;
  if (AllowedText(NewTodo)) {
    NewItem(NewTodo);
    document.getElementById("TextArea").value = "";
    document.getElementById("TextArea").focus();
    return;
  }
  else {
    if (running) {
      running=false;
      $("#divwarning").animate({textIndent: "0%"});
      setTimeout(function(){
        $("#divwarning").animate({textIndent: "100%"});
        running=true;
      }, 2800);
    }
  }
}
$(document).keypress(function (e) {
    if ((e.which == 13 || e.keyCode == 13) && document.activeElement.className == "DivTextName") {
      if (AllowedText(document.activeElement.value)) {
        document.activeElement.blur();
      }
      else {
        document.activeElement.value = OldText;
        document.activeElement.blur();
      }
    }
});

function NewIsItEnter(TheKey){
  if (TheKey.which == 13 || TheKey.keyCode == 13) {
      NewClick();
      return false;
    }
  return true;
}
function AllowedText(Text){
  if (Text != "" && Text.length > 0) {
    return true;
  }
  else {
    return false;
  }
}

function NewItem(TheText){
  var NewDiv = document.createElement('div');
  var NewLine = document.createElement("P");
  var DivText = document.createElement("input");
  DivText.setAttribute("type","text");
  DivText.value = TheText;
  DivText.disabled = true;
  DivText.className = "DivTextName";
  NewLine.className = "TheP";
  NewDiv.className = "TheDiv";
  NewLine.appendChild(DivText);
  NewLine.appendChild(StandardItems("Klar"));
  NewLine.appendChild(StandardItems("Ändra"));
  NewLine.appendChild(StandardItems("Ta Bort"));
  NewDiv.appendChild(NewLine);
  document.getElementById("middletodo").appendChild(NewDiv);
  Divcolorloop();
}

function StandardItems (ButtonText){
  var NewButton = document.createElement("input");
  NewButton.setAttribute("type","button");
  NewButton.setAttribute("value",ButtonText);
  NewButton.style.cssFloat ="Right";
  NewButton.className = "TheButton";
  if (ButtonText == "Ta Bort") {
    NewButton.setAttribute("onclick","javascript:Removefunc(this);");
  }
  else if (ButtonText == "Ändra") {
    NewButton.setAttribute("onclick","javascript:Changefunc(this);");
    NewButton.addEventListener("click", Divcolorloop);
  }
  else if (ButtonText == "Klar") {
    NewButton.setAttribute("onclick","javascript:Donefunc(this);");
    NewButton.addEventListener("click", Divcolorloop);
  }
  return(NewButton);
}

function Divcolorloop(){
  Divcolors("middletodo");
  Divcolors("bottomdone");
}

function Divcolors(ChosenDiv){
  var LeDiv = document.getElementById(ChosenDiv);
  var Divs = LeDiv.getElementsByClassName("TheDiv");
  for (var i = 0; i < Divs.length; i += 1) {
    if (i% 2 == 0) {
      Divs[i].style.backgroundColor = "#AAA";
      Divs[i].firstElementChild.firstElementChild.style.backgroundColor = "#AAA";
      Divs[i].firstElementChild.firstElementChild.style.borderBottom="2px solid #AAA";
      if (Divs[i].firstElementChild.firstElementChild == document.activeElement) {
        Divs[i].firstElementChild.firstElementChild.style.borderBottom ="2px solid #333";
      }
    }
    else {
      Divs[i].style.backgroundColor = "#DDD";
      Divs[i].firstElementChild.firstElementChild.style.backgroundColor = "#DDD";
      Divs[i].firstElementChild.firstElementChild.style.borderBottom="2px solid #DDD";
      if (Divs[i].firstElementChild.firstElementChild == document.activeElement) {
        Divs[i].firstElementChild.firstElementChild.style.borderBottom="2px solid #333";
      }
    }
  }
}
function Removefunc(Object){
  var BeGone = Object.parentNode.parentNode;
  BeGone.parentNode.removeChild(BeGone);
}
function Donefunc(element){
  if (element.parentNode.parentNode.parentNode.id == "bottomdone") {
    document.getElementById("middletodo").appendChild(element.parentNode.parentNode);
    element.value = "Klar";
  }
  else {
    document.getElementById("bottomdone").appendChild(element.parentNode.parentNode);
    element.value = "Inte Klar";
  }
}
function Changefunc(Objbut){
  OldText = Objbut.parentNode.firstElementChild.value;
  Objbut.parentNode.firstElementChild.disabled = false;
  Objbut.parentNode.firstElementChild.focus();
  Objbut.parentNode.firstElementChild.select();
  Objbut.parentNode.firstElementChild.addEventListener("focusout", LoseFocus);
  Objbut.parentNode.firstElementChild.addEventListener("blur", LoseFocus);
}
function LoseFocus(){;
  if (AllowedText(this.value)) {
    this.disabled = true;
  }
  else {
    this.value = OldText;
    this.disabled = true;
  }
  Divcolorloop();
}

function NewClick(){
  var NewTodo = document.getElementById("TextArea").value;
  if (AllowedText(NewTodo)) {
    NewItem(NewTodo);
    return;
  }
}


function AllowedText(Text){
  if (Text != null && Text != "" && Text.length > 1) {
    return true;
  }
  alert("Du måste skriva in giltig text!");
  return false;
}


function NewItem(TheText){
  var NewDiv = document.createElement('div');
  var NewLine = document.createElement("P");
  var DivText = document.createElement("input");
  DivText.setAttribute("type","text");
  DivText.value = TheText;
  DivText.disabled = true;
  DivText.className = "DivTextName";
  NewLine.className = "TheP"; //color
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
    }
    else {
      Divs[i].style.backgroundColor = "#DDD";
      Divs[i].firstElementChild.firstElementChild.style.backgroundColor = "#DDD";
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
  var OldText = Objbut.parentNode.firstElementChild.value;
  var NewText = prompt("What do you want to change?", Objbut.parentNode.firstElementChild.value);
  if (AllowedText(NewText)) {
    Objbut.parentNode.firstElementChild.value = NewText;
    return;
  }
  Objbut.parentNode.firstElementChild.value = OldText;
}

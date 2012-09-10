var previousVisit = function (bool){
  var div = document.getElementById('PreviousVisit');
  if (bool) {
    div.innerHTML = "<input class='input-mini' style='display: inline' type='number' name='Times'/> time Latest visit from <input style='dsplay:inline' type='date' name='LastVisitBegin'/> to <input type='date' name='LastVisitEnd'/>"
  } else {
    div.innerHTML = "";
  }
}

var criminalR = function (bool){
  var div = document.getElementById('CriminalR');
  if (bool){
    div.innerHTML = "<label>Details:</label><input class='input-large' name='CriminalRecord' type='text'/>"
  } else {
    div.innerHTML = "";
  }
}

var validate = function (){
  var empty = false;
  var controlGroups = document.getElementsByClassName("control-group");
  for (var i = 0; i < controlGroups.length; i++) {
    var inputs = controlGroups[i].getElementsByTagName("input");
    for (var j = 0; j < inputs.length; j++){
      if ((inputs[j].value == null || inputs[j].value == "") && controlGroups[i].className != "control-group error"){
        controlGroups[i].className += " error";
        empty = empty || true;
      }
    }
  }
  if (empty) {
    return false;
  } else {
    return true;
  }
}

var backToEdit = function() {
  window.history.back();
}

var addRel = function(n) {
  var h = document.createElement("H5");
  h.innerHTML = "Relative" + n;
  var div = document.createElement("DIV");
  div.id = "relDiv" + n;
  div.className = "control-group";
  div.appendChild(h);
  var button = document.createElement("INPUT");
  button.type = "button";
  button.value = "+";
  var arr = ["Name", "Date of birth", "Nationality", "Place of employment", "Status of residence", "Relation to applicant"];
  var arr2 = ["name", "birth", "national", "empl", "stat", "relation"];
  for (var i = 0; i < arr.length; i++){
    var input = document.createElement("INPUT");
    var label = document.createElement("LABEL");
      label.innerHTML = arr[i];
      div.appendChild(label);
    if (arr[i] != "Date of birth"){
      input.type = "text";
    } else {
      input.type = "date";
    }
      input.name = "rel" + n + "_" + arr2[i];  
      div.appendChild(input);
  }
  button.id = "addRel" + n;
  button.onclick = function (){
    var div = document.getElementById("relDiv" + n); 
    if (n < 3) {
      addRel(n + 1);
      div.removeChild(document.getElementById("addRel" + n));
    }
  };
  div.appendChild(button);
  document.getElementsByTagName("fieldset")[0].appendChild(div);
  div.style = "display: inline-block;";

}

var addRelatives = function() {
  var relCheck = document.getElementById("rel");
  if (rel.checked) {
    addRel(1)
  } else {
    document.getElementsByTagName("fieldset")[0].removeChild(document.getElementById("relDiv1"));
    if (document.getElementById("relDiv2")){
      document.getElementsByTagName("fieldset")[0].removeChild(document.getElementById("relDiv2"));
    }
    if (document.getElementById("relDiv3")){
      document.getElementsByTagName("fieldset")[0].removeChild(document.getElementById("relDiv3"));
    }
  }
}
 

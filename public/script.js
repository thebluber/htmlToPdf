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
  var yearsOfEdu = document.getElementsByName("YearsOfEdu")[0];
  if (yearsOfEdu.value < 13){
    yearsOfEdu.select();
    alert("Years of Education should be >= 13!");
    return true;
  }
  var notEmpty = false;
  var controlGroups = document.getElementsByClassName("control-group");
  for (var i = 0; i < controlGroups.length; i++) {
    var inputs = controlGroups[i].getElementsByTagName("input");
    for (var j = 0; j < inputs.length; j++){
      if (inputs[j].value == null || inputs[j].value == ""){
        if (controlGroups[i].className != "control-group error"){
          controlGroups[i].className += " error";
        }
        notEmpty = notEmpty || true;
      } else {
        notEmpty = notEmpty || false;
      }
    }
  }
  return notEmpty;
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

var lastPage = function() {
  var div = document.getElementById("validate");
  div.innerHTML = "";
  var h3 = document.createElement("H3");
  h3.innerHTML = "Bitte prüfen Sie, ob Ihre Unterlagen vollständig sind:";
  div.appendChild(h3);
  var ul = document.createElement("UL");
  ul.innerHTML = "<li>Tübingen Information Sheet</li><li>Merkblatt</li><li>Finanzerklärung</li><li>Gesundheitserklärung</li><li>Biographic Information</li><li>Selfintroduction</li><li>Kopie des Reisepasses: 4 Passfotos (3 Photos: 4x3; 1 Photo: 3x2,4;) mit Namen auf der Rückseite</li>";
  div.appendChild(ul);  
  var print = document.createElement("BUTTON");
  print.className = "btn btn-primary"
  print.innerHTML = "Diese Seite ausdrucken!"
  print.onclick = function() { window.print(); };
  div.appendChild(print);
}

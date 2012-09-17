var previousVisit = function (bool){
  var div = document.getElementById('PreviousVisit');
  if (bool) {
    div.innerHTML = "<input class='input-mini' style='display: inline' type='number' name='Times'/> time Latest visit from <input style='dsplay:inline' type='text' id='dateField5' name='LastVisitBegin'/> to <input type='text' id='dateField6' name='LastVisitEnd'/>"
    addDatePicker('dateField5');
    addDatePicker('dateField6');
    document.getElementById('dateField5').onchange = function(){checkDate('dateField5')};
    document.getElementById('dateField6').onchange = function(){checkDate('dateField6')};
  } else {
    div.innerHTML = "";
  }
}

var addDatePicker = function (id) {
		  new JsDatePick({
			  useMode:2,
			  target:id,
			  dateFormat:"%Y-%m-%d"
		  });
}

var criminalR = function (bool){
  var div = document.getElementById('CriminalR');
  if (bool){
    div.innerHTML = "<label>Details:</label><input class='input-large' name='CriminalRecord' type='text'/>"
  } else {
    div.innerHTML = "";
  }
}

var checkDate = function (dateFieldId){
  var dateField = document.getElementById(dateFieldId);
  var pattern = /[0-9]{4}-[0-9]{2}-[0-9]{2}/g;
  if (!pattern.test(dateField.value) && dateField.value != ""){
    dateField.select();
    alert("Input format: yyyy-mm-dd!");
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
        if (controlGroups[i].className == "control-group error"){
          controlGroups[i].className = "control-group";
        }
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
      input.type = "text";
    if (arr[i] == "Date of birth"){
      var field = "dateField" + (6 + n);  
      input.id = field;
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
  var date = document.getElementById("dateField" + (6 + n));
  if (date){
    var field = "dateField" + (6 + n);
    addDatePicker(field);
    date.onchange = function(){checkDate(field)};
  }
}

var addRelatives = function() {
  var relCheck = document.getElementById("rel");
  if (relCheck.checked) {
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
  window.open('http://localhost:9292/download/output', '_newtab'); //'http://hiroshima.japanologie.kultur.uni-tuebingen.de:9292/download/output', '_newtab');
  return true;
}

var instructions = {
    "confirm-button": "This button confirms your bid",
    "description": "This is a short description of the current auctioned item",
    "start-date": "This indicates the start date of the auction",
    "end-date": "This indicates the start date of the auction",
    "time": "This indicates the remaining time until the end of the auction",
    "status": "This indicates whether the auction is ongoing or completed",
    "ref-price": "This indicates the referential price of the auctioned item",
    "supplier": "This indicates the supplier of the current best offer",
    "net-savings": "This indicates your estimated net savings for accepting the current bid",
    "gross-savings": "This indicates your estimated gross savings for accepting the current bid",
    "current-bid": "This indicates the current best offer"
}
var speed = 10;
var index = 0;
var dropDowns = {};
var inputs = {};
var inputs2 = {};
var instructionKeys = [];
var hl = [];

var td = document.getElementsByTagName("td");
for (var key in td) {
    td[key].value = instructions[td[key].id]
}

function clipify() {
    if (timer == inputs2[inputs2.length - 2].value * speed) {
        stop();
    }
    if (timer == inputs[index].value * speed) {
        highlight(hl[index]);
        index++;
    }
    canvasize();
}

function automate() {
    var s = document.getElementById("speed");
    document.getElementById("table").style.visibility = "visible";
    document.getElementById("instructions").style.visibility = "visible";
    document.getElementById("automation").style.visibility = "hidden";
    document.getElementById("recorddiv").style.visibility = "hidden";
    dropDowns = document.getElementsByName("automation");
    inputs = document.getElementsByName("clipstart");
    inputs2 = document.getElementsByName("clipend");
    for (let index = 0; index < inputs.length - 1; index++) {
        instructionKeys.push(dropDowns[index].options[dropDowns[index].selectedIndex].value);
        hl.push(document.getElementById(instructionKeys[index]));
    }
    if (s.options[s.selectedIndex].value != "real-time") {
        speed = 1;
        console.log(speed);
    }
    int = setInterval(clipify, 100);
    /*
    for (let index = 0; index < inputs[0].value * 10; index++) {
        canvasize();
    }
    for (let index = 0; index < dropDowns.length - 1; index++) {
        instructionKeys.push(dropDowns[index].options[dropDowns[index].selectedIndex].value);
        var hl = document.getElementById(instructionKeys[index]);
        highlight(hl);
        for (let index2 = inputs[index].value * 10; index2 < inputs2[index].value * 10; index2++) {
            canvasize();
        }
        if (index < inputs.length - 2) {
            for (let index2 = inputs2[index].value * 10; index2 < inputs[index + 1].value * 10; index2++) {
                canvasize();
            }
        }
    }*/
    //record();


}
function highlight(element) {
    var hl = document.getElementsByName("highlight");
    console.log(hl)
    if (hl.length != 0) {
        hl[0].setAttribute("style", "border-color: #bbb; border-width: 1px;");
        hl[0].setAttribute("name", undefined);
    }
    element.setAttribute("name", "highlight");
    element.setAttribute("style", "border-color: red; border-width: 3px;");
    document.getElementById("instructions").innerHTML = element.value;

    /*if (element.name == "highlight") {
        element.name = "";
        element.setAttribute("style", "border-color: #bbb; border-width: 1px;");
    } else {
        element.name = "highlight";
        element.setAttribute("style", "border-color: red; border-width: 3px;");
        document.getElementById("instructions").innerHTML = element.value;
    }*/
}

function confirmBid() {
    document.getElementById("form").innerHTML = "<br/>";
}
function pwd() {
    if (!document.getElementById("pwd")) {
        var form = document.getElementById("form");
        form.innerHTML = "";
        var div = document.createElement("div");
        div.setAttribute("id", "form");
        var input = document.createElement("input");
        input.setAttribute("type", "password");
        input.setAttribute("id", "pwd");
        var button = document.createElement("button");
        button.setAttribute("onclick", "confirmBid()");
        button.setAttribute("id", "btn");
        button.innerHTML = "Confirm";
        form.appendChild(input);
        form.appendChild(button);
        //document.getElementById("time").style("border-color: red; border-width: 3px;");
        //document.getElementById("time").setAttribute("style", "border-color: red; border-width: 3px;");
        var form = document.getElementById("container");
        document.getElementById("instructions").innerHTML = "Enter your password to confirm your bid";
    }
}

var i = -1;
function init() {
    addClip(false);
    populateElementsList("automation");
    document.getElementsByName("automation")[i].onchange = addClip;
}

function populateElementsList(select) {
    var option = document.createElement("option");
    option.setAttribute("disabled", true);
    option.setAttribute("selected", true);
    option.innerHTML = "select";
    document.getElementsByName(select)[i].appendChild(option);

    for (instruction in instructions) {
        option = document.createElement("option");
        option.setAttribute("value", instruction);
        option.innerHTML = instruction;
        document.getElementsByName(select)[i].appendChild(option);
    }
}

function addClip(bool) {
    i++;
    var fieldset = document.getElementById("automation");
    var dropDown = document.createElement("select");
    var input = document.createElement("input");
    var input2 = document.createElement("input");

    dropDown.setAttribute("name", "automation");
    dropDown.setAttribute("style", "display: inline-block;");
    input.setAttribute("name", "clipstart");
    input.setAttribute("type", "number");
    input.setAttribute("style", "display: inline-block;");
    input2.setAttribute("name", "clipend");
    input2.setAttribute("type", "number");
    input2.setAttribute("style", "display: inline-block;");
    fieldset.appendChild(document.createElement("br"));
    fieldset.appendChild(dropDown);
    fieldset.appendChild(input);
    fieldset.appendChild(input2);
    populateElementsList("automation");
    if (bool) {
        document.getElementsByName("automation")[i - 1].onchange = undefined;
    }
    document.getElementsByName("automation")[i].onchange = addClip;
}
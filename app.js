// Set dropdown label to the selected item
$(".dropdown-menu li a").click(function() {
  $(".btn:first-child").html($(this).text() + ' <span class="caret"></span>');
  $(".btn:first-child").val($(this).text());
});

var lang = ""; // User-selected language
var values = []; // User-entered values

function getInput() {
  // Get selected language
  lang = $(".btn:first-child").val();

  // Tell user if they have forgotten to select a language
  if (lang == "") {
    alert("Please choose a language!");
    return;
  }

  // Get enter values
  var input = $("#input").val();

  // Tell user if they have forgotten to enter values
  if (input == "") {
    alert("Please enter values!")
    return;
  }

  // If user input contains Comma Separated Values
  if (input.includes(",")) {
    values = input.split(",");

    // Remove space if it begins the value
    for (var i = 0; i < values.length; i++)
      if (values[i].substring(0, 1) == " ")
        values[i] = values[i].replace(values[i].substring(0, 1), "");

    makeArray();
  }

  // If user input contains Line Separated Values
  else if (input.includes("\n")) {
    values = input.split("\n");

    // Remove space if it ends the value
    for (var i = 0; i < values.length; i++)
      if (values[i].substring(values[i].length - 1) == " ")
        values[i] = values[i].replace(values[i].substring(values[i].length - 1), "");

    makeArray();
  }
}

function makeArray() {
  const isJava = lang == "Java";
  const isJS = lang == "JavaScript";
  const isRuby = lang == "Ruby";

  // Check if the values are numbers
  var isStringArr = false;
  for (var i = 0; i < values.length; i++) {
    var cast = Number(values[i]);
    var parse = parseFloat(values[i]);
    // Because Java is strictly typed, it'd be safe to assume that
    // the value is a string in Java if
    // 1. the language desired is Java
    // 2. the Number cast and parseFloat results are not the same
    if (isNaN(cast) || isNaN(parse) || isJava && cast != parse) {
      isStringArr = true;
      break;  // Don't need to iterate through anymore
    }
  }

  if (isStringArr) {
    var escapes = ['\'', '\"', '\\'];
    // Go through all the values and account for escape characters
    for (var i = 0; i < values.length; i++) {
      var str = values[i];

      for (var j = 0; j < escapes.length; j++)
        str = str.replace(escapes[j], "\\" + escapes[j]);

      values[i] = str;
    }
  }

  // Check if values are double or int
  var isIntArr = false;
  if (!isStringArr) {
    // Don't bother checking for ints if we already have strings
    isIntArr = true;
    for (var i = 0; i < values.length; i++)
      // Check if a point or exponential sign is present
      if (values[i].includes(".") || values[i].includes("e")) {
        isIntArr = false;
        break; // Don't need to iterate through anymore
      }
  }
  
  var content = "";

  // If language is Java or JavaScript
  if (isJava || isJS) {
    if (isJava) {
      if (isStringArr)
        content = "String[]";
      else if (isIntArr)
        content = "int[]";
      else
        content = "double[]";
      content += " arr = { ";
    } else
      content = 'var arr = [ ';

    for (var i = 0; i < values.length; i++) {
      if (isStringArr)
        content += '"' + values[i] + '"';
      else
        content += values[i];

      if (i != values.length - 1)
        content += ", ";
    }

    content += " " + (isJava ? "}" : "]") + ";";
  }
  else if (lang == "Ruby") {
    
  }

  var element = $('#array');
  element.append(content + "<br/>");
  element.css("display", "");
}

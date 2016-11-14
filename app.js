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
  if (lang == "")
    alert("Please choose a language!");

  // Get enter values
  var input = $("#input").val();

  // Tell user if they have forgotten to enter values
  if (input == "")
    alert("Please enter values!")

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
  // Check if the values are numbers
  var isStringArr = false;
  for (var i = 0; i < values.length; i++)
    if (isNaN(parseFloat(values[i])))
      isStringArr = true;

  // Check if values are double or int
  var isIntArr = true;
  for (var i = 0; i < values.length; i++)
    if (values[i].includes("."))
      isIntArr = false;

  // If language is Java
  if (lang == "Java") {
    if (isStringArr) {
      var content = "String[] arr = {";
      for (var i = 0; i < values.length; i++) {
        if (i != values.length - 1)
          content += '"' + values[i] + '"' + ", ";
        else
          content += '"' + values[i] + '"' + "};";
      }
      document.getElementById("array").style.display = "";
      $("#array").append(content)
    }
    else {
      // If array contains ints
      if (isIntArr) {
        var content = "int[] arr = {";
        for (var i = 0; i < values.length; i++) {
          if (i != values.length - 1)
            content += values[i] + ", ";
          else
            content += values[i]  + "};";
        }

        document.getElementById("array").style.display = "";
        $("#array").append(content)
      }
      // If array contains doubles
      else {
        var content = "double[] arr = {";
        for (var i = 0; i < values.length; i++) {
          if (i != values.length - 1)
            content += values[i] + ", ";
          else
            content += values[i]  + "};";
        }

        document.getElementById("array").style.display = "";
        $("#array").append(content)
      }
    }
  }
  else if (lang == "JavaScript") {

  }
  else if (lang == "Ruby") {
    
  }
}

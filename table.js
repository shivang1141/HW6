/* https://stackoverflow.com/questions/37355054/min-max-price-range-validation-not-working-with-jquery-validate-js */
/*https://stackoverflow.com/questions/17934565/submithandler-function-not-working*/
function validate() {
// this are the ruls for form
  $("#info_form").validate({  
    rules: {
      horizontal_start: {
        number: true,
        min: -50,
        max: 50,
        required: true
      },
      horizontal_end: {
        number: true,
        min: -50,
        max: 50,
        required: true
      },
      vertical_start: {
        number: true,
        min: -50,
        max: 50,
        required: true
      },
      vertical_end: {
        number: true,
        min: -50,
        max: 50,
        required: true
      }
    },

    //ERROR Messages
    messages: {
      horizontal_start: {
        number:     "ERROR: you did not enter a valid number.<br/>Please enter a number between -50 and 50 in horizontal start.",
        min:        "ERROR: number entered is too small.<br/>Please enter a number between -50 and 50 in horizontal start.",
        max:        "ERROR: number entered is too large.<br/>Please enter a number between -50 and 50 in horizontal start.",
        required:   "ERROR: no number was entered.<br/>Please enter a number between -50 and 50 in horizontal start."
      },
      horizontal_end: {
        number:     "ERROR: you did not enter a valid number.<br/>Please enter a number between -50 and 50 in horizontal end.",
        min:        "ERROR: number entered is too small.<br/>Please enter a number between -50 and 50 in horizontal end.",
        max:        "ERROR: number entered is too large.<br/>Please enter a number between -50 and 50 in horizontal end.",
        required:   "ERROR: no number was entered.<br/>Please enter a number between -50 and 50 in horizontal end."
      },
      vertical_start: {
        number:     "ERROR: you did not enter a valid number.<br/>Please enter a number between -50 and 50 in vertical start.",
        min:        "ERROR: number entered is too small.<br/>Please enter a number between -50 and 50 in vertical start.",
        max:        "ERROR: number entered is too large.<br/>Please enter a number between -50 and 50 in vertical start.",
        required:   "ERROR: no number was entered.<br/>Please enter a number between -50 and 50 in vertical start."
      },
      vertical_end: {
        number:     "ERROR: you did not enter a valid number.<br/>Please enter a number between -50 and 50",
        min:        "ERROR: number entered is too small.<br/>Please enter a number between -50 and 50",
        max:        "ERROR: number entered is too large.<br/>Please enter a number between -50 and 50",
        required:   "ERROR: no number was entered."
      }
    },
      //https://stackoverflow.com/questions/17934565/submithandler-function-not-working
    submitHandler: function() {
      table_calculater();
      return false;
    },
     
      // https://stackoverflow.com/questions/1458605/how-to-display-messages-in-invalidhandler-in-jquery-validator
    invalidHandler: function() {
      $("#warning").empty();
      $("#multiplication_table").empty();
    },
      
      // URL: https://jqueryvalidation.org/validate/
      //https://stackoverflow.com/questions/30720354/jquery-validate-submithandler-not-firing
    errorElement: "div",
    errorPlacement: function(error, element) {
      error.insertAfter(element);
    }
  });
}

//function calculates the multiplication table
function table_calculater() {

  var horizontal_start  = Number(document.getElementById('horizontal_start').value);
  var horizontal_end    = Number(document.getElementById('horizontal_end').value);
  var vertical_start    = Number(document.getElementById('vertical_start').value);
  var vertical_end      = Number(document.getElementById('vertical_end').value);

  console.log("Horizontal start: ", horizontal_start, "Horizontal end: ", horizontal_end),
  console.log("Vertical start: ", vertical_start, "Vertical end: ", vertical_end);

  // See this Stackoverflow post: https://stackoverflow.com/questions/20293680/how-to-empty-div-before-append
  $("#warning").empty();

  // Swap beginning / ending numbers if the start is larger than the beginning.
  if (horizontal_start > horizontal_end) {

    $("#warning").append("<p class='info_class'>Swapping the Horizontal start and Horizontal end.</p>");

    var tmp_num         = horizontal_start;
    horizontal_start    = horizontal_end;
    horizontal_end      = tmp_num;
  }

  if (vertical_start > vertical_end) {

    $("#warning").append("<p class='info_class'>Swapping the Vertical start and Vertical end.</p>");

    var tmp_num     = vertical_start;
    vertical_start  = vertical_end;
    vertical_end    = tmp_num;
  }

  var matrix = {};
  //https://studio.code.org/docs/gamelab/mathAbs/
  var rows      = Math.abs(horizontal_end - horizontal_start);
  var columns   = Math.abs(vertical_end - vertical_start);


  var h         = horizontal_start;
  var vert      = vertical_start;

  for (var x = 0; x <= columns; x++) {
    var tmp_arr = [];

    for (var y = 0; y <= rows; y++) {
      var calc = h * vert;
      tmp_arr[y] = calc;
      h++;
    }

    matrix["row" + x] = tmp_arr;

    h= horizontal_start;
    vert++;
  }

    // this code I got form
    // http://www.w3schools.com/html/html_tables.asp
    // https://stackoverflow.com/questions/54523630/multiplication-table-using-appendchild-and-html-table
    //https://stackoverflow.com/questions/3065342/how-do-i-iterate-through-table-rows-and-cells-in-javascript
    // https://gist.github.com/ericduran/6330201
   
  var content = "";

  content += "<table>";

  content += "<tr><td></td>";
     
  for (var a = horizontal_start; a <= horizontal_end; a++) {
    //https://stackoverflow.com/questions/6012823/how-to-make-html-table-cell-editable
      content += "<td>" + a + "</td>";
  }

  content += "</tr>";

  var vert = vertical_start;

  for (var x = 0; x <= columns; x++) {
    content += "<tr><td>" + vert + "</td>";

    for (var y = 0; y <= rows; y++) {
      content += "<td>" + matrix["row" + x][y] + "</td>";
    }
    vert++;

    content += "</tr>";
  }

  content += "</table>";

  $("#multiplication_table").html(content);

  return false;
}

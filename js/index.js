/*
Name: Rohan Mallu
Date Created: October 15th 2024
File: index.html
GUI Assignment: Creating an Interactive Table
Description: JS file for HW3
*/

/**
 * Resources:
 * In-class notes on JavaScript (for general reference)
 * 
 * Traversing an HTML table with JavaScript and DOM interfaces 
 * (reference for generateTable() function): 
 * https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces 
 * 
 * isNaN() function (for generateTable() function): 
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
 * 
 * parseInt() function (for generateTable() function):
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt 
 * 
 * Information on tables in HTML (for general reference): 
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table
 * 
 * createThead() function (for generateTable() function):
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement/createTHead 
 *  
 * createTbody() function (for generateTable() function):
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement/createTBody 
 * 
 * Boolean variables (for checkBounds() and checkErrors() functions):
 * https://www.w3schools.com/js/js_booleans.asp 
 * 
 */

/**
 * Generates the table based on user inputs
 * @returns A dynamically generated table with a header, rows, columns, and values
 * inside a div container.
 */
function createTable() {
    // Get the user's inputs from the form and convert the inputs to integers
    var minCol = parseInt(document.getElementById("minCol").value);
    var maxCol = parseInt(document.getElementById("maxCol").value);
    var minRow = parseInt(document.getElementById("minRow").value);
    var maxRow = parseInt(document.getElementById("maxRow").value);

    // Check if the inputs are numbers or inside the value range [-50, 50]
    let findErrors = checkErrors(minCol, maxCol, minRow, maxRow);
    if (findErrors) {
        return;
    }
    
    // Check if the minimum amount of columns/rows is less than the maximum amount of columns/rows
    let findBoundError = checkBounds(minCol, maxCol, minRow, maxRow);
    if(findBoundError) {
        return;
    }
  
    // retrieve the id of the div container where the table will be placed in
    const container = document.getElementById("table-container");

    // clear any previous table before submitting new inputs
    container.innerHTML = "";

    // create table, table head, and table body
    const makeTable = document.createElement("table");
    const makeHead = makeTable.createTHead();
    const makeTableBody = makeTable.createTBody();

    // create the header row, which includes an empty header at the start of the row
    const makeColumns = document.createElement("tr");
    const emptyCol = document.createElement("th");
    emptyCol.id = "empty-box"; // format the empty header column in CSS
    makeColumns.appendChild(emptyCol); // append empty header column to header row 

    // create a column number, then append each column number to header row 
    for(let i = minCol; i <= maxCol; i++) {
        const colNum = document.createElement("th");
        colNum.textContent = i;
        makeColumns.appendChild(colNum);
    }

    // append the header row to the table head, then append table head to table
    makeHead.appendChild(makeColumns);
    makeTable.appendChild(makeHead);

    // create rows and elements
    for(let j = minRow; j <= maxRow; j++) {
        // create rows
        const makeRows = document.createElement("tr");
        const rowNum = document.createElement("th");
        rowNum.textContent = j;
        makeRows.appendChild(rowNum);

        // create elements for the table: each element is the product
        // of a table row and a table column
        for(let k = minCol; k <= maxCol; k++) {
            const element = document.createElement("td");
            element.textContent = j * k;
            makeRows.appendChild(element);
        }
        // append rows and table elements to the table body
        makeTableBody.appendChild(makeRows);
    }

    // append table body to the table
    makeTable.appendChild(makeTableBody);
   
    // append table to container, then append container to the page
    container.appendChild(makeTable)
    document.body.appendChild(container);
}

/**
 * Checks if any of the parameters are a number or in the specified range
 * @param {Number} minCols The minimum number of columns specified by the user.
 * @param {Number} maxCols The maximum number of columns specified by the user.
 * @param {Number} minRows The minimum number of rows specified by the user.
 * @param {Number} maxRows The maximum number of rows specified by the user.
 * @returns {Boolean} to stop the program if an error is found.
 */
function checkErrors(minCols, maxCols, minRows, maxRows) {
    // retrieve tags for outputting an error message
    var minColError = document.getElementById("minColError");
    var maxColError = document.getElementById("maxColError");
    var minRowError = document.getElementById("minRowError");
    var maxRowError = document.getElementById("maxRowError");

    // retrieve tags for input fields
    var minColInput = document.getElementById("minCol");
    var maxColInput = document.getElementById("maxCol");
    var minRowInput = document.getElementById("minRow");
    var maxRowInput = document.getElementById("maxRow");

    let errorExists = false; // boolean variable for finding an error

    // if minCols not in [-50, 50] or minCols is not a number, return an error
    if(minCols < -50 || minCols > 50 || isNaN(minCols)) {
        minColError.textContent = "Error: Please enter a number between -50 to 50.";
        minColInput.style.backgroundColor = "orange";
        errorExists = true;
    } else {
        minColInput.style.backgroundColor = "";
        minColError.textContent = "";
    }

    // if maxCols not in [-50, 50] or maxCols is not a number, return an error
    if(maxCols < -50 || maxCols > 50 || isNaN(maxCols)) {
        maxColError.textContent = "Error: Please enter a number between -50 to 50.";
        maxColInput.style.backgroundColor = "orange";
        errorExists = true;
    } else {
        maxColInput.style.backgroundColor = "";
        maxColError.textContent = "";
    }

    // if minRows not in [-50, 50] or minRows is not a number, return an error
    if(minRows < -50 || minRows > 50 || isNaN(minRows)) {
        minRowError.textContent = "Error: Please enter a number between -50 to 50.";
        minRowInput.style.backgroundColor = "orange";
        errorExists = true;
    } else {
        minRowInput.style.backgroundColor = "";
        minRowError.textContent = "";
    }

    // if maxRows not in [-50, 50] or maxRows is not a number, return an error
    if(maxRows < -50 || maxRows > 50 || isNaN(maxRows)) {
        maxRowError.textContent = "Error: Please enter a number between -50 to 50.";
        maxRowInput.style.backgroundColor = "orange";
        errorExists = true;
    } else { 
        maxRowInput.style.backgroundColor = "";
        maxRowError.textContent = "";
    }

    return errorExists;
}

/**
 * Checks if the minimum amount of columns or rows is greater than the maximum amount
 * of columns or rows; if true, output an error message and stop the program.
 * @param {Number} minCols The minimum number of columns specified by the user.
 * @param {Number} maxCols The maximum number of columns specified by the user.
 * @param {Number} minRows The minimum number of rows specified by the user.
 * @param {Number} maxRows The maximum number of rows specified by the user.
 * @returns {Boolean} to stop the program if the range is out of bounds.
 */
function checkBounds(minCols, maxCols, minRows, maxRows) {
    var errorMessage = document.getElementById("tableError");
    var minColInput = document.getElementById("minCol");
    var maxColInput = document.getElementById("maxCol");
    var minRowInput = document.getElementById("minRow");
    var maxRowInput = document.getElementById("maxRow");

    let boundError = false; // boolean variable for finding a bound error 

    // if both cases are true, return an error
    if((minCols >= maxCols) && (minRows >= maxRows)) {
        minColInput.style.backgroundColor = "orange";
        maxColInput.style.backgroundColor = "orange";
        minRowInput.style.backgroundColor = "orange";
        maxRowInput.style.backgroundColor = "orange";

        errorMessage.textContent = "Minimum number of values should be less than maximum number of values.";
        boundError = true;
    } else if(minCols >= maxCols) { // if the minimum number of columns is greater than the maximum number of columns, return an error
        minColInput.style.backgroundColor = "orange";
        maxColInput.style.backgroundColor = "orange";

        errorMessage.textContent = "Minimum number of columns should be less than maximum number of columns.";
        boundError = true;
    } else if(minRows >= maxRows) {  // if the minimum number of rows is greater than the maximum number of rows, return an error  
        minRowInput.style.backgroundColor = "orange";
        maxRowInput.style.backgroundColor = "orange";

        errorMessage.textContent = "Minimum number of rows should be less than maximum number rows.";
        boundError = true;
    } else { 
        minColInput.style.backgroundColor = "";
        maxColInput.style.backgroundColor = "";
        minRowInput.style.backgroundColor = "";
        maxRowInput.style.backgroundColor = "";
        errorMessage.textContent = "";
    }
    return boundError;
}
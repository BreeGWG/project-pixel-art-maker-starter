//object containing the grid's height and width
const grid = {};


/**
 * Builds the pixel art grid in the DOM
 * @param{object} grid size properties.
 */
// When size is submitted by the user, call makeGrid()
function makeGrid(gridObj) {
    
    // Select size input

    let rows = gridObj.canvasHeight;
    let columns = gridObj.canvasWidth; 

    for (let i = 0; i < rows; i++) {

        let $row = $("<tr>", {
            class: "row " + "row-" + i
        });
        $("#pixelCanvas").append($row);

        for (let j = 0; j < columns; j++) {

            let $col = $("<td>", {
                class: "cell " + "cell-" + j
            });

            ($row).append($col);
        }
    };

}

/**
 * Function adds a click and mouseevents to the parent element and assigns the
 * background color
 * 
 */
function colorize() {

    $("#pixelCanvas").css("background-color", "white");
    let color = "";
    let colorState = "";
    $(document.body).on( {

        mousedown : function (e) {
            color = $("#colorPicker").val();
            colorState = "active";
        },
        mouseup : function (e) {
             colorState = "";
        },
        mousemove : function (e) {
            if (colorState === "active") {
            e.target.style.backgroundColor = color;
            }
        },
        click : function (e) {
            e.target.style.backgroundColor = color;
        } 

    }, ".cell");

}

/**
 * Function uses form input values to store the size of the pixel grid.
 * 
 * @param{object: numbers} 
 * @param{object: any} HTMLFormControlsCollection
 * 
 */
function getGridSize(gridObj, criteria) {

            gridObj.canvasHeight = criteria ? criteria.height.value : $("#height").val();
            gridObj.canvasWidth = criteria ? criteria.width.value : $("#width").val();

};

/**
 * Function clears the grid
 */
function clearGrid() {
    let i = 0;
    let $cells = $(".cell");

    if ($cells.length > 0) {

        $cells.each(function (e, elm) {
            $(elm).css("background-color", "#ffffff");
        });
    }

}

function confirmReset() {
    
    $("button.clear-btn").click(function (){
        
        if (confirm("Do you really want to clear the grid?")) {
            clearGrid();
        }
        
    });
}

/**
 * Function deletes the grid.
 */
function deleteGrid() {

    let rows = document.getElementsByClassName("row");
    let i = rows.length;

    if (i > 0) {
        while (i > 0) {

            rows[i - 1].remove();
            i = rows.length;
        }

    }
}
function gridCustomizer() {

    $("#sizePicker").submit(grid, function (e) {
        e.preventDefault();
        clearGrid();
        deleteGrid(); 
        getGridSize(grid, this.elements);
        makeGrid(grid);
        colorize();

    });
}
/**
 * Submit event listener that calls several helper functions and events.
 * Submit will not reload the page.
 */

$(document).ready(function () {
    
    getGridSize(grid, this.elements);
    makeGrid(grid);
    colorize();
    gridCustomizer();
    confirmReset();


});
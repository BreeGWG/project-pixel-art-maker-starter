// Select color input
// Select size input
var grid = {};
// When size is submitted by the user, call makeGrid()

function makeGrid(gridObj) {

    var rows = gridObj.height;
    var columns = gridObj.width;

    for (var i = 0; i < rows; i++) {

       var $row = $("<tr>", {class: "row " + "row-" + i});
        $("#pixelCanvas").append($row);

        for (var j = 0; j < columns; j++) {

            var $col =  $("<td>", {class: "cell " + "cell-" + j});

            ($row).append($col);
        }
    };

}

function colorize() {

    $(document.body).on("click", ".cell" ,function (e){
        $(e.target).css("background-color", $("#colorPicker").val());
    });

 }

/**
 * Function uses form input values to store the size of the pixel grid.
 * 
 * @param{object: numbers} 
 * @param{object: any} HTMLFormControlsCollection
 * 
 */

function changeGridSize(gridObj, criteria) {
    gridObj.height = criteria["inputHeight"].value;
    gridObj.width = criteria["inputWeight"].value;

};

function clearGrid(){
    if ($(".row").length >= 1) {
        $(".row").remove();
    }
}

/**
 * Event listener that resizes the pixel grid on submisson of the form that has
 * size values. Submit will not reload the page.
 */

$("#sizePicker").submit(grid, function (e) {
    e.preventDefault();
    clearGrid();
    changeGridSize(grid, this.elements);
    makeGrid(grid);
    colorize();

});
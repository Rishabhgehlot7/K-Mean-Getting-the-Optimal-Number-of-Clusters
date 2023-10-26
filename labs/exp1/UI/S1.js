
const myContainer = document.getElementById("box");
// myContainer.style.padding="0px";

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var modalBtn = document.getElementById("myBtn");
// var modalBtn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var closeBtn = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
modalBtn.addEventListener("click", function () {
    modal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

var data = [["X", "Y"]];
var deleteButtons = [];

function alert1(icon, title, text) {
    Swal.fire({
        icon: icon,
        title: title,
        html: text,
        customClass: {
            container: "swal-container",
            popup: "swal-popup",
            title: "swal-title",
            content: "swal-content",
        },
        target: myContainer,
        didOpen: () => {
            const container = document.querySelector(".swal-container");
            const containerWidth = myContainer.offsetWidth;
            const containerHeight = myContainer.offsetHeight;

            // Change font size based on container size
            if (containerWidth >= 1000 && containerHeight >= 672) {
                container.style.fontSize = "24px";
            } else {
                container.style.fontSize = "16px";
            }

            // Adjust dimensions and position of the Swal container
            container.style.position = "absolute";
            container.style.width = "100%";
            container.style.height = "100%";
            container.style.top = "0";
            container.style.left = "0";
            container.style.padding = "0";

        },
        showCloseButton: false, // Disable the close button
        allowOutsideClick: false, // Prevent closing by clicking outside the modal
        allowEscapeKey: false,
    });
}

function alert2(icon, title, text, x) {
    Swal.fire({
        icon: icon,
        title: title,
        html: text,
        customClass: {
            container: "swal-container",
            popup: "swal-popup",
            title: "swal-title",
            content: "swal-content",
            confirmButton: "swal-button", // Add this line for the confirm button
            cancelButton: "swal-button" // Add this line for the cancel button
        },
        preConfirm: () => { x; }
        ,
        target: myContainer,
        didOpen: () => {
            const container = document.querySelector(".swal-container");
            const containerWidth = myContainer.offsetWidth;
            const containerHeight = myContainer.offsetHeight;

            // Change font size based on container size
            if (containerWidth >= 1000 && containerHeight >= 672) {
                container.style.fontSize = "24px";
            } else {
                container.style.fontSize = "16px";
            }

            // Adjust dimensions and position of the Swal container
            container.style.position = "absolute";
            container.style.width = "100%";
            container.style.height = "100%";
            container.style.top = "0";
            container.style.left = "0";
            container.style.padding = "0";

        },
        showCloseButton: false, // Disable the close button
        allowOutsideClick: false, // Prevent closing by clicking outside the modal
        allowEscapeKey: false,
    });
}

function addDataPoint() {
    var xValue = parseFloat(document.getElementById("X").value);
    var yValue = parseFloat(document.getElementById("Y").value);

    // Check if the values already exist in the data array
    var isDuplicate = data.some(function (entry) {
        return (
            entry[0] === roundToTwoDecimalPlaces(Number(xValue)) &&
            entry[1] === roundToTwoDecimalPlaces(Number(yValue))
        );
    });
    console.log("xValue", xValue)
    console.log("yValue", yValue)
    if (xValue == '+' || xValue == '-' || xValue == '*' || xValue == '/' || yValue == '+' || yValue == '-' || yValue == '*' || yValue == '/') {
        alert1('error', 'Invalid Values!', 'Please enter valid value.');

        return;
    }

    if (isNaN(xValue) && isNaN(yValue)) {
        alert1('error', 'Missing Values!', 'Please enter values for X and Y.');

        return;
    }
    if (isNaN(xValue)) {
        alert1('error', 'Missing Values!', 'Please enter values for X.');

        return;
    }
    if (isNaN(yValue)) {
        alert1('error', 'Missing Values!', 'Please enter values for Y.');

        return;
    }

    if (xValue > 100 || yValue > 100 || xValue < -100 || yValue < -100) {
        alert1('error', 'Value Exceeded!', 'The highest allowed value is 100.');

        return;


    }
    if ((isNaN(xValue) || (isNaN(yValue)))) {

        alert1('error', 'Invalid Input!', 'Please enter a positive number.');

        return;


    }
    if (!isDuplicate) {
        data.push([
            roundToTwoDecimalPlaces(Number(xValue)),
            roundToTwoDecimalPlaces(Number(yValue)),
        ]);
    } else {
        // alert('Duplicate values are not allowed!');
        alert1('error', 'Duplicate Value!', 'Duplicate values are not allowed.');

        return;
    }

    drawChart();
    updateTable();
    updateTableForCompute();
    // silhotteUpdateTable();

    document.getElementById("X").value = "";
    document.getElementById("Y").value = "";


    if (data.length >= 6) {
        disableAddButton();
        promptToDeleteRow();
    }
}

function deleteRow(button) {
    var row = button.parentNode.parentNode;
    var index = row.rowIndex;
    data.splice(index, 1);
    deleteButtons.splice(index - 1, 1);

    drawChart();
    updateTable();
    updateTableForCompute();

    if (data.length >= 11) {
        enableAddButton();
        disableDeleteButton();
        // enableNextButton();
    }
    if (data.length <= 11) {
        // enableAddButton();
        // disableDeleteButton();
        disableNextButtonData();
    }
}

function promptToDeleteRow() {
    Swal.fire({
        // title: 'Delete Rows',
        text: "Do you want to delete any row?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        customClass: {
            container: "swal-container",
            popup: "swal-popup",
            title: "swal-title",
            content: "swal-content",
        },
        target: myContainer,
        didOpen: () => {
            const container = document.querySelector(".swal-container");
            const containerWidth = myContainer.offsetWidth;
            const containerHeight = myContainer.offsetHeight;

            // Change font size based on container size
            if (containerWidth >= 1000 && containerHeight >= 672) {
                container.style.fontSize = "24px";
            } else {
                container.style.fontSize = "16px";
            }

            // Adjust dimensions and position of the Swal container
            container.style.position = "absolute";
            container.style.width = "100%";
            container.style.height = "100%";
            container.style.top = "0";
            container.style.left = "0";
            container.style.padding = "0";

        },
        showCloseButton: false, // Disable the close button
        allowOutsideClick: false, // Prevent closing by clicking outside the modal
        allowEscapeKey: false, // Prevent closing by pressing the escape key
    }).then((result) => {
        if (result.isConfirmed) {
            // enableNextButtonData();
            enableDeleteButtons();
            // enableAddButton();
        } else {
            disableAddButton();
            disableDeleteButton();
            enableNextButtonData();
            alert1('info', '', 'Click the <b style="color:#FF6600">NEXT</b> button to initiate the computation for finding the optimal K.');

        }
    });

}

function enableAddButton() {
    document.getElementById("add-button").disabled = false;
}
function enableAddButtonAfterYes() {
    document.getElementById("add-button").disabled = false;
}

function disableAddButton() {
    document.getElementById("add-button").disabled = true;
}

function enableNextButtonData() {
    document.getElementById("next-button").disabled = false;
}
disableNextButtonData();
function disableNextButtonData() {
    document.getElementById("next-button").disabled = true;
}
function enableDistanceButtonData() {
    document.getElementById("button-distance").disabled = false;
}
disableDistanceButtonData();
function disableDistanceButtonData() {
    document.getElementById("button-distance").disabled = true;
}
function enableNewCentroidButton() {
    document.getElementById("new-centroid-button").disabled = false;
}
disableNewCentroidButton();
function disableNewCentroidButton() {
    document.getElementById("new-centroid-button").disabled = true;
}
function enableClusterButtonData() {
    document.getElementById("button-CLUSTER").disabled = false;
}
disableClusterButtonData();
function disableClusterButtonData() {
    document.getElementById("button-CLUSTER").disabled = true;
}

// // cluster next button
// disableClusterNextButtons();
// function disableClusterNextButtons() {
//     document.getElementById("cluster-next-button").disabled = true;
// }
// function enableClusterNextButtons() {
//     document.getElementById("cluster-next-button").disabled = false;
// }

// centroids next button
// disableCendroidNextButtons();
function disableCendroidNextButtons() {
    document.getElementById("cendroid-next-button").disabled = true;
}
function disableCendroidResetButtons() {
    document.getElementById("cendroid-reset-button").disabled = true;
}
function enableCendroidNextButtons() {
    document.getElementById("cendroid-next-button").disabled = false;
}

// controids Submit button
function enableCendroidSubmitButton() {
    document.getElementById("cendroid-submit-button").disabled = false;
}

function DisableCendroidSubmitButton() {
    document.getElementById("cendroid-submit-button").disabled = true;
}


function tabChange() {
    // document.getElementById('tab-2').disabled = false;
    let NextClass = document.querySelectorAll(".tab-1-disInvert");
    let currentClass = document.querySelectorAll(".tab-1-invert");
    for (let i = 0; i < NextClass.length; i++) {
        NextClass[i].className = "tab-1-invert";
    }
    for (let i = 0; i < currentClass.length; i++) {
        currentClass[i].className = "tab-1-disInvert";
    }
    document.getElementById('tab-1').style.backgroundColor = "#444648";
    document.getElementById('createimg').src = 'create.png';
    document.getElementById('calcimg').src = 'calculator1.png';
    document.getElementById('createimg').style.cursor = 'not-allowed';
    document.getElementById('calcimg').style.cursor = 'pointer';
}


function enableDeleteButtons() {
    deleteButtons.forEach(function (button) {
        button.disabled = false;
    });
}

function disableDeleteButton() {
    deleteButtons.forEach(function (button) {
        button.disabled = true;
    });
}



function drawChart() {

    var formattedData = [];
    formattedData.push(["X", "Y"]); // Initialize data array with header row

    for (var i = 1; i < data.length; i++) {
        var xValue = Number(data[i][0]);
        var yValue = Number(data[i][1]);
        formattedData.push([xValue, yValue]);
    }

    // Check if formattedData array has any data
    var chartData = google.visualization.arrayToDataTable(formattedData);

    var options = {
        // title: 'Data Set',
        legend: { position: "none" },
        hAxis: {
            title: "X",
            minValue: 0,
        },
        vAxis: {
            title: "Y",
            minValue: 0,
        },
        chartArea: { width: "80%", height: "80%" }, // Added to adjust the chart area size
    };

    var chart = new google.visualization.ScatterChart(
        document.getElementById("chart-container")
    );

    chart.draw(chartData, options);

    var GraphContainer = document.getElementById("chart-container");
    google.visualization.errors.removeAll(GraphContainer);

    if (formattedData.length > 1) {
        var styleColumn = Array(data.length - 1).fill(null); // Separate column for style information

        // Add change event listener to highlight selected data points
        $('#Selectcendroid').on('change', function () {
            console.log('Change event triggered');
            var selectedOptions = $(this).val().map(Number);

            // Reset style information for all data points
            for (var i = 0; i < styleColumn.length; i++) {
                styleColumn[i] = null;
            }

            // Set style information for selected data points
            selectedOptions.forEach(function (index) {
                styleColumn[index - 1] = 'point { size: 5; fill-color: red; }';
            });

            // Create a DataView to combine the original data with the style column
            var view = new google.visualization.DataView(chartData);
            view.setColumns([0, 1, {
                type: 'string',
                role: 'style',
                calc: function (dt, row) {
                    return styleColumn[row];
                }
            }]);

            // Redraw the chart
            chart.draw(view, options);
        });

        // Initial chart drawing
        chart.draw(chartData, options);

    } else {
        console.log('No data available to create the chart.');
    }

}


function updateTable() {
    let table = document.getElementById("data-table");

    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    if (table.rows.length < 10) {
        enableAddButton();
    }

    deleteButtons = [];

    for (var i = 1; i < data.length; i++) {
        var row = table.insertRow(i);
        var sCell = row.insertCell(0);
        var xCell = row.insertCell(1);
        var yCell = row.insertCell(2);
        var deleteCell = row.insertCell(3);

        sCell.innerHTML = `${i}`;
        xCell.innerHTML = data[i][0];
        yCell.innerHTML = data[i][1];

        var deleteButton = document.createElement("input");
        deleteButton.type = "button";
        deleteButton.value = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.onclick = function () {
            deleteRow(this);
        };

        deleteCell.appendChild(deleteButton);
        deleteButtons.push(deleteButton);
    }
}

function disableDeleteButton() {
    for (let index = 0; index < 5; index++) {
        document.getElementsByClassName("delete-button")[index].disabled = true;
    }
}

// roundToTwoDecimalPlaces
function roundToTwoDecimalPlaces(number) {
    return Math.round(number * 100) / 100;
}
validateInputX();
function validateInputX() {
    var inputValue = document.getElementById("X").value;

    if (inputValue.includes("+") || inputValue.includes("e")) {
        // alert("Please do not enter '+', '-', or 'e' characters!");
        return false;
    }

    return true;
}
validateInputY();
function validateInputY() {
    var inputValue = document.getElementById("Y").value;

    if (inputValue.includes("+") || inputValue.includes("e")) {
        // alert("Please do not enter '+', '-', or 'e' characters!");
        return false;
    }

    return true;
}

// testing

function DeleteHidden() {
    var table = document.getElementById("data-table");
    var rows = table.rows;

    // Iterate through each row (skipping the header row)
    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].cells;

        // Remove the delete cell (assuming it is the last cell in each row)
        if (cells.length > 0) {
            var lastCellIndex = cells.length - 1;
            var lastCell = cells[lastCellIndex];
            lastCell.style.display = "none";
        }
    }
}



function NoneCentroidSection() {
    let sectionC = document.getElementById("non-table-section");
    sectionC.style.display = "none";
}


$("#elbow-compute").hide();
$("#ElbowComputeId").hide();
$("#kshow").hide();
$(".sub-div-plot div").hide();


document
    .getElementById("next-button")
    .addEventListener("click", function computeIsOn() {

        tabChange();

        disableNextButton();
        SelectCentroids();
        NoneDataSetAll();
        // DisplaycendroidButtonSection();
        DisplaycendroidSection();

        $("#elbow-compute").show();
        $("#tableId").hide();
        $("#ElbowComputeId").show();
        $("#kshow").show();
        $("#button-distance").show();
        $(".sub-div-plot div").show();
        $("#kshow").css("top", "4%");


        NoneCentroidSection();
        Swal.fire({
            icon: "info",
            title: `Select any ${kVal} centroid`,
            // text: 'Duplicate values are not allowed!.',
            customClass: {
                container: "swal-container",
                popup: "swal-popup",
                title: "swal-title",
                content: "swal-content",
            },
            target: myContainer,
            didOpen: () => {
                const container = document.querySelector(".swal-container");
                const containerWidth = myContainer.offsetWidth;
                const containerHeight = myContainer.offsetHeight;

                // Change font size based on container size
                if (containerWidth >= 1000 && containerHeight >= 672) {
                    container.style.fontSize = "24px";
                } else {
                    container.style.fontSize = "16px";
                }

                // Adjust dimensions and position of the Swal container
                container.style.position = "absolute";
                container.style.width = "100%";
                container.style.height = "100%";
                container.style.top = "0";
                container.style.left = "0";
                container.style.padding = "0";

            },
            showCloseButton: false, // Disable the close button
            allowOutsideClick: false, // Prevent closing by clicking outside the modal
            allowEscapeKey: false,
        });
    });

let numbers = '';

NoneCentroidAll();


function NoneClusterSection() {
    let NoneClusterSection = document.getElementById("cluster-control");
    NoneClusterSection.style.display = "none";
}

function DisplayClusterSection() {
    let NoneClusterSection = document.getElementById("cluster-control");
    NoneClusterSection.style.display = "block";
}
function NonecendroidSection() {
    let NonecendroidSection = document.getElementById("cendroid-control");
    NonecendroidSection.style.display = "none";
}

function DisplaycendroidSection() {
    let NonecendroidSection = document.getElementById("cendroid-control");
    NonecendroidSection.style.display = "block";
}
function DisplayDataSection() {
    let DisplayDataSection = document.getElementById("training-control");
    DisplayDataSection.style.display = "block";
}
function NoneDataSection() {
    let NoneDataSection = document.getElementById("training-control");
    NoneDataSection.style.display = "none";
}
function NoneDataButtonSection() {
    let NoneDataButtonSection = document.getElementById("data-button-container");
    NoneDataButtonSection.style.display = "none";
}
function DisplayDataButtonSection() {
    let DisplayDataButtonSection = document.getElementById(
        "data-button-container"
    );
    DisplayDataButtonSection.style.display = "block";
}
function NoneClusterButtonSection() {
    let NoneClusterButtonSection = document.getElementById(
        "cluster-button-container"
    );
    NoneClusterButtonSection.style.display = "none";
}
function DisplayClusterButtonSection() {
    let DisplayClusterButtonSection = document.getElementById(
        "cluster-button-container"
    );
    DisplayClusterButtonSection.style.display = "block";
}

function DisplaycendroidButtonSection() {
    let DisplaycendroidButtonSection = document.getElementById(
        "cendroid-button-container"
    );
    DisplaycendroidButtonSection.style.display = "block";
}
function NoneTableSection() {
    let NoneTableSection = document.getElementById("tableId");
    NoneTableSection.style.display = "none";
}
function DisplayTableSection() {
    let DisplayTableSection = document.getElementById("tableId");
    DisplayTableSection.style.display = "block";
}
function NoneGraphSection() {
    let NoneGraphSection = document.getElementById("graphId");
    NoneGraphSection.style.display = "none";
}
function DisplayGraphSection() {
    let DisplayGraphSection = document.getElementById("graphId");
    DisplayGraphSection.style.display = "block";
}
function NonetrainingSection() {
    let NonetrainingSection = document.getElementById("trainingSection");
    NonetrainingSection.style.display = "none";
}
function DisplaytrainingSection() {
    let DisplaytrainingSection = document.getElementById("trainingSection");
    DisplaytrainingSection.style.display = "block";
}

function DisplayComputeSection() {
    let DisplayComputeSection = document.getElementById("ComputeSection");
    DisplayComputeSection.style.display = "block";
}



function enableNextComputeButton() {
    let enableNextComputeButton = document.getElementById("next-compute-to-analysis");
    enableNextComputeButton.disabled = false;
}
NoneAnalysis();
function NoneAnalysis() {
    let NoneAnalysis = document.getElementById("analyseSection");
    NoneAnalysis.style.display = "none";
}
function DisplayAnalysis() {
    let DisplayAnalysis = document.getElementById("analyseSection");
    DisplayAnalysis.style.display = "block";
}


function NoneDataSetAll() {
    NoneDataButtonSection();
    NoneDataSection();
}
function NoneCentroidAll() {
    // NonecendroidButtonSection();
    NonecendroidSection();
}

function limitDecimals(event) {
    var input = event.target;
    var value = input.value;

    // Check if there are more than two decimal places
    if (value.indexOf(".") !== -1 && value.split(".")[1].length > 2) {
        // Remove the extra decimal places
        input.value = parseFloat(value).toFixed(2);
    }
}

const inputElement = document.getElementById('X');
inputElement.addEventListener('keydown', function (event) {
    const key = event.key;

    if (key.toLowerCase() === 'e') {
        event.preventDefault();
    }

});
const inputElementY = document.getElementById('Y');
inputElementY.addEventListener('keydown', function (event) {
    const key = event.key;

    if (key.toLowerCase() === 'e') {
        event.preventDefault();
    }

});
blockKeyboard();
function blockKeyboard() {
    let notallow = document.getElementsByClassName('select2-selection__rendered')[0];
    // notallow.color="white";
}
function checkOption() {
    var selectElement = document.getElementById("SelectCluster");
    var selectedOption = selectElement.options[selectElement.selectedIndex].value;

    if (selectedOption === "0") {
    }
}
// $(document).ready(function () {
//     $('#SelectCluster').select2();
// });


$(document).ready(function () {
    const maxSelections = 1;

    $('#SelectCluster').on('change', function (e) {
        kVal = $(this).val();
    });
    $("#SelectCluster").select2({
        maximumSelectionLength: maxSelections,
    });
    $("#SelectCluster").on("select2:select", function (e) {
        const selectedOption = e.params.data.id;


        if (centroids.length > maxSelections) {
            const removedOption = centroids.shift();
            $(this)
                .find('option[value="' + removedOption + '"]')
                .prop("selected", false);

        }
        if (kVal.length == 1) {
            alert1('info', '', 'Click on the <b style="color:#FF6600">SUBMIT</b> button.');

        }
    });

});
let kVal = 2;


updateDistanceColumn(kVal);
function resetCluster() {

    var selectElement = document.getElementById("SelectMethod");
    selectElement.selectedIndex = 0;
    kVal = 0;


    enableclusterSubmitButton();
    disableClusterNextButtons();
}
function enableclusterSubmitButton() {
    let enableclusterSubmitButton = document.getElementById("cluster-submit-button");
    enableclusterSubmitButton.disabled = false;
}
// --------------------------------------------------------------------------------------------------------------
let centroids = [];
// let count = 0;
function SelectCentroids() {
    if (kVal == centroids.length) {
        alert1('info', '', 'Click on the <b style="color:#FF6600">NEXT</b> button.');

        return;
    }
    $(document).ready(function () {
        const maxSelections = kVal;

        $('#Selectcendroid').on('change', function (e) {
            centroids = $(this).val();
            // highlightRows(centroids);
            console.log('Selected Options:', centroids);
        });
        $("#Selectcendroid").select2({
            maximumSelectionLength: maxSelections,
        });
        $("#Selectcendroid").on("select2:select", function (e) {
            const selectedOption = e.params.data.id;

            // centroids = sortArray(checkAndRemoveDuplicateValue(centroids, selectedOption))

            if (centroids.length > maxSelections) {
                const removedOption = centroids.shift();
                $(this)
                    .find('option[value="' + removedOption + '"]')
                    .prop("selected", false);

            }

            // console.log("Selected Options:", centroids);

            let enableNextButton = document.getElementById("cendroid-submit-button");
            if (centroids.length == kVal) {
                enableNextButton.disabled = false;
                alert1('info', '', 'Click on the <b style="color:#FF6600">SUBMIT</b> button.');

            }
            else {
                enableNextButton.disabled = true;
                console.log(centroids.length)
                console.log(kVal)

            }
        });

    });
    // Prompt to change the value of k if kVal is equal to count
}

function sortArray(arr) {
    // Use the sort() method to sort the array in place
    arr.sort(function (a, b) {
        return a - b;
    });

    return arr;
}

function disableNextButton() {

    let disableNextButton = document.getElementById("cendroid-submit-button");

    disableNextButton.disabled = true;

}

function checkDuplicateValue(arr, value) {
    return arr.includes(value);
}

function checkAndRemoveDuplicateValue(arr, value) {
    const uniqueSet = new Set(arr); // Create a Set from the array to remove duplicates
    const isDuplicate = uniqueSet.has(value); // Check if the value already exists in the Set

    if (isDuplicate) {
        // uniqueSet.delete(value); // Remove the value from the Set
        console.log("Duplicate removed");
        // return;
    } else {
        uniqueSet.add(value); // Add the value to the Set
        console.log("Value added");
    }

    const uniqueArray = Array.from(uniqueSet); // Convert the Set back to an array
    return uniqueArray;
}



let yes = true;

// let FirstCentroids = [];

let firstcentroidsIndex = [];
function submitCendroid() {
    highlightRows(centroids);
    console.log(kVal === centroids.length);
    console.log(centroids.length);
    firstcentroidsIndex = centroids;
    if (kVal === centroids.length) {
        promptToChangeCentroids();
    }
    let centroidVal = []; // Define centroidVal array
    for (let index = 0; index < centroids.length; index++) {
        centroidVal.push(data[Number(centroids[index])]);
    }
    centroids = centroidVal;



    console.log(centroidVal); // Display centroidVal array
    console.log(centroids); // Display centroidVal array


}
document.getElementById("training-left-side-container-2-elbow").style.display = "none";



function highlightRows(centroids) {
    let table = document.getElementById("data-table-compute");
    let rows = table.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];

        // Skip the first row (header row) and the second row (empty row)
        if (i === 0 || i === 1) {
            continue;
        }

        let sNo = row.cells[0].innerText.trim(); // Get the S. NO. value from the first cell

        if (centroids.includes(sNo)) {

            row.cells[1].style.border = "2px solid #FF6600";
            row.cells[2].style.border = "2px solid #FF6600";
        } else {

            row.cells[1].style.border = "";
            row.cells[2].style.border = "";

            DisableCendroidSubmitButton()
        }
    }
}
function disableHighlightRows(centroids) {
    let table = document.getElementById("data-table");
    let rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let sNo = row.cells[0].innerText.trim(); // Get the S. NO. value from the first cell

        if (centroids.includes(sNo)) {
            row.classList.add("selected");

            let cells = row.getElementsByTagName("td");
            for (let j = 0; j < cells.length; j++) {
                cells[j].style.border = "red 2px solid";
            }
        } else {
            row.classList.remove("selected");

            let cells = row.getElementsByTagName("td");
            for (let j = 0; j < cells.length; j++) {
                console.log("hello else");
                cells[j].style.border = ""; // Reset the border
            }
        }
    }
}

function resetSelectOptions() {
    centroids = [];
    const selectElement = document.getElementById("Selectcendroid");
    selectElement.value = "";
    selectElement.dispatchEvent(new Event("change"));

    let table = document.getElementById("data-table");
    let rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let sNo = row.cells[0].innerText.trim(); // Get the S. NO. value from the first cell

        if (centroids.includes(sNo)) {
            row.classList.add("selected");

            let cells = row.getElementsByTagName("td");
            for (let j = 0; j < cells.length; j++) {
                cells[j].style.border = "red 2px solid";
            }
        } else {
            row.classList.remove("selected");

            let cells = row.getElementsByTagName("td");
            for (let j = 0; j < cells.length; j++) {
                console.log("hello else");
                cells[j].style.border = ""; // Reset the border
            }
        }
    }
    // disableCendroidNextButtons();

}





HighLightingHeadingOfTable();
function HighLightingHeadingOfTable() {
    // Get the table element
    let table = document.getElementById("data-table");

    // Get all the rows in the table body
    let rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

    // Iterate over the rows
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];

        if (i === 0) {
            console.log("Selected row:", row);
            row.style.backgroundColor = "#d8e9f0";
        }
    }
}

HighLightingHeadingOfTable_ForCompute();
function HighLightingHeadingOfTable_ForCompute() {
    // Get the table element
    let table = document.getElementById("data-table-compute");

    // Get all the rows in the table body
    let rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

    // Iterate over the rows
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];

        if (i === 0) {
            console.log("Selected row:", row);
            row.style.backgroundColor = "#d8e9f0";
        }
    }
}
// HighLightingHeadingOfTable_ForAnalysis();
function HighLightingHeadingOfTable_ForAnalysis() {
    // Get the table element
    let table = document.getElementById("data-table-analysis");

    // Get all the rows in the table body
    let rows = table.getElementsByTagName("thead")[0].getElementsByTagName("tr");

    // Iterate over the rows
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];

        if (i === 0) {
            console.log("Selected row:", row);
            row.style.backgroundColor = "#d8e9f0";
        }
    }
}

function promptToChangeCentroids() {
    Swal.fire({
        // title: 'Delete Rows',
        text: "Do you want to change selected Centroids Value?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        customClass: {
            container: "swal-container",
            popup: "swal-popup",
            title: "swal-title",
            content: "swal-content",
        },
        target: myContainer,
        didOpen: () => {
            const container = document.querySelector(".swal-container");
            const containerWidth = myContainer.offsetWidth;
            const containerHeight = myContainer.offsetHeight;

            // Change font size based on container size
            if (containerWidth >= 1000 && containerHeight >= 672) {
                container.style.fontSize = "24px";
            } else {
                container.style.fontSize = "16px";
            }

            // Adjust dimensions and position of the Swal container
            container.style.position = "absolute";
            container.style.width = "100%";
            container.style.height = "100%";
            container.style.top = "0";
            container.style.left = "0";
            container.style.padding = "0";

        },
        showCloseButton: false, // Disable the close button
        allowOutsideClick: false, // Prevent closing by clicking outside the modal
        allowEscapeKey: false, // Prevent closing by pressing the escape key
    }).then((result) => {
        if (result.isConfirmed) {
            count = 0;
            centroids = [];
            // Get the table element
            let table = document.getElementById("data-table-compute");
            let rows = table.getElementsByTagName("tr");

            for (let i = 0; i < rows.length; i++) {
                let row = rows[i];

                // Skip the first row (header row) and the second row (empty row)
                if (i === 0 || i === 1) {
                    continue;
                }

                let sNo = row.cells[0].innerText.trim(); // Get the S. NO. value from the first cell

                if (centroids.includes(sNo)) {
                    row.cells[1].style.border = "";
                    row.cells[2].style.border = "";
                } else {
                    row.cells[1].style.border = "";
                    row.cells[2].style.border = "";
                }
            }
            resetSelectOptions();
        } else {


            DisableCendroidSubmitButton();

            showCentroids(centroids);



            // disableCendroidResetButtons();
            enableDistanceButtonData();
            // enableClusterButtonData();

            document.getElementById("training-left-side-container-1-elbow").style.display = "none";
            document.getElementById("cendroid-control").style.display = "none";
            document.getElementById("training-left-side-container-2-elbow").style.display = "block";
            showOldCentroids(centroids);
            alert1('info', 'Find Euclidean Distance', 'To calculate the Euclidean Distance between the data point and each cluster centroid.<br>Click on the <b style="color:#FF6600">DISTANCE</b> button.');


        }
    });

}

// compute functions
function updateTableForCompute() {
    var table = document.getElementById("data-table-compute");

    // Clear existing data rows (keeping the header rows)
    var rowCount = table.rows.length;
    for (var i = rowCount - 1; i > 2; i--) {
        table.deleteRow(i);
    }

    for (var i = 1; i < data.length; i++) {
        var row = table.insertRow(i + 1); // Offset by 2 to skip header rows
        var sCell = row.insertCell(0);
        var xCell = row.insertCell(1);
        var yCell = row.insertCell(2);

        sCell.innerHTML = `${i}`;
        xCell.innerHTML = data[i][0];
        yCell.innerHTML = data[i][1];
    }
    if (rowCount >= 7) {
        table.deleteRow(rowCount);

    }
}

function updateDistanceColumn(kVal) {
    const table = document.getElementById('data-table-compute');
    const distanceHeader = document.getElementById('distance-header');
    const distanceSubColumnsRow = document.getElementById('distance-sub-columns');

    // Update the colspan attribute of the Distance header cell
    distanceHeader.colSpan = kVal;

    // Clear previous distance sub-columns
    distanceSubColumnsRow.innerHTML = ''; // Clear the content of the row

    // Generate the new distance sub-columns based on kVal
    for (let i = 1; i <= kVal; i++) {
        const subColumn = document.createElement('th');
        subColumn.textContent = 'D' + i;
        distanceSubColumnsRow.appendChild(subColumn);
    }


}




function resetCentroidSection() {
    resetSelectOptions();
}










function euclideanDistance(pointA, pointB) {
    let sum = 0;
    for (let i = 0; i < pointA.length; i++) {
        sum += Math.pow(pointA[i] - pointB[i], 2);
    }
    return Math.sqrt(sum);
}

function roundToTwoDecimalPlaces(number) {
    return Math.round(number * 100) / 100;
}





let countIteration = 0;






let TotalStepCentroids = []
let TotalStepCluster = []
let clusterOld = []


let currentCellIndex = 1;
let clusterAll = []








let newCentroids = [];
let currentCluster = 1;




let equationLines = [];
let calculatedLines = [];
let showCount = 0;






function findNewCentroidsValue(data, centroids) {


    const labels = data.map(point => {
        const distances = centroids.map(centroid => {
            return Math.sqrt(
                Math.pow(centroid[0] - point[0], 2) + Math.pow(centroid[1] - point[1], 2)
            );
        });
        return distances.indexOf(Math.min(...distances));
    });

    // Step 2: Update the centroids based on the assigned data points
    const newCentroids = centroids.map((centroid, i) => {
        const assignedPoints = data.filter((point, j) => labels[j] === i);
        if (assignedPoints.length === 0) {
            return centroid;
        }
        const sumX = assignedPoints.reduce((sum, point) => sum + point[0], 0);
        const sumY = assignedPoints.reduce((sum, point) => sum + point[1], 0);
        const newX = roundToTwoDecimalPlaces(sumX / assignedPoints.length);
        const newY = roundToTwoDecimalPlaces(sumY / assignedPoints.length);

        return [newX, newY];
    });
    return newCentroids;
}

function displayEquationLine() {
    let show = document.getElementById("cenroidsContainerStore");
    show.innerText += '\n' + equationLines[equationLines.length - 1];
}



let alertCount = 1;



function tabChangeIntoAnalysis() {
    // document.getElementById('tab-2').disabled = false;
    let NextClass = document.querySelectorAll(".tab-2-disInvert");
    let currentClass = document.querySelectorAll(".tab-1-invert");
    for (let i = 0; i < NextClass.length; i++) {
        NextClass[i].className = "tab-2-invert";
    }
    for (let i = 0; i < currentClass.length; i++) {
        currentClass[i].className = "tab-1-disInvert";
    }
    document.getElementById('tab-1').style.backgroundColor = "#444648";
    document.getElementById('anaimg').src = 'ANALYSIS ICON1.png';
    document.getElementById('anaimg').style.cursor = 'pointer';
    document.getElementById('calcimg').src = 'calculator.png';
    document.getElementById('calcimg').style.cursor = 'not-allowed';
}

function checkArraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}


function copyArray(source, target) {
    for (let i = 0; i < source.length; i++) {
        target[i] = source[i];
    }
}





//analysis

function generateRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}





function drawChartAnalysisforAnalyse() {

    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        // Create a data table from your sseArray
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'X');
        data.addColumn('number', 'Y');


        data.addRows(sseArray);

        // Set chart options
        var options = {
            // title: 'Data Set',
            legend: { position: "none" },
            hAxis: {
                title: "CLUSTERS",
                minValue: 0,
            },
            vAxis: {
                title: "SILHOUETTE SCORE",
                minValue: 0,
            },
            series: {
                0: { // This configuration is for the first series (X, Y data)
                    lineWidth: 1, // Set the width of the connecting line
                    pointSize: 5, // Set the size of the data points
                    visibleInLegend: false, // Hide the series in the legend
                },
            },
            explorer: {},
            chartArea: { width: "80%", height: "80%" }, // Added to adjust the chart area size
        };

        // Create a scatter chart and attach it to the 'scatter-chart' div
        var chart = new google.visualization.ScatterChart(document.getElementById('scatter-chart'));

        chart.draw(data, options);
        // google.visualization.events.addListener(chart, 'ready', function () {
        //     var svg = chart.getContainer().getElementsByTagName('svg')[0];

        //     // Get the coordinates of the first and last data points
        //     var firstPoint = { x: data.getValue(0, 0), y: data.getValue(0, 1) };
        //     var lastPoint = { x: data.getValue(data.getNumberOfRows() - 1, 0), y: data.getValue(data.getNumberOfRows() - 1, 1) };

        //     // Draw a line connecting the first and last data points
        //     drawLine(svg, firstPoint, lastPoint);
        // });

        // chart.draw(data, options);

        // function drawLine(svg, point1, point2) {
        //     var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        //     line.setAttribute('x1', chart.getChartLayoutInterface().getXLocation(point1.x));
        //     line.setAttribute('y1', chart.getChartLayoutInterface().getYLocation(point1.y));
        //     line.setAttribute('x2', chart.getChartLayoutInterface().getXLocation(point2.x));
        //     line.setAttribute('y2', chart.getChartLayoutInterface().getYLocation(point2.y));
        //     line.setAttribute('stroke', 'red'); // Set the line color to red
        //     line.setAttribute('stroke-width', '2');
        //     line.setAttribute('stroke-dasharray', '4,4'); // Set the line style to dotted
        //     svg.appendChild(line);
        // }
    }

}


function analysisContainerforAnalyse() {
    google.charts.load('current', { packages: ['corechart', 'table'] });
    google.charts.setOnLoadCallback(drawChartAnalysisforAnalyse);

}

function printPage() {
    window.print();
}


function createTable() {

    var tableBody = document.querySelector('#sse-table tbody');

    // Loop through the sseArray and create table rows
    for (var i = 0; i < sseArray.length; i++) {
        var row = document.createElement('tr');

        for (var j = 0; j < sseArray[i].length; j++) {
            var cell = document.createElement('td');
            cell.textContent = sseArray[i][j];
            row.appendChild(cell);
        }

        tableBody.appendChild(row);
    }

}
function removeFirstElement(arr) {
    return [...arr.slice(1)];
}


function disablePlotAnalysis() {
    let plot = document.getElementById("plot-analysis");
    plot.disabled = true;
}
function enablePlotAnalysis() {
    let plot = document.getElementById("plot-analysis");
    plot.disabled = false;
}
disablePrintButton();
function disablePrintButton() {
    let print = document.getElementById("print");
    print.disabled = true;
}
function enablePrintButton() {
    let print = document.getElementById("print");
    print.disabled = false;
}

document.getElementById("plot-analysis").addEventListener("click", function () {

    analysisContainerforAnalyse();
    enablePrintButton();
    disablePlotAnalysis();


    Swal.fire({

        html: 'Reference image for Silhouette score.<br>Maximum Silhouette score is the optimal value of k.',
        imageUrl: 's1.jpg',
        imageWidth: 400,
        imageHeight: 300,
        imageAlt: 'Custom image',
        customClass: {
            container: "swal-container",
            popup: "swal-popup",
            title: "swal-title",
            content: "swal-content",
            confirmButton: "swal-button", // Add this line for the confirm button
            cancelButton: "swal-button" // Add this line for the cancel button
        },
        target: myContainer,
        didOpen: () => {
            const container = document.querySelector(".swal-container");
            const containerWidth = myContainer.offsetWidth;
            const containerHeight = myContainer.offsetHeight;

            // Change font size based on container size
            if (containerWidth >= 1000 && containerHeight >= 672) {
                container.style.fontSize = "24px";
            } else {
                container.style.fontSize = "16px";
            }

            // Adjust dimensions and position of the Swal container
            container.style.position = "absolute";
            container.style.width = "100%";
            container.style.height = "100%";
            container.style.top = "0";
            container.style.left = "0";
            container.style.padding = "0";

        },
        showCloseButton: false, // Disable the close button
        allowOutsideClick: false, // Prevent closing by clicking outside the modal
        allowEscapeKey: false,
    });

});


if (performance.navigation.type === 1) {
    // Page was reloaded, redirect to index.html
    window.location.href = 'index.html';
}
















// this code for finding distance between centroid and datapoint
// *************************************************************
function euclideanDistance(point1, point2) {
    let sum = 0;
    for (let i = 0; i < point1.length; i++) {
        sum += Math.pow(point1[i] - point2[i], 2);
    }
    return Math.sqrt(sum);
}
// Function to check if two arrays are equal
function arraysEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}





function arraysEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}




function findClusterValue(dataPoint, centroids) {
    var minDistance = Infinity;
    var minDistanceIndex = -1; // To keep track of the index of the minimum distance centroid

    for (let centroidIndex = 0; centroidIndex < centroids.length; centroidIndex++) {
        var distance = euclideanDistance(dataPoint, centroids[centroidIndex]);
        if (distance < minDistance) {
            minDistance = distance;
            minDistanceIndex = centroidIndex; // Update the index of the minimum distance centroid
        }
    }

    return minDistanceIndex; // Return the index of the centroid that the data point belongs to
}

let countK = 0


$("#button-distance").click(async function () {
    countK++;
    var dataWithoutHeader = data.slice(1); // Remove the header row
    const clusterData = findClusterValue(dataWithoutHeader, centroids);
    console.log(clusterData);
    disableDistanceButtonData();
    var distances = [];
    var table = document.getElementById("data-table-compute");
    var calculationContainer = document.getElementById("calculation"); // Reference to the <div> container

    // Clear existing data rows (keeping the header rows)
    var rowCount = table.rows.length;
    // for (var i = rowCount - 1; i > 2; i--) {
    //     table.deleteRow(i);
    // }

    // Clear previous content in the calculation container
    calculationContainer.innerHTML = '';

    for (var i = 1; i < data.length; i++) {
        var row = table.rows[i + 1]; // Offset by 2 to skip header rows

        // S.No column
        var sCell = row.cells[0];
        sCell.style.border = "solid #e0e0e0 1px";
    }

    for (var i = 1; i < data.length; i++) {
        // X column
        var xCell = table.rows[i + 1].cells[1];
        xCell.style.border = "solid #e0e0e0 1px";
    }

    for (var i = 1; i < data.length; i++) {
        // Y column
        var yCell = table.rows[i + 1].cells[2];
        yCell.style.border = "solid #e0e0e0 1px";
    }


    for (let centroidIndex = 0; centroidIndex < kVal; centroidIndex++) {
        for (var i = 1; i < data.length; i++) {
            // Calculate and print distance columns
            distances.push(euclideanDistance([data[i][0], data[i][1]], centroids[centroidIndex]));
        }
    }
    for (let centroidIndex = 0; centroidIndex < kVal; centroidIndex++) {
        // Call the function to show distance calculation for this centroid
        for (var i = 1; i < data.length; i++) {

            for (let j = 0; j < kVal; j++) {
                distances.push(parseFloat(distances[i][j]));
            }
            showDistanceCalculation(i, centroidIndex, distances);
            // await delay(500); // Delay for 1 second (adjust as needed)
        }
    }
    for (let centroidIndex = 0; centroidIndex < kVal; centroidIndex++) {
        for (var i = 1; i < data.length; i++) {
            // Calculate and print distance columns
            var distance = euclideanDistance([data[i][0], data[i][1]], centroids[centroidIndex]);

            var dCell = table.rows[i + 1].cells[3 + centroidIndex];
            if (dCell) {
                dCell.innerHTML = roundToTwoDecimalPlaces(distance);
                dCell.style.border = " 2px red solid";
            }
            else {
                var dCell = table.rows[i + 1].insertCell(3 + centroidIndex);
                dCell.innerHTML = roundToTwoDecimalPlaces(distance);
                dCell.style.border = " 2px red solid";
            }
        }
        await delay(500); // Delay for 1 second (adjust as needed)
    }





    updateDistanceColumn(kVal);

    showOldCentroids(centroids);

    // setTimeout(() => {
    await delay(300); // Delay for 1 second (adjust as needed)
    alert2('info', 'Assign Data Points to Clusters', 'Assign the data point to the cluster whose <br> centroid is closest (i.e., has the smallest Euclidean distance) <br> by clicking on the <b style="color:#FF6600">CLUSTER</b> button.', enableClusterButtonData());

    // }, 500);
});




function delay(milliseconds) {

    return new Promise(resolve => {

        setTimeout(resolve, milliseconds);

    });

}




// Function to display the calculation of distances in the 'calculation' container
function showDistanceCalculation(dataIndex, minDistanceIndex, distances) {
    if (dataIndex <= 1) {
        const calculationContainer = document.getElementById("calculation");
        calculationContainer.innerText = '';
        const calculationString = distances.map((distance, index) => {
            if (index !== 0) return ''; // Return an empty string for indices other than 1

            const centroidX = centroids[index][0];
            const centroidY = centroids[index][1];
            const dataX = data[dataIndex][0];
            const dataY = data[dataIndex][1];
            return `d = √((${centroidX} - ${dataX})² + (${centroidY} - ${dataY})²) = ${distance.toFixed(2)}`;
        }).join("<br>");
        // });
        calculationContainer.innerHTML += `        <strong>Euclidean distance</strong>

  <p style="text-align: center;color:#FF6600"><strong> d = √((X<sub>2</sub> - X<sub>1</sub>)² + (Y<sub>2</sub> - Y<sub>1</sub>)²)</strong>
    </p>
    <p>
      Where, “d” is the Euclidean distance,<br>
      "X<sub>1</sub>" is the x axis of data point,<br>
      "X<sub>2</sub>" is the x axis of Centroid,<br>
      "Y<sub>1</sub>" is the y axis of Data point,<br>
      "Y<sub>2</sub>" is the y axis of Centroid
    </p>`
        calculationContainer.innerHTML += `<h3 style="color:#FF6600;margin: 0px;">Example:</h3><br/> ${calculationString}<br>`;
        // calculationContainer.innerHTML += `Centroid ${minDistanceIndex + 1}: ${calculationString}<br>`;
    }
    else {
        return;
    }
}

// Function to highlight the KCell with the red border
function DisablehighlightKCell(KCellIndex) {
    var table = document.getElementById("data-table-compute");
    var rowCount = table.rows.length;



    // Reset the style for all KCells (remove previous highlighting)
    for (var i = 2; i < rowCount; i++) {
        var cell = table.rows[i].cells[kVal + 3];
        cell.style.border = "none";
    }


}
function DisablehighlightKCellNew(KCellIndex) {
    var table = document.getElementById("data-table-compute");
    var rowCount = table.rows.length;



    // Reset the style for all KCells (remove previous highlighting)
    for (var i = 2; i < rowCount; i++) {
        var cell = table.rows[i].cells[kVal + 4];
        cell.style.border = "none";
    }


}
function highlightKCell(KCellIndex) {
    var table = document.getElementById("data-table-compute");
    var rowCount = table.rows.length;

    // Reset the style for all KCells (remove previous highlighting)
    for (var i = 2; i < rowCount; i++) {
        var cell = table.rows[i].cells[KCellIndex];
        cell.style.border = "1px solid #e0e0e0";
    }


}
function delay(milliseconds) {

    return new Promise(resolve => {

        setTimeout(resolve, milliseconds);

    });

}

async function highlightKCellIfClusterIsMatch(KCellIndex) {
    var table = document.getElementById("data-table-compute");
    var rowCount = table.rows.length;


    // Reset the style for all KCells (remove previous highlighting)
    for (var i = 2; i < rowCount; i++) {
        var cell1 = table.rows[i].cells[kVal + 3];
        var cell2 = table.rows[i].cells[kVal + 4];
        cell1.style.border = "2px solid green";
        cell2.style.border = "2px solid green";
        await delay(400);
    }


}
function disableHighlightofClusterColumn() {
    var table = document.getElementById("data-table-compute");
    var rowCount = table.rows.length;
    // Reset the style for all KCells (remove previous highlighting)
    for (var i = 2; i < rowCount; i++) {
        var cell1 = table.rows[i].cells[kVal + 3];
        // var cell2 = table.rows[i].cells[kVal + 4];
        cell1.style.border = "1px solid #e0e0e0";
        // cell2.style.border = "2px solid green";
    }
}
function disablehighlightKCellIfClusterIsMatch() {
    var table = document.getElementById("data-table-compute");
    var rowCount = table.rows.length;



    // Reset the style for all KCells (remove previous highlighting)
    for (var i = 2; i < rowCount; i++) {
        var cell1 = table.rows[i].cells[kVal + 3];
        var cell2 = table.rows[i].cells[kVal + 4];
        cell1.style.border = "1px solid #e0e0e0";
        cell2.style.border = "1px solid #e0e0e0";
    }

}


$("#button-CLUSTER").click(async function () {
    iterationCountForElbow++;
    disableClusterButtonData();


    var dataWithoutHeader = data.slice(1); // Remove the header row
    const clusterData = findClusterValue(dataWithoutHeader, centroids);
    console.log("clusterData" + clusterData);
    var table = document.getElementById("data-table-compute");
    var calculationContainer = document.getElementById("calculation"); // Reference to the <div> container

    // Clear existing data rows (keeping the header rows)
    var rowCount = table.rows.length;
    // for (var i = rowCount - 1; i > 2; i--) {
    //     table.deleteRow(i);
    // }

    // Clear previous content in the calculation container
    calculationContainer.innerHTML = '';
    let count = 1;
    for (var i = 1; i < data.length; i++) {
        var row = table.rows[i + 1]; // Offset by 2 to skip header rows
        var sCell = row.cells[0];
        var xCell = row.cells[1];
        var yCell = row.cells[2];

        sCell.style.border = "solid 1px #e0e0e0"
        xCell.style.border = "solid 1px #e0e0e0"
        yCell.style.border = "solid 1px #e0e0e0"

        var minDistance = Infinity;
        var minDistanceIndex = -1; // To keep track of the index of the minimum distance centroid
        var distances = []; // To store the distances for each centroid

        for (let centroidIndex = 0; centroidIndex < kVal; centroidIndex++) {
            var distance = euclideanDistance([data[i][0], data[i][1]], centroids[centroidIndex]);
            if (distance < minDistance) {
                minDistance = distance;
                minDistanceIndex = centroidIndex; // Update the index of the minimum distance centroid
            }

            var dCell = row.cells[3 + centroidIndex];
            dCell.style.border = "solid 1px #e0e0e0";
            distances.push(distance);
        }

        let KCell = row.cells[kVal + 3];
        if (KCell) {

            if (iterationCountForElbow < 2) {

                KCell.innerHTML = minDistanceIndex + 1; // Set KCell.innerHTML to the index of the minimum distance centroid
            }
            KCell.style.border = "red solid 2px";
        }
        else {

            KCell = row.insertCell(kVal + 3);
            if (iterationCountForElbow < 2) {

                KCell.innerHTML = minDistanceIndex + 1; // Set KCell.innerHTML to the index of the minimum distance centroid
            }
            KCell.style.border = "red solid 2px";
        }

        newClusterData[i - 1] = minDistanceIndex + 1;

        if (iterationCountForElbow > 1) {

            var NewKCell = row.insertCell(kVal + 4);
            KCell.innerHTML = previousClusterData[i - 1]
            NewKCell.innerHTML = minDistanceIndex + 1;
        }

        if (count == 1) {
            showMinDistance(distances);
            count++;

        }

        //await delay(300);

    }
    if (areClustersEqual(previousClusterData, newClusterData) && iterationCountForElbow >= 2) {
        document.getElementById('SSE_next').disabled = false;
        highlightKCell(kVal + 3);
        await delay(400);
        disableDistanceButtonData();

        disableNewCentroidButton();
        highlightKCellIfClusterIsMatch(kVal + 3)
        await delay(2000)
        // alert("Previous and new clusters are the same!");

        document.getElementById("new-centroid-button").style.display = "none";
        document.getElementById("next-elbow-button").style.display = "none";
        document.getElementById("SSE_next").style.display = "block";

        setTimeout(() => {

            alert2('success', 'Matched!', 'OLD CLUSTER and NEW CLUSTER values are matched.<br> Now Click on <b style="color:#FF6600">NEXT</b> button.', enableElbowNextButton());


        }, 300);
        if (kVal == 8) {
            document.getElementById("next-elbow-button").style.display = "block";
            document.getElementById("SSE_next").style.display = "none";
            enableElbowNextButton();

        }

    } else {
        setTimeout(() => {
            alert2('info', 'Update Cluster Centroids', 'Click on the <b style="color:#FF6600">CENTROIDS</b> button.', enableNewCentroidButton());


        }, 300);
    }


    previousClusterData = newClusterData;
    console.log(newClusterData);
    console.log(previousClusterData);
    // if (rowCount >= 7) {
    //     table.deleteRow(rowCount);
    // }


});

document.getElementById("SSE_next").style.display = "none";

let iterationCountForElbow = 0;
function reset() {

    //change name
    const table1 = document.getElementById("data-table-compute");
    let k = table1.rows[0].cells.length - 2;

    if (table1.rows[0].cells[k].innerHTML === 'Old Cluster') {
        // console.log('checkingggg')
        table1.rows[0].cells[k].innerHTML = 'Cluster'
    }


    Swal.fire({
        icon: "info",
        title: `Select any ${kVal + 1} centroids`,

        customClass: {
            container: "swal-container",
            popup: "swal-popup",
            title: "swal-title",
            content: "swal-content",
        },
        target: myContainer,
        didOpen: () => {
            const container = document.querySelector(".swal-container");
            const containerWidth = myContainer.offsetWidth;
            const containerHeight = myContainer.offsetHeight;

            // Change font size based on container size
            if (containerWidth >= 1000 && containerHeight >= 672) {
                container.style.fontSize = "24px";
            } else {
                container.style.fontSize = "16px";
            }

            // Adjust dimensions and position of the Swal container
            container.style.position = "absolute";
            container.style.width = "100%";
            container.style.height = "100%";
            container.style.top = "0";
            container.style.left = "0";
            container.style.padding = "0";

        },
        showCloseButton: false, // Disable the close button
        allowOutsideClick: false, // Prevent closing by clicking outside the modal
        allowEscapeKey: false,
    });
    countSSEHighLight = 1;
    countK = 0;
    DisablehighlightKCell(kVal + 3);
    if (iterationCountForElbow > 1) {
        DisablehighlightKCellNew();
    }

    iterationCountForElbow = 0;

    const table = document.getElementById("data-table-compute");

    // Clear distances in each row
    for (let i = 1; i < table.rows.length; i++) {
        for (let j = 3; j < table.rows[i].cells.length - 1; j++) {
            table.rows[i].cells[j].innerHTML = '';
        }
    }

    // Clear cluster column
    for (let i = 1; i < table.rows.length; i++) {
        table.rows[i].cells[table.rows[i].cells.length - 1].innerHTML = '';
    }

    // Clear previous content in the calculation container
    const calculationContainer = document.getElementById("calculation");
    calculationContainer.innerHTML = '';

    // You can add additional code here to reset other necessary state variables or UI elements, if needed.4
    document.getElementById("calculation_formula_header").innerText = "FORMULA";

    kVal++;
    centroids = [];
    let kNum = document.getElementById("kshow");
    kNum.innerHTML = `for k = ${kVal}`;
    let s_show = document.getElementById("s_show");
    s_show.innerHTML = `for k = ${kVal}`;
    resetCentroidSection();
    $('#Selectcendroid').off();
    $(document).ready(function () {
        const maxSelections = kVal;

        $('#Selectcendroid').on('change', function (e) {
            centroids = $(this).val();
            // highlightRows(centroids);

            console.log('Selected Options:', centroids);
        });
        $("#Selectcendroid").select2({
            maximumSelectionLength: maxSelections,
        });
        $("#Selectcendroid").on("select2:select", function (e) {
            const selectedOption = e.params.data.id;

            // centroids = sortArray(checkAndRemoveDuplicateValue(centroids, selectedOption))

            if (centroids.length > maxSelections) {
                const removedOption = centroids.shift();
                $(this)
                    .find('option[value="' + removedOption + '"]')
                    .prop("selected", false);

            }

        });

    });
    updateDistanceColumn(kVal);
    enableCendroidSubmitButton();
    disableDistanceButtonData();
    disableClusterButtonData();
    disableElbowNextButton();
    SelectCentroids();
    document.getElementById("cendroid-control").style.display = "block";
    document.getElementById("training-left-side-container-1-elbow").style.display = "block";
    document.getElementById("training-left-side-container-2-elbow").style.display = "none";

    document.getElementById("submit_button").style.display = "none";
    document.getElementById("new-centroid-button").style.display = "block";


    // const inputValues = storeInputValues(kVal, newClusterData);

    // console.log('Input Tags:', inputTags);

}




function enableElbowNextButton() {
    document.getElementById("next-elbow-button").disabled = false;
}
disableElbowNextButton();
function disableElbowNextButton() {
    document.getElementById("next-elbow-button").disabled = true;
}


let ShowcountForDistance = 1
function showMinDistance(distances) {

    if (ShowcountForDistance <= 1) {
        document.getElementById('calculation').innerHTML = `<h3>Assign points to Clusters using:</h3><b style="color:#FF6600">Cluster_Assignments</b> = MIN(D1 Value, D2 Value..., Dn
            Value)<br />Cluster_Assignments = <b style="color:#FF6600">1</b> if D1 is MIN 
            <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b style="color:#FF6600">2</b>
            if D2 is
            MIN <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b style="color:#FF6600">.</b><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b style="color:#FF6600">.</b><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b style="color:#FF6600">n</b>
            if Dn is MIN  <br /><h3 style="margin-bottom: 5px;
            margin-top: 5px;color:#FF6600">Example:</h3>`

        distances = roundArrayToTwoDecimalPlaces(distances)
        const minDistance = Math.min(...distances); // Find the minimum distance from the array
        const minDistanceIndex = distances.indexOf(minDistance); // Find the index of the minimum distance
        const minDistanceDiv = document.createElement('div');
        minDistanceDiv.textContent = `MIN(${distances.join(', ')}) = ${minDistanceIndex + 1}`;
        document.getElementById('calculation').appendChild(minDistanceDiv);
    }
    else {
        return;
    }
}




// Define variables to store previous and new cluster data
let previousClusterData = [];
let newClusterData = [];

// Function to compare two arrays of objects (cluster data)
function areClustersEqual(clusterData1, clusterData2) {
    if (clusterData1.length !== clusterData2.length) {
        return false;
    }

    for (let i = 0; i < clusterData1.length; i++) {
        for (let j = 0; j < clusterData1[i].length; j++) {
            if (clusterData1[i][j] !== clusterData2[i][j]) {
                return false;
            }
        }
    }

    return true;
}




// Function to display the old and new centroids in the 'calculation' container
function showCentroids(oldCentroids, newCentroids) {
    const calculationContainer = document.getElementById("calculation");

    if (!oldCentroids || !newCentroids) {
        // calculationContainer.innerHTML = "Centroids data is missing.";
        return;
    }

    // Format the old centroids for display
    const oldCentroidsString = oldCentroids.map((centroid, index) => {
        const centroidX = centroid[0];
        const centroidY = centroid[1];
        // return `Old Centroid ${index + 1}: (${centroidX.toFixed(2)}, ${centroidY.toFixed(2)})`;
        return `(${centroidX.toFixed(2)}, ${centroidY.toFixed(2)})`;
    }).join("<br>");

    // Format the new centroids for display
    const newCentroidsString = newCentroids.map((centroid, index) => {
        const centroidX = centroid[0];
        const centroidY = centroid[1];
        // return `New Centroid ${index + 1}: (${centroidX.toFixed(2)}, ${centroidY.toFixed(2)})`;
        return `(${centroidX.toFixed(2)}, ${centroidY.toFixed(2)})`;
    }).join("<br>");

    // Display both old and new centroids in the calculation container
    calculationContainer.innerHTML = "<h3>Old Centroids</h3>" + oldCentroidsString + "<h3>New Centroids</h3>" + newCentroidsString;
}



$("#new-centroid-button").click(function () {
    document.getElementById("calculation_formula_header").innerText = "NEW CENTROIDS";


    disableElbowNextButton();

    const table = document.getElementById("data-table-compute");

    var dataWithoutHeader = data.slice(1); // Remove the header row
    const clusterData = findClusterValue(dataWithoutHeader, centroids);

    disableNewCentroidButton();
    disableHighlightofClusterColumn();



    const newCentroids = findNewCentroidsValue(dataWithoutHeader, centroids);

    findNewCentroids(dataWithoutHeader, centroids)

    centroids = newCentroids;

    disableNewCentroidButton();

    setTimeout(() => {
        alert2('info', 'Find Euclidean distance based on the new centroids.', 'Click on the <b style="color:#FF6600">DISTANCE</b> button.', enableDistanceButtonData());

        // Clear distances in each row
        /*
        console.log(table.rows.length)
        for (let i = 1; i < table.rows.length; i++) {
           console.log(i)
           for (let j = 3; j < table.rows[i].cells.length - 1; j++) {
             console.log( table.rows[i].cells[j].innerHTML)
               table.rows[i].cells[j].innerHTML = '';
           }
       }
       
       */
        for (let centroidIndex = 0; centroidIndex < kVal; centroidIndex++) {
            for (var i = 1; i < data.length; i++) {

                var dCell = table.rows[i + 1].cells[3 + centroidIndex];
                if (dCell) {
                    dCell.innerHTML = '';
                }
                else {
                    var dCell = table.rows[i + 1].insertCell(3 + centroidIndex);
                    dCell.innerHTML = '';
                }
            }
            // await delay(500); // Delay for 1 second (adjust as needed)
        }


        let k = table.rows[0].cells.length - 2;

        if (table.rows[0].cells[k].innerHTML === 'Cluster') {

            table.rows[0].cells[k].innerHTML = 'Old Cluster'
        }

    }, 300);




});

function roundArrayToTwoDecimalPlaces(arr) {
    return arr.map(roundToTwoDecimalPlaces);
}





function findNewCentroids(data, centroids) {
    let show = document.getElementById("calculation");
    const currentCentroidLine = document.createElement("p");

    show.innerHTML = "";
    // show.innerText = `New Centroids`;


    const labels = data.map(point => {
        const distances = centroids.map(centroid => {
            return Math.sqrt(
                Math.pow(centroid[0] - point[0], 2) + Math.pow(centroid[1] - point[1], 2)
            );
        });
        return distances.indexOf(Math.min(...distances));
    });

    // Step 2: Update the centroids based on the assigned data points
    const newCentroids = centroids.map((centroid, i) => {
        const assignedPoints = data.filter((point, j) => labels[j] === i);
        if (assignedPoints.length === 0) {
            return centroid;
        }
        const sumX = assignedPoints.reduce((sum, point) => sum + point[0], 0);
        const sumY = assignedPoints.reduce((sum, point) => sum + point[1], 0);
        const newX = roundToTwoDecimalPlaces(sumX / assignedPoints.length);
        const newY = roundToTwoDecimalPlaces(sumY / assignedPoints.length);

        const equationLine = `<br><b style="color:#ffffa1">For Cluster ${i + 1}:</b><br><br>C${i + 1}= ((<span class="colored-point-${i}">${assignedPoints.map(point => point[0]).join(' + ')}</span>) / ${assignedPoints.length}), ((<span class="colored-point-${i}">${assignedPoints.map(point => point[1]).join(' + ')}</span>) / ${assignedPoints.length})`;
        const calculatedLine = ` = (${newX}, ${newY})`;

        equationLines.push(equationLine);
        calculatedLines.push(calculatedLine);

        return [newX, newY];
    });

    showCount++;

    if (kVal === 1) {
        show.innerHTML = `New Centroids` + '<br>' + equationLines[0] + calculatedLines[0];
        console.log("showcount", showCount);
        showCount = 0;
        equationLines = [];
        calculatedLines = [];
        // DisableNewCentroidButton()
        return;
    }
    else if (kVal === 2) {
        // if (kVal === (showCount - 1)) {
        // equationLines.push(" ");
        show.innerHTML = `New Centroids` + '<br>' + equationLines[0] + calculatedLines[0] + '<br>' + equationLines[1] + calculatedLines[1];
        showCount = 0;
        equationLines = [];
        calculatedLines = [];
        // DisableNewCentroidButton()
        return;



    }
    else if (kVal === 3) {

        show.innerHTML = `New Centroids` + '<br>' + equationLines[0] + calculatedLines[0] + '<br>' + equationLines[1] + calculatedLines[1] + '<br>' + equationLines[2] + calculatedLines[2];
        showCount = 0;
        equationLines = [];
        calculatedLines = [];

        return;

    }
    else if (kVal === 4) {

        show.innerHTML = `New Centroids` + '<br>' + equationLines[0] + calculatedLines[0] + '<br>' + equationLines[1] + calculatedLines[1] + '<br>' + equationLines[2] + calculatedLines[2] + '<br>' + equationLines[3] + calculatedLines[3];
        console.log("showcount", showCount);

        showCount = 0;
        equationLines = [];
        calculatedLines = [];

        return;
    }
    else if (kVal === 5) {

        show.innerHTML = `New Centroids` + '<br>' + equationLines[0] + calculatedLines[0] + '<br>' + equationLines[1] + calculatedLines[1] + '<br>' + equationLines[2] + calculatedLines[2] + '<br>' + equationLines[3] + calculatedLines[3] + '<br>' + equationLines[4] + calculatedLines[4];
        console.log("showcount", showCount);

        showCount = 0;
        equationLines = [];
        calculatedLines = [];

        return;
    }
    else if (kVal === 6) {

        show.innerHTML = `New Centroids` + '<br>' + equationLines[0] + calculatedLines[0] + '<br>' + equationLines[1] + calculatedLines[1] + '<br>' + equationLines[2] + calculatedLines[2] + '<br>' + equationLines[3] + calculatedLines[3] + '<br>' + equationLines[4] + calculatedLines[4] + '<br>' + equationLines[5] + calculatedLines[5];
        console.log("showcount", showCount);

        showCount = 0;
        equationLines = [];
        calculatedLines = [];

        return;
    }
    else if (kVal === 7) {

        show.innerHTML = `New Centroids` + '<br>' + equationLines[0] + calculatedLines[0] + '<br>' + equationLines[1] + calculatedLines[1] + '<br>' + equationLines[2] + calculatedLines[2] + '<br>' + equationLines[3] + calculatedLines[3] + '<br>' + equationLines[4] + calculatedLines[4] + '<br>' + equationLines[5] + calculatedLines[5] + '<br>' + equationLines[6] + calculatedLines[6];
        console.log("showcount", showCount);

        showCount = 0;
        equationLines = [];
        calculatedLines = [];

        return;
    }
    else if (kVal === 8) {

        show.innerHTML = `New Centroids` + '<br>' + equationLines[0] + calculatedLines[0] + '<br>' + equationLines[1] + calculatedLines[1] + '<br>' + equationLines[2] + calculatedLines[2] + '<br>' + equationLines[3] + calculatedLines[3] + '<br>' + equationLines[4] + calculatedLines[4] + '<br>' + equationLines[5] + calculatedLines[5] + '<br>' + equationLines[5] + calculatedLines[6] + '<br>' + equationLines[7] + calculatedLines[7];
        console.log("showcount", showCount);

        showCount = 0;
        equationLines = [];
        calculatedLines = [];

        return;
    }

    return newCentroids;
}



function showOldCentroids(centroids) {
    let show = document.getElementById("showOldCentroids");
    show.innerHTML = "";
    const centroidLine = document.createElement("div");
    // centroidLine.innerText = `Centroids`;
    show.appendChild(centroidLine);
    centroids.forEach((centroid, index) => {
        const centroidLine = document.createElement("p");
        // centroidLine.style.display = "block";
        centroidLine.innerText = `C${index + 1} = (${centroid.join(", ")})`;
        show.appendChild(centroidLine);
    });
    const centroidLineNew = document.createElement("div");
    // centroidLineNew.innerText = `New Centroids`;
    show.appendChild(centroidLineNew);
}


function calculateSSE() {
    const inputTags = generateInputTags(kVal, newClusterData);

    // Get the <div> element by its id
    const calculationDiv = document.getElementById('calculation');

    // Set the HTML content of the <div> to the generated input tags
    calculationDiv.innerHTML = inputTags;
    highlightCells(newClusterData);

}


function generateInputTags(kVal, clusters) {
    let inputTags = [];
    let totalSSE = [];
    if (kVal > 1) {
        for (let clusterNum = 1; clusterNum <= kVal; clusterNum++) {
            let clusterCount = clusters.filter(cluster => cluster === clusterNum).length;
            let inputFields = Array.from({ length: clusterCount }, (_, index) => `<input type="text" id="input_${clusterNum}_${index + 1}" ${clusterNum !== 1 ? 'disabled' : ''}>`);
            let sse = `<div style="margin: 1px 0;display: flex;align-items: baseline;">SSE${clusterNum} = <span class="calculation-sse" id="sse${clusterNum}">${inputFields.join(' + ')}</span></div>`;
            inputTags.push(sse);

            // Add the current SSE to totalSSE array
            totalSSE.push(`<input type="number" id="tsse${clusterNum}" placeholder="SSE${clusterNum}" disabled>`);
        }

        // Create the Total SSE calculation as a sum of individual cluster SSEs
        let totalSSECalculation = `<div style="margin: 1px 0;display: flex;align-items: baseline;">Total SSE = <span class="calculation-sse" id="totalSSE">${totalSSE.join(' + ')}</span></div>`;
        inputTags.push(totalSSECalculation);
    }
    else {
        for (let clusterNum = 1; clusterNum <= kVal; clusterNum++) {
            let clusterCount = clusters.filter(cluster => cluster === clusterNum).length;
            let inputFields = Array.from({ length: clusterCount }, (_, index) => `<input type="text" id="input_${clusterNum}_${index + 1}" ${clusterNum !== 1 ? 'disabled' : ''}>`);
            let sse = `<div style="margin: 1px 0;display: flex;align-items: baseline;">SSE = <span class="calculation-sse" id="sse${clusterNum}">${inputFields.join(' + ')}</span></div>`;
            inputTags.push(sse);

        }

    }
    return inputTags.join('<br>');
}
let sseAlertCounter = 0;
function updateSSEInputs() {

    if (compareAndHighlightInputTags(newClusterData)) {
        return
    }
    else {
        sseAlertCounter++;
        if (kVal > 1) {
            if (sseAlertCounter < kVal + 1) {
                alert1('success', '', 'Correct values, put the next sse equation values.');

            }
            else {
                alert1('success', '', 'Correct values, Click on the <b style="color:#FF6600">NEXT</b> button.');


                sseAlertCounter = 0;
            }
        }
        else {
            alert1('success', '', 'Correct values, Click on the <b style="color:#FF6600">NEXT</b> button.');

            sseAlertCounter = 0;
        }
    }
    const sseElement = document.getElementById(`sse${countSSE}`);
    removeHighlight();
    highlightCells(newClusterData);
    if (kVal > 1) {
        if (sseElement) {
            const inputTags = sseElement.querySelectorAll('input[type="text"]');
            const sumElement = document.createElement('span');
            sumElement.setAttribute('id', `SSE_ID_${countSSE}`);
            const values = Array.from(inputTags).map(input => parseFloat(input.value) || 0);

            const sum = values.reduce((total, value) => total + value, 0);

            // Display the sum value
            sumElement.textContent = ` ${roundToTwoDecimalPlaces(sum)}`;
            sseElement.innerHTML = '';
            sseElement.appendChild(sumElement);

            countSSE++;

            const nextSSEElement = document.getElementById(`sse${countSSE}`);
            if (nextSSEElement) {
                const nextInputTags = nextSSEElement.querySelectorAll('input[type="text"]');
                nextInputTags.forEach(input => input.removeAttribute('disabled'));
            }
            else {
                const nextSSEElement = document.getElementById(`totalSSE`);

                const nextInputTags = nextSSEElement.querySelectorAll('input[type="number"]');
                nextInputTags.forEach(input => input.removeAttribute('disabled'));
            }
        } else {
            const sseElement = document.getElementById(`totalSSE`);
            const inputTags = sseElement.querySelectorAll('input[type="number"]');
            const sumElement = document.createElement('span');
            const values = Array.from(inputTags).map(input => parseFloat(input.value) || 0); // Convert input values to numbers

            const sum = values.reduce((total, value) => total + value, 0);

            // Display the sum value
            sumElement.textContent = ` ${roundToTwoDecimalPlaces(sum)}`;
            sseArray.push([kVal, roundToTwoDecimalPlaces(sum)])
            console.log(sseArray);
            sseElement.innerHTML = '';
            sseElement.appendChild(sumElement);

            document.getElementById("submit_button").disabled = true;
            document.getElementById("next-elbow-button").disabled = false;
            countSSE = 1;
        }
    }
    else {
        if (sseElement) {
            const inputTags = sseElement.querySelectorAll('input[type="text"]');
            const sumElement = document.createElement('span');
            sumElement.setAttribute('id', `SSE_ID_${countSSE}`);
            const values = Array.from(inputTags).map(input => parseFloat(input.value) || 0);

            const sum = values.reduce((total, value) => total + value, 0);

            // Display the sum value
            sumElement.textContent = ` ${roundToTwoDecimalPlaces(sum)}`;
            sseElement.innerHTML = '';
            sseElement.appendChild(sumElement);

            // Display the sum value
            sumElement.textContent = ` ${roundToTwoDecimalPlaces(sum)}`;
            sseArray.push([kVal, roundToTwoDecimalPlaces(sum)])
            console.log(sseArray);
            sseElement.innerHTML = '';
            sseElement.appendChild(sumElement);

            document.getElementById("submit_button").disabled = true;
            document.getElementById("next-elbow-button").disabled = false;
            countSSE = 1;


        }
    }
}

let countSSE = 1;

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit_button');
    submitButton.addEventListener('click', updateSSEInputs);

    const initialSSEElement = document.getElementById('sse1');
    if (initialSSEElement) {
        const initialInputTags = initialSSEElement.querySelectorAll('input[type="text"]');
        initialInputTags.forEach(input => input.removeAttribute('disabled'));
    }
});

document.getElementById("submit_button").style.display = "none";


let countSSEHighLight = 1;
function highlightCells(clusterArray) {

    let table = document.getElementById("data-table-compute");
    let dataRows = table.getElementsByTagName("thead")[0].rows;

    for (let i = 0; i < clusterArray.length; i++) {
        let clusterValue = clusterArray[i];
        if (clusterValue == countSSEHighLight) {
            let columnIndex = 2 + clusterValue; // Start from column index 4 since there are 2 fixed columns before distance sub-columns

            // Debugging logs
            console.log("Cluster Value:", clusterValue);
            console.log("Column Index:", columnIndex);

            let dataCell = dataRows[i + 2].cells[columnIndex];
            dataCell.style.backgroundColor = "#FF6600";
            dataCell.style.color = "black";
        }
        else {

        }

    }
    countSSEHighLight++;
}




function removeHighlight() {
    let table = document.getElementById("data-table-compute");
    let dataRows = table.getElementsByTagName("thead")[0].rows;

    for (let i = 2; i < dataRows.length; i++) { // Start from index 2 to skip the fixed rows
        let dataCells = dataRows[i].cells;
        for (let j = 2; j < dataCells.length; j++) { // Start from index 2 to skip the fixed columns
            dataCells[j].style.backgroundColor = ""; // Reset the background color
        }
    }
}






let countSSEHighLightInputTag = 1;


function compareAndHighlightInputTags(clusterArray) {

    let myCounter = 1;
    let StopCount = 0;
    console.log("countSSEHighLight", countSSEHighLightInputTag)
    let table = document.getElementById("data-table-compute");
    let dataRows = table.getElementsByTagName("thead")[0].rows;
    if (kVal > 1) {
        for (let i = 0; i < clusterArray.length; i++) {
            let clusterValue = clusterArray[i];
            if (clusterValue == countSSEHighLightInputTag) {
                let columnIndex = 2 + clusterValue;

                // Debugging logs
                console.log("Cluster Value:", clusterValue);
                console.log("Column Index:", columnIndex);

                let dataCell = dataRows[i + 2].cells[columnIndex];
                // dataCell.style.backgroundColor = "yellow";
                let cellValue = parseFloat(dataCell.innerText);


                let inputTag = document.getElementById(`input_${clusterValue}_${myCounter}`);

                myCounter++;
                if (inputTag) {
                    // Get the input tag value for the current cluster
                    let inputTagValue = parseFloat(inputTag.value);
                    console.log(inputTag, inputTagValue)


                    // Get the actual SSE value from the corresponding SSE input tag

                    // Compare the input tag value with the actual SSE value

                    if (inputTagValue !== cellValue) {
                        if (inputTagValue === "") {
                            inputTag.style.border = "2px solid red";
                            console.log("i am highlighting red");
                            StopCount++;
                            alert1('error', 'Missing Values!', '');

                            return true;
                        } else {
                            inputTag.style.border = "2px solid red";
                            console.log("i am highlighting red");
                            StopCount++;
                            alert1('error', 'Incorrect Value!', '');

                            return true;

                        }
                    }
                    else {
                        inputTag.style.border = "1px solid #e0e0e0";
                        console.log("i am highlighting green");


                    }
                    console.log("i am runing");
                    console.log("cell value", cellValue);
                    console.log("input tag value", inputTagValue);
                }
                else {

                    for (let i = 0; i < clusterArray.length; i++) {
                        let clusterValue = clusterArray[i];
                        if (clusterValue == countSSEHighLightInputTag) {
                            let columnIndex = 2 + clusterValue;

                            // Debugging logs
                            console.log("Cluster Value:", clusterValue);
                            console.log("Column Index:", columnIndex);

                            let dataCell = dataRows[i + 2].cells[columnIndex];
                            // dataCell.style.backgroundColor = "yellow";
                            let cellValue = parseFloat(dataCell.innerText);


                            let inputTag = document.getElementById(`input_${clusterValue}_${myCounter}`);

                            myCounter++;
                            if (inputTag) {
                                // Get the input tag value for the current cluster
                                let inputTagValue = parseFloat(inputTag.value);
                                console.log(inputTag, inputTagValue)


                                // Get the actual SSE value from the corresponding SSE input tag

                                // Compare the input tag value with the actual SSE value

                                if (inputTagValue !== cellValue) {
                                    if (inputTagValue === "") {
                                        inputTag.style.border = "2px solid red";
                                        console.log("i am highlighting red");
                                        StopCount++;
                                        alert1('error', 'Missing Values!', '');


                                        return true;
                                    } else {
                                        inputTag.style.border = "2px solid red";
                                        console.log("i am highlighting red");
                                        StopCount++;
                                        alert1('error', 'Incorrect Value!', '');

                                        return true;

                                    }
                                }
                                else {
                                    inputTag.style.border = "1px solid #e0e0e0";
                                    console.log("i am highlighting green");


                                }
                                console.log("i am runing");
                                console.log("cell value", cellValue);
                                console.log("input tag value", inputTagValue);
                            }
                            else {

                            }
                        }


                    }
                    countSSEHighLightInputTag++;
                    if (kVal + 1 < countSSEHighLightInputTag) {
                        countSSEHighLightInputTag = 1;

                        console.log("totle sse highlight tag run".countSSEHighLightInputTag)

                    }

                }
            }


        }
        countSSEHighLightInputTag++;
        if (kVal + 1 < countSSEHighLightInputTag) {
            for (let index = 0; index < kVal; index++) {
                let actualSSE = document.getElementById(`tsse${index + 1}`).value
                // let tSSE = parseFloat(document.getElementById(`tsse${index + 1}`).innerText);
                let tSSE = document.getElementById(`SSE_ID_${index + 1}`).innerText;
                let inputTag = document.getElementById(`tsse${index + 1}`);
                if (actualSSE !== tSSE) {

                    if (actualSSE === "") {
                        inputTag.style.border = "2px solid red";
                        console.log("i am highlighting red");
                        StopCount++;
                        alert1('error', 'Missing Values!', '');

                        return true;
                    } else {
                        inputTag.style.border = "2px solid red";
                        console.log("i am highlighting red");
                        StopCount++;
                        alert1('error', 'Incorrect Value!', '');

                        return true;

                    }
                }
                else {
                    inputTag.style.border = "1px solid #e0e0e0";
                    console.log("i am highlighting green");


                }

            }
            countSSEHighLightInputTag = 1;
            console.log("totle sse highlight tag run".countSSEHighLightInputTag)

        }
    }
    else { }
}


// let inputElements = [];
// let expectedValues = [];

let maintainCounter = 0;
let checkCounter = 0;

let sseArray = []


function SSEnextButton() {
    calculateSSE();
    document.getElementById("new-centroid-button").style.display = "none";
    document.getElementById("submit_button").style.display = "block";
    document.getElementById("submit_button").disabled = false;
    document.getElementById("next-elbow-button").disabled = true;

    document.getElementById("next-elbow-button").style.display = "block";
    document.getElementById("SSE_next").style.display = "none";
    disablehighlightKCellIfClusterIsMatch()
    document.getElementById("calculation_formula_header").innerText = "CALCULATION";

    alert1('info', 'Find Intra-cluster similarity', 'Click on the <b style="color:#FF6600">COHESION</b> button.');

}

const submitButton = document.getElementById('SSE_next');
submitButton.addEventListener('click', myfun);








































document
    .getElementById("next-elbow-button")
    .addEventListener("click", async function computeIsOn() {


        if (kVal === 4) {

            Swal.fire({
                icon: "info",
                title: `Select any ${kVal + 1} centroids`,
                // text: 'Duplicate values are not allowed!.',
                customClass: {
                    container: "swal-container",
                    popup: "swal-popup",
                    title: "swal-title",
                    content: "swal-content",
                },
                target: myContainer,
                didOpen: () => {
                    const container = document.querySelector(".swal-container");
                    const containerWidth = myContainer.offsetWidth;
                    const containerHeight = myContainer.offsetHeight;

                    // Change font size based on container size
                    if (containerWidth >= 1000 && containerHeight >= 672) {
                        container.style.fontSize = "24px";
                    } else {
                        container.style.fontSize = "16px";
                    }

                    // Adjust dimensions and position of the Swal container
                    container.style.position = "absolute";
                    container.style.width = "100%";
                    container.style.height = "100%";
                    container.style.top = "0";
                    container.style.left = "0";
                    container.style.padding = "0";

                },
                showCloseButton: false, // Disable the close button
                allowOutsideClick: false, // Prevent closing by clicking outside the modal
                allowEscapeKey: false,
            });
            document.getElementById("training-left-side-container-1-elbow").style.display = "none";
            document.getElementById("training-left-side-container-2-elbow").style.display = "block";

            countSSEHighLight = 1;
            countK = 0;
            DisablehighlightKCell(kVal + 3);
            if (iterationCountForElbow > 1) {
                DisablehighlightKCellNew();
            }

            iterationCountForElbow = 0;

            const table = document.getElementById("data-table-compute");

            // Clear distances in each row
            for (let i = 1; i < table.rows.length; i++) {
                for (let j = 3; j < table.rows[i].cells.length - 1; j++) {
                    table.rows[i].cells[j].innerHTML = '';
                }
            }

            // Clear cluster column
            for (let i = 1; i < table.rows.length; i++) {
                table.rows[i].cells[table.rows[i].cells.length - 1].innerHTML = '';
            }

            // Clear previous content in the calculation container
            const calculationContainer = document.getElementById("calculation");
            calculationContainer.innerHTML = '';

            // You can add additional code here to reset other necessary state variables or UI elements, if needed.4

            kVal++;
            // centroids = [];
            let kNum = document.getElementById("kshow");
            kNum.innerHTML = `for k = ${kVal}`;
            resetCentroidSection();

            updateDistanceColumn(kVal);
            enableCendroidSubmitButton();
            disableDistanceButtonData();
            disableClusterButtonData();
            disableElbowNextButton();

            document.getElementById("cendroid-control").style.display = "block";


            document.getElementById("submit_button").style.display = "none";
            document.getElementById("new-centroid-button").style.display = "block";
            document.getElementById("calculation_formula_header").innerText = "FORMULA";

            centroids = ['1', '2', '3', '4', '5'];

            // submitCendroid();
            highlightRows(centroids);
            console.log(kVal === centroids.length);
            console.log(centroids.length);
            firstcentroidsIndex = centroids;
            if (kVal === centroids.length) {
                // promptToChangeCentroids();
            }
            let centroidVal = []; // Define centroidVal array
            for (let index = 0; index < centroids.length; index++) {
                centroidVal.push(data[Number(centroids[index])]);
            }
            centroids = centroidVal;




            DisableCendroidSubmitButton();

            // calcomputer();
            showCentroids(centroids);



            // disableCendroidResetButtons();
            enableDistanceButtonData();
            // enableClusterButtonData();

            document.getElementById("training-left-side-container-1-elbow").style.display = "none";
            document.getElementById("cendroid-control").style.display = "none";
            document.getElementById("training-left-side-container-2-elbow").style.display = "block";
            showOldCentroids(centroids);

            alert1('info', 'Find Euclidean Distance', 'To calculate the Euclidean distance between the data point and each cluster centroid.<br>Click on the <b style="color:#FF6600">DISTANCE</b> button.');



        }

        else if (kVal === 5) {


            sseArray.push([5, 0])
            document.getElementById('tab-3').style.cursor = "pointer";
            // document.getElementById('calImg').style.cursor = "pointer";
            document.getElementById('ana').style.cursor = "pointer";

            disableElbowNextButton();


        }
        else {
            reset();

        }

    });


function analyseSectionClick() {

    document.getElementById("analyseSection").style.display = "block";
    tabChangeIntoAnalysis();
    DisplayAnalysis();

    NoneCentroidAll();

    createTable()


    NoneDataSetAll();
    NoneTableSection();
    NoneGraphSection();
    //DisplayAnalysis();
    document.getElementById("trainingSection").style.display = "none";
    alert1('info', 'Plot Silhouette Score against K', 'After calculating overall Silhouette Score for each value of K,<br> create a plot by clicking on <b style="color:#FF6600">PLOT</b> button.<br> Where, K is on the x-axis, and Silhouette Score is on the y-axis.')
}




// <------------------------------------s development-------------------------------------------------->



let a_cal = document.getElementById('a-cal');
let b_cal = document.getElementById('b-cal');
let s_cal = document.getElementById('s-cal');

b_cal.style.display = 'none';
s_cal.style.display = 'none';
document.getElementById("button-SEPARATION").disabled = true;

$('#button-COHESION').click(function () {

    b_cal.style.display = 'block';
    a_cal.style.display = 'none';
    document.getElementById("button-COHESION").disabled = true;
    document.getElementById("button-SEPARATION").disabled = false;

    const cohesionValues = calculateCohesion(data, newClusterData);
    console.log(cohesionValues, "cohesionValues")
    let table = document.getElementById("s-table-compute");

    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    for (var i = 1; i < data.length; i++) {
        var row = table.insertRow(i);
        var sCell = row.insertCell(0);
        var xCell = row.insertCell(1);
        var yCell = row.insertCell(2);
        var kCell = row.insertCell(3);
        var aCell = row.insertCell(4);

        sCell.innerHTML = `${i}`;
        xCell.innerHTML = data[i][0];
        yCell.innerHTML = data[i][1];
        kCell.innerHTML = newClusterData[i - 1];
        aCell.innerHTML = itisNan(cohesionValues[i - 1]);
        aCell.style.border = "2px red solid"

    }
    alert1('info', 'Find Inter-cluster dissimilarity', 'Click on the <b style="color:#FF6600">SEPARATION</b> button.');


})
$('#button-SEPARATION').click(async function () {

    s_cal.style.display = 'block';
    b_cal.style.display = 'none';
    document.getElementById("button-SEPARATION").disabled = true;
    document.getElementById("s-submit").disabled = false;
    const cohesionValues = calculateCohesion(data, newClusterData);
    const separationValues = calculateSeparation(data, newClusterData);
    console.log(separationValues, "separationValues")




    let table = document.getElementById("s-table-compute");

    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    for (var i = 1; i < data.length; i++) {
        var row = table.insertRow(i);
        var sCell = row.insertCell(0);
        var xCell = row.insertCell(1);
        var yCell = row.insertCell(2);
        var kCell = row.insertCell(3);
        var aCell = row.insertCell(4);
        var bCell = row.insertCell(5);

        sCell.innerHTML = `${i}`;
        xCell.innerHTML = data[i][0];
        yCell.innerHTML = data[i][1];
        kCell.innerHTML = newClusterData[i - 1];
        aCell.innerHTML = itisNan(cohesionValues[i - 1]);
        bCell.innerHTML = itisNan(separationValues[i - 1]);
        bCell.style.border = "2px red solid"

    }
    await delay(500);

    for (var i = 1; i < data.length; i++) {
        var row = table.rows[i];

        var bCell = row.cells[5]

        bCell.innerHTML = separationValues[i - 1];
        bCell.style.border = ""

    }






    let row1 = table.rows[1];
    let cell1 = row1.cells[4];
    let cell2 = row1.cells[5];
    cell1.style.border = "solid red 2px";
    cell2.style.border = "solid red 2px";

    alert1('info', '', 'Input the highlighted value from the table into the silhouette equation.<br>Then, click on <b style="color:#FF6600">SUBMIT</b> button.');


})

function itisNan(value) {
    if (!isNaN(value)) {
        return value
    }
    else {
        return "Infinity";
    }
}

function noneElbowSection() {
    $('#elbow-compute').hide();
}
function blockElbowSection() {
    $('#elbow-compute').show();
}
noneSilhotteSection()
function noneSilhotteSection() {
    $('#s-compute').hide();
}
function blockSilhotteSection() {
    $('#s-compute').show();
}

function myfun() {
    noneElbowSection();
    blockSilhotteSection()
    silhotteUpdateTable()
    analysisContainer();
    document.getElementById("button-COHESION").disabled = false;
    s_cal.style.display = 'none';
    a_cal.style.display = 'block';
    alert1('info', 'Find Intra-cluster similarity', 'Click on the <b style="color:#FF6600">COHESION</b> button.');


}

function silhotteUpdateTable() {
    let table = document.getElementById("s-table-compute");

    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    for (var i = 1; i < data.length; i++) {
        var row = table.insertRow(i);
        var sCell = row.insertCell(0);
        var xCell = row.insertCell(1);
        var yCell = row.insertCell(2);
        var kCell = row.insertCell(3);

        sCell.innerHTML = `${i}`;
        xCell.innerHTML = data[i][0];
        yCell.innerHTML = data[i][1];
        kCell.innerHTML = newClusterData[i - 1];


    }
}



function euclideanDistance(point1, point2) {
    // Calculate the Euclidean distance between two points
    const squaredDistances = point1.map((coord, i) => (coord - point2[i]) ** 2);
    const sumSquaredDistances = squaredDistances.reduce((acc, val) => acc + val, 0);
    return Math.sqrt(sumSquaredDistances);
}

function calculateCohesion(data, clusterAssignments) {
    const cohesionValues = [];

    data = data.slice(1);
    // Calculate cohesion for each data point based on cluster assignments
    for (let i = 0; i < data.length; i++) {
        const currentDataPoint = data[i];
        const currentClusterIndex = clusterAssignments[i];

        // Find other data points in the same cluster
        const clusterData = data.filter((_, j) => clusterAssignments[j] === currentClusterIndex);
        console.log(clusterData)
        let totalCohesion = 0;

        for (let j = 0; j < clusterData.length; j++) {
            if (i !== j) {
                const distance = euclideanDistance(currentDataPoint, clusterData[j]);
                totalCohesion += parseFloat(distance);
            }
        }

        // Normalize cohesion by dividing by the number of pairwise distances
        const cohesion = parseFloat(totalCohesion) / parseFloat(clusterData.length - 1); // Subtract 1 to exclude the data point itself
        cohesionValues.push(parseFloat(cohesion.toFixed(2)));
    }

    return cohesionValues;
}








function calculateSeparation(data, clusterAssignments) {
    const separationValues = [];
    data = data.slice(1);
    // Calculate separation for each data point based on cluster assignments
    for (let i = 0; i < data.length; i++) {
        const currentDataPoint = data[i];
        const currentClusterIndex = clusterAssignments[i];

        // Find other data points in different clusters
        const otherClusterData = data.filter((_, j) => clusterAssignments[j] !== currentClusterIndex);

        console.log(otherClusterData)
        let totalDistanceToOtherClusters = 0;
        let countOtherClusters = 0;

        for (let j = 0; j < otherClusterData.length; j++) {
            const distanceToOtherCluster = euclideanDistance(currentDataPoint, otherClusterData[j]);
            totalDistanceToOtherClusters += parseFloat(distanceToOtherCluster);
            countOtherClusters++;
        }

        // Calculate b(i) as the average distance to data points in other clusters
        const separation = parseFloat(totalDistanceToOtherClusters) / parseFloat(countOtherClusters);

        separationValues.push(parseFloat(separation.toFixed(2)));
    }

    return separationValues;
}







function calculateSilhouette(cohesionValues, separationValues) {
    const silhouetteValues = [];

    for (let i = 0; i < cohesionValues.length; i++) {
        const cohesion = cohesionValues[i];
        const separation = separationValues[i];

        // Calculate silhouette coefficient for each data point
        const silhouette = (separation - cohesion) / Math.max(separation, cohesion);
        silhouetteValues.push(silhouette.toFixed(2));
    }

    return silhouetteValues;
}

// const silhouetteValues = calculateSilhouette(cohesionValues, separationValues);





function drawChartAnalysis() {
    var numPoints = 5; // Number of data points
    var numClusters = kVal; // Number of clusters
    var minValue = 0; // Minimum value for random data
    var maxValue = 100; // Maximum value for random data
    var containerWidth = 400; // Width of the graph container
    var containerHeight = 400; // Height of the graph container



    // Generate random colors for each cluster
    var clusterColors = new Array(numClusters).fill().map(() => generateRandomColor());

    // Find the maximum range to create a square graph
    var maxRange = Math.max(maxValue - minValue, maxValue - minValue);

    // Create data table
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('number', 'X');
    dataTable.addColumn('number', 'Y');
    dataTable.addColumn({ type: 'string', role: 'style' });

    // Add data points and cluster values to the data table
    for (var i = 0; i < numPoints; i++) {
        var x = data[i + 1][0];
        var y = data[i + 1][1];
        var clusterIndex = newClusterData[i];
        var color = clusterColors[clusterIndex - 1];
        dataTable.addRow([x, y, 'point { size: 5; fill-color: ' + color + ' }']);
    }

    // Set chart options

    var options = {
        // title: 'Data Set',
        legend: { position: "none" },
        hAxis: {
            title: "X",
            minValue: 0,
        },
        vAxis: {
            title: "Y",
            minValue: 0,
        },
        // chartArea: { width: "80%", height: "80%" }, // Added to adjust the chart area size
    };

    // Create scatter plot chart
    var chart = new google.visualization.ScatterChart(document.getElementById('s-graph'));
    chart.draw(dataTable, options);

    // Create the legend
    var legend = document.getElementById('legend');
    legend.innerHTML = '';
    for (var i = 0; i < numClusters; i++) {
        console.log(i)
        var legendItem = document.createElement('div');
        legendItem.classList.add('legend-item');

        var legendColor = document.createElement('div');
        legendColor.classList.add('legend-color');
        legendColor.style.backgroundColor = clusterColors[i];
        legendItem.appendChild(legendColor);

        var legendLabel = document.createElement('div');
        legendLabel.classList.add('legend-label');
        legendLabel.textContent = 'Cluster ' + (i + 1);
        legendItem.appendChild(legendLabel);

        legend.appendChild(legendItem);

    }

}


function analysisContainer() {
    google.charts.load('current', { packages: ['corechart', 'table'] });
    google.charts.setOnLoadCallback(drawChartAnalysis);

}

let Scounter = 0;
document.getElementById('s-next').disabled = true;


function SilhouetteCalculation() {
    let errorCounter = 0

    let a_i = document.getElementById('a_i').value;
    let b_i = document.getElementById('b_i').value;
    let max_i = document.getElementById('max_a_b_i').value;
    let s = (parseFloat(document.getElementById('b_i').value) - parseFloat(document.getElementById('a_i').value)) / parseFloat(document.getElementById('max_a_b_i').value);


    const cohesionValues = calculateCohesion(data, newClusterData);
    const separationValues = calculateSeparation(data, newClusterData);

    if (cohesionValues[Scounter] != parseFloat(parseFloat(a_i).toFixed(2))) {
        if (a_i == '') {
            let a = document.getElementById('a_i');
            a.style.border = "2px solid red";
            alert1('error', '', 'Please enter required value in the highlighted input box.');



        }
        else if ((a_i == 'i' || a_i == 'I' || a_i == 'Infinity') && isNaN(cohesionValues[Scounter])) {

            errorCounter--;
            let a = document.getElementById('a_i');
            a.style.border = "1px solid #e0e0e0";
            // document.getElementById('a_i').value = Infinity;
            s = 0;

        }
        else {
            let a = document.getElementById('a_i');
            a.style.border = "2px solid red";
            alert1('error', '', 'Please enter correct value in the highlighted input box.');

        }
        errorCounter++;
        console.log('input a', parseFloat(parseFloat(a_i).toFixed(2)))
        console.log('array a', cohesionValues[Scounter])
    }
    else {
        let a = document.getElementById('a_i');
        a.style.border = "1px solid #e0e0e0";
    }
    if (separationValues[Scounter] != parseFloat(parseFloat(b_i).toFixed(2))) {
        if (b_i == '') {
            let a = document.getElementById('b_i');
            a.style.border = "2px solid red";
            alert1('error', '', 'Please enter correct value in the highlighted input box.');

        }
        else if ((b_i == 'i' || b_i == 'I' || b_i == 'Infinity') && isNaN(separationValues[Scounter])) {
            errorCounter--;
            let a = document.getElementById('b_i');
            a.style.border = "1px solid #e0e0e0";
            // document.getElementById('b_i').value = Infinity;
            s = 0;
        }
        else {
            let a = document.getElementById('b_i');
            a.style.border = "2px solid red";
            alert1('error', '', 'Please enter correct value in the highlighted input box.');

        }
        errorCounter++;
        console.log('input b', parseFloat(parseFloat(b_i).toFixed(2)))
        console.log('array b', separationValues[Scounter])
    }
    else {
        let a = document.getElementById('b_i');
        a.style.border = "1px solid #e0e0e0";

    }
    if (Math.max(cohesionValues[Scounter], separationValues[Scounter]) != parseFloat(parseFloat(max_i).toFixed(2))) {
        if (max_i == '') {
            let a = document.getElementById('max_a_b_i');
            a.style.border = "2px solid red";
            alert1('error', '', 'Please enter correct value in the highlighted input box.');

        }
        else if ((max_i == 'i' || max_i == 'I' || max_i == 'Infinity') && isNaN(Math.max(cohesionValues[Scounter], separationValues[Scounter]))) {
            errorCounter--;
            let a = document.getElementById('max_a_b_i');
            a.style.border = "1px solid #e0e0e0";
            // document.getElementById('max_a_b_i').value = Infinity;
            s = 0;
        }
        else {
            let a = document.getElementById('max_a_b_i');
            a.style.border = "2px solid red";
            alert1('error', '', 'Please enter correct value in the highlighted input box.');

        }
        errorCounter++;
        console.log('input max', parseFloat(parseFloat(max_i).toFixed(2)))
        console.log('array max', Math.max(cohesionValues[Scounter], separationValues[Scounter]))
    }
    else {
        let a = document.getElementById('max_a_b_i');
        a.style.border = "1px solid #e0e0e0";
    }

    if (errorCounter > 0) {
        errorCounter = 0;
        return;
    }
    Scounter++

    let table = document.getElementById("s-table-compute");

    let row = table.rows[Scounter];
    let nextRow = table.rows[Scounter + 1];


    let cell4 = row.insertCell(6); // Index 3 corresponds to the fourth column
    cell4.innerText = s.toFixed(2);

    document.getElementById('s_equal').innerText = `s(${Scounter + 1})`
    document.getElementById('b_i').placeholder = `b(${Scounter + 1})`
    document.getElementById('a_i').placeholder = `a(${Scounter + 1})`
    document.getElementById('max_a_b_i').placeholder = `max{a(${Scounter + 1}),b(${Scounter + 1})}`

    if (Scounter > 4) {
        document.getElementById('s_equal').innerText = `s(1)`
        document.getElementById('b_i').placeholder = `b(1)`
        document.getElementById('a_i').placeholder = `a(1)`
        document.getElementById('max_a_b_i').placeholder = `max{a(1),b(1)}`
    }
    if (Scounter < 6) {
        let cellpast1 = row.cells[4];
        let cellpast2 = row.cells[5];
        cellpast1.style.border = "";
        cellpast2.style.border = "";
        if (Scounter == 6) {
            alert1('info', '', 'Click on the <b style="color:#FF6600">NEXT</b> button.');

        }
    }


    if (Scounter < 5) {
        let cell1 = nextRow.cells[4];
        let cell2 = nextRow.cells[5];
        cell1.style.border = "solid red 2px";
        cell2.style.border = "solid red 2px";

        alert1('info', '', 'Input the highlighted value from the table into the silhouette equation.<br>Then, click on <b style="color:#FF6600">SUBMIT</b> button.');



    }


    document.getElementById('a_i').value = '';
    document.getElementById('b_i').value = '';
    document.getElementById('max_a_b_i').value = '';

    if (Scounter == 5) {
        document.getElementById('s-submit').disabled = true;
        document.getElementById('s-avg-next').disabled = false;
        document.getElementById('s-next').disabled = true;
        Scounter = 0;
        $('#s-cal').hide();
        $('#s-avg-cal').show();
        highlightCells();
        $("#extra1").show()
        $("#extra2").show()
        document.getElementById('s-avg-next').disabled = true;
        alert1('info', '', 'Input the highlighted value from the table into the silhouette equation.<br>Then, click on <b style="color:#FF6600">SUBMIT</b> button.');


    }

}
$('#s-submit').click(function () {
    SilhouetteCalculation()
    document.getElementById('s-avg-submit').disabled = false;

})

document.getElementById('s-avg-next').disabled = true;




document
    .getElementById("s-next")
    .addEventListener("click", async function computeIsOn() {


        document.getElementById('eq-form').style.left = "77px";
        document.getElementById('sAvg').style.left = "10px";

        $('#s-avg-cal').hide();
        document.getElementById('SSE_next').disabled = true;
        document.getElementById('eq-form').innerHTML = ` <div class="input-container-s-avg" id="avg-s-coff">
        <input type="number" class="s-input" id="s-avg-1">+
        <input type="number" class="s-input" id="s-avg-2">+
        <input type="number" class="s-input" id="s-avg-3">+
        <input type="number" class="s-input" id="s-avg-4">+
        <input type="number" class="s-input" id="s-avg-5">

    </div>
    <hr id="extra2">
    <span id="extra1">5</span>`;

        if (kVal === 4) {
            blockElbowSection();
            noneSilhotteSection();
            Swal.fire({
                icon: "info",
                title: `Select any ${kVal + 1} centroids`,
                // text: 'Duplicate values are not allowed!.',
                customClass: {
                    container: "swal-container",
                    popup: "swal-popup",
                    title: "swal-title",
                    content: "swal-content",
                },
                target: myContainer,
                didOpen: () => {
                    const container = document.querySelector(".swal-container");
                    const containerWidth = myContainer.offsetWidth;
                    const containerHeight = myContainer.offsetHeight;

                    // Change font size based on container size
                    if (containerWidth >= 1000 && containerHeight >= 672) {
                        container.style.fontSize = "24px";
                    } else {
                        container.style.fontSize = "16px";
                    }

                    // Adjust dimensions and position of the Swal container
                    container.style.position = "absolute";
                    container.style.width = "100%";
                    container.style.height = "100%";
                    container.style.top = "0";
                    container.style.left = "0";
                    container.style.padding = "0";

                },
                showCloseButton: false, // Disable the close button
                allowOutsideClick: false, // Prevent closing by clicking outside the modal
                allowEscapeKey: false,
            });
            document.getElementById("training-left-side-container-1-elbow").style.display = "none";
            document.getElementById("training-left-side-container-2-elbow").style.display = "block";

            countSSEHighLight = 1;
            countK = 0;
            DisablehighlightKCell(kVal + 3);
            if (iterationCountForElbow > 1) {
                DisablehighlightKCellNew();
            }

            iterationCountForElbow = 0;

            const table = document.getElementById("data-table-compute");

            // Clear distances in each row
            for (let i = 1; i < table.rows.length; i++) {
                for (let j = 3; j < table.rows[i].cells.length - 1; j++) {
                    table.rows[i].cells[j].innerHTML = '';
                }
            }

            // Clear cluster column
            for (let i = 1; i < table.rows.length; i++) {
                table.rows[i].cells[table.rows[i].cells.length - 1].innerHTML = '';
            }

            // Clear previous content in the calculation container
            const calculationContainer = document.getElementById("calculation");
            calculationContainer.innerHTML = '';

            //change name
            let k = table.rows[0].cells.length - 2;

            if (table.rows[0].cells[k].innerHTML === 'Old Cluster') {

                table.rows[0].cells[k].innerHTML = 'Cluster'
            }

            // You can add additional code here to reset other necessary state variables or UI elements, if needed.4

            kVal++;
            // centroids = [];
            let kshow = document.getElementById("kshow");
            kshow.innerHTML = `for k = ${kVal}`;
            let kNum = document.getElementById("s_show");
            kNum.innerHTML = `for k = ${kVal}`;
            resetCentroidSection();

            updateDistanceColumn(kVal);
            enableCendroidSubmitButton();
            disableDistanceButtonData();
            disableClusterButtonData();
            disableElbowNextButton();

            document.getElementById("cendroid-control").style.display = "block";


            document.getElementById("submit_button").style.display = "none";
            document.getElementById("new-centroid-button").style.display = "block";
            document.getElementById("calculation_formula_header").innerText = "FORMULA";

            centroids = ['1', '2', '3', '4', '5'];

            // submitCendroid();
            highlightRows(centroids);
            console.log(kVal === centroids.length);
            console.log(centroids.length);
            firstcentroidsIndex = centroids;
            if (kVal === centroids.length) {
                // promptToChangeCentroids();
            }
            let centroidVal = []; // Define centroidVal array
            for (let index = 0; index < centroids.length; index++) {
                centroidVal.push(data[Number(centroids[index])]);
            }
            centroids = centroidVal;




            DisableCendroidSubmitButton();

            // calcomputer();
            showCentroids(centroids);



            // disableCendroidResetButtons();
            enableDistanceButtonData();
            // enableClusterButtonData();

            document.getElementById("training-left-side-container-1-elbow").style.display = "none";
            document.getElementById("cendroid-control").style.display = "none";
            document.getElementById("training-left-side-container-2-elbow").style.display = "block";
            showOldCentroids(centroids);

            alert1('info', 'Find Euclidean Distance', 'To calculate the Euclidean distance between the data point and each cluster centroid.<br>Click on the <b style="color:#FF6600">DISTANCE</b> button.');




        }

        else if (kVal === 5) {


            analyseSectionClick();
            disableElbowNextButton();


        }
        else {
            blockElbowSection();
            noneSilhotteSection();
            reset();

        }

    });


$("#s-avg-next").click(function () {



})
$('#s-avg-cal').hide();


$("#s-avg-submit").click(function () {
    updateSSEInputs();
})

let expectedValues = [];


function compareAndHighlightInputTags() {
    let precheck = 0;
    let postcheck = 0;
    const inputElements = [
        document.getElementById('s-avg-1'),
        document.getElementById('s-avg-2'),
        document.getElementById('s-avg-3'),
        document.getElementById('s-avg-4'),
        document.getElementById('s-avg-5')
    ];



    expectedValues = convertStringsToNumbers(expectedValues);
    console.log(expectedValues, "expectedValues");
    const valueCount = {};

    // Iterate through the input elements
    inputElements.forEach((input, index) => {
        precheck++;
        // const inputValue = input.value.trim();
        // console.log(typeof (inputValue))
        const inputValue = inputElements[index].value;
        let variable;
        if (inputValue === "") {

            variable = inputValue
        }
        else {

            variable = Number(inputValue)
        }

        // Check if the input value is in the expected values array
        if (expectedValues.includes(variable)) {
            // Remove the 'highlight' class if the input value is valid
            console.log("hello")
            // input.classList.remove('highlight');
            input.style.border = "solid #e0e0e0 1px"
            postcheck++;
        } else {
            // Highlight the input if the value is not in the expected values
            console.log("else")
            input.classList.add('highlight');
            postcheck--;
        }

        // Count the occurrences of each value
        if (valueCount[inputValue]) {
            valueCount[inputValue]++;
        } else {
            valueCount[inputValue] = 1;
        }
    });

    for (const value in valueCount) {
        if (valueCount[value] > expectedValues.filter(val => val === value).length) {
            const extraInputs = inputElements.filter(input => input.value.trim() === value);
            for (let i = expectedValues.filter(val => val === value).length; i < extraInputs.length; i++) {
                extraInputs[i].classList.add('highlight');
            }
        }
    }
    if (precheck == postcheck) {
        console.log(precheck, postcheck, 'mycheck');
        return true
    } else {
        console.log(precheck, postcheck, 'mycheck');
        alert1('error', '', 'Please enter the required value in highlighted input box.');

        return false

    }

}

function convertStringsToNumbers(arr) {
    return arr.map((element) => {
        if (typeof element === 'string') {
            return parseFloat(element); // Use parseFloat for decimal numbers
            // If you want to convert to integers, you can use parseInt
        } else {
            return element;
        }
    });
}
function highlightCells() {

    let table = document.getElementById("s-table-compute");

    for (let i = 1; i < data.length; i++) {
        let row = table.rows[i];

        let sCell = row.cells[6];

        sCell.style.border = ""

        sCell.style.backgroundColor = "#FF6600";
        sCell.style.color = "black";
        console.log(sCell.innerText);
        expectedValues.push(sCell.innerText);

    }

}
function removeHighlight() {

    let table = document.getElementById("s-table-compute");
    for (let i = 1; i < data.length; i++) {
        let row = table.rows[i];

        let sCell = row.cells[6];

        sCell.style.backgroundColor = "";
        sCell.style.color = "white";

    }

}


function updateSSEInputs() {

    if (!compareAndHighlightInputTags()) {
        return
    }
    document.getElementById('eq-form').style.left = "252px";
    document.getElementById('sAvg').style.left = "186px";
    document.getElementById('s-avg-submit').disabled = true;
    removeHighlight();
    const sseElement = document.getElementById(`avg-s-coff`);
    const inputTags = sseElement.querySelectorAll('input[type="number"]');
    const sumElement = document.createElement('span');
    const values = Array.from(inputTags).map(input => parseFloat(input.value) || 0); // Convert input values to numbers

    const sum = values.reduce((total, value) => total + value, 0);

    // Display the sum value
    sumElement.textContent = ` ${roundToTwoDecimalPlaces(sum / 5)}`;
    sseArray.push([kVal, roundToTwoDecimalPlaces(sum / 5)])
    console.log(sseArray, 'sse array');
    // console.log(sseArray);
    sseElement.innerHTML = '';
    sseElement.appendChild(sumElement);
    $("#extra1").hide()
    $("#extra2").hide()
    document.getElementById("s-avg-submit").disabled = true;
    document.getElementById("s-next").disabled = false;
    alert1('success', '', 'Now click on the <b style="color:#FF6600">NEXT</b> button.');



}

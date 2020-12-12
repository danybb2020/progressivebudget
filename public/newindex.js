// before everything, lets set some variables
var totalMonies = 0;

function pushToDB(transactionName, transactionAmt) {
    // push transaction to db
    fetch("api/transaction", {
        method: "POST",
        body: JSON.stringify({ name: transactionName, value: transactionAmt }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        console.log(response);
    });
}

function addMonies(transactionName, transactionAmt) {

    // update ledger
    totalMonies = totalMonies+transactionAmt;
    document.getElementById('total').innerHTML = totalMonies;
    
    // update table
    var newTableRow = document.createElement('tr');
    newTableRow.innerHTML = '<td class="add">' + transactionName + '</td><td>' + transactionAmt + '</td>';
    document.getElementById('tbody').appendChild(newTableRow);

    // update chart
    addChartData(transactionName, totalMonies);
}
function subtractMonies(transactionName, transactionAmt) {

    // update ledger
    totalMonies = totalMonies-transactionAmt;
    document.getElementById('total').innerHTML = totalMonies;
    
    // update table
    var newTableRow = document.createElement('tr');
    newTableRow.innerHTML = '<td class="sub">' + transactionName + '</td><td>-' + transactionAmt + '</td>';
    document.getElementById('tbody').appendChild(newTableRow);

    // update chart
    addChartData(transactionName, totalMonies);
}

// function for updating chart
function addChartData(label, newdata) {
    console.log(label,newdata);
    data.addRow([label, newdata]);
    myChart.draw(data);
}

// also init chart
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
var data;
var myChart = document.getElementById('myChart');
function drawChart() {
    data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('number', 'Amount');
    //data.addRow(['test',10]);

    // Set chart options
    var options = {
        'width':400,
        'height':300
    };

    // Instantiate and draw our chart, passing in some options.
    myChart = new google.visualization.ColumnChart(myChart);
    myChart.draw(data, options);

    // initial load of past transactions
    fetch("api/transaction")
    .then(response => response.json())
    .then(data => {
        // now we just loop through and add everyting up
        for (let i = 0; i < data.length; i++) {
            addMonies(data[i].name, data[i].value);
        }
    });

}


// when you click add, it prepends to the list
document.querySelector("#add-btn").onclick= function () {
    var transactionName = document.getElementById('t-name').value;
    var transactionAmt = parseInt( document.getElementById('t-amount').value );
    pushToDB(transactionName, transactionAmt);
    addMonies(transactionName, transactionAmt);
};
document.querySelector("#sub-btn").onclick = function () {
    var transactionName = document.getElementById('t-name').value;
    var transactionAmt = parseInt( document.getElementById('t-amount').value );
    pushToDB(transactionName, -transactionAmt);
    subtractMonies(transactionName, transactionAmt);
};


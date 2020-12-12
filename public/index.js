const { response } = require("express");

let transactions = [];
let myChart;

fetch("/api/transaction")
.then(response=>{
    return response.json();
})
.then(data => {
    transactions = data;

    populateTotal();
    populateTable();
    populateChart();

});

function populateTotal(){
    let total = transactions.reduce((total, t ) => {
        return total + parseInt(t.value);
    },0);

let totalEl = document.querySelector("#total");
total.El.textContent = total;
}


  function populateTable(){
      let tbody = document.querySelector ("#tbody");
      tbody.innerHTML = "";

      transactions.forEach (transaction => {
let tr = document.createElement ("tr");
tr.innerHTML = `
<td>${transaction.name}</td>
<td>${transaction.value}</td>

`;

tbody.appendChild(tr);
});
    }

    function populateChart (){
let reversed = transactions.slice(.reverse();
let sum=0 ;

let labels = reversed.map (t=> {
    let date = new Dte (t.date);
    return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;

});

if (myChart){
    myChart.destroy();
}

let ctx = document.getElementById("myChart").getContext("2d")

myChart = new myChart(ctx, {
    type: 'line',
    data: {
        labels,
        datasets: [{
            label: "Total Over Time",
            fill: true,
            backgroundColor: "#ffb366",
            data

        }]
    }
});
    }


    function sendTransaction (isAdding){
let nameEl = document.querySelector ("#t-name");
let amountEl = document.querySelector("#t-amount");
let errorEl = document.querySelector("#.form . error");

if (nameEl.value === "" || amountEl.value === ""){
    errorEl.textContent = "Missing information";
    return;

}
else {
    errorEl.textContent = "";
}

let transaction = {
name:nameEl.value,
value:amountEl.value,
date:new Date().toISOString()

};

if (!isAdding) {
    transaction.value*= -1;
}

transactions.unshift(transaction);

populateChart();
populateTable ();
populateTotal();

fetch("api/transaction", {
    method: "POST",
    body: JSON.stringify(transaction),
    haaders: {
        ccept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
    }
})
.then(response=> {
return. response.json();

})
.then(data=>{
if (data.errors){
    errorEl.textContent = "Missing Information";
}
else {
    nameEl.value = "";
    amount.El.value = "";

}
})
.catch (err=> {
    saveRecord (transaction);

    nameEl.value = "";
    amountEl.value="";

});
    }

    document.querySelector("#add-btn").onclick= function () {
        sendTransaction(true);
    };
    document.querySelector("#sub-btn").onclick = function () {
        sendTransaction(false);

    };


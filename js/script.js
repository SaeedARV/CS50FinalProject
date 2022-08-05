var arow = 3, brow = 3, acolumn = 3, bcolumn = 3;
var A = new Array(10), B = new Array(10), result = new Array(10);
for (var i = 0; i < 10; i++) {
    A[i] = new Array(10);
    B[i] = new Array(10);
    result[i] = new Array(10);
    for (var j = 0; j < 10; j++) {
        A[i][j] = 0;
        B[i][j] = 0;
        result[i][j] = 0;
    }
}

function makeTable(str, row, column) {
    document.getElementById(str).innerHTML = "";
    for (var i = 0; i < row; i++) {
        var x = document.getElementById(str).insertRow(i);
        for (var j = 0; j < column; j++) {
            var y = x.insertCell(j);
            if (str === "atable") {
                y.innerHTML = '<input type="text" value=' + A[i][j] + ' class="largeCell" onblur="updateCells(' + "'atable', " + i + ', ' + j + ' )">';
            }
            else if (str === "btable") {
                y.innerHTML = '<input type="text" value=' + B[i][j] + ' class="largeCell" onblur="updateCells(' + "'btable', " + i + ', ' + j + ' )">';
            }
            else {
                y.innerHTML = '<input type="text" value=' + result[i][j] + ' class="largeCell" readonly="readonly">';
            }
        }
    }
}

function updateRowColumn(str) {
    if (str === "arow") {
        arow = document.getElementById('arow').value;
        makeTable('atable', arow, acolumn);
    }
    else if (str === "acolumn") {
        acolumn = document.getElementById('acolumn').value;
        makeTable('atable', arow, acolumn);
    }
    else if (str === "brow") {
        brow = document.getElementById('brow').value;
        makeTable('btable', brow, bcolumn);
    }
    else {
        bcolumn = document.getElementById('bcolumn').value;
        makeTable('btable', brow, bcolumn);
    }
}

function updateCells(str, i, j) {
    if(str === "atable"){
        A[i][j] = eval(document.getElementById('atable').rows[i].cells[j].children[0].value);
    }
    else {
        B[i][j] = eval(document.getElementById('btable').rows[i].cells[j].children[0].value);
    }
}

function fillRandom(str) {
    if (str === "atable") {
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                A[i][j] = Math.floor(Math.random() * 11);
            }
        }
        makeTable('atable', arow, acolumn);
    }
    else {
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                B[i][j] = Math.floor(Math.random() * 11);
            }
        }
        makeTable('btable', brow, bcolumn);
    }
}

function clearTable(str) {
    if (str === "atable") {
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                A[i][j] = 0;
            }
        }
        makeTable('atable', arow, acolumn);
    }
    else {
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                B[i][j] = 0;
            }
        }
        makeTable('btable', brow, bcolumn);
    }
}

function invalidOp(code) {
    document.getElementById('rtable').innerHTML = "";
    document.getElementById('op').innerHTML = "";
    if (code === 0) {
        document.getElementById('invalidOp').innerText = "The number of columns in the matrix A must be equal to the number of rows in the matrix B."
    }
    else if (code == 1) {
        document.getElementById('invalidOp').innerText = "Size of matrix A must be equal to the size of matrix B."
    }
}

function multiplication() {

    if (acolumn != brow) {
        invalidOp(0);
        return;
    }

    document.getElementById('invalidOp').innerHTML = "";
    document.getElementById('op').innerHTML = "A * B =";

    for (var i = 0; i < arow; i++) {
        for (var j = 0; j < bcolumn; j++) {
            result[i][j] = 0;
            for (var t = 0; t < brow; t++) {
                result[i][j] += (A[i][t]) * (B[t][j]);
            }
        }
    }
    makeTable('rtable', arow, bcolumn);
}

function addition() {
    if (arow != brow || acolumn != bcolumn) {
        invalidOp(1);
        return;
    }

    document.getElementById('invalidOp').innerHTML = "";
    document.getElementById('op').innerHTML = "A + B =";

    for (var i = 0; i < arow; i++) {
        for (var j = 0; j < acolumn; j++) {
            result[i][j] = A[i][j] + B[i][j];
        }
    }
    makeTable('rtable', arow, bcolumn);
}

function subtraction() {
    if (arow != brow || acolumn != bcolumn) {
        invalidOp(1);
        return;
    }

    document.getElementById('invalidOp').innerHTML = "";
    document.getElementById('op').innerHTML = "A - B =";

    for (var i = 0; i < arow; i++) {
        for (var j = 0; j < acolumn; j++) {
            result[i][j] = A[i][j] - B[i][j];
        }
    }
    makeTable('rtable', arow, bcolumn);
}
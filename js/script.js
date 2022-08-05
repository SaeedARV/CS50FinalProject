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
    for (var r = 0; r < row; r++) {
        var x = document.getElementById(str).insertRow(r);
        for (var c = 0; c < column; c++) {
            var y = x.insertCell(c);
            if (str === "atable") {
                y.innerHTML = '<input type="text" value=' + A[r][c] + ' class="fourChar">';
            }
            else if (str === "btable") {
                y.innerHTML = '<input type="text" value=' + B[r][c] + ' class="fourChar">';
            }
            else {
                y.innerHTML = '<input type="text" value=' + result[r][c] + ' class="fourChar">';
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

function fillRandom(str) {
    if (str === "atable") {
        for (var r = 0; r < 10; r++) {
            for (var c = 0; c < 10; c++) {
                A[r][c] = Math.floor(Math.random() * 11);
            }
        }
        makeTable('atable', arow, acolumn);
    }
    else {
        for (var r = 0; r < 10; r++) {
            for (var c = 0; c < 10; c++) {
                B[r][c] = Math.floor(Math.random() * 11);
            }
        }
        makeTable('btable', brow, bcolumn);
    }
}

function clearTable(str) {
    if (str === "atable") {
        for (var r = 0; r < 10; r++) {
            for (var c = 0; c < 10; c++) {
                A[r][c] = 0;
            }
        }
        makeTable('atable', arow, acolumn);
    }
    else {
        for (var r = 0; r < 10; r++) {
            for (var c = 0; c < 10; c++) {
                B[r][c] = 0;
            }
        }
        makeTable('btable', brow, bcolumn);
    }
}

function invalidOp(code){
    document.getElementById('rtable').innerHTML = "";
    if(code === 0){
        document.getElementById('invalidOp').innerText = "The number of columns in the matrix A must be equal to the number of rows in the matrix B."
    }
}

function multiplication(){

    if(acolumn != brow){
        invalidOp(0);
        return;
    }

    document.getElementById('invalidOp').innerHTML = "";

    for(var i = 0; i < arow; i++){
        for(var j = 0; j < bcolumn; j++){
            result[i][j] = 0;
            for(var t = 0; t < brow; t++){
                result[i][j] += (A[i][t])*(B[t][j]);
                console.log(result[0][0]);
            }
        }
    }
    makeTable('rtable', arow, bcolumn);
}
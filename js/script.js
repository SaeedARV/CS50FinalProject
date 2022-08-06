var arow = 3, brow = 3, acolumn = 3, bcolumn = 3;
var A = new Array(10), B = new Array(10), result = new Array(10), inverseC = new Array(10);
for (var i = 0; i < 10; i++) {
    A[i] = new Array(10);
    B[i] = new Array(10);
    result[i] = new Array(10);
    inverseC[i] = new Array(10);
    for (var j = 0; j < 10; j++) {
        A[i][j] = 0;
        B[i][j] = 0;
        result[i][j] = 0;
        inverseC[i][j] = 0;
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

// update the number of rows and columns
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

// update the number in cells
function updateCells(str, i, j) {
    if (str === "atable") {
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

// fill cells with 0
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

// prvar errors
function invalidOp(code) {
    document.getElementById('rtable').innerHTML = "";
    document.getElementById('op').innerHTML = "";
    if (code === 0) {
        document.getElementById('invalidOp').innerText = "The number of columns in the matrix A must be equal to the number of rows in the matrix B."
    }
    else if (code == 1) {
        document.getElementById('invalidOp').innerText = "Size of matrix A must be equal to the size of matrix B."
    }
    else if (code == 2) {
        document.getElementById('invalidOp').innerText = "B must be a Square matrix, and the number of columns in the matrix A must be equal to the number of rows in the matrix B."
    }
    else if (code == 3) {
        document.getElementById('invalidOp').innerText = "Determinant of the matrix must not be 0."
    }
    else if (code == 4) {
        document.getElementById('invalidOp').innerText = "The matrix must be Square."
    }
}

// result = A * B
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

// result = A + B
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

// result = A - B
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

// temp = cofactor C
function cofactor(C, temp, p, q, n) {

    var k = 0, t = 0;

    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            if (i != p && j != q) {
                temp[k][t++] = C[i][j];

                if (t == n - 1) t = 0, k++;
            }
        }
    }
}

// return determinant of C
function determinant(C, n) {
    var det = 0;
    if (n == 0) return 1;
    else if (n == 1) return C[0][0];

    var temp = new Array(10);
    for (var i = 0; i < 10; i++) {
        temp[i] = new Array(10);
    }

    var sign = 1;

    for (var j = 0; j < n; j++) {
        cofactor(C, temp, 0, j, n);
        det += sign * C[0][j] * determinant(temp, n - 1);
        sign = -sign;
    }
    return det;
}

// adjC = adjoint of C
function adjoint(adjC, C, p, q) {

    var sign = 1;
    var temp = new Array(10);
    for (var i = 0; i < 10; i++) {
        temp[i] = new Array(10);
    }

    for (var i = 0; i < p; i++) {
        for (var j = 0; j < q; j++) {
            cofactor(C, temp, i, j, p);
            if ((i + j) % 2 == 0) sign = 1;
            else sign = -1;

            adjC[j][i] = (sign) * (determinant(temp, p - 1));
            
        }
    }
}

// inverseC = inverse of C
function inverse(det, C, p, q) {

    var adjC = new Array(10);
    for (var i = 0; i < 10; i++) {
        adjC[i] = new Array(10);
    }
    adjoint(adjC, C, p, q);

    for (var i = 0; i < p; i++) {
        for (var j = 0; j < q; j++) {
            inverseC[i][j] = adjC[i][j] / det;
        }
    }
}

//result <- A / B
function division() {

    if (brow != bcolumn || acolumn != brow) {
        invalidOp(2);
        return;
    }

    document.getElementById('invalidOp').innerHTML = "";
    document.getElementById('op').innerHTML = "A / B =";


    det = determinant(B, brow);
    if (det === 0) {
        invalidOp(3);
        return;
    }

    inverse(det, B, brow, bcolumn);

    for (var i = 0; i < arow; i++) {
        for (var j = 0; j < brow; j++) {
            result[i][j] = 0;
            for (var t = 0; t < bcolumn; t++) {
                result[i][j] += (A[i][t]) * (inverseC[t][j]);
            }
            result[i][j] = result[i][j].toFixed(3);
        }
    }
    makeTable('rtable', arow, brow);

    //sefr kardan baraye estefade haye baadi
    for (var i = 0; i < brow; i++) {
        for (var j = 0; j < bcolumn; j++) {
            inverseC[i][j] = 0;
        }
    }
}

function showDeterminant(str) {
    if (str === 'atable') {
        if (arow != acolumn) {
            invalidOp(4);
            return;
        }

        document.getElementById('rtable').innerHTML = "";
        document.getElementById('op').innerHTML = "";
        document.getElementById('invalidOp').innerHTML = "";

        det = determinant(A, arow);
        document.getElementById('op').innerHTML = "Determinant of matrix A = <div id='opNumber'>" + det + "</div>";

    }
    else {
        if (brow != bcolumn) {
            invalidOp(4);
            return;
        }

        document.getElementById('rtable').innerHTML = "";
        document.getElementById('op').innerHTML = "";
        document.getElementById('invalidOp').innerHTML = "";
        
        det = determinant(B, brow);
        document.getElementById('op').innerHTML = "Determinant of matrix B = <div id='opNumber'>" + det + "</div>";

    }
}

function showInverse(str) {
    if (str === 'atable') {
        if (arow != acolumn) {
            invalidOp(4);
            return;
        }

        document.getElementById('rtable').innerHTML = "";
        document.getElementById('op').innerHTML = "";
        document.getElementById('invalidOp').innerHTML = "";

        det = determinant(A, arow);
        if (det === 0) {
            invalidOp(3);
            return;
        }
    
        inverse(det, A, arow, acolumn);
        for (var i = 0; i < arow; i++) {
            for (var j = 0; j < acolumn; j++) {
                result[i][j] = inverseC[i][j].toFixed(3);
            }
        }

        document.getElementById('op').innerHTML = "Inverse of matrix A =";
        makeTable('rtable', arow, acolumn);
    }
    else {
        if (brow != bcolumn) {
            invalidOp(4);
            return;
        }

        document.getElementById('rtable').innerHTML = "";
        document.getElementById('op').innerHTML = "";
        document.getElementById('invalidOp').innerHTML = "";

        det = determinant(B, brow);
        if (det === 0) {
            invalidOp(3);
            return;
        }
    
        inverse(det, B, brow, bcolumn);
        for (var i = 0; i < brow; i++) {
            for (var j = 0; j < bcolumn; j++) {
                result[i][j] = inverseC[i][j];
            }
        }

        document.getElementById('op').innerHTML = "Inverse of matrix B =";
        makeTable('rtable', brow, bcolumn);
    }
}
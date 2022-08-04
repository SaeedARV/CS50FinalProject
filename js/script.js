var arow = 3, brow = 3, acolumn = 3, bcolumn = 3;
var A = new Array(10), B = new Array(10);
for (var i = 0; i < 10; i++) {
  A[i] = new Array(10);
  B[i] = new Array(10);
  for (var j = 0; j < 10; j++){
    A[i][j] = '0';
    B[i][j] = '0';
  }
}

function makeTable(str, row, column) {
    var clear = document.getElementById(str);
    clear.innerHTML = "";

    for (var r = 0; r < row; r++) {
        var x = document.getElementById(str).insertRow(r);
        for (var c = 0; c < column; c++) {
            var y = x.insertCell(c);
            if(str === "atable"){
                y.innerHTML = '<input type="text" value=' + A[r][c]  + ' class="fourChar">';
            }
            else{
                y.innerHTML = '<input type="text" value=' + B[r][c]  + ' class="fourChar">';
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

function fillRandom(str){ 
    if(str === "atable"){
        for (var r = 0; r < 10; r++) {
            for (var c = 0; c < 10; c++) {
                A[r][c] = eval(Math.floor(Math.random() * 11));
            }
        }
        makeTable('atable', arow, acolumn)
    }
    else{
        for (var r = 0; r < 10; r++) {
            for (var c = 0; c < 10; c++) {
                B[r][c] = eval(Math.floor(Math.random() * 11));
            }
        }
        makeTable('btable', brow, bcolumn)
    }
}
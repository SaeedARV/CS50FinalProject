# Matrix Calculator

This is the final project of [CS50’s Introduction to Computer Science](https://cs50.harvard.edu/x) course.

### Overview:
My final project is a simple matrix calculator that allows the user to enter a matrix and see its determinant and inverse. The user can also enter a second matrix and see two matrices addition, subtraction, multiplication, and division.

### Description:
I used HTML, CSS, and JavaScript to implement this project. In the index.html file, you can see the structure of my web page written in HTML. You can see that I Included Bootstrap’s CSS and JS as well. I used a few numbers of Bootstrap classes, but the styles.css file that I wrote in the CSS folder had a more important role in styling the web page.

The script.js in the js folder is another important file that contains the most important parts of this project, matrix operation algorithms. The division operation is the most complex one.

#### Division explenation:
I used the analytic solution to calculate the inverse of matrices. Some of the functions in my script.js file are: cofactor, determinant, adjoint, and inverse. All these functions should be used to calculate the division of two matrices.

The cofactor function takes a matrix C and saves its cofactor in temp.
The determinant function uses the temp matrix in the cofactor function and calculates the determinant.
The adjoint function uses both of the above functions to save the adjoint of matrix C in adjC.
Finally, the inverse function uses the adjoint function to save the inverse of the matrix C in inverseC.

Now the division function can multiply the first matrix by the inverse of the second matrix.

Here is the code of these functions:

```javascript
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
```
```javascript
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
```
```javascript
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
```
```javascript
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
```

### To watch the video demo, [click here](https://youtu.be/OP9Htup1KKw).

### If you want to see the website, [click here](https://saeedarv.github.io/CS50xFinalProject/).

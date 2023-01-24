import os

from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import apology, login_required, lookup, usd

from datetime import datetime

# Configure application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Custom filter
app.jinja_env.filters["usd"] = usd

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///finance.db")

# Make sure API key is set
if not os.environ.get("API_KEY"):
    raise RuntimeError("API_KEY not set")


@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/")
@login_required
def index():
    """Show portfolio of stocks"""

    user_id = session["user_id"]
    owns = {}
    query = db.execute(
        "select stock, shares from transactions where user_id = ?", user_id)

    total = 0
    for q in query:
        stock, shares = q["stock"], q["shares"]
        result = lookup(stock)
        price = result["price"]
        value = shares * price
        total += value
        if not stock in owns:
            owns[stock] = [shares, usd(price), value]
        else:
            owns[stock][0] += shares
            owns[stock][2] += value

    for key in owns:
        owns[key][2] = usd(owns[key][2])

    currentCash = db.execute("select cash from users where id = ? ",
                             user_id)[0]['cash']
    total += currentCash
    return render_template("index.html", owns=owns, currentCash=usd(currentCash), total=usd(total))


@app.route("/buy", methods=["GET", "POST"])
@login_required
def buy():
    if request.method == "POST":
        try:
            shares = int(request.form.get("shares"))
        except ValueError:
            return apology("must provide integer number of shares")

        if request.form.get("symbol") == "":
            return apology("must provide stock symbol")
        if request.form.get("shares") == "":
            return apology("must provide number of shares")
        if shares <= 0:
            return apology("must provide positive number of shares")

        quote = lookup(request.form.get("symbol"))

        if quote == None:
            return apology("stock symbol is not valid")

        cost = shares * quote['price']

        result = db.execute(
            "select cash from users where id = ?", session["user_id"])[0]["cash"] - cost
        if result < 0:
            return apology("you do not have enough cash")

        db.execute("update users set cash = ? where id = ?",
                   result, session["user_id"])

        db.execute("insert into transactions (user_id, stock, shares, price, date) values (?, ?, ?, ?, ?)",
                   session["user_id"], quote["symbol"], shares, quote['price'], datetime.now().strftime("%Y-%m-%d %H:%M:%S"))

        return redirect("/")
    else:
        return render_template("buy.html")


@app.route("/history")
@login_required
def history():
    """Show history of transactions"""
    transactions = db.execute(
        "select stock, price, shares, date from transactions WHERE user_id = ?", session["user_id"])
    return render_template("history.html", transactions=transactions)


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 403)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 403)

        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE username = ?",
                          request.form.get("username"))

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("password")):
            return apology("invalid username and/or password", 403)

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")


@app.route("/quote", methods=["GET", "POST"])
@login_required
def quote():

    if request.method == "POST":

        if not request.form.get("symbol"):
            return apology("must provide stock symbol")

        quote = lookup(request.form.get("symbol"))

        if quote == None:
            return apology("stock symbol is not valid")
        else:
            quote["price"] = usd(quote["price"])
            return render_template("quoted.html", quote=quote)
    else:
        return render_template("quote.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
    if request.method == "POST":

        username = request.form.get("username")
        password = request.form.get("password")
        confirmation = request.form.get("confirmation")

        if username == "":
            return apology("must provide username")
        if password == "" or confirmation == "":
            return apology("must provide password")
        if password != confirmation:
            return apology("password and password confirmation must match")
        if len(db.execute('select username from users where username = ?', username)) > 0:
            return apology("username is already registered")

        hash = generate_password_hash(password)
        db.execute("insert into users (username, hash)  values (?, ?)",
                   request.form.get("username"), hash)

        session["user_id"] = db.execute(
            "SELECT id FROM users WHERE username = ?", username)[0]["id"]

        return redirect("/")

    else:
        return render_template("register.html")


@app.route("/sell", methods=["GET", "POST"])
@login_required
def sell():
    """Sell shares of stock"""
    if request.method == "POST":
        symbol = request.form.get("symbol")

        try:
            shares = int(request.form.get("shares"))
        except ValueError:
            return apology("must provide integer number of shares")

        if not symbol:
            return apology("must provide stock symbol")
        if shares <= 0:
            return apology("must provide positive number of shares")

        user_id = session["user_id"]
        owns = 0
        query = db.execute(
            "select shares from transactions where user_id = ? and stock = ?", user_id, symbol)

        for q in query:
            share = q["shares"]
            owns += share

        if owns == 0:
            return apology("you do not own any shares of this stock")
        if owns < shares:
            return apology("you do not have enough shares")

        result = lookup(symbol)
        cash = db.execute("select cash from users where id = ?", user_id)[
            0]['cash']
        price = result["price"]
        remain = cash + price * shares
        db.execute("update users set cash = ? where id = ?", remain, user_id)
        db.execute("insert into transactions (user_id, stock, shares, price, date) values (?, ?, ?, ?, ?)",
                   user_id, symbol, -shares, price, datetime.now().strftime("%Y-%m-%d %H:%M:%S"))

        return redirect("/")

    else:
        user_id = session["user_id"]
        owns = db.execute(
            "select stock from transactions where user_id = ?", user_id)
        symbol = set()
        for own in owns:
            symbol.add(own['stock'])

        return render_template("sell.html", owns=symbol)

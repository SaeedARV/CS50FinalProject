import re
from cs50 import get_string

n = get_string("Number: ")
ans = ""

if re.match("^3[47][0-9]{13}$", n):
    ans = "AMEX\n"
elif re.match("^5[12345][0-9]{14}$", n):
    ans = "MASTERCARD\n"
elif re.match("^4[0-9]{12,15}$", n):
    ans = "VISA\n"
else:
    ans = "INVALID\n"

print(ans)

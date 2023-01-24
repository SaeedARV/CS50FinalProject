import cs50

n = cs50.get_int("Height: ")
while(n < 1 or n > 8):
    n = cs50.get_int("Height: ")

for i in range(1, n+1):
    print(" " * (n-i), end="")
    print("#" * i, end="")
    print("  ", end="")
    print("#" * i)

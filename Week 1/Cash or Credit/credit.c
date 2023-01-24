#include <cs50.h>
#include <stdio.h>

int main(void)
{
    long n = get_long("Number: ");
    long temp = n, sum = 0, len = 0;

    while (temp != 0)
    {
        temp /= 10;
        sum += (2 * (temp % 10)) % 10 + ((2 * (temp % 10)) / 10) % 10;
        temp /= 10;
    }

    temp = n;
    while (temp != 0)
    {
        sum += temp % 10;
        temp /= 100;
    }

    temp = n;
    while (temp != 0)
    {
        len++;
        temp /= 10;
    }

    if (sum % 10 != 0)
    {
        printf("INVALID\n");
    }
    else if (len == 15 && (n / 10000000000000 == 34 || n / 10000000000000 == 37))
    {
        printf("AMEX\n");
    }
    else if (len == 16 && (n / 100000000000000 > 50 && n / 100000000000000 < 56))
    {
        printf("MASTERCARD\n");
    }
    else if ((len == 13 && n / 1000000000000 == 4) || (len == 16 && n / 1000000000000000 == 4))
    {
        printf("VISA\n");
    }
    else
    {
        printf("INVALID\n");
    }
}
#include <cs50.h>
#include <stdio.h>
#include <string.h>
#include <ctype.h>

int main(int argc, string argv[])
{
    if (argc == 1 || argc > 2)
    {
        printf("Usage: ./substitution key\n");
        return 1;
    }

    int length = strlen(argv[1]), check[26];

    if (length != 26)
    {
        printf("Key must contain 26 characters.\n");
        return 1;
    }

    for (int i = 0; i < length; i++)
    {
        if (!isalpha(argv[1][i]))
        {
            printf("Key must only contain alphabetic characters.\n");
            return 1;
        }
        if ((isupper(argv[1][i]) && check[argv[1][i] - 65]) || (islower(argv[1][i]) && check[argv[1][i] - 97]))
        {
            printf("Key must not contain repeated characters.\n");
            return 1;
        }
        if (isupper(argv[1][i]))
        {
            check[argv[1][i] - 65] = 1;
        }
        if (islower(argv[1][i]))
        {
            check[argv[1][i] - 97] = 1;
        }
    }

    string plaintext = get_string("plaintext: ");
    string ciphertext = plaintext;
    for (int i = 0, n = strlen(plaintext); i < n; i++)
    {
        if (!isalpha(plaintext[i]))
        {
            continue;
        }
        else if (isupper(plaintext[i]))
        {
            ciphertext[i] = toupper(argv[1][plaintext[i] - 65]);
        }
        else
        {
            ciphertext[i] = tolower(argv[1][plaintext[i] - 97]);
        }
    }

    printf("ciphertext: %s\n", ciphertext);
    return 0;
}
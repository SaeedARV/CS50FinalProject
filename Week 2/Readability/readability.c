#include <cs50.h>
#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <math.h>

int count_letters(string text)
{
    int ans = 0;
    for (int i = 0, n = strlen(text); i < n; i++)
    {
        if (isalpha(text[i]))
        {
            ans++;
        }
    }

    return ans;
}

int count_words(string text)
{
    int ans = 0;
    for (int i = 0, n = strlen(text); i < n; i++)
    {
        if (text[i] == ' ')
        {
            ans++;
        }
    }

    return ans + 1;
}

int count_sentences(string text)
{
    int ans = 0;
    for (int i = 0, n = strlen(text); i < n; i++)
    {
        if (text[i] == '.' || text[i] == '!' || text[i] == '?')
        {
            ans++;
        }
    }

    return ans;
}

int main(void)
{
    string text = get_string("Text: ");

    float L = (float)count_letters(text) / count_words(text) * 100, S = (float)count_sentences(text) / count_words(text) * 100.0;
    int grade = round(0.0588 * L - 0.296 * S - 15.8);
    if (grade > 16)
    {
        printf("Grade 16+\n");
    }
    else if (grade > 0)
    {
        printf("Grade %i\n", grade);
    }
    else
    {
        printf("Before Grade 1\n");
    }
}
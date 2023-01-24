// Implements a dictionary's functionality

#include <ctype.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>
#include <strings.h>

#include "dictionary.h"

// Represents a node in a hash table
typedef struct node
{
    char word[LENGTH + 1];
    struct node *next;
} node;

const unsigned int N = 50000;

// Hash table
node *table[N];

int dictWordSize = 0;

// Returns true if word is in dictionary, else false
bool check(const char *word)
{
    int hashed = hash(word);

    node *tmp = table[hashed];

    while (tmp != NULL)
    {
        if (strcasecmp(word, tmp->word) == 0)
        {
            return true;
        }
        tmp = tmp->next;
    }

    return false;
}

// Hashes word to a number
unsigned int hash(const char *word)
{
    int hashed = 1;
    for (int i = 0; i < strlen(word); i++)
    {
        hashed *= toupper(word[i]);
        hashed %= N;
    }
    hashed %= N;

    return hashed;
}

// Loads dictionary into memory, returning true if successful, else false
bool load(const char *dictionary)
{
    FILE *dict = fopen(dictionary, "r");
    if (dict == NULL)
    {
        printf("Can't open the file.\n");
        return false;
    }

    char word[LENGTH + 1];
    while (fscanf(dict, "%s", word) != EOF)
    {
        node *tmp = malloc(sizeof(node));
        if (tmp == NULL)
        {
            return false;
        }

        strcpy(tmp->word, word);

        int hashed = hash(word);

        tmp->next = table[hashed];
        table[hashed] = tmp;
        dictWordSize++;
    }

    fclose(dict);

    return true;
}

// Returns number of words in dictionary if loaded, else 0 if not yet loaded
unsigned int size(void)
{
    return dictWordSize;
}

// Unloads dictionary from memory, returning true if successful, else false
bool unload(void)
{
    for (int i = 0; i < N; i++)
    {
        node *n = table[i];
        while (n != NULL)
        {
            node *tmp = n;
            n = n->next;
            free(tmp);
        }
    }
    return true;
}

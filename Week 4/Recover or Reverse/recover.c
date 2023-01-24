#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

int main(int argc, char *argv[])
{
    if (argc != 2)
    {
        printf("Usage: ./recover image\n");
        return 1;
    }
    
    char *fileName = argv[1];
    FILE *input = fopen(fileName, "r");

    if (input == NULL)
    {
        printf("Can't open the file.\n");
        return 1;
    }

    uint8_t buffer[512];
    int counter = 0;
    FILE *img = NULL;
    char fileName2[8];

    while (fread(&buffer, 512, 1, input) == 1)
    {
        if (buffer[0] == 0xff && buffer[1] == 0xd8 && buffer[2] == 0xff && (buffer[3] & 0xf0) == 0xe0)
        {
            if (counter != 0)
            {
                fclose(img);
            }

            sprintf(fileName2, "%03i.jpg", counter);
            img = fopen(fileName2, "w");

            counter++;
        }

        if (counter != 0)
        {
            fwrite(&buffer, 512, 1, img);
        }
    }

    fclose(input);
    fclose(img);
    return 0;
}
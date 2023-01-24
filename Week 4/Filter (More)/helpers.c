#include "helpers.h"
#include <math.h>

// Convert image to grayscale
void grayscale(int height, int width, RGBTRIPLE image[height][width])
{
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            int av = round((image[i][j].rgbtBlue + image[i][j].rgbtGreen + image[i][j].rgbtRed) / 3.0);

            image[i][j].rgbtBlue = image[i][j].rgbtGreen = image[i][j].rgbtRed = av;
        }
    }
    return;
}

// Reflect image horizontally
void reflect(int height, int width, RGBTRIPLE image[height][width])
{
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width / 2; j++)
        {
            int temp = image[i][j].rgbtBlue;
            image[i][j].rgbtBlue = image[i][width - j - 1].rgbtBlue;
            image[i][width - j - 1].rgbtBlue = temp;

            temp = image[i][j].rgbtGreen;
            image[i][j].rgbtGreen = image[i][width - j - 1].rgbtGreen;
            image[i][width - j - 1].rgbtGreen = temp;

            temp = image[i][j].rgbtRed;
            image[i][j].rgbtRed = image[i][width - j - 1].rgbtRed;
            image[i][width - j - 1].rgbtRed = temp;
        }
    }
    return;
}

// Blur image
void blur(int height, int width, RGBTRIPLE image[height][width])
{
    RGBTRIPLE temp[height][width];
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            temp[i][j] = image[i][j];
        }
    }

    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {

            float avBlue = 0, avGreen = 0, avRed = 0;
            int counter = 0;
            for (int t = i - 1; t < i + 2; t++)
            {
                for (int k = j - 1; k < j + 2; k++)
                {

                    if (t >= 0 && t < height && k >= 0 && k < width)
                    {

                        avBlue += temp[t][k].rgbtBlue;
                        avGreen += temp[t][k].rgbtGreen;
                        avRed += temp[t][k].rgbtRed;
                        counter++;
                    }
                }
            }

            image[i][j].rgbtBlue = round(avBlue / counter);
            image[i][j].rgbtGreen = round(avGreen / counter);
            image[i][j].rgbtRed = round(avRed / counter);
        }
    }
    return;
}

// Detect edges
void edges(int height, int width, RGBTRIPLE image[height][width])
{
    RGBTRIPLE temp[height][width];
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            temp[i][j] = image[i][j];
        }
    }

    int Gx[3][3] = {{-1, 0, 1}, {-2, 0, 2}, {-1, 0, 1}};
    int Gy[3][3] = {{-1, -2, -1}, {0, 0, 0}, {1, 2, 1}};

    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            float GxRed = 0, GxBlue = 0, GxGreen = 0, GyRed = 0, GyBlue = 0, GyGreen = 0;

            for (int t = i - 1; t < i + 2; t++)
            {
                for (int k = j - 1; k < j + 2; k++)
                {
                    if (t >= 0 && t < height && k >= 0 && k < width)
                    {
                        GxRed += temp[t][k].rgbtRed * Gx[t - i + 1][k - j + 1];
                        GxGreen += temp[t][k].rgbtGreen * Gx[t - i + 1][k - j + 1];
                        GxBlue += temp[t][k].rgbtBlue * Gx[t - i + 1][k - j + 1];
                        GyRed += temp[t][k].rgbtRed * Gy[t - i + 1][k - j + 1];
                        GyGreen += temp[t][k].rgbtGreen * Gy[t - i + 1][k - j + 1];
                        GyBlue += temp[t][k].rgbtBlue * Gy[t - i + 1][k - j + 1];
                    }
                }
            }

            int red = round(sqrt(GxRed * GxRed + GyRed * GyRed));
            int green = round(sqrt(GxGreen * GxGreen + GyGreen * GyGreen));
            int blue = round(sqrt(GxBlue * GxBlue + GyBlue * GyBlue));

            if (red > 255)
            {
                red = 255;
            }
            if (green > 255)
            {
                green = 255;
            }
            if (blue > 255)
            {
                blue = 255;
            }

            image[i][j].rgbtRed = red;
            image[i][j].rgbtGreen = green;
            image[i][j].rgbtBlue = blue;
        }
    }

    return;
}

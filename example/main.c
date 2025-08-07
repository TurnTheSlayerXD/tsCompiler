#include <stdio.h>

int main(int argc, char **argv)
{
    int y = 10;

    int *x = &y;
    while (*x > 0)
    {
        if ((*x + 1) % 2 == 1)
        {
            print("NOT EVEN | ", 13);
        }
        else if ((*x + 1) % 2 == 0)
        {
            print("EVEN | ", 13);
        }
        else
        {
            (1) + (1);
        }
        *x -= 1;
    }
}
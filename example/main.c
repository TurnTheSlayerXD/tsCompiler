#include <stdio.h>

int main(int argc, char **argv)
{
    int x = 0;
    if (x >= 0)
    {
        print("0!", 2);
    }
    if (x < 0)
    {
        print("1!", 2);
    }
    else
    {
        print("2!", 2);
    }
}
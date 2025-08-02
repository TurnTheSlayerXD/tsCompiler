#include <stdio.h>
int main(int argc, char **argv)
{
    int x = 112312123123;

    int *y = &x;

    int **z = &y;
    ***(&z) = 1;

    print(x, 10);
}
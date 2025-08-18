#include <stdio.h>

int main(int argc, char **argv)
{
    char *f = "FACK";
    char *ptr = "Hello, world";

    *(&ptr) = f + 1;

    *(ptr) = 'B';

    print(ptr, 3);
}
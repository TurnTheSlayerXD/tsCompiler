#include <stdio.h>
int main(int argc, char **argv)
{
    int x = 1488;

    int *y = &x;
    int **z = &y;

    print(&x, 4);
    print(&**z, 4);
    // print(&*z, 4);
}
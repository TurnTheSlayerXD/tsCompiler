#include <stdio.h>

int fuu(int a, int b, int c)
{
    if (a == 1)
    {
        return 0;
    }

    return a + b + c;
}

int main(int argc, char **argv)
{
    char res = fuu(1, 2, 3) - 6 + '1';
    print(&res, 1);
}
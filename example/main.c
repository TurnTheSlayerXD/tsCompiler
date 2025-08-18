#include <stdio.h>

int strlen(char *s)
{
    int len = 0;
    while (*(s + len) != '\0')
    {
        len += 1;
    }
    return len;
}

int main(int argc, char **argv)
{

    for (int i = 0; i < argc; i += 1)
    {
        argv[i][0] = 'D';
        argv[i][1] = 'M';
        argv[i][2] = 'B';
        print(argv[i], strlen(argv[i]));
        print("\n", 1);
    }
}
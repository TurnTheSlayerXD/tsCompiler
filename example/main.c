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
        for (int j = 0; j < strlen(*(argv + i)); j += 1)
        {
            print((*(argv + i)) + j, 1);
        }
        print("\n", 1);
    }
}
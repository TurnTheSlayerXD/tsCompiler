#include <stdio.h>

int main(int argc, char **argv)
{
    for (int i = 1; i < argc; i += 1)
    {
        int count = 0;
        for (char *t = *(argv + i); *t != '\0'; t += 1)
        {
            count += 1;
        }
        char num = '0' + count;
        print(&num, 1);
        print("\n", 1);
    }
}
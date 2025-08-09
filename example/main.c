#include <stdio.h>

int main(int argc, char **argv)
{
    char *word = "Hello, world";
    for (char *ptr = word; *ptr != '\0'; ptr += 1)
    {
        print(ptr, 1);
    }
}
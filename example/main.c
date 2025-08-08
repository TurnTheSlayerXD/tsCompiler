#include <stdio.h>

int main(int argc, char **argv)
{

    char *word = "Hello, world";

    print("[", 1);
    for (char *ptr = word; *ptr != '\0'; ptr += 1)
    {
        print(ptr, 1);
    }
    print("]", 1);
    print("\n", 1);

    print("[", 1);
    for (char *ptr = word; *ptr != '\0'; ptr += 1)
    {
        print(ptr, 1);
    }
    print("]", 1);
    print("\n", 1);
}
#include <stdio.h>

int main(int argc, char **argv)
{
    char *word = "Hello, world\n";
    for (int j = 0; j < 10; j += 1)
    {
        for (int i = 0; *(word + i) != '\0'; i += 1)
        {
            print(word + i, 1);
        }
    }
}
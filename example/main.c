#include <stdio.h>

int main(int argc, char **argv)
{

    for (int i = 1; i < 10; i = i + 1)
    {
        if (i > 5)
        {
            print(">5 ", 4);
        }
        else{
            print("<=5 ", 4);
        }
    }
}
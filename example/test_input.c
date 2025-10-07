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

int main()
{
    char[100] str1;
    char[100] str2;
    char[100] str3;
    // print("", 1);

    input(str1);
    input(str2);
    input(str3);

    print(str1, strlen(str1));
    print(str2, strlen(str2));
    print(str3, strlen(str3));

    return 0;
}
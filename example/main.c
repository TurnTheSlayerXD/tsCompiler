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

void print_num(int num)
{
    char *s = "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0";
    int c = 0;
    while (num > 0)
    {
        int rest = num % 10;
        num /= 10;
        *(s + c) = '0' + rest;
        c += 1;
    }
    int len = strlen(s);
    for (int i = 0; i < len / 2; i += 1)
    {
        char buf = *(s + i);
        *(s + i) = *(s + len - 1 - i);
        *(s + len - 1 - i) = buf;
    }
    print(s, len);
}

int main(int argc, char **argv)
{
    int num = 14883;
    print_num(num);
}
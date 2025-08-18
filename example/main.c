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
void print_str(char *str)
{
    print(str, strlen(str));
}

void print_num(int num)
{
    char *s = "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0";
    if (num == 0)
    {
        print("0", 1);
    }
    else
    {
        int c = 0;
        while (num > 0)
        {
            int rest = num % 10;
            num /= 10;
            s[c] = '0' + rest;
            c += 1;
        }
        int len = strlen(s);
        for (int i = 0; i < len / 2; i += 1)
        {
            char buf = s[i];
            s[i] = s[len - 1 - i];
            s[len - 1 - i] = buf;
        }
        print(s, len);
    }
}

int main(int argc, char **argv)
{
    int *arr = {1, 2, 3, 4, 5};

    for (int i = 0; i < 5; i += 1)
    {
        print_num(arr[i]);
        print_str(" ");
    }
    print_str("\n");
}
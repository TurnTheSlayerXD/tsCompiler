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

void print_str(char *str)
{
    print(str, strlen(str));
}

void say_hello()
{
    print_str("Hello from C lang compiled with Typescript");
}

int main(int argc, char **argv)
{
    print_str("Hello");
    print_str("\n");
    int num = (3 * (8 + 6) - (+1)) / 5;
    print_num(num);
    print_str("\n");
    say_hello();
    print("\n", 1);
}
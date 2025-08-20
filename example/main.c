int strlen(char *s)
{
    int len = 0;
    while (*(s + len) != '\0')
    {
        len += 1;
    }
    return len;
}

void print_int(int num)
{
    char *s = "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0";
    if (num == 0)
    {
        print("0", 1);
    }
    else
    {
        int c = 0;
        int minus = 1;
        if (num < 0)
        {
            num *= -1;
            minus = -1;
        }
        while (num > 0)
        {
            int rest = num % 10;
            num /= 10;
            s[c] = '0' + rest;
            c += 1;
        }
        if (minus == -1)
        {
            s[c] = '-';
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
    print("\n", 1);
}
void print_str(char *str)
{
    print(str, strlen(str));
    print("\n", 1);
}

int get_digit(char c)
{
    return c - '0';
}

int power(int a, int x)
{
    int s = 1;
    while (x > 0)
    {
        s *= a;
        x -= 1;
    }
    return s;
}

int parse_int_from_str(char *str)
{
    int len = strlen(str);
    if (len == 0)
    {
        return -1488;
    }
    char *begin = str;
    char *end = str + len;
    int minus = 1;
    if (*begin == '-')
    {
        minus = -1;
        begin += 1;
    }
    int num = 0;
    while (begin != end)
    {
        num += power(10, end - begin - 1) * get_digit(*begin);
        begin += 1;
    }
    return num * minus;
}

int main(int argc, char **argv)
{
    char *str = "-1488";
    int res = parse_int_from_str(str);

    if ((int x = 0) == 0)
    {
        print_str("x is equal to 0");
    }
    else
    {
        print_str("x is not equal to 0");
    }

    print_int(res);
}
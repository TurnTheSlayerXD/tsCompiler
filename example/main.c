
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
    print("\n", 1);
}

char *num_to_str(char *dst, int num)
{
    if (num == 0)
    {
        dst[0] = '0';
    }
    else
    {
        int c = 0;
        while (num > 0)
        {
            int rest = num % 10;
            num /= 10;
            dst[c] = '0' + rest;
            c += 1;
        }
        int len = strlen(dst);
        for (int i = 0; i < len / 2; i += 1)
        {
            char buf = dst[i];
            dst[i] = dst[len - 1 - i];
            dst[len - 1 - i] = buf;
        }
    }
    return dst + strlen(dst);
}

int starts_with(char *to_search, char *pat)
{
    while (*pat != '\0' && *to_search == *pat)
    {
        to_search += 1;
        pat += 1;
    }
    if (*pat != '\0')
    {
        return 0;
    }
    return 1;
}

char *write_to(char *dst, char *src)
{
    while (*src != '\0')
    {
        *dst = *src;
        dst += 1;
        src += 1;
    }
    return dst;
}

void printf(char *fmt, void **args)
{

    char[100] buf;
    char *iter = buf;
    int count = 0;
    int argc = 0;
    while (*fmt != '\0')
    {
        if (*(fmt + 1) != '\0')
        {
            if (starts_with(fmt, "%s") == 1)
            {
                iter = write_to(iter, args[argc]);
                argc += 1;
                fmt += 2;
                continue;
            }
            else if (starts_with(fmt, "%d") == 1)
            {
                iter = num_to_str(iter, *(int *)args[argc]);
                argc += 1;
                fmt += 2;
                continue;
            }
        }
        *iter = *fmt;
        iter += 1;
        fmt += 1;
    }
    print_str(buf);
}

int factorial(int s)
{
    if (s == 0)
    {
        return 1;
    }
    return factorial(s - 1) * s;
}

int main(int argc, char **argv)
{
    int res = factorial(10);
    printf("Result: %d", {&res});
}
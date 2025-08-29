
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

int main(int argc, char **argv)
{
    for (int i = 0; i < 10; i += 1)
    {
        if(i > 5)
        {
            print("Hello", 5);
        }
    }
}
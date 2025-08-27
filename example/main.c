
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


int main(int argc, char **argv)
{

    char[3][] arr;

    arr[0] = "hello";
    arr[1] = "world";
    arr[2] = "again";

    print_str(arr[0]);
    print_str(arr[1]);
    print_str(arr[2]);
}
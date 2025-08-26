
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


int main(){

    char[100] arr = "Hello";

    print_str(arr);
}
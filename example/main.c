


int strlen(char *str) {
    int len = 0;
    while (*str != '\0') {
        str += 1;
        len += 1;
    }
    return len;
}

int main(int argc, char **argv)
{

    char arr[10] = "herllo";
    int *ref = (arr);


}
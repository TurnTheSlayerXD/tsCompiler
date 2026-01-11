
int main(int argc, char **argv)
{
    int i = 0;

    char[10] x;
    for (int i = 0; i < 10; i += 1){
        x[i] = 'a' + i;
    }

    x[9] = '\0';

    print(x, 10);
}
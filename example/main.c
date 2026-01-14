
int main(int argc, char **argv)
{

    char *x = "0000000000";
    for (int i = 0; i < 10; i += 1){
        *(x + i) = 'a';
    }
    // print(x, 10);
}
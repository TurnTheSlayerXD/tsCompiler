#include <stdio.h>
#include <Windows.h>

int main(int argc, char **argv)
{
    void* stdOut = GetStdHandle(-11);
    unsigned long written = 0;
    const char *message = "hello world";
    WriteConsole(stdOut, message, 11, &written, NULL);
    return 0;
}
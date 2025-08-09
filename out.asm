.def	main;
.endef
.globl	main
main:
.seh_proc main
subq $1000, %rsp
movq $0, 992(%rsp)
movb $0, 991(%rsp)
movb $100, 990(%rsp)
movb $108, 989(%rsp)
movb $114, 988(%rsp)
movb $111, 987(%rsp)
movb $119, 986(%rsp)
movb $32, 985(%rsp)
movb $44, 984(%rsp)
movb $111, 983(%rsp)
movb $108, 982(%rsp)
movb $108, 981(%rsp)
movb $101, 980(%rsp)
movb $72, 979(%rsp)
leaq 979(%rsp), %rdx
movq %rdx, 971(%rsp)
movq 971(%rsp), %rdx
movq %rdx, 992(%rsp)
movb $0, 970(%rsp)
movb $91, 969(%rsp)
leaq 969(%rsp), %rdx
movq %rdx, 961(%rsp)
movl $1, 957(%rsp)
movl  $4294967285, %ecx
callq	*__imp_GetStdHandle(%rip)
movq	%rax, 949(%rsp)
movl	$0, 945(%rsp)
movq	949(%rsp), %rcx
leaq	945(%rsp), %r9
movq  961(%rsp), %rdx
movl  957(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
subq $39, %rsp
movq $0, 31(%rsp)
movq 31(%rsp), %rdx
movq %rdx, 31(%rsp)
mark_0:
movq 31(%rsp), %rax
movb (%rax), %dh
movb %dh, 30(%rsp)
movb $0, %ah
movb %ah, 29(%rsp)
movb 30(%rsp), %ah
movb 29(%rsp), %al
movb $1, 28(%rsp)
cmpb %ah, %al
jne mark_2
movb $0, 28(%rsp)
mark_2:
#FOR
xor %edx, %edx
movb 28(%rsp), %dh
cmpb $0, %dh
je mark_1
movl $1, 24(%rsp)
movl  $4294967285, %ecx
callq	*__imp_GetStdHandle(%rip)
movq	%rax, 16(%rsp)
movl	$0, 12(%rsp)
NaN(%rsp), %rcx
NaN(%rsp), %r9
movq  31(%rsp), %rdx
movl  24(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
movl $1, 8(%rsp)
movslq 8(%rsp), %rdx
imulq $1, %rdx
movq 31(%rsp), %rax
addq %rdx, %rax
movq %rax, 0(%rsp)
movq 0(%rsp), %rdx
movq %rdx, 31(%rsp)
jmp mark_0
mark_1:
addq $39, %rsp
movb $0, 944(%rsp)
movb $93, 943(%rsp)
leaq 943(%rsp), %rdx
movq %rdx, 935(%rsp)
movl $1, 931(%rsp)
movl  $4294967285, %ecx
callq	*__imp_GetStdHandle(%rip)
movq	%rax, 923(%rsp)
movl	$0, 919(%rsp)
movq	923(%rsp), %rcx
leaq	919(%rsp), %r9
movq  935(%rsp), %rdx
movl  931(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
movb $0, 918(%rsp)
movb $10, 917(%rsp)
leaq 917(%rsp), %rdx
movq %rdx, 909(%rsp)
movl $1, 905(%rsp)
movl  $4294967285, %ecx
callq	*__imp_GetStdHandle(%rip)
movq	%rax, 897(%rsp)
movl	$0, 893(%rsp)
movq	897(%rsp), %rcx
leaq	893(%rsp), %r9
movq  909(%rsp), %rdx
movl  905(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
movb $0, 892(%rsp)
movb $91, 891(%rsp)
leaq 891(%rsp), %rdx
movq %rdx, 883(%rsp)
movl $1, 879(%rsp)
movl  $4294967285, %ecx
callq	*__imp_GetStdHandle(%rip)
movq	%rax, 871(%rsp)
movl	$0, 867(%rsp)
movq	871(%rsp), %rcx
leaq	867(%rsp), %r9
movq  883(%rsp), %rdx
movl  879(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
subq $185, %rsp
movq $0, -784(%rsp)
movq -784(%rsp), %rdx
movq %rdx, -784(%rsp)
mark_3:
movq -784(%rsp), %rax
movb (%rax), %dh
movb %dh, -785(%rsp)
movb $0, %ah
movb %ah, -786(%rsp)
movb -785(%rsp), %ah
movb -786(%rsp), %al
movb $1, -787(%rsp)
cmpb %ah, %al
jne mark_5
movb $0, -787(%rsp)
mark_5:
#FOR
xor %edx, %edx
movb -787(%rsp), %dh
cmpb $0, %dh
je mark_4
movl $1, -791(%rsp)
movl  $4294967285, %ecx
callq	*__imp_GetStdHandle(%rip)
movq	%rax, -799(%rsp)
movl	$0, -803(%rsp)
NaN(%rsp), %rcx
NaN(%rsp), %r9
movq  -784(%rsp), %rdx
movl  -791(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
movl $1, -807(%rsp)
movslq -807(%rsp), %rdx
imulq $1, %rdx
movq -784(%rsp), %rax
addq %rdx, %rax
movq %rax, -815(%rsp)
movq -815(%rsp), %rdx
movq %rdx, -784(%rsp)
jmp mark_3
mark_4:
addq $39, %rsp
movb $0, 51(%rsp)
movb $93, 50(%rsp)
leaq 50(%rsp), %rdx
movq %rdx, 42(%rsp)
movl $1, 38(%rsp)
movl  $4294967285, %ecx
callq	*__imp_GetStdHandle(%rip)
movq	%rax, 30(%rsp)
movl	$0, 26(%rsp)
NaN(%rsp), %rcx
NaN(%rsp), %r9
movq  42(%rsp), %rdx
movl  38(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
movb $0, 25(%rsp)
movb $10, 24(%rsp)
leaq 24(%rsp), %rdx
movq %rdx, 16(%rsp)
movl $1, 12(%rsp)
movl  $4294967285, %ecx
callq	*__imp_GetStdHandle(%rip)
movq	%rax, 4(%rsp)
movl	$0, 0(%rsp)
NaN(%rsp), %rcx
NaN(%rsp), %r9
movq  16(%rsp), %rdx
movl  12(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
addq $185, %rsp
xor %eax, %eax
retq
.seh_endproc

.def	main;
.endef
.globl	main
main:
.seh_proc main
#__begin_scope_0
#__init
subq $38, %rsp
movq $0, 30(%rsp)
movb $0, 29(%rsp)
movb $10, 28(%rsp)
movb $100, 27(%rsp)
movb $108, 26(%rsp)
movb $114, 25(%rsp)
movb $111, 24(%rsp)
movb $119, 23(%rsp)
movb $32, 22(%rsp)
movb $44, 21(%rsp)
movb $111, 20(%rsp)
movb $108, 19(%rsp)
movb $108, 18(%rsp)
movb $101, 17(%rsp)
movb $72, 16(%rsp)
leaq  16(%rsp), %rdx
movq %rdx, 8(%rsp)
movq  8(%rsp), %rdx
movq %rdx, 30(%rsp)
#__end_scope_0
#__begin_scope_1
#__init
subq $29, %rsp
movl $0, 25(%rsp)
movl $0, 21(%rsp)
movl  21(%rsp), %edx
movl %edx, 25(%rsp)
mark_0 :
movl $10, 17(%rsp)
movl  25(%rsp), %eax
movl  17(%rsp), %ebx
movb $1, 16(%rsp)
cmpl %eax, %ebx
jg mark_2
movb $0, 16(%rsp)
mark_2 :
#FOR
xor %edx, %edx
movb  16(%rsp), %dh
cmpb $0, %dh
je mark_1
#__end_scope_1
#__begin_scope_2
#__init
subq $59, %rsp
movl $0, 55(%rsp)
movl $0, 51(%rsp)
movl  51(%rsp), %edx
movl %edx, 55(%rsp)
mark_3 :
movslq  55(%rsp), %rdx
imulq $1, %rdx
movq  118(%rsp), %rax
addq %rdx, %rax
movq %rax, 43(%rsp)
movq  43(%rsp), %rax
movb (%rax), %dh
movb %dh, 42(%rsp)
movb $0, %ah
movb %ah, 41(%rsp)
movb  42(%rsp), %ah
movb  41(%rsp), %al
movb $1, 40(%rsp)
cmpb %ah, %al
jne mark_5
movb $0, 40(%rsp)
mark_5 :
#FOR
xor %edx, %edx
movb  40(%rsp), %dh
cmpb $0, %dh
je mark_4
movslq  55(%rsp), %rdx
imulq $1, %rdx
movq  118(%rsp), %rax
addq %rdx, %rax
movq %rax, 32(%rsp)
movl $1, 28(%rsp)
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 20(%rsp)
movl $0, 16(%rsp)
movq  20(%rsp), %rcx
leaq  16(%rsp), %r9
movq   32(%rsp), %rdx
movl   28(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
movl $1, 12(%rsp)
movl  55(%rsp), %edx
addl  12(%rsp), %edx
movl %edx, 8(%rsp)
movl  8(%rsp), %edx
movl %edx, 55(%rsp)
jmp mark_3
mark_4 :
#__clear
addq $59, %rsp
#__end_scope_2
#__begin_scope_1
movl $1, 12(%rsp)
movl  25(%rsp), %edx
addl  12(%rsp), %edx
movl %edx, 8(%rsp)
movl  8(%rsp), %edx
movl %edx, 25(%rsp)
jmp mark_0
mark_1 :
#__clear
addq $29, %rsp
#__end_scope_1
#__begin_scope_0
#__clear
addq $38, %rsp
#__end_scope_0
xor %eax, %eax
retq
.seh_endproc

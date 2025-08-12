.def	main;
.endef
.globl	main
main:
.seh_proc main
#__begin_scope_0
#__init
subq $20, %rsp
movl %ecx, 16(%rsp)
movq %rdx, 8(%rsp)
#__end_scope_0
#__begin_scope_1
#__init
subq $93, %rsp
movl $0, 89(%rsp)
movl $1, 85(%rsp)
movl  85(%rsp), %edx
movl %edx, 89(%rsp)
mark_0 :
movl  89(%rsp), %eax
movl  109(%rsp), %ebx
movb $1, 84(%rsp)
cmpl %eax, %ebx
jg mark_2
movb $0, 84(%rsp)
mark_2 :
#FOR
xor %edx, %edx
movb  84(%rsp), %dh
cmpb $0, %dh
je mark_1
movl $0, 80(%rsp)
movl $0, 76(%rsp)
movl  76(%rsp), %edx
movl %edx, 80(%rsp)
#__end_scope_1
#__begin_scope_2
#__init
subq $55, %rsp
movq $0, 47(%rsp)
movslq  144(%rsp), %rdx
imulq $8, %rdx
movq  156(%rsp), %rax
addq %rdx, %rax
movq %rax, 39(%rsp)
movq  39(%rsp), %rax
movq (%rax), %rdx
movq %rdx, 31(%rsp)
movq  31(%rsp), %rdx
movq %rdx, 47(%rsp)
mark_3 :
movq  47(%rsp), %rax
movb (%rax), %dh
movb %dh, 30(%rsp)
movb $0, %ah
movb %ah, 29(%rsp)
movb  30(%rsp), %ah
movb  29(%rsp), %al
movb $1, 28(%rsp)
cmpb %ah, %al
jne mark_5
movb $0, 28(%rsp)
mark_5 :
#FOR
xor %edx, %edx
movb  28(%rsp), %dh
cmpb $0, %dh
je mark_4
movl $1, 24(%rsp)
movl  135(%rsp), %edx
addl  24(%rsp), %edx
movl %edx, 20(%rsp)
movl  20(%rsp), %edx
movl %edx, 135(%rsp)
movl $1, 16(%rsp)
movslq  16(%rsp), %rdx
imulq $1, %rdx
movq  47(%rsp), %rax
addq %rdx, %rax
movq %rax, 8(%rsp)
movq  8(%rsp), %rdx
movq %rdx, 47(%rsp)
jmp mark_3
mark_4 :
#__clear
addq $55, %rsp
#__end_scope_2
#__begin_scope_1
movb $0, %ah
movb %ah, 75(%rsp)
movb $48, %ah
movb %ah, 74(%rsp)
movsbl  74(%rsp), %edx
movl %edx, 70(%rsp)
movl  80(%rsp), %edx
addl  70(%rsp), %edx
movl %edx, 66(%rsp)
movb  66(%rsp), %dh
movb %dh, 75(%rsp)
leaq  75(%rsp), %rdx
movq %rdx, 58(%rsp)
movl $1, 54(%rsp)
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 46(%rsp)
movl $0, 42(%rsp)
movq  46(%rsp), %rcx
leaq  42(%rsp), %r9
movq   58(%rsp), %rdx
movl   54(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
movb $0, 41(%rsp)
movb $10, 40(%rsp)
leaq  40(%rsp), %rdx
movq %rdx, 32(%rsp)
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
movl  89(%rsp), %edx
addl  12(%rsp), %edx
movl %edx, 8(%rsp)
movl  8(%rsp), %edx
movl %edx, 89(%rsp)
jmp mark_0
mark_1 :
#__clear
addq $93, %rsp
#__end_scope_1
#__begin_scope_0
#__clear
addq $20, %rsp
#__end_scope_0
xor %eax, %eax
retq
.seh_endproc

.def	main;
.endef
.globl	main
main:
.seh_proc main
#__begin_scope_0
#__init_scope_0
subq $91, %rsp
movl %ecx, 87(%rsp)
movq %rdx, 79(%rsp)
movb $0, 78(%rsp)
movb $75, 77(%rsp)
movb $67, 76(%rsp)
movb $65, 75(%rsp)
movb $70, 74(%rsp)
leaq  74(%rsp), %rdx
movq %rdx, 66(%rsp)
movb $0, 65(%rsp)
movb $100, 64(%rsp)
movb $108, 63(%rsp)
movb $114, 62(%rsp)
movb $111, 61(%rsp)
movb $119, 60(%rsp)
movb $32, 59(%rsp)
movb $44, 58(%rsp)
movb $111, 57(%rsp)
movb $108, 56(%rsp)
movb $108, 55(%rsp)
movb $101, 54(%rsp)
movb $72, 53(%rsp)
leaq  53(%rsp), %rdx
movq %rdx, 45(%rsp)
movl $1, 41(%rsp)
movslq  41(%rsp), %rdx
imulq $1, %rdx
movq  66(%rsp), %rax
addq %rdx, %rax
movq %rax, 33(%rsp)
leaq  45(%rsp), %rdx
movq %rdx, 25(%rsp)
movq  25(%rsp), %rax
movq  33(%rsp), %rdx
movq %rdx, (%rax)
movb $66, %ah
movb %ah, 24(%rsp)
movq  45(%rsp), %rax
movb  24(%rsp), %dh
movb %dh, (%rax)
movl $3, 20(%rsp)
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 12(%rsp)
movl $0, 8(%rsp)
movq  12(%rsp), %rcx
leaq  8(%rsp), %r9
movq   45(%rsp), %rdx
movl   20(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
#__clear_scope_0
addq $91, %rsp
#__end_scope_0
xor %rax, %rax
retq
.seh_endproc

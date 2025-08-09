.def	main;
.endef
.globl	main
main:
.seh_proc main
#__begin_scope_0
#__init
subq $29, %rsp
movq $0, 21(%rsp)
movb $0, 20(%rsp)
movb $100, 19(%rsp)
movb $108, 18(%rsp)
movb $114, 17(%rsp)
movb $111, 16(%rsp)
movb $119, 15(%rsp)
movb $32, 14(%rsp)
movb $44, 13(%rsp)
movb $111, 12(%rsp)
movb $108, 11(%rsp)
movb $108, 10(%rsp)
movb $101, 9(%rsp)
movb $72, 8(%rsp)
leaq  8(%rsp), %rdx
movq %rdx, 0(%rsp)
movq  0(%rsp), %rdx
movq %rdx, 21(%rsp)
#__end_scope_0
#__begin_scope_1
#__init
subq $39, %rsp
movq $0, 31(%rsp)
movq  31(%rsp), %rdx
movq %rdx, 31(%rsp)
mark_0 :
movq  31(%rsp), %rax
movb (%rax), %dh
movb %dh, 30(%rsp)
movb $0, %ah
movb %ah, 29(%rsp)
movb  30(%rsp), %ah
movb  29(%rsp), %al
movb $1, 28(%rsp)
cmpb %ah, %al
jne mark_2
movb $0, 28(%rsp)
mark_2 :
#FOR
xor %edx, %edx
movb  28(%rsp), %dh
cmpb $0, %dh
je mark_1
movl $1, 24(%rsp)
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 16(%rsp)
movl $0, 12(%rsp)
movq  16(%rsp), %rcx
leaq  12(%rsp), %r9
movq   31(%rsp), %rdx
movl   24(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
movl $1, 8(%rsp)
movslq  8(%rsp), %rdx
imulq $1, %rdx
movq  31(%rsp), %rax
addq %rdx, %rax
movq %rax, 0(%rsp)
movq  0(%rsp), %rdx
movq %rdx, 31(%rsp)
jmp mark_0
mark_1 :
#__clear
addq $39, %rsp
#__end_scope_1
#__begin_scope_0
#__clear
addq $29, %rsp
#__end_scope_0
xor %eax, %eax
retq
.seh_endproc

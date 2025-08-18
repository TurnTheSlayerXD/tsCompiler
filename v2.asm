.def	strlen;
.endef
.globl	strlen
strlen:
.seh_proc strlen
#__begin_scope_0
#__init_scope_0
subq $20, %rsp
movq 0(%rcx), %rdx
movq %rdx, 12(%rsp)
movl $0, 8(%rsp)
#__end_scope_0
#__begin_scope_1
#__init_scope_1
subq $27, %rsp
mark_0 :
movslq  35(%rsp), %rdx
imulq $1, %rdx
movq  39(%rsp), %rax
addq %rdx, %rax
movq %rax, 19(%rsp)
movq  19(%rsp), %rax
movb (%rax), %dh
movb %dh, 18(%rsp)
movb $0, %ah
movb %ah, 17(%rsp)
movb  18(%rsp), %ah
movb  17(%rsp), %al
movb $1, 16(%rsp)
cmpb %ah, %al
jne mark_2
movb $0, 16(%rsp)
mark_2 :
#WHILE
xor %edx, %edx
movb  16(%rsp), %dh
cmpb $0, %dh
je mark_1
movl $1, 12(%rsp)
movl  35(%rsp), %edx
addl  12(%rsp), %edx
movl %edx, 8(%rsp)
movl  8(%rsp), %edx
movl %edx, 35(%rsp)
jmp mark_0
mark_1 :
#__clear_scope_1
addq $27, %rsp
#__end_scope_1
#__begin_scope_0
movl  8(%rsp), %eax
#__clear_scope_0
addq $20, %rsp
retq
#__clear_scope_0
addq $20, %rsp
#__end_scope_0
retq
.seh_endproc
.def	main;
.endef
.globl	main
main:
.seh_proc main
#__begin_scope_2
#__init_scope_2
subq $20, %rsp
movl %ecx, 16(%rsp)
movq %rdx, 8(%rsp)
#__end_scope_2
#__begin_scope_3
#__init_scope_3
subq $47, %rsp
movl $0, 43(%rsp)
mark_3 :
movl  43(%rsp), %eax
movl  63(%rsp), %ebx
movb $1, 42(%rsp)
cmpl %eax, %ebx
jg mark_5
movb $0, 42(%rsp)
mark_5 :
#FOR
xor %edx, %edx
movb  42(%rsp), %dh
cmpb $0, %dh
je mark_4
#__end_scope_3
#__begin_scope_4
#__init_scope_4
subq $89, %rsp
movl $0, 85(%rsp)
mark_6 :
movslq  132(%rsp), %rdx
imulq $8, %rdx
movq  144(%rsp), %rax
addq %rdx, %rax
movq %rax, 77(%rsp)
movq  77(%rsp), %rax
movq (%rax), %rdx
movq %rdx, 69(%rsp)
movq $0, 61(%rsp)
movq  69(%rsp), %rdx
movq %rdx, 61(%rsp)
#__parameter_offset_pass
leaq  61(%rsp), %rcx
callq strlen
movl %eax, 57(%rsp)
movl  85(%rsp), %eax
movl  57(%rsp), %ebx
movb $1, 56(%rsp)
cmpl %eax, %ebx
jg mark_8
movb $0, 56(%rsp)
mark_8 :
#FOR
xor %edx, %edx
movb  56(%rsp), %dh
cmpb $0, %dh
je mark_7
movslq  132(%rsp), %rdx
imulq $8, %rdx
movq  144(%rsp), %rax
addq %rdx, %rax
movq %rax, 48(%rsp)
movq  48(%rsp), %rax
movq (%rax), %rdx
movq %rdx, 40(%rsp)
movslq  85(%rsp), %rdx
imulq $1, %rdx
movq  40(%rsp), %rax
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
movl  85(%rsp), %edx
addl  12(%rsp), %edx
movl %edx, 8(%rsp)
movl  8(%rsp), %edx
movl %edx, 85(%rsp)
jmp mark_6
mark_7 :
#__clear_scope_4
addq $89, %rsp
#__end_scope_4
#__begin_scope_3
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
movl  43(%rsp), %edx
addl  12(%rsp), %edx
movl %edx, 8(%rsp)
movl  8(%rsp), %edx
movl %edx, 43(%rsp)
jmp mark_3
mark_4 :
#__clear_scope_3
addq $47, %rsp
#__end_scope_3
#__begin_scope_2
#__clear_scope_2
addq $20, %rsp
#__end_scope_2
xor %rax, %rax
retq
.seh_endproc

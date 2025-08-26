.def	strlen;
.endef
.globl	strlen
strlen:
.seh_proc strlen
#__begin_scope_0
#__init_scope_0
subq $24, %rsp
movq 0(%rcx), %rdx
movq %rdx, 16(%rsp)
movl $0, 12(%rsp)
movl $0, 8(%rsp)
movl  12(%rsp), %edx
movl %edx, 8(%rsp)
#__end_scope_0
#__begin_scope_1
#__init_scope_1
subq $27, %rsp
mark_0 :
movslq  35(%rsp), %rdx
imulq $1, %rdx
movq  43(%rsp), %rax
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
addq $24, %rsp
retq
#__clear_scope_0
addq $24, %rsp
#__end_scope_0
retq
.seh_endproc
.def	print_str;
.endef
.globl	print_str
print_str:
.seh_proc print_str
#__begin_scope_2
#__init_scope_2
subq $40, %rsp
movq 0(%rcx), %rdx
movq %rdx, 32(%rsp)
movq $0, 24(%rsp)
movq  32(%rsp), %rdx
movq %rdx, 24(%rsp)
#__parameter_offset_pass
leaq  24(%rsp), %rcx
callq strlen
movl %eax, 20(%rsp)
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 12(%rsp)
movl $0, 8(%rsp)
movq  12(%rsp), %rcx
leaq  8(%rsp), %r9
movq   32(%rsp), %rdx
movl   20(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
#__clear_scope_2
addq $40, %rsp
#__end_scope_2
retq
.seh_endproc
.def	main;
.endef
.globl	main
main:
.seh_proc main
#__begin_scope_3
#__init_scope_3
subq $39, %rsp
movb $0, 38(%rsp)
movb $111, 37(%rsp)
movb $108, 36(%rsp)
movb $108, 35(%rsp)
movb $101, 34(%rsp)
movb $72, 33(%rsp)
leaq  33(%rsp), %rdx
movq %rdx, 25(%rsp)
movq $0, 17(%rsp)
movq  25(%rsp), %rdx
movq %rdx, 17(%rsp)
movq $0, 9(%rsp)
movq  17(%rsp), %rdx
movq %rdx, 9(%rsp)
#__parameter_offset_pass
leaq  9(%rsp), %rcx
callq print_str
movb %al, 8(%rsp)
#__clear_scope_3
addq $39, %rsp
#__end_scope_3
xor %rax, %rax
retq
.seh_endproc

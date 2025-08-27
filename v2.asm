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
.def	print_str;
.endef
.globl	print_str
print_str:
.seh_proc print_str
#__begin_scope_2
#__init_scope_2
subq $66, %rsp
movq 0(%rcx), %rdx
movq %rdx, 58(%rsp)
movq $0, 50(%rsp)
movq  58(%rsp), %rdx
movq %rdx, 50(%rsp)
#__parameter_offset_pass
leaq  50(%rsp), %rcx
callq strlen
movl %eax, 46(%rsp)
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 38(%rsp)
movl $0, 34(%rsp)
movq  38(%rsp), %rcx
leaq  34(%rsp), %r9
movq   58(%rsp), %rdx
movl   46(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
movb $0, 33(%rsp)
movb $10, 32(%rsp)
leaq  32(%rsp), %rdx
movq %rdx, 24(%rsp)
movl $1, 20(%rsp)
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 12(%rsp)
movl $0, 8(%rsp)
movq  12(%rsp), %rcx
leaq  8(%rsp), %r9
movq   24(%rsp), %rdx
movl   20(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
#__clear_scope_2
addq $66, %rsp
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
subq $217, %rsp
movl %ecx, 213(%rsp)
movq %rdx, 205(%rsp)
leaq  205(%rsp), %rdx
movq %rdx, 197(%rsp)
leaq  197(%rsp), %rdx
movq %rdx, 189(%rsp)
leaq  189(%rsp), %rdx
movq %rdx, 181(%rsp)
leaq  181(%rsp), %rdx
movq %rdx, 173(%rsp)
movl $0, 169(%rsp)
movslq  169(%rsp), %rdx
imulq $8, %rdx
movq  173(%rsp), %rax
addq %rdx, %rax
movq %rax, 161(%rsp)
movb $0, 160(%rsp)
movb $111, 159(%rsp)
movb $108, 158(%rsp)
movb $108, 157(%rsp)
movb $101, 156(%rsp)
movb $104, 155(%rsp)
leaq  155(%rsp), %rdx
movq %rdx, 147(%rsp)
movq  161(%rsp), %rax
movq  147(%rsp), %rdx
movq %rdx, (%rax)
movl $1, 143(%rsp)
movslq  143(%rsp), %rdx
imulq $8, %rdx
movq  173(%rsp), %rax
addq %rdx, %rax
movq %rax, 135(%rsp)
movb $0, 134(%rsp)
movb $100, 133(%rsp)
movb $108, 132(%rsp)
movb $114, 131(%rsp)
movb $111, 130(%rsp)
movb $119, 129(%rsp)
leaq  129(%rsp), %rdx
movq %rdx, 121(%rsp)
movq  135(%rsp), %rax
movq  121(%rsp), %rdx
movq %rdx, (%rax)
movl $2, 117(%rsp)
movslq  117(%rsp), %rdx
imulq $8, %rdx
movq  173(%rsp), %rax
addq %rdx, %rax
movq %rax, 109(%rsp)
movb $0, 108(%rsp)
movb $110, 107(%rsp)
movb $105, 106(%rsp)
movb $97, 105(%rsp)
movb $103, 104(%rsp)
movb $97, 103(%rsp)
leaq  103(%rsp), %rdx
movq %rdx, 95(%rsp)
movq  109(%rsp), %rax
movq  95(%rsp), %rdx
movq %rdx, (%rax)
movl $0, 91(%rsp)
movslq  91(%rsp), %rdx
imulq $8, %rdx
movq  173(%rsp), %rax
addq %rdx, %rax
movq %rax, 83(%rsp)
movq  83(%rsp), %rax
movq (%rax), %rdx
movq %rdx, 75(%rsp)
movq $0, 67(%rsp)
movq  75(%rsp), %rdx
movq %rdx, 67(%rsp)
#__parameter_offset_pass
leaq  67(%rsp), %rcx
callq print_str
movb %al, 66(%rsp)
movl $1, 62(%rsp)
movslq  62(%rsp), %rdx
imulq $8, %rdx
movq  173(%rsp), %rax
addq %rdx, %rax
movq %rax, 54(%rsp)
movq  54(%rsp), %rax
movq (%rax), %rdx
movq %rdx, 46(%rsp)
movq $0, 38(%rsp)
movq  46(%rsp), %rdx
movq %rdx, 38(%rsp)
#__parameter_offset_pass
leaq  38(%rsp), %rcx
callq print_str
movb %al, 37(%rsp)
movl $2, 33(%rsp)
movslq  33(%rsp), %rdx
imulq $8, %rdx
movq  173(%rsp), %rax
addq %rdx, %rax
movq %rax, 25(%rsp)
movq  25(%rsp), %rax
movq (%rax), %rdx
movq %rdx, 17(%rsp)
movq $0, 9(%rsp)
movq  17(%rsp), %rdx
movq %rdx, 9(%rsp)
#__parameter_offset_pass
leaq  9(%rsp), %rcx
callq print_str
movb %al, 8(%rsp)
#__clear_scope_3
addq $217, %rsp
#__end_scope_3
xor %rax, %rax
retq
.seh_endproc

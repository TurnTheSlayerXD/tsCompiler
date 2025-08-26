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
subq $200, %rsp
movb $0, 199(%rsp)
movb $111, 198(%rsp)
movb $108, 197(%rsp)
movb $108, 196(%rsp)
movb $101, 195(%rsp)
movb $104, 194(%rsp)
leaq  194(%rsp), %rdx
movq %rdx, 186(%rsp)
movb $0, %ah
movb %ah, 185(%rsp)
movb $0, %ah
movb %ah, 184(%rsp)
movb $0, %ah
movb %ah, 183(%rsp)
movb $0, %ah
movb %ah, 182(%rsp)
movb $0, %ah
movb %ah, 181(%rsp)
movb $0, %ah
movb %ah, 180(%rsp)
movb $0, %ah
movb %ah, 179(%rsp)
movb $0, %ah
movb %ah, 178(%rsp)
movb $0, %ah
movb %ah, 177(%rsp)
movb $0, %ah
movb %ah, 176(%rsp)
leaq  176(%rsp), %rdx
movq %rdx, 168(%rsp)
movl $0, 164(%rsp)
movslq  164(%rsp), %rdx
imulq $1, %rdx
movq  168(%rsp), %rax
addq %rdx, %rax
movq %rax, 156(%rsp)
movl $0, 152(%rsp)
movslq  152(%rsp), %rdx
imulq $1, %rdx
movq  186(%rsp), %rax
addq %rdx, %rax
movq %rax, 144(%rsp)
movq  144(%rsp), %rax
movb (%rax), %dh
movb %dh, 143(%rsp)
movq  156(%rsp), %rax
movb  143(%rsp), %dh
movb %dh, (%rax)
movl $1, 139(%rsp)
movslq  139(%rsp), %rdx
imulq $1, %rdx
movq  168(%rsp), %rax
addq %rdx, %rax
movq %rax, 131(%rsp)
movl $1, 127(%rsp)
movslq  127(%rsp), %rdx
imulq $1, %rdx
movq  186(%rsp), %rax
addq %rdx, %rax
movq %rax, 119(%rsp)
movq  119(%rsp), %rax
movb (%rax), %dh
movb %dh, 118(%rsp)
movq  131(%rsp), %rax
movb  118(%rsp), %dh
movb %dh, (%rax)
movl $2, 114(%rsp)
movslq  114(%rsp), %rdx
imulq $1, %rdx
movq  168(%rsp), %rax
addq %rdx, %rax
movq %rax, 106(%rsp)
movl $2, 102(%rsp)
movslq  102(%rsp), %rdx
imulq $1, %rdx
movq  186(%rsp), %rax
addq %rdx, %rax
movq %rax, 94(%rsp)
movq  94(%rsp), %rax
movb (%rax), %dh
movb %dh, 93(%rsp)
movq  106(%rsp), %rax
movb  93(%rsp), %dh
movb %dh, (%rax)
movl $3, 89(%rsp)
movslq  89(%rsp), %rdx
imulq $1, %rdx
movq  168(%rsp), %rax
addq %rdx, %rax
movq %rax, 81(%rsp)
movl $3, 77(%rsp)
movslq  77(%rsp), %rdx
imulq $1, %rdx
movq  186(%rsp), %rax
addq %rdx, %rax
movq %rax, 69(%rsp)
movq  69(%rsp), %rax
movb (%rax), %dh
movb %dh, 68(%rsp)
movq  81(%rsp), %rax
movb  68(%rsp), %dh
movb %dh, (%rax)
movl $4, 64(%rsp)
movslq  64(%rsp), %rdx
imulq $1, %rdx
movq  168(%rsp), %rax
addq %rdx, %rax
movq %rax, 56(%rsp)
movl $4, 52(%rsp)
movslq  52(%rsp), %rdx
imulq $1, %rdx
movq  186(%rsp), %rax
addq %rdx, %rax
movq %rax, 44(%rsp)
movq  44(%rsp), %rax
movb (%rax), %dh
movb %dh, 43(%rsp)
movq  56(%rsp), %rax
movb  43(%rsp), %dh
movb %dh, (%rax)
movl $5, 39(%rsp)
movslq  39(%rsp), %rdx
imulq $1, %rdx
movq  168(%rsp), %rax
addq %rdx, %rax
movq %rax, 31(%rsp)
movb $70, %ah
movb %ah, 30(%rsp)
movq  31(%rsp), %rax
movb  30(%rsp), %dh
movb %dh, (%rax)
movl $6, 26(%rsp)
movslq  26(%rsp), %rdx
imulq $1, %rdx
movq  168(%rsp), %rax
addq %rdx, %rax
movq %rax, 18(%rsp)
movb $70, %ah
movb %ah, 17(%rsp)
movq  18(%rsp), %rax
movb  17(%rsp), %dh
movb %dh, (%rax)
movq $0, 9(%rsp)
movq  168(%rsp), %rdx
movq %rdx, 9(%rsp)
#__parameter_offset_pass
leaq  9(%rsp), %rcx
callq print_str
movb %al, 8(%rsp)
#__clear_scope_3
addq $200, %rsp
#__end_scope_3
xor %rax, %rax
retq
.seh_endproc

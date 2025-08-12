.def	fuu;
.endef
.globl	fuu
fuu:
.seh_proc fuu
#__begin_scope_0
#__init
subq $36, %rsp
movl 0(%rcx), %edx
movl %edx, 32(%rsp)
movl 4(%rcx), %edx
movl %edx, 28(%rsp)
movl 8(%rcx), %edx
movl %edx, 24(%rsp)
#__end_scope_0
#__begin_scope_1
#__init
subq $21, %rsp
movl $1, 17(%rsp)
movl  45(%rsp), %eax
movl  17(%rsp), %ebx
movb $1, 16(%rsp)
cmpl %eax, %ebx
je mark_2
movb $0, 16(%rsp)
mark_2 :
#IF
xor %edx, %edx
movb  16(%rsp), %dh
cmpb $0, %dh
je mark_0
movl $0, 12(%rsp)
movl  12(%rsp), %eax
addq $1000, %rsp
retq
movl $0, 8(%rsp)
addq $1000, %rsp
#__end_scope_1
#__begin_scope_0
jmp mark_1
mark_0 :
mark_1 :
movl  24(%rsp), %edx
addl  28(%rsp), %edx
movl %edx, 20(%rsp)
movl  20(%rsp), %edx
addl  32(%rsp), %edx
movl %edx, 16(%rsp)
movl  16(%rsp), %eax
addq $1000, %rsp
retq
movl  24(%rsp), %edx
addl  28(%rsp), %edx
movl %edx, 12(%rsp)
movl  12(%rsp), %edx
addl  32(%rsp), %edx
movl %edx, 8(%rsp)
addq $1000, %rsp
#__end_scope_0
xor %eax, %eax
retq
.seh_endproc
.def	main;
.endef
.globl	main
main:
.seh_proc main
#__begin_scope_2
#__init
subq $90, %rsp
movl %ecx, 86(%rsp)
movq %rdx, 78(%rsp)
movb $0, %ah
movb %ah, 77(%rsp)
movl $1, 73(%rsp)
movl $2, 69(%rsp)
movl $3, 65(%rsp)
movl $0, 61(%rsp)
movl  73(%rsp), %edx
movl %edx, 61(%rsp)
movl $0, 57(%rsp)
movl  69(%rsp), %edx
movl %edx, 57(%rsp)
movl $0, 53(%rsp)
movl  65(%rsp), %edx
movl %edx, 53(%rsp)
#__parameter_offset_pass
leaq  53(%rsp), %rcx
callq fuu
movl %eax, 49(%rsp)
movl $6, 45(%rsp)
movl  49(%rsp), %edx
subl  45(%rsp), %edx
movl %edx, 41(%rsp)
movb $49, %ah
movb %ah, 40(%rsp)
movsbl  40(%rsp), %edx
movl %edx, 36(%rsp)
movl  41(%rsp), %edx
addl  36(%rsp), %edx
movl %edx, 32(%rsp)
movb  32(%rsp), %dh
movb %dh, 77(%rsp)
leaq  77(%rsp), %rdx
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
addq $1000, %rsp
#__end_scope_2
xor %eax, %eax
retq
.seh_endproc

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
movl  8(%rsp), %edx
movl %edx, 12(%rsp)
#__end_scope_0
#__begin_scope_1
#__init_scope_1
subq $27, %rsp
mark_0 :
movslq  39(%rsp), %rdx
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
movl  39(%rsp), %edx
addl  12(%rsp), %edx
movl %edx, 8(%rsp)
movl  8(%rsp), %edx
movl %edx, 39(%rsp)
jmp mark_0
mark_1 :
#__clear_scope_1
addq $27, %rsp
#__end_scope_1
#__begin_scope_0
movl  12(%rsp), %eax
#__clear_scope_0
addq $24, %rsp
retq
#__clear_scope_0
addq $24, %rsp
#__end_scope_0
retq
.seh_endproc
.def	print_num;
.endef
.globl	print_num
print_num:
.seh_proc print_num
#__begin_scope_2
#__init_scope_2
subq $83, %rsp
movl 0(%rcx), %edx
movl %edx, 79(%rsp)
movq $0, 71(%rsp)
movb $0, 70(%rsp)
movb $0, 69(%rsp)
movb $0, 68(%rsp)
movb $0, 67(%rsp)
movb $0, 66(%rsp)
movb $0, 65(%rsp)
movb $0, 64(%rsp)
movb $0, 63(%rsp)
movb $0, 62(%rsp)
movb $0, 61(%rsp)
movb $0, 60(%rsp)
movb $0, 59(%rsp)
movb $0, 58(%rsp)
movb $0, 57(%rsp)
movb $0, 56(%rsp)
movb $0, 55(%rsp)
movb $0, 54(%rsp)
movb $0, 53(%rsp)
movb $0, 52(%rsp)
leaq  52(%rsp), %rdx
movq %rdx, 44(%rsp)
movq  44(%rsp), %rdx
movq %rdx, 71(%rsp)
movl $0, 40(%rsp)
movl $0, 36(%rsp)
movl  36(%rsp), %edx
movl %edx, 40(%rsp)
#__end_scope_2
#__begin_scope_3
#__init_scope_3
subq $58, %rsp
mark_3 :
movl $0, 54(%rsp)
movl  137(%rsp), %eax
movl  54(%rsp), %ebx
movb $1, 53(%rsp)
cmpl %eax, %ebx
jl mark_5
movb $0, 53(%rsp)
mark_5 :
#WHILE
xor %edx, %edx
movb  53(%rsp), %dh
cmpb $0, %dh
je mark_4
movl $0, 49(%rsp)
movl $10, 45(%rsp)
movl  137(%rsp), %eax
cdq
idivl  45(%rsp)
movl %edx, 41(%rsp)
movl  41(%rsp), %edx
movl %edx, 49(%rsp)
movl $10, 37(%rsp)
movl  137(%rsp), %eax
cdq
idivl  37(%rsp)
movl %eax, 33(%rsp)
movl  33(%rsp), %edx
movl %edx, 137(%rsp)
movslq  98(%rsp), %rdx
imulq $1, %rdx
movq  129(%rsp), %rax
addq %rdx, %rax
movq %rax, 25(%rsp)
movb $48, %ah
movb %ah, 24(%rsp)
movsbl  24(%rsp), %edx
movl %edx, 20(%rsp)
movl  49(%rsp), %edx
addl  20(%rsp), %edx
movl %edx, 16(%rsp)
movq  25(%rsp), %rax
movb  16(%rsp), %dh
movb %dh, (%rax)
movl $1, 12(%rsp)
movl  98(%rsp), %edx
addl  12(%rsp), %edx
movl %edx, 8(%rsp)
movl  8(%rsp), %edx
movl %edx, 98(%rsp)
jmp mark_3
mark_4 :
#__clear_scope_3
addq $58, %rsp
#__end_scope_3
#__begin_scope_2
movl $0, 32(%rsp)
movq $0, 24(%rsp)
movq  71(%rsp), %rdx
movq %rdx, 24(%rsp)
#__parameter_offset_pass
leaq  24(%rsp), %rcx
callq strlen
movl %eax, 20(%rsp)
movl  20(%rsp), %edx
movl %edx, 32(%rsp)
#__end_scope_2
#__begin_scope_4
#__init_scope_4
subq $108, %rsp
movl $0, 104(%rsp)
movl $0, 100(%rsp)
movl  100(%rsp), %edx
movl %edx, 104(%rsp)
mark_6 :
movl $2, 96(%rsp)
movl  140(%rsp), %eax
cdq
idivl  96(%rsp)
movl %eax, 92(%rsp)
movl  104(%rsp), %eax
movl  92(%rsp), %ebx
movb $1, 91(%rsp)
cmpl %eax, %ebx
jg mark_8
movb $0, 91(%rsp)
mark_8 :
#FOR
xor %edx, %edx
movb  91(%rsp), %dh
cmpb $0, %dh
je mark_7
movb $0, %ah
movb %ah, 90(%rsp)
movslq  104(%rsp), %rdx
imulq $1, %rdx
movq  179(%rsp), %rax
addq %rdx, %rax
movq %rax, 82(%rsp)
movq  82(%rsp), %rax
movb (%rax), %dh
movb %dh, 81(%rsp)
movb  81(%rsp), %dh
movb %dh, 90(%rsp)
movslq  104(%rsp), %rdx
imulq $1, %rdx
movq  179(%rsp), %rax
addq %rdx, %rax
movq %rax, 73(%rsp)
movslq  140(%rsp), %rdx
imulq $1, %rdx
movq  179(%rsp), %rax
addq %rdx, %rax
movq %rax, 65(%rsp)
movl $1, 61(%rsp)
movslq  61(%rsp), %rdx
imulq $1, %rdx
movq  65(%rsp), %rax
subq %rdx, %rax
movq %rax, 53(%rsp)
movslq  104(%rsp), %rdx
imulq $1, %rdx
movq  53(%rsp), %rax
subq %rdx, %rax
movq %rax, 45(%rsp)
movq  45(%rsp), %rax
movb (%rax), %dh
movb %dh, 44(%rsp)
movq  73(%rsp), %rax
movb  44(%rsp), %dh
movb %dh, (%rax)
movslq  140(%rsp), %rdx
imulq $1, %rdx
movq  179(%rsp), %rax
addq %rdx, %rax
movq %rax, 36(%rsp)
movl $1, 32(%rsp)
movslq  32(%rsp), %rdx
imulq $1, %rdx
movq  36(%rsp), %rax
subq %rdx, %rax
movq %rax, 24(%rsp)
movslq  104(%rsp), %rdx
imulq $1, %rdx
movq  24(%rsp), %rax
subq %rdx, %rax
movq %rax, 16(%rsp)
movq  16(%rsp), %rax
movb  90(%rsp), %dh
movb %dh, (%rax)
movl $1, 12(%rsp)
movl  104(%rsp), %edx
addl  12(%rsp), %edx
movl %edx, 8(%rsp)
movl  8(%rsp), %edx
movl %edx, 104(%rsp)
jmp mark_6
mark_7 :
#__clear_scope_4
addq $108, %rsp
#__end_scope_4
#__begin_scope_2
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 12(%rsp)
movl $0, 8(%rsp)
movq  12(%rsp), %rcx
leaq  8(%rsp), %r9
movq   71(%rsp), %rdx
movl   32(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
#__clear_scope_2
addq $83, %rsp
#__end_scope_2
retq
.seh_endproc
.def	main;
.endef
.globl	main
main:
.seh_proc main
#__begin_scope_5
#__init_scope_5
subq $33, %rsp
movl %ecx, 29(%rsp)
movq %rdx, 21(%rsp)
movl $0, 17(%rsp)
movl $14883, 13(%rsp)
movl  13(%rsp), %edx
movl %edx, 17(%rsp)
movl $0, 9(%rsp)
movl  17(%rsp), %edx
movl %edx, 9(%rsp)
#__parameter_offset_pass
leaq  9(%rsp), %rcx
callq print_num
movb %al, 8(%rsp)
#__clear_scope_5
addq $33, %rsp
#__end_scope_5
xor %rax, %rax
retq
.seh_endproc

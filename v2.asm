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
.def	num_to_str;
.endef
.globl	num_to_str
num_to_str:
.seh_proc num_to_str
#__begin_scope_3
#__init_scope_3
subq $45, %rsp
movl 0(%rcx), %edx
movl %edx, 41(%rsp)
movq 4(%rcx), %rdx
movq %rdx, 33(%rsp)
movl $0, 29(%rsp)
movl  41(%rsp), %eax
movl  29(%rsp), %ebx
movb $1, 28(%rsp)
cmpl %eax, %ebx
je mark_5
movb $0, 28(%rsp)
mark_5 :
#IF
xor %edx, %edx
movb  28(%rsp), %dh
cmpb $0, %dh
je mark_3
#__end_scope_3
#__begin_scope_4
#__init_scope_4
subq $21, %rsp
movl $0, 17(%rsp)
movslq  17(%rsp), %rdx
imulq $1, %rdx
movq  54(%rsp), %rax
addq %rdx, %rax
movq %rax, 9(%rsp)
movb $48, %ah
movb %ah, 8(%rsp)
movq  9(%rsp), %rax
movb  8(%rsp), %dh
movb %dh, (%rax)
#__clear_scope_4
addq $21, %rsp
#__end_scope_4
#__begin_scope_3
jmp mark_4
mark_3 :
#__end_scope_3
#__begin_scope_5
#__init_scope_5
subq $24, %rsp
movl $0, 20(%rsp)
#__end_scope_5
#__begin_scope_6
#__init_scope_6
subq $54, %rsp
mark_7 :
movl $0, 50(%rsp)
movl  119(%rsp), %eax
movl  50(%rsp), %ebx
movb $1, 49(%rsp)
cmpl %eax, %ebx
jl mark_9
movb $0, 49(%rsp)
mark_9 :
#WHILE
xor %edx, %edx
movb  49(%rsp), %dh
cmpb $0, %dh
je mark_8
movl $10, 45(%rsp)
movl  119(%rsp), %eax
cdq
idivl  45(%rsp)
movl %edx, 41(%rsp)
movl $10, 37(%rsp)
movl  119(%rsp), %eax
cdq
idivl  37(%rsp)
movl %eax, 33(%rsp)
movl  33(%rsp), %edx
movl %edx, 119(%rsp)
movslq  74(%rsp), %rdx
imulq $1, %rdx
movq  111(%rsp), %rax
addq %rdx, %rax
movq %rax, 25(%rsp)
movb $48, %ah
movb %ah, 24(%rsp)
movsbl  24(%rsp), %edx
movl %edx, 20(%rsp)
movl  20(%rsp), %edx
addl  41(%rsp), %edx
movl %edx, 16(%rsp)
movq  25(%rsp), %rax
movb  16(%rsp), %dh
movb %dh, (%rax)
movl $1, 12(%rsp)
movl  74(%rsp), %edx
addl  12(%rsp), %edx
movl %edx, 8(%rsp)
movl  8(%rsp), %edx
movl %edx, 74(%rsp)
jmp mark_7
mark_8 :
#__clear_scope_6
addq $54, %rsp
#__end_scope_6
#__begin_scope_5
movq $0, 12(%rsp)
movq  57(%rsp), %rdx
movq %rdx, 12(%rsp)
#__parameter_offset_pass
leaq  12(%rsp), %rcx
callq strlen
movl %eax, 8(%rsp)
#__end_scope_5
#__begin_scope_7
#__init_scope_7
subq $87, %rsp
movl $0, 83(%rsp)
mark_10 :
movl $2, 79(%rsp)
movl  95(%rsp), %eax
cdq
idivl  79(%rsp)
movl %eax, 75(%rsp)
movl  83(%rsp), %eax
movl  75(%rsp), %ebx
movb $1, 74(%rsp)
cmpl %eax, %ebx
jg mark_12
movb $0, 74(%rsp)
mark_12 :
#FOR
xor %edx, %edx
movb  74(%rsp), %dh
cmpb $0, %dh
je mark_11
movslq  83(%rsp), %rdx
imulq $1, %rdx
movq  144(%rsp), %rax
addq %rdx, %rax
movq %rax, 66(%rsp)
movq  66(%rsp), %rax
movb (%rax), %dh
movb %dh, 65(%rsp)
movslq  83(%rsp), %rdx
imulq $1, %rdx
movq  144(%rsp), %rax
addq %rdx, %rax
movq %rax, 57(%rsp)
movl $1, 53(%rsp)
movl  95(%rsp), %edx
subl  53(%rsp), %edx
movl %edx, 49(%rsp)
movl  49(%rsp), %edx
subl  83(%rsp), %edx
movl %edx, 45(%rsp)
movslq  45(%rsp), %rdx
imulq $1, %rdx
movq  144(%rsp), %rax
addq %rdx, %rax
movq %rax, 37(%rsp)
movq  37(%rsp), %rax
movb (%rax), %dh
movb %dh, 36(%rsp)
movq  57(%rsp), %rax
movb  36(%rsp), %dh
movb %dh, (%rax)
movl $1, 32(%rsp)
movl  95(%rsp), %edx
subl  32(%rsp), %edx
movl %edx, 28(%rsp)
movl  28(%rsp), %edx
subl  83(%rsp), %edx
movl %edx, 24(%rsp)
movslq  24(%rsp), %rdx
imulq $1, %rdx
movq  144(%rsp), %rax
addq %rdx, %rax
movq %rax, 16(%rsp)
movq  16(%rsp), %rax
movb  65(%rsp), %dh
movb %dh, (%rax)
movl $1, 12(%rsp)
movl  83(%rsp), %edx
addl  12(%rsp), %edx
movl %edx, 8(%rsp)
movl  8(%rsp), %edx
movl %edx, 83(%rsp)
jmp mark_10
mark_11 :
#__clear_scope_7
addq $87, %rsp
#__end_scope_7
#__begin_scope_5
#__clear_scope_5
addq $24, %rsp
#__end_scope_5
#__begin_scope_3
jmp mark_4
mark_6 :
mark_4 :
movq $0, 20(%rsp)
movq  33(%rsp), %rdx
movq %rdx, 20(%rsp)
#__parameter_offset_pass
leaq  20(%rsp), %rcx
callq strlen
movl %eax, 16(%rsp)
movslq  16(%rsp), %rdx
imulq $1, %rdx
movq  33(%rsp), %rax
addq %rdx, %rax
movq %rax, 8(%rsp)
movq  8(%rsp), %rax
#__clear_scope_3
addq $45, %rsp
retq
#__clear_scope_3
addq $45, %rsp
#__end_scope_3
retq
.seh_endproc
.def	starts_with;
.endef
.globl	starts_with
starts_with:
.seh_proc starts_with
#__begin_scope_8
#__init_scope_8
subq $31, %rsp
movq 0(%rcx), %rdx
movq %rdx, 23(%rsp)
movq 8(%rcx), %rdx
movq %rdx, 15(%rsp)
#__end_scope_8
#__begin_scope_9
#__init_scope_9
subq $41, %rsp
mark_13 :
movq  64(%rsp), %rax
movb (%rax), %dh
movb %dh, 40(%rsp)
movb $0, %ah
movb %ah, 39(%rsp)
movb  40(%rsp), %ah
movb  39(%rsp), %al
movb $1, 38(%rsp)
cmpb %ah, %al
jne mark_15
movb $0, 38(%rsp)
mark_15 :
movq  56(%rsp), %rax
movb (%rax), %dh
movb %dh, 37(%rsp)
movq  64(%rsp), %rax
movb (%rax), %dh
movb %dh, 36(%rsp)
movb  37(%rsp), %ah
movb  36(%rsp), %al
movb $1, 35(%rsp)
cmpb %ah, %al
je mark_16
movb $0, 35(%rsp)
mark_16 :
movb $1, 34(%rsp)
cmpb $0, 38(%rsp)
jne mark_17
movb $0, 34(%rsp)
mark_17 :
movb $1, 33(%rsp)
cmpb $0, 35(%rsp)
jne mark_18
movb $0, 33(%rsp)
mark_18 :
movb  34(%rsp), %dh
movb  33(%rsp), %al
andb %dh, %al
movb $1, 32(%rsp)
cmpb $0, %al
jne mark_19
movb $0, 32(%rsp)
mark_19 :
#WHILE
xor %edx, %edx
movb  32(%rsp), %dh
cmpb $0, %dh
je mark_14
movl $1, 28(%rsp)
movslq  28(%rsp), %rdx
imulq $1, %rdx
movq  56(%rsp), %rax
addq %rdx, %rax
movq %rax, 20(%rsp)
movq  20(%rsp), %rdx
movq %rdx, 56(%rsp)
movl $1, 16(%rsp)
movslq  16(%rsp), %rdx
imulq $1, %rdx
movq  64(%rsp), %rax
addq %rdx, %rax
movq %rax, 8(%rsp)
movq  8(%rsp), %rdx
movq %rdx, 64(%rsp)
jmp mark_13
mark_14 :
#__clear_scope_9
addq $41, %rsp
#__end_scope_9
#__begin_scope_8
movq  23(%rsp), %rax
movb (%rax), %dh
movb %dh, 14(%rsp)
movb $0, %ah
movb %ah, 13(%rsp)
movb  14(%rsp), %ah
movb  13(%rsp), %al
movb $1, 12(%rsp)
cmpb %ah, %al
jne mark_22
movb $0, 12(%rsp)
mark_22 :
#IF
xor %edx, %edx
movb  12(%rsp), %dh
cmpb $0, %dh
je mark_20
#__end_scope_8
#__begin_scope_10
#__init_scope_10
subq $12, %rsp
movl $0, 8(%rsp)
movl  8(%rsp), %eax
#__clear_scope_10
addq $12, %rsp
#__clear_scope_8
addq $31, %rsp
retq
#__clear_scope_10
addq $12, %rsp
#__end_scope_10
#__begin_scope_8
jmp mark_21
mark_20 :
mark_21 :
movl $1, 8(%rsp)
movl  8(%rsp), %eax
#__clear_scope_8
addq $31, %rsp
retq
#__clear_scope_8
addq $31, %rsp
#__end_scope_8
retq
.seh_endproc
.def	write_to;
.endef
.globl	write_to
write_to:
.seh_proc write_to
#__begin_scope_11
#__init_scope_11
subq $24, %rsp
movq 0(%rcx), %rdx
movq %rdx, 16(%rsp)
movq 8(%rcx), %rdx
movq %rdx, 8(%rsp)
#__end_scope_11
#__begin_scope_12
#__init_scope_12
subq $36, %rsp
mark_23 :
movq  52(%rsp), %rax
movb (%rax), %dh
movb %dh, 35(%rsp)
movb $0, %ah
movb %ah, 34(%rsp)
movb  35(%rsp), %ah
movb  34(%rsp), %al
movb $1, 33(%rsp)
cmpb %ah, %al
jne mark_25
movb $0, 33(%rsp)
mark_25 :
#WHILE
xor %edx, %edx
movb  33(%rsp), %dh
cmpb $0, %dh
je mark_24
movq  52(%rsp), %rax
movb (%rax), %dh
movb %dh, 32(%rsp)
movq  44(%rsp), %rax
movb  32(%rsp), %dh
movb %dh, (%rax)
movl $1, 28(%rsp)
movslq  28(%rsp), %rdx
imulq $1, %rdx
movq  44(%rsp), %rax
addq %rdx, %rax
movq %rax, 20(%rsp)
movq  20(%rsp), %rdx
movq %rdx, 44(%rsp)
movl $1, 16(%rsp)
movslq  16(%rsp), %rdx
imulq $1, %rdx
movq  52(%rsp), %rax
addq %rdx, %rax
movq %rax, 8(%rsp)
movq  8(%rsp), %rdx
movq %rdx, 52(%rsp)
jmp mark_23
mark_24 :
#__clear_scope_12
addq $36, %rsp
#__end_scope_12
#__begin_scope_11
movq  8(%rsp), %rax
#__clear_scope_11
addq $24, %rsp
retq
#__clear_scope_11
addq $24, %rsp
#__end_scope_11
retq
.seh_endproc
.def	printf;
.endef
.globl	printf
printf:
.seh_proc printf
#__begin_scope_13
#__init_scope_13
subq $157, %rsp
movq 0(%rcx), %rdx
movq %rdx, 149(%rsp)
movq 8(%rcx), %rdx
movq %rdx, 141(%rsp)
movb $0, %ah
movb %ah, 140(%rsp)
movb $0, %ah
movb %ah, 139(%rsp)
movb $0, %ah
movb %ah, 138(%rsp)
movb $0, %ah
movb %ah, 137(%rsp)
movb $0, %ah
movb %ah, 136(%rsp)
movb $0, %ah
movb %ah, 135(%rsp)
movb $0, %ah
movb %ah, 134(%rsp)
movb $0, %ah
movb %ah, 133(%rsp)
movb $0, %ah
movb %ah, 132(%rsp)
movb $0, %ah
movb %ah, 131(%rsp)
movb $0, %ah
movb %ah, 130(%rsp)
movb $0, %ah
movb %ah, 129(%rsp)
movb $0, %ah
movb %ah, 128(%rsp)
movb $0, %ah
movb %ah, 127(%rsp)
movb $0, %ah
movb %ah, 126(%rsp)
movb $0, %ah
movb %ah, 125(%rsp)
movb $0, %ah
movb %ah, 124(%rsp)
movb $0, %ah
movb %ah, 123(%rsp)
movb $0, %ah
movb %ah, 122(%rsp)
movb $0, %ah
movb %ah, 121(%rsp)
movb $0, %ah
movb %ah, 120(%rsp)
movb $0, %ah
movb %ah, 119(%rsp)
movb $0, %ah
movb %ah, 118(%rsp)
movb $0, %ah
movb %ah, 117(%rsp)
movb $0, %ah
movb %ah, 116(%rsp)
movb $0, %ah
movb %ah, 115(%rsp)
movb $0, %ah
movb %ah, 114(%rsp)
movb $0, %ah
movb %ah, 113(%rsp)
movb $0, %ah
movb %ah, 112(%rsp)
movb $0, %ah
movb %ah, 111(%rsp)
movb $0, %ah
movb %ah, 110(%rsp)
movb $0, %ah
movb %ah, 109(%rsp)
movb $0, %ah
movb %ah, 108(%rsp)
movb $0, %ah
movb %ah, 107(%rsp)
movb $0, %ah
movb %ah, 106(%rsp)
movb $0, %ah
movb %ah, 105(%rsp)
movb $0, %ah
movb %ah, 104(%rsp)
movb $0, %ah
movb %ah, 103(%rsp)
movb $0, %ah
movb %ah, 102(%rsp)
movb $0, %ah
movb %ah, 101(%rsp)
movb $0, %ah
movb %ah, 100(%rsp)
movb $0, %ah
movb %ah, 99(%rsp)
movb $0, %ah
movb %ah, 98(%rsp)
movb $0, %ah
movb %ah, 97(%rsp)
movb $0, %ah
movb %ah, 96(%rsp)
movb $0, %ah
movb %ah, 95(%rsp)
movb $0, %ah
movb %ah, 94(%rsp)
movb $0, %ah
movb %ah, 93(%rsp)
movb $0, %ah
movb %ah, 92(%rsp)
movb $0, %ah
movb %ah, 91(%rsp)
movb $0, %ah
movb %ah, 90(%rsp)
movb $0, %ah
movb %ah, 89(%rsp)
movb $0, %ah
movb %ah, 88(%rsp)
movb $0, %ah
movb %ah, 87(%rsp)
movb $0, %ah
movb %ah, 86(%rsp)
movb $0, %ah
movb %ah, 85(%rsp)
movb $0, %ah
movb %ah, 84(%rsp)
movb $0, %ah
movb %ah, 83(%rsp)
movb $0, %ah
movb %ah, 82(%rsp)
movb $0, %ah
movb %ah, 81(%rsp)
movb $0, %ah
movb %ah, 80(%rsp)
movb $0, %ah
movb %ah, 79(%rsp)
movb $0, %ah
movb %ah, 78(%rsp)
movb $0, %ah
movb %ah, 77(%rsp)
movb $0, %ah
movb %ah, 76(%rsp)
movb $0, %ah
movb %ah, 75(%rsp)
movb $0, %ah
movb %ah, 74(%rsp)
movb $0, %ah
movb %ah, 73(%rsp)
movb $0, %ah
movb %ah, 72(%rsp)
movb $0, %ah
movb %ah, 71(%rsp)
movb $0, %ah
movb %ah, 70(%rsp)
movb $0, %ah
movb %ah, 69(%rsp)
movb $0, %ah
movb %ah, 68(%rsp)
movb $0, %ah
movb %ah, 67(%rsp)
movb $0, %ah
movb %ah, 66(%rsp)
movb $0, %ah
movb %ah, 65(%rsp)
movb $0, %ah
movb %ah, 64(%rsp)
movb $0, %ah
movb %ah, 63(%rsp)
movb $0, %ah
movb %ah, 62(%rsp)
movb $0, %ah
movb %ah, 61(%rsp)
movb $0, %ah
movb %ah, 60(%rsp)
movb $0, %ah
movb %ah, 59(%rsp)
movb $0, %ah
movb %ah, 58(%rsp)
movb $0, %ah
movb %ah, 57(%rsp)
movb $0, %ah
movb %ah, 56(%rsp)
movb $0, %ah
movb %ah, 55(%rsp)
movb $0, %ah
movb %ah, 54(%rsp)
movb $0, %ah
movb %ah, 53(%rsp)
movb $0, %ah
movb %ah, 52(%rsp)
movb $0, %ah
movb %ah, 51(%rsp)
movb $0, %ah
movb %ah, 50(%rsp)
movb $0, %ah
movb %ah, 49(%rsp)
movb $0, %ah
movb %ah, 48(%rsp)
movb $0, %ah
movb %ah, 47(%rsp)
movb $0, %ah
movb %ah, 46(%rsp)
movb $0, %ah
movb %ah, 45(%rsp)
movb $0, %ah
movb %ah, 44(%rsp)
movb $0, %ah
movb %ah, 43(%rsp)
movb $0, %ah
movb %ah, 42(%rsp)
movb $0, %ah
movb %ah, 41(%rsp)
leaq  41(%rsp), %rdx
movq %rdx, 33(%rsp)
movq $0, 25(%rsp)
movq  33(%rsp), %rdx
movq %rdx, 25(%rsp)
movl $0, 21(%rsp)
movl $0, 17(%rsp)
#__end_scope_13
#__begin_scope_14
#__init_scope_14
subq $51, %rsp
mark_26 :
movq  192(%rsp), %rax
movb (%rax), %dh
movb %dh, 50(%rsp)
movb $0, %ah
movb %ah, 49(%rsp)
movb  50(%rsp), %ah
movb  49(%rsp), %al
movb $1, 48(%rsp)
cmpb %ah, %al
jne mark_28
movb $0, 48(%rsp)
mark_28 :
#WHILE
xor %edx, %edx
movb  48(%rsp), %dh
cmpb $0, %dh
je mark_27
movl $1, 44(%rsp)
movslq  44(%rsp), %rdx
imulq $1, %rdx
movq  192(%rsp), %rax
addq %rdx, %rax
movq %rax, 36(%rsp)
movq  36(%rsp), %rax
movb (%rax), %dh
movb %dh, 35(%rsp)
movb $0, %ah
movb %ah, 34(%rsp)
movb  35(%rsp), %ah
movb  34(%rsp), %al
movb $1, 33(%rsp)
cmpb %ah, %al
jne mark_31
movb $0, 33(%rsp)
mark_31 :
#IF
xor %edx, %edx
movb  33(%rsp), %dh
cmpb $0, %dh
je mark_29
#__end_scope_14
#__begin_scope_15
#__init_scope_15
subq $80, %rsp
movb $0, 79(%rsp)
movb $115, 78(%rsp)
movb $37, 77(%rsp)
leaq  77(%rsp), %rdx
movq %rdx, 69(%rsp)
movq $0, 61(%rsp)
movq  272(%rsp), %rdx
movq %rdx, 61(%rsp)
movq $0, 53(%rsp)
movq  69(%rsp), %rdx
movq %rdx, 53(%rsp)
#__parameter_offset_pass
leaq  53(%rsp), %rcx
callq starts_with
movl %eax, 49(%rsp)
movl $1, 45(%rsp)
movl  49(%rsp), %eax
movl  45(%rsp), %ebx
movb $1, 44(%rsp)
cmpl %eax, %ebx
je mark_34
movb $0, 44(%rsp)
mark_34 :
#IF
xor %edx, %edx
movb  44(%rsp), %dh
cmpb $0, %dh
je mark_32
#__end_scope_15
#__begin_scope_16
#__init_scope_16
subq $88, %rsp
movslq  236(%rsp), %rdx
imulq $8, %rdx
movq  368(%rsp), %rax
addq %rdx, %rax
movq %rax, 80(%rsp)
movq  80(%rsp), %rax
movq (%rax), %rdx
movq %rdx, 72(%rsp)
movq $0, 64(%rsp)
movq  244(%rsp), %rdx
movq %rdx, 64(%rsp)
movq $0, 56(%rsp)
movq  72(%rsp), %rdx
movq %rdx, 56(%rsp)
#__parameter_offset_pass
leaq  56(%rsp), %rcx
callq write_to
movq %rax, 48(%rsp)
movq  48(%rsp), %rdx
movq %rdx, 244(%rsp)
movl $1, 44(%rsp)
movl  236(%rsp), %edx
addl  44(%rsp), %edx
movl %edx, 40(%rsp)
movl  40(%rsp), %edx
movl %edx, 236(%rsp)
movl $2, 36(%rsp)
movslq  36(%rsp), %rdx
imulq $1, %rdx
movq  360(%rsp), %rax
addq %rdx, %rax
movq %rax, 28(%rsp)
movq  28(%rsp), %rdx
movq %rdx, 360(%rsp)
movb $0, 27(%rsp)
movb $115, 26(%rsp)
movb $37, 25(%rsp)
leaq  25(%rsp), %rdx
movq %rdx, 17(%rsp)
movq $0, 9(%rsp)
movq  17(%rsp), %rdx
movq %rdx, 9(%rsp)
#__parameter_offset_pass
leaq  9(%rsp), %rcx
callq print_str
movb %al, 8(%rsp)
#__clear_scope_16
addq $88, %rsp
#__end_scope_16
#__clear_scope_15
addq $80, %rsp
#__end_scope_15
jmp mark_26
#__clear_scope_16
addq $88, %rsp
#__end_scope_16
#__begin_scope_15
jmp mark_33
mark_32 :
movb $0, 43(%rsp)
movb $100, 42(%rsp)
movb $37, 41(%rsp)
leaq  41(%rsp), %rdx
movq %rdx, 33(%rsp)
movq $0, 25(%rsp)
movq  272(%rsp), %rdx
movq %rdx, 25(%rsp)
movq $0, 17(%rsp)
movq  33(%rsp), %rdx
movq %rdx, 17(%rsp)
#__parameter_offset_pass
leaq  17(%rsp), %rcx
callq starts_with
movl %eax, 13(%rsp)
movl $1, 9(%rsp)
movl  13(%rsp), %eax
movl  9(%rsp), %ebx
movb $1, 8(%rsp)
cmpl %eax, %ebx
je mark_36
movb $0, 8(%rsp)
mark_36 :
#IF
xor %edx, %edx
movb  8(%rsp), %dh
cmpb $0, %dh
je mark_35
#__end_scope_15
#__begin_scope_17
#__init_scope_17
subq $69, %rsp
movslq  217(%rsp), %rdx
imulq $8, %rdx
movq  349(%rsp), %rax
addq %rdx, %rax
movq %rax, 61(%rsp)
movq  61(%rsp), %rax
movq (%rax), %rdx
movq %rdx, 53(%rsp)
movq  53(%rsp), %rax
movb (%rax), %dh
movb %dh, 52(%rsp)
movq $0, 44(%rsp)
movq  225(%rsp), %rdx
movq %rdx, 44(%rsp)
movl $0, 40(%rsp)
movsbl  52(%rsp), %edx
movl %edx, 36(%rsp)
movl  36(%rsp), %edx
movl %edx, 40(%rsp)
#__parameter_offset_pass
leaq  40(%rsp), %rcx
callq num_to_str
movq %rax, 28(%rsp)
movq  28(%rsp), %rdx
movq %rdx, 225(%rsp)
movl $1, 24(%rsp)
movl  217(%rsp), %edx
addl  24(%rsp), %edx
movl %edx, 20(%rsp)
movl  20(%rsp), %edx
movl %edx, 217(%rsp)
movl $2, 16(%rsp)
movslq  16(%rsp), %rdx
imulq $1, %rdx
movq  341(%rsp), %rax
addq %rdx, %rax
movq %rax, 8(%rsp)
movq  8(%rsp), %rdx
movq %rdx, 341(%rsp)
#__clear_scope_17
addq $69, %rsp
#__end_scope_17
#__clear_scope_15
addq $80, %rsp
#__end_scope_15
jmp mark_26
#__clear_scope_17
addq $69, %rsp
#__end_scope_17
#__begin_scope_15
jmp mark_33
mark_35 :
mark_33 :
#__clear_scope_15
addq $80, %rsp
#__end_scope_15
#__begin_scope_14
jmp mark_30
mark_29 :
mark_30 :
movq  192(%rsp), %rax
movb (%rax), %dh
movb %dh, 32(%rsp)
movq  76(%rsp), %rax
movb  32(%rsp), %dh
movb %dh, (%rax)
movl $1, 28(%rsp)
movslq  28(%rsp), %rdx
imulq $1, %rdx
movq  76(%rsp), %rax
addq %rdx, %rax
movq %rax, 20(%rsp)
movq  20(%rsp), %rdx
movq %rdx, 76(%rsp)
movl $1, 16(%rsp)
movslq  16(%rsp), %rdx
imulq $1, %rdx
movq  192(%rsp), %rax
addq %rdx, %rax
movq %rax, 8(%rsp)
movq  8(%rsp), %rdx
movq %rdx, 192(%rsp)
jmp mark_26
mark_27 :
#__clear_scope_14
addq $51, %rsp
#__end_scope_14
#__begin_scope_13
movq $0, 9(%rsp)
movq  33(%rsp), %rdx
movq %rdx, 9(%rsp)
#__parameter_offset_pass
leaq  9(%rsp), %rcx
callq print_str
movb %al, 8(%rsp)
#__clear_scope_13
addq $157, %rsp
#__end_scope_13
retq
.seh_endproc
.def	main;
.endef
.globl	main
main:
.seh_proc main
#__begin_scope_18
#__init_scope_18
subq $191, %rsp
movl %ecx, 187(%rsp)
movq %rdx, 179(%rsp)
movl $127, 175(%rsp)
movb $0, %ah
movb %ah, 174(%rsp)
movb  175(%rsp), %dh
movb %dh, 174(%rsp)
leaq  174(%rsp), %rdx
movq %rdx, 166(%rsp)
movb $0, 165(%rsp)
movb $110, 164(%rsp)
movb $105, 163(%rsp)
movb $97, 162(%rsp)
movb $103, 161(%rsp)
movb $97, 160(%rsp)
leaq  160(%rsp), %rdx
movq %rdx, 152(%rsp)
movq  152(%rsp), %rdx
movq %rdx, 144(%rsp)
movq  166(%rsp), %rdx
movq %rdx, 136(%rsp)
leaq  136(%rsp), %rdx
movq %rdx, 128(%rsp)
movq $0, 120(%rsp)
movq $0, 112(%rsp)
leaq  112(%rsp), %rdx
movq %rdx, 104(%rsp)
movl $0, 100(%rsp)
movslq  100(%rsp), %rdx
imulq $8, %rdx
movq  104(%rsp), %rax
addq %rdx, %rax
movq %rax, 92(%rsp)
movl $0, 88(%rsp)
movslq  88(%rsp), %rdx
imulq $8, %rdx
movq  128(%rsp), %rax
addq %rdx, %rax
movq %rax, 80(%rsp)
movq  80(%rsp), %rax
movq (%rax), %rdx
movq %rdx, 72(%rsp)
movq  92(%rsp), %rax
movq  72(%rsp), %rdx
movq %rdx, (%rax)
movl $1, 68(%rsp)
movslq  68(%rsp), %rdx
imulq $8, %rdx
movq  104(%rsp), %rax
addq %rdx, %rax
movq %rax, 60(%rsp)
movl $1, 56(%rsp)
movslq  56(%rsp), %rdx
imulq $8, %rdx
movq  128(%rsp), %rax
addq %rdx, %rax
movq %rax, 48(%rsp)
movq  48(%rsp), %rax
movq (%rax), %rdx
movq %rdx, 40(%rsp)
movq  60(%rsp), %rax
movq  40(%rsp), %rdx
movq %rdx, (%rax)
movb $0, 39(%rsp)
movb $115, 38(%rsp)
movb $37, 37(%rsp)
movb $32, 36(%rsp)
movb $44, 35(%rsp)
movb $100, 34(%rsp)
movb $37, 33(%rsp)
leaq  33(%rsp), %rdx
movq %rdx, 25(%rsp)
movq $0, 17(%rsp)
movq  25(%rsp), %rdx
movq %rdx, 17(%rsp)
movq $0, 9(%rsp)
movq  104(%rsp), %rdx
movq %rdx, 9(%rsp)
#__parameter_offset_pass
leaq  9(%rsp), %rcx
callq printf
movb %al, 8(%rsp)
#__clear_scope_18
addq $191, %rsp
#__end_scope_18
xor %rax, %rax
retq
.seh_endproc

.def	strlen;
.endef
.globl	strlen
strlen:
.seh_proc strlen
#__begin_scope_0
#__init_scope_0
subq $12, %rsp
movq 0(%rcx), %rdx
movq %rdx, 4(%rsp)
movl $0, 0(%rsp)
#__end_scope_0
#__begin_scope_1
#__init_scope_1
subq $19, %rsp
mark_0 :
movslq  19(%rsp), %rdx
imulq $1, %rdx
movq  23(%rsp), %rax
addq %rdx, %rax
movq %rax, 11(%rsp)
movq  11(%rsp), %rax
movb (%rax), %dh
movb %dh, 10(%rsp)
movb $0, %ah
movb %ah, 9(%rsp)
movb  10(%rsp), %ah
movb  9(%rsp), %al
movb $1, 8(%rsp)
cmpb %ah, %al
jne mark_2
movb $0, 8(%rsp)
mark_2 :
#WHILE
xor %edx, %edx
movb  8(%rsp), %dh
cmpb $0, %dh
je mark_1
movl $1, 4(%rsp)
movl  19(%rsp), %edx
addl  4(%rsp), %edx
movl %edx, 0(%rsp)
movl  0(%rsp), %edx
movl %edx, 19(%rsp)
jmp mark_0
mark_1 :
#__clear_scope_1
addq $19, %rsp
#__end_scope_1
#__begin_scope_0
movl  0(%rsp), %eax
#__clear_scope_0
addq $12, %rsp
retq
#__clear_scope_0
addq $12, %rsp
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
subq $58, %rsp
movq 0(%rcx), %rdx
movq %rdx, 50(%rsp)
movq $0, 42(%rsp)
movq  50(%rsp), %rdx
movq %rdx, 42(%rsp)
#__parameter_offset_pass
leaq  42(%rsp), %rcx
callq strlen
movl %eax, 38(%rsp)
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 30(%rsp)
movl $0, 26(%rsp)
movq  30(%rsp), %rcx
leaq  26(%rsp), %r9
movq   50(%rsp), %rdx
movl   38(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
movb $0, 25(%rsp)
movb $10, 24(%rsp)
leaq  24(%rsp), %rdx
movq %rdx, 16(%rsp)
movl $1, 12(%rsp)
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 4(%rsp)
movl $0, 0(%rsp)
movq  4(%rsp), %rcx
leaq  0(%rsp), %r9
movq   16(%rsp), %rdx
movl   12(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
#__clear_scope_2
addq $58, %rsp
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
subq $37, %rsp
movl 0(%rcx), %edx
movl %edx, 33(%rsp)
movq 4(%rcx), %rdx
movq %rdx, 25(%rsp)
movl $0, 21(%rsp)
movl  33(%rsp), %eax
movl  21(%rsp), %ebx
movb $1, 20(%rsp)
cmpl %eax, %ebx
je mark_5
movb $0, 20(%rsp)
mark_5 :
#IF
xor %edx, %edx
movb  20(%rsp), %dh
cmpb $0, %dh
je mark_3
#__end_scope_3
#__begin_scope_4
#__init_scope_4
subq $13, %rsp
movl $0, 9(%rsp)
movslq  9(%rsp), %rdx
imulq $1, %rdx
movq  38(%rsp), %rax
addq %rdx, %rax
movq %rax, 1(%rsp)
movb $48, %ah
movb %ah, 0(%rsp)
movq  1(%rsp), %rax
movb  0(%rsp), %dh
movb %dh, (%rax)
#__clear_scope_4
addq $13, %rsp
#__end_scope_4
#__begin_scope_3
jmp mark_4
mark_3 :
#__end_scope_3
#__begin_scope_5
#__init_scope_5
subq $16, %rsp
movl $0, 12(%rsp)
#__end_scope_5
#__begin_scope_6
#__init_scope_6
subq $46, %rsp
mark_7 :
movl $0, 42(%rsp)
movl  95(%rsp), %eax
movl  42(%rsp), %ebx
movb $1, 41(%rsp)
cmpl %eax, %ebx
jl mark_9
movb $0, 41(%rsp)
mark_9 :
#WHILE
xor %edx, %edx
movb  41(%rsp), %dh
cmpb $0, %dh
je mark_8
movl $10, 37(%rsp)
movl  95(%rsp), %eax
cdq
idivl  37(%rsp)
movl %edx, 33(%rsp)
movl $10, 29(%rsp)
movl  95(%rsp), %eax
cdq
idivl  29(%rsp)
movl %eax, 25(%rsp)
movl  25(%rsp), %edx
movl %edx, 95(%rsp)
movslq  58(%rsp), %rdx
imulq $1, %rdx
movq  87(%rsp), %rax
addq %rdx, %rax
movq %rax, 17(%rsp)
movb $48, %ah
movb %ah, 16(%rsp)
movsbl  16(%rsp), %edx
movl %edx, 12(%rsp)
movl  12(%rsp), %edx
addl  33(%rsp), %edx
movl %edx, 8(%rsp)
movq  17(%rsp), %rax
movb  8(%rsp), %dh
movb %dh, (%rax)
movl $1, 4(%rsp)
movl  58(%rsp), %edx
addl  4(%rsp), %edx
movl %edx, 0(%rsp)
movl  0(%rsp), %edx
movl %edx, 58(%rsp)
jmp mark_7
mark_8 :
#__clear_scope_6
addq $46, %rsp
#__end_scope_6
#__begin_scope_5
movq $0, 4(%rsp)
movq  41(%rsp), %rdx
movq %rdx, 4(%rsp)
#__parameter_offset_pass
leaq  4(%rsp), %rcx
callq strlen
movl %eax, 0(%rsp)
#__end_scope_5
#__begin_scope_7
#__init_scope_7
subq $79, %rsp
movl $0, 75(%rsp)
mark_10 :
movl $2, 71(%rsp)
movl  79(%rsp), %eax
cdq
idivl  71(%rsp)
movl %eax, 67(%rsp)
movl  75(%rsp), %eax
movl  67(%rsp), %ebx
movb $1, 66(%rsp)
cmpl %eax, %ebx
jg mark_12
movb $0, 66(%rsp)
mark_12 :
#FOR
xor %edx, %edx
movb  66(%rsp), %dh
cmpb $0, %dh
je mark_11
movslq  75(%rsp), %rdx
imulq $1, %rdx
movq  120(%rsp), %rax
addq %rdx, %rax
movq %rax, 58(%rsp)
movq  58(%rsp), %rax
movb (%rax), %dh
movb %dh, 57(%rsp)
movslq  75(%rsp), %rdx
imulq $1, %rdx
movq  120(%rsp), %rax
addq %rdx, %rax
movq %rax, 49(%rsp)
movl $1, 45(%rsp)
movl  79(%rsp), %edx
subl  45(%rsp), %edx
movl %edx, 41(%rsp)
movl  41(%rsp), %edx
subl  75(%rsp), %edx
movl %edx, 37(%rsp)
movslq  37(%rsp), %rdx
imulq $1, %rdx
movq  120(%rsp), %rax
addq %rdx, %rax
movq %rax, 29(%rsp)
movq  29(%rsp), %rax
movb (%rax), %dh
movb %dh, 28(%rsp)
movq  49(%rsp), %rax
movb  28(%rsp), %dh
movb %dh, (%rax)
movl $1, 24(%rsp)
movl  79(%rsp), %edx
subl  24(%rsp), %edx
movl %edx, 20(%rsp)
movl  20(%rsp), %edx
subl  75(%rsp), %edx
movl %edx, 16(%rsp)
movslq  16(%rsp), %rdx
imulq $1, %rdx
movq  120(%rsp), %rax
addq %rdx, %rax
movq %rax, 8(%rsp)
movq  8(%rsp), %rax
movb  57(%rsp), %dh
movb %dh, (%rax)
movl $1, 4(%rsp)
movl  75(%rsp), %edx
addl  4(%rsp), %edx
movl %edx, 0(%rsp)
movl  0(%rsp), %edx
movl %edx, 75(%rsp)
jmp mark_10
mark_11 :
#__clear_scope_7
addq $79, %rsp
#__end_scope_7
#__begin_scope_5
#__clear_scope_5
addq $16, %rsp
#__end_scope_5
#__begin_scope_3
jmp mark_4
mark_6 :
mark_4 :
movq $0, 12(%rsp)
movq  25(%rsp), %rdx
movq %rdx, 12(%rsp)
#__parameter_offset_pass
leaq  12(%rsp), %rcx
callq strlen
movl %eax, 8(%rsp)
movslq  8(%rsp), %rdx
imulq $1, %rdx
movq  25(%rsp), %rax
addq %rdx, %rax
movq %rax, 0(%rsp)
movq  0(%rsp), %rax
#__clear_scope_3
addq $37, %rsp
retq
#__clear_scope_3
addq $37, %rsp
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
subq $23, %rsp
movq 0(%rcx), %rdx
movq %rdx, 15(%rsp)
movq 8(%rcx), %rdx
movq %rdx, 7(%rsp)
#__end_scope_8
#__begin_scope_9
#__init_scope_9
subq $33, %rsp
mark_13 :
movq  48(%rsp), %rax
movb (%rax), %dh
movb %dh, 32(%rsp)
movb $0, %ah
movb %ah, 31(%rsp)
movb  32(%rsp), %ah
movb  31(%rsp), %al
movb $1, 30(%rsp)
cmpb %ah, %al
jne mark_15
movb $0, 30(%rsp)
mark_15 :
movq  40(%rsp), %rax
movb (%rax), %dh
movb %dh, 29(%rsp)
movq  48(%rsp), %rax
movb (%rax), %dh
movb %dh, 28(%rsp)
movb  29(%rsp), %ah
movb  28(%rsp), %al
movb $1, 27(%rsp)
cmpb %ah, %al
je mark_16
movb $0, 27(%rsp)
mark_16 :
movb $1, 26(%rsp)
cmpb $0, 30(%rsp)
jne mark_17
movb $0, 26(%rsp)
mark_17 :
movb $1, 25(%rsp)
cmpb $0, 27(%rsp)
jne mark_18
movb $0, 25(%rsp)
mark_18 :
movb  26(%rsp), %dh
movb  25(%rsp), %al
andb %dh, %al
movb $1, 24(%rsp)
cmpb $0, %al
jne mark_19
movb $0, 24(%rsp)
mark_19 :
#WHILE
xor %edx, %edx
movb  24(%rsp), %dh
cmpb $0, %dh
je mark_14
movl $1, 20(%rsp)
movslq  20(%rsp), %rdx
imulq $1, %rdx
movq  40(%rsp), %rax
addq %rdx, %rax
movq %rax, 12(%rsp)
movq  12(%rsp), %rdx
movq %rdx, 40(%rsp)
movl $1, 8(%rsp)
movslq  8(%rsp), %rdx
imulq $1, %rdx
movq  48(%rsp), %rax
addq %rdx, %rax
movq %rax, 0(%rsp)
movq  0(%rsp), %rdx
movq %rdx, 48(%rsp)
jmp mark_13
mark_14 :
#__clear_scope_9
addq $33, %rsp
#__end_scope_9
#__begin_scope_8
movq  15(%rsp), %rax
movb (%rax), %dh
movb %dh, 6(%rsp)
movb $0, %ah
movb %ah, 5(%rsp)
movb  6(%rsp), %ah
movb  5(%rsp), %al
movb $1, 4(%rsp)
cmpb %ah, %al
jne mark_22
movb $0, 4(%rsp)
mark_22 :
#IF
xor %edx, %edx
movb  4(%rsp), %dh
cmpb $0, %dh
je mark_20
#__end_scope_8
#__begin_scope_10
#__init_scope_10
subq $4, %rsp
movl $0, 0(%rsp)
movl  0(%rsp), %eax
#__clear_scope_10
addq $4, %rsp
#__clear_scope_8
addq $23, %rsp
retq
#__clear_scope_10
addq $4, %rsp
#__end_scope_10
#__begin_scope_8
jmp mark_21
mark_20 :
mark_21 :
movl $1, 0(%rsp)
movl  0(%rsp), %eax
#__clear_scope_8
addq $23, %rsp
retq
#__clear_scope_8
addq $23, %rsp
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
subq $16, %rsp
movq 0(%rcx), %rdx
movq %rdx, 8(%rsp)
movq 8(%rcx), %rdx
movq %rdx, 0(%rsp)
#__end_scope_11
#__begin_scope_12
#__init_scope_12
subq $28, %rsp
mark_23 :
movq  36(%rsp), %rax
movb (%rax), %dh
movb %dh, 27(%rsp)
movb $0, %ah
movb %ah, 26(%rsp)
movb  27(%rsp), %ah
movb  26(%rsp), %al
movb $1, 25(%rsp)
cmpb %ah, %al
jne mark_25
movb $0, 25(%rsp)
mark_25 :
#WHILE
xor %edx, %edx
movb  25(%rsp), %dh
cmpb $0, %dh
je mark_24
movq  36(%rsp), %rax
movb (%rax), %dh
movb %dh, 24(%rsp)
movq  28(%rsp), %rax
movb  24(%rsp), %dh
movb %dh, (%rax)
movl $1, 20(%rsp)
movslq  20(%rsp), %rdx
imulq $1, %rdx
movq  28(%rsp), %rax
addq %rdx, %rax
movq %rax, 12(%rsp)
movq  12(%rsp), %rdx
movq %rdx, 28(%rsp)
movl $1, 8(%rsp)
movslq  8(%rsp), %rdx
imulq $1, %rdx
movq  36(%rsp), %rax
addq %rdx, %rax
movq %rax, 0(%rsp)
movq  0(%rsp), %rdx
movq %rdx, 36(%rsp)
jmp mark_23
mark_24 :
#__clear_scope_12
addq $28, %rsp
#__end_scope_12
#__begin_scope_11
movq  0(%rsp), %rax
#__clear_scope_11
addq $16, %rsp
retq
#__clear_scope_11
addq $16, %rsp
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
subq $149, %rsp
movq 0(%rcx), %rdx
movq %rdx, 141(%rsp)
movq 8(%rcx), %rdx
movq %rdx, 133(%rsp)
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
movb $0, %ah
movb %ah, 40(%rsp)
movb $0, %ah
movb %ah, 39(%rsp)
movb $0, %ah
movb %ah, 38(%rsp)
movb $0, %ah
movb %ah, 37(%rsp)
movb $0, %ah
movb %ah, 36(%rsp)
movb $0, %ah
movb %ah, 35(%rsp)
movb $0, %ah
movb %ah, 34(%rsp)
movb $0, %ah
movb %ah, 33(%rsp)
leaq  33(%rsp), %rdx
movq %rdx, 25(%rsp)
movq $0, 17(%rsp)
movq  25(%rsp), %rdx
movq %rdx, 17(%rsp)
movl $0, 13(%rsp)
movl $0, 9(%rsp)
#__end_scope_13
#__begin_scope_14
#__init_scope_14
subq $43, %rsp
mark_26 :
movq  176(%rsp), %rax
movb (%rax), %dh
movb %dh, 42(%rsp)
movb $0, %ah
movb %ah, 41(%rsp)
movb  42(%rsp), %ah
movb  41(%rsp), %al
movb $1, 40(%rsp)
cmpb %ah, %al
jne mark_28
movb $0, 40(%rsp)
mark_28 :
#WHILE
xor %edx, %edx
movb  40(%rsp), %dh
cmpb $0, %dh
je mark_27
movl $1, 36(%rsp)
movslq  36(%rsp), %rdx
imulq $1, %rdx
movq  176(%rsp), %rax
addq %rdx, %rax
movq %rax, 28(%rsp)
movq  28(%rsp), %rax
movb (%rax), %dh
movb %dh, 27(%rsp)
movb $0, %ah
movb %ah, 26(%rsp)
movb  27(%rsp), %ah
movb  26(%rsp), %al
movb $1, 25(%rsp)
cmpb %ah, %al
jne mark_31
movb $0, 25(%rsp)
mark_31 :
#IF
xor %edx, %edx
movb  25(%rsp), %dh
cmpb $0, %dh
je mark_29
#__end_scope_14
#__begin_scope_15
#__init_scope_15
subq $72, %rsp
movb $0, 71(%rsp)
movb $115, 70(%rsp)
movb $37, 69(%rsp)
leaq  69(%rsp), %rdx
movq %rdx, 61(%rsp)
movq $0, 53(%rsp)
movq  248(%rsp), %rdx
movq %rdx, 53(%rsp)
movq $0, 45(%rsp)
movq  61(%rsp), %rdx
movq %rdx, 45(%rsp)
#__parameter_offset_pass
leaq  45(%rsp), %rcx
callq starts_with
movl %eax, 41(%rsp)
movl $1, 37(%rsp)
movl  41(%rsp), %eax
movl  37(%rsp), %ebx
movb $1, 36(%rsp)
cmpl %eax, %ebx
je mark_34
movb $0, 36(%rsp)
mark_34 :
#IF
xor %edx, %edx
movb  36(%rsp), %dh
cmpb $0, %dh
je mark_32
#__end_scope_15
#__begin_scope_16
#__init_scope_16
subq $60, %rsp
movslq  184(%rsp), %rdx
imulq $8, %rdx
movq  316(%rsp), %rax
addq %rdx, %rax
movq %rax, 52(%rsp)
movq  52(%rsp), %rax
movq (%rax), %rdx
movq %rdx, 44(%rsp)
movq $0, 36(%rsp)
movq  192(%rsp), %rdx
movq %rdx, 36(%rsp)
movq $0, 28(%rsp)
movq  44(%rsp), %rdx
movq %rdx, 28(%rsp)
#__parameter_offset_pass
leaq  28(%rsp), %rcx
callq write_to
movq %rax, 20(%rsp)
movq  20(%rsp), %rdx
movq %rdx, 192(%rsp)
movl $1, 16(%rsp)
movl  184(%rsp), %edx
addl  16(%rsp), %edx
movl %edx, 12(%rsp)
movl  12(%rsp), %edx
movl %edx, 184(%rsp)
movl $2, 8(%rsp)
movslq  8(%rsp), %rdx
imulq $1, %rdx
movq  308(%rsp), %rax
addq %rdx, %rax
movq %rax, 0(%rsp)
movq  0(%rsp), %rdx
movq %rdx, 308(%rsp)
#__clear_scope_16
addq $60, %rsp
#__end_scope_16
#__clear_scope_15
addq $72, %rsp
#__end_scope_15
jmp mark_26
#__clear_scope_16
addq $60, %rsp
#__end_scope_16
#__begin_scope_15
jmp mark_33
mark_32 :
movb $0, 35(%rsp)
movb $100, 34(%rsp)
movb $37, 33(%rsp)
leaq  33(%rsp), %rdx
movq %rdx, 25(%rsp)
movq $0, 17(%rsp)
movq  248(%rsp), %rdx
movq %rdx, 17(%rsp)
movq $0, 9(%rsp)
movq  25(%rsp), %rdx
movq %rdx, 9(%rsp)
#__parameter_offset_pass
leaq  9(%rsp), %rcx
callq starts_with
movl %eax, 5(%rsp)
movl $1, 1(%rsp)
movl  5(%rsp), %eax
movl  1(%rsp), %ebx
movb $1, 0(%rsp)
cmpl %eax, %ebx
je mark_36
movb $0, 0(%rsp)
mark_36 :
#IF
xor %edx, %edx
movb  0(%rsp), %dh
cmpb $0, %dh
je mark_35
#__end_scope_15
#__begin_scope_17
#__init_scope_17
subq $60, %rsp
movslq  184(%rsp), %rdx
imulq $8, %rdx
movq  316(%rsp), %rax
addq %rdx, %rax
movq %rax, 52(%rsp)
movq  52(%rsp), %rax
movq (%rax), %rdx
movq %rdx, 44(%rsp)
movq  44(%rsp), %rax
movl (%rax), %edx
movl %edx, 40(%rsp)
movq $0, 32(%rsp)
movq  192(%rsp), %rdx
movq %rdx, 32(%rsp)
movl $0, 28(%rsp)
movl  40(%rsp), %edx
movl %edx, 28(%rsp)
#__parameter_offset_pass
leaq  28(%rsp), %rcx
callq num_to_str
movq %rax, 20(%rsp)
movq  20(%rsp), %rdx
movq %rdx, 192(%rsp)
movl $1, 16(%rsp)
movl  184(%rsp), %edx
addl  16(%rsp), %edx
movl %edx, 12(%rsp)
movl  12(%rsp), %edx
movl %edx, 184(%rsp)
movl $2, 8(%rsp)
movslq  8(%rsp), %rdx
imulq $1, %rdx
movq  308(%rsp), %rax
addq %rdx, %rax
movq %rax, 0(%rsp)
movq  0(%rsp), %rdx
movq %rdx, 308(%rsp)
#__clear_scope_17
addq $60, %rsp
#__end_scope_17
#__clear_scope_15
addq $72, %rsp
#__end_scope_15
jmp mark_26
#__clear_scope_17
addq $60, %rsp
#__end_scope_17
#__begin_scope_15
jmp mark_33
mark_35 :
mark_33 :
#__clear_scope_15
addq $72, %rsp
#__end_scope_15
#__begin_scope_14
jmp mark_30
mark_29 :
mark_30 :
movq  176(%rsp), %rax
movb (%rax), %dh
movb %dh, 24(%rsp)
movq  60(%rsp), %rax
movb  24(%rsp), %dh
movb %dh, (%rax)
movl $1, 20(%rsp)
movslq  20(%rsp), %rdx
imulq $1, %rdx
movq  60(%rsp), %rax
addq %rdx, %rax
movq %rax, 12(%rsp)
movq  12(%rsp), %rdx
movq %rdx, 60(%rsp)
movl $1, 8(%rsp)
movslq  8(%rsp), %rdx
imulq $1, %rdx
movq  176(%rsp), %rax
addq %rdx, %rax
movq %rax, 0(%rsp)
movq  0(%rsp), %rdx
movq %rdx, 176(%rsp)
jmp mark_26
mark_27 :
#__clear_scope_14
addq $43, %rsp
#__end_scope_14
#__begin_scope_13
movq $0, 1(%rsp)
movq  25(%rsp), %rdx
movq %rdx, 1(%rsp)
#__parameter_offset_pass
leaq  1(%rsp), %rcx
callq print_str
movb %al, 0(%rsp)
#__clear_scope_13
addq $149, %rsp
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
subq $637, %rsp
movb $0, %ah
movb %ah, 636(%rsp)
movb $0, %ah
movb %ah, 635(%rsp)
movb $0, %ah
movb %ah, 634(%rsp)
movb $0, %ah
movb %ah, 633(%rsp)
movb $0, %ah
movb %ah, 632(%rsp)
movb $0, %ah
movb %ah, 631(%rsp)
movb $0, %ah
movb %ah, 630(%rsp)
movb $0, %ah
movb %ah, 629(%rsp)
movb $0, %ah
movb %ah, 628(%rsp)
movb $0, %ah
movb %ah, 627(%rsp)
movb $0, %ah
movb %ah, 626(%rsp)
movb $0, %ah
movb %ah, 625(%rsp)
movb $0, %ah
movb %ah, 624(%rsp)
movb $0, %ah
movb %ah, 623(%rsp)
movb $0, %ah
movb %ah, 622(%rsp)
movb $0, %ah
movb %ah, 621(%rsp)
movb $0, %ah
movb %ah, 620(%rsp)
movb $0, %ah
movb %ah, 619(%rsp)
movb $0, %ah
movb %ah, 618(%rsp)
movb $0, %ah
movb %ah, 617(%rsp)
movb $0, %ah
movb %ah, 616(%rsp)
movb $0, %ah
movb %ah, 615(%rsp)
movb $0, %ah
movb %ah, 614(%rsp)
movb $0, %ah
movb %ah, 613(%rsp)
movb $0, %ah
movb %ah, 612(%rsp)
movb $0, %ah
movb %ah, 611(%rsp)
movb $0, %ah
movb %ah, 610(%rsp)
movb $0, %ah
movb %ah, 609(%rsp)
movb $0, %ah
movb %ah, 608(%rsp)
movb $0, %ah
movb %ah, 607(%rsp)
movb $0, %ah
movb %ah, 606(%rsp)
movb $0, %ah
movb %ah, 605(%rsp)
movb $0, %ah
movb %ah, 604(%rsp)
movb $0, %ah
movb %ah, 603(%rsp)
movb $0, %ah
movb %ah, 602(%rsp)
movb $0, %ah
movb %ah, 601(%rsp)
movb $0, %ah
movb %ah, 600(%rsp)
movb $0, %ah
movb %ah, 599(%rsp)
movb $0, %ah
movb %ah, 598(%rsp)
movb $0, %ah
movb %ah, 597(%rsp)
movb $0, %ah
movb %ah, 596(%rsp)
movb $0, %ah
movb %ah, 595(%rsp)
movb $0, %ah
movb %ah, 594(%rsp)
movb $0, %ah
movb %ah, 593(%rsp)
movb $0, %ah
movb %ah, 592(%rsp)
movb $0, %ah
movb %ah, 591(%rsp)
movb $0, %ah
movb %ah, 590(%rsp)
movb $0, %ah
movb %ah, 589(%rsp)
movb $0, %ah
movb %ah, 588(%rsp)
movb $0, %ah
movb %ah, 587(%rsp)
movb $0, %ah
movb %ah, 586(%rsp)
movb $0, %ah
movb %ah, 585(%rsp)
movb $0, %ah
movb %ah, 584(%rsp)
movb $0, %ah
movb %ah, 583(%rsp)
movb $0, %ah
movb %ah, 582(%rsp)
movb $0, %ah
movb %ah, 581(%rsp)
movb $0, %ah
movb %ah, 580(%rsp)
movb $0, %ah
movb %ah, 579(%rsp)
movb $0, %ah
movb %ah, 578(%rsp)
movb $0, %ah
movb %ah, 577(%rsp)
movb $0, %ah
movb %ah, 576(%rsp)
movb $0, %ah
movb %ah, 575(%rsp)
movb $0, %ah
movb %ah, 574(%rsp)
movb $0, %ah
movb %ah, 573(%rsp)
movb $0, %ah
movb %ah, 572(%rsp)
movb $0, %ah
movb %ah, 571(%rsp)
movb $0, %ah
movb %ah, 570(%rsp)
movb $0, %ah
movb %ah, 569(%rsp)
movb $0, %ah
movb %ah, 568(%rsp)
movb $0, %ah
movb %ah, 567(%rsp)
movb $0, %ah
movb %ah, 566(%rsp)
movb $0, %ah
movb %ah, 565(%rsp)
movb $0, %ah
movb %ah, 564(%rsp)
movb $0, %ah
movb %ah, 563(%rsp)
movb $0, %ah
movb %ah, 562(%rsp)
movb $0, %ah
movb %ah, 561(%rsp)
movb $0, %ah
movb %ah, 560(%rsp)
movb $0, %ah
movb %ah, 559(%rsp)
movb $0, %ah
movb %ah, 558(%rsp)
movb $0, %ah
movb %ah, 557(%rsp)
movb $0, %ah
movb %ah, 556(%rsp)
movb $0, %ah
movb %ah, 555(%rsp)
movb $0, %ah
movb %ah, 554(%rsp)
movb $0, %ah
movb %ah, 553(%rsp)
movb $0, %ah
movb %ah, 552(%rsp)
movb $0, %ah
movb %ah, 551(%rsp)
movb $0, %ah
movb %ah, 550(%rsp)
movb $0, %ah
movb %ah, 549(%rsp)
movb $0, %ah
movb %ah, 548(%rsp)
movb $0, %ah
movb %ah, 547(%rsp)
movb $0, %ah
movb %ah, 546(%rsp)
movb $0, %ah
movb %ah, 545(%rsp)
movb $0, %ah
movb %ah, 544(%rsp)
movb $0, %ah
movb %ah, 543(%rsp)
movb $0, %ah
movb %ah, 542(%rsp)
movb $0, %ah
movb %ah, 541(%rsp)
movb $0, %ah
movb %ah, 540(%rsp)
movb $0, %ah
movb %ah, 539(%rsp)
movb $0, %ah
movb %ah, 538(%rsp)
movb $0, %ah
movb %ah, 537(%rsp)
leaq  537(%rsp), %rdx
movq %rdx, 529(%rsp)
movb $0, %ah
movb %ah, 528(%rsp)
movb $0, %ah
movb %ah, 527(%rsp)
movb $0, %ah
movb %ah, 526(%rsp)
movb $0, %ah
movb %ah, 525(%rsp)
movb $0, %ah
movb %ah, 524(%rsp)
movb $0, %ah
movb %ah, 523(%rsp)
movb $0, %ah
movb %ah, 522(%rsp)
movb $0, %ah
movb %ah, 521(%rsp)
movb $0, %ah
movb %ah, 520(%rsp)
movb $0, %ah
movb %ah, 519(%rsp)
movb $0, %ah
movb %ah, 518(%rsp)
movb $0, %ah
movb %ah, 517(%rsp)
movb $0, %ah
movb %ah, 516(%rsp)
movb $0, %ah
movb %ah, 515(%rsp)
movb $0, %ah
movb %ah, 514(%rsp)
movb $0, %ah
movb %ah, 513(%rsp)
movb $0, %ah
movb %ah, 512(%rsp)
movb $0, %ah
movb %ah, 511(%rsp)
movb $0, %ah
movb %ah, 510(%rsp)
movb $0, %ah
movb %ah, 509(%rsp)
movb $0, %ah
movb %ah, 508(%rsp)
movb $0, %ah
movb %ah, 507(%rsp)
movb $0, %ah
movb %ah, 506(%rsp)
movb $0, %ah
movb %ah, 505(%rsp)
movb $0, %ah
movb %ah, 504(%rsp)
movb $0, %ah
movb %ah, 503(%rsp)
movb $0, %ah
movb %ah, 502(%rsp)
movb $0, %ah
movb %ah, 501(%rsp)
movb $0, %ah
movb %ah, 500(%rsp)
movb $0, %ah
movb %ah, 499(%rsp)
movb $0, %ah
movb %ah, 498(%rsp)
movb $0, %ah
movb %ah, 497(%rsp)
movb $0, %ah
movb %ah, 496(%rsp)
movb $0, %ah
movb %ah, 495(%rsp)
movb $0, %ah
movb %ah, 494(%rsp)
movb $0, %ah
movb %ah, 493(%rsp)
movb $0, %ah
movb %ah, 492(%rsp)
movb $0, %ah
movb %ah, 491(%rsp)
movb $0, %ah
movb %ah, 490(%rsp)
movb $0, %ah
movb %ah, 489(%rsp)
movb $0, %ah
movb %ah, 488(%rsp)
movb $0, %ah
movb %ah, 487(%rsp)
movb $0, %ah
movb %ah, 486(%rsp)
movb $0, %ah
movb %ah, 485(%rsp)
movb $0, %ah
movb %ah, 484(%rsp)
movb $0, %ah
movb %ah, 483(%rsp)
movb $0, %ah
movb %ah, 482(%rsp)
movb $0, %ah
movb %ah, 481(%rsp)
movb $0, %ah
movb %ah, 480(%rsp)
movb $0, %ah
movb %ah, 479(%rsp)
movb $0, %ah
movb %ah, 478(%rsp)
movb $0, %ah
movb %ah, 477(%rsp)
movb $0, %ah
movb %ah, 476(%rsp)
movb $0, %ah
movb %ah, 475(%rsp)
movb $0, %ah
movb %ah, 474(%rsp)
movb $0, %ah
movb %ah, 473(%rsp)
movb $0, %ah
movb %ah, 472(%rsp)
movb $0, %ah
movb %ah, 471(%rsp)
movb $0, %ah
movb %ah, 470(%rsp)
movb $0, %ah
movb %ah, 469(%rsp)
movb $0, %ah
movb %ah, 468(%rsp)
movb $0, %ah
movb %ah, 467(%rsp)
movb $0, %ah
movb %ah, 466(%rsp)
movb $0, %ah
movb %ah, 465(%rsp)
movb $0, %ah
movb %ah, 464(%rsp)
movb $0, %ah
movb %ah, 463(%rsp)
movb $0, %ah
movb %ah, 462(%rsp)
movb $0, %ah
movb %ah, 461(%rsp)
movb $0, %ah
movb %ah, 460(%rsp)
movb $0, %ah
movb %ah, 459(%rsp)
movb $0, %ah
movb %ah, 458(%rsp)
movb $0, %ah
movb %ah, 457(%rsp)
movb $0, %ah
movb %ah, 456(%rsp)
movb $0, %ah
movb %ah, 455(%rsp)
movb $0, %ah
movb %ah, 454(%rsp)
movb $0, %ah
movb %ah, 453(%rsp)
movb $0, %ah
movb %ah, 452(%rsp)
movb $0, %ah
movb %ah, 451(%rsp)
movb $0, %ah
movb %ah, 450(%rsp)
movb $0, %ah
movb %ah, 449(%rsp)
movb $0, %ah
movb %ah, 448(%rsp)
movb $0, %ah
movb %ah, 447(%rsp)
movb $0, %ah
movb %ah, 446(%rsp)
movb $0, %ah
movb %ah, 445(%rsp)
movb $0, %ah
movb %ah, 444(%rsp)
movb $0, %ah
movb %ah, 443(%rsp)
movb $0, %ah
movb %ah, 442(%rsp)
movb $0, %ah
movb %ah, 441(%rsp)
movb $0, %ah
movb %ah, 440(%rsp)
movb $0, %ah
movb %ah, 439(%rsp)
movb $0, %ah
movb %ah, 438(%rsp)
movb $0, %ah
movb %ah, 437(%rsp)
movb $0, %ah
movb %ah, 436(%rsp)
movb $0, %ah
movb %ah, 435(%rsp)
movb $0, %ah
movb %ah, 434(%rsp)
movb $0, %ah
movb %ah, 433(%rsp)
movb $0, %ah
movb %ah, 432(%rsp)
movb $0, %ah
movb %ah, 431(%rsp)
movb $0, %ah
movb %ah, 430(%rsp)
movb $0, %ah
movb %ah, 429(%rsp)
leaq  429(%rsp), %rdx
movq %rdx, 421(%rsp)
movb $0, %ah
movb %ah, 420(%rsp)
movb $0, %ah
movb %ah, 419(%rsp)
movb $0, %ah
movb %ah, 418(%rsp)
movb $0, %ah
movb %ah, 417(%rsp)
movb $0, %ah
movb %ah, 416(%rsp)
movb $0, %ah
movb %ah, 415(%rsp)
movb $0, %ah
movb %ah, 414(%rsp)
movb $0, %ah
movb %ah, 413(%rsp)
movb $0, %ah
movb %ah, 412(%rsp)
movb $0, %ah
movb %ah, 411(%rsp)
movb $0, %ah
movb %ah, 410(%rsp)
movb $0, %ah
movb %ah, 409(%rsp)
movb $0, %ah
movb %ah, 408(%rsp)
movb $0, %ah
movb %ah, 407(%rsp)
movb $0, %ah
movb %ah, 406(%rsp)
movb $0, %ah
movb %ah, 405(%rsp)
movb $0, %ah
movb %ah, 404(%rsp)
movb $0, %ah
movb %ah, 403(%rsp)
movb $0, %ah
movb %ah, 402(%rsp)
movb $0, %ah
movb %ah, 401(%rsp)
movb $0, %ah
movb %ah, 400(%rsp)
movb $0, %ah
movb %ah, 399(%rsp)
movb $0, %ah
movb %ah, 398(%rsp)
movb $0, %ah
movb %ah, 397(%rsp)
movb $0, %ah
movb %ah, 396(%rsp)
movb $0, %ah
movb %ah, 395(%rsp)
movb $0, %ah
movb %ah, 394(%rsp)
movb $0, %ah
movb %ah, 393(%rsp)
movb $0, %ah
movb %ah, 392(%rsp)
movb $0, %ah
movb %ah, 391(%rsp)
movb $0, %ah
movb %ah, 390(%rsp)
movb $0, %ah
movb %ah, 389(%rsp)
movb $0, %ah
movb %ah, 388(%rsp)
movb $0, %ah
movb %ah, 387(%rsp)
movb $0, %ah
movb %ah, 386(%rsp)
movb $0, %ah
movb %ah, 385(%rsp)
movb $0, %ah
movb %ah, 384(%rsp)
movb $0, %ah
movb %ah, 383(%rsp)
movb $0, %ah
movb %ah, 382(%rsp)
movb $0, %ah
movb %ah, 381(%rsp)
movb $0, %ah
movb %ah, 380(%rsp)
movb $0, %ah
movb %ah, 379(%rsp)
movb $0, %ah
movb %ah, 378(%rsp)
movb $0, %ah
movb %ah, 377(%rsp)
movb $0, %ah
movb %ah, 376(%rsp)
movb $0, %ah
movb %ah, 375(%rsp)
movb $0, %ah
movb %ah, 374(%rsp)
movb $0, %ah
movb %ah, 373(%rsp)
movb $0, %ah
movb %ah, 372(%rsp)
movb $0, %ah
movb %ah, 371(%rsp)
movb $0, %ah
movb %ah, 370(%rsp)
movb $0, %ah
movb %ah, 369(%rsp)
movb $0, %ah
movb %ah, 368(%rsp)
movb $0, %ah
movb %ah, 367(%rsp)
movb $0, %ah
movb %ah, 366(%rsp)
movb $0, %ah
movb %ah, 365(%rsp)
movb $0, %ah
movb %ah, 364(%rsp)
movb $0, %ah
movb %ah, 363(%rsp)
movb $0, %ah
movb %ah, 362(%rsp)
movb $0, %ah
movb %ah, 361(%rsp)
movb $0, %ah
movb %ah, 360(%rsp)
movb $0, %ah
movb %ah, 359(%rsp)
movb $0, %ah
movb %ah, 358(%rsp)
movb $0, %ah
movb %ah, 357(%rsp)
movb $0, %ah
movb %ah, 356(%rsp)
movb $0, %ah
movb %ah, 355(%rsp)
movb $0, %ah
movb %ah, 354(%rsp)
movb $0, %ah
movb %ah, 353(%rsp)
movb $0, %ah
movb %ah, 352(%rsp)
movb $0, %ah
movb %ah, 351(%rsp)
movb $0, %ah
movb %ah, 350(%rsp)
movb $0, %ah
movb %ah, 349(%rsp)
movb $0, %ah
movb %ah, 348(%rsp)
movb $0, %ah
movb %ah, 347(%rsp)
movb $0, %ah
movb %ah, 346(%rsp)
movb $0, %ah
movb %ah, 345(%rsp)
movb $0, %ah
movb %ah, 344(%rsp)
movb $0, %ah
movb %ah, 343(%rsp)
movb $0, %ah
movb %ah, 342(%rsp)
movb $0, %ah
movb %ah, 341(%rsp)
movb $0, %ah
movb %ah, 340(%rsp)
movb $0, %ah
movb %ah, 339(%rsp)
movb $0, %ah
movb %ah, 338(%rsp)
movb $0, %ah
movb %ah, 337(%rsp)
movb $0, %ah
movb %ah, 336(%rsp)
movb $0, %ah
movb %ah, 335(%rsp)
movb $0, %ah
movb %ah, 334(%rsp)
movb $0, %ah
movb %ah, 333(%rsp)
movb $0, %ah
movb %ah, 332(%rsp)
movb $0, %ah
movb %ah, 331(%rsp)
movb $0, %ah
movb %ah, 330(%rsp)
movb $0, %ah
movb %ah, 329(%rsp)
movb $0, %ah
movb %ah, 328(%rsp)
movb $0, %ah
movb %ah, 327(%rsp)
movb $0, %ah
movb %ah, 326(%rsp)
movb $0, %ah
movb %ah, 325(%rsp)
movb $0, %ah
movb %ah, 324(%rsp)
movb $0, %ah
movb %ah, 323(%rsp)
movb $0, %ah
movb %ah, 322(%rsp)
movb $0, %ah
movb %ah, 321(%rsp)
leaq  321(%rsp), %rdx
movq %rdx, 313(%rsp)
movl $0, 309(%rsp)
movq  529(%rsp), %rdx
leaq scanf_mark(%rip), %rcx
movq $0, %rax
callq	scanf
movl $0, 305(%rsp)
movq  421(%rsp), %rdx
leaq scanf_mark(%rip), %rcx
movq $0, %rax
callq	scanf
movl $0, 301(%rsp)
movq  313(%rsp), %rdx
leaq scanf_mark(%rip), %rcx
movq $0, %rax
callq	scanf
movb $0, 300(%rsp)
movb $93, 299(%rsp)
movb $100, 298(%rsp)
movb $37, 297(%rsp)
movb $91, 296(%rsp)
movb $32, 295(%rsp)
movb $102, 294(%rsp)
movb $111, 293(%rsp)
movb $32, 292(%rsp)
movb $104, 291(%rsp)
movb $116, 290(%rsp)
movb $103, 289(%rsp)
movb $110, 288(%rsp)
movb $101, 287(%rsp)
movb $108, 286(%rsp)
movb $32, 285(%rsp)
movb $115, 284(%rsp)
movb $105, 283(%rsp)
movb $32, 282(%rsp)
movb $41, 281(%rsp)
movb $115, 280(%rsp)
movb $37, 279(%rsp)
movb $40, 278(%rsp)
movb $32, 277(%rsp)
movb $103, 276(%rsp)
movb $110, 275(%rsp)
movb $105, 274(%rsp)
movb $114, 273(%rsp)
movb $116, 272(%rsp)
movb $115, 271(%rsp)
leaq  271(%rsp), %rdx
movq %rdx, 263(%rsp)
movq $0, 255(%rsp)
movq  529(%rsp), %rdx
movq %rdx, 255(%rsp)
#__parameter_offset_pass
leaq  255(%rsp), %rcx
callq strlen
movl %eax, 251(%rsp)
leaq  251(%rsp), %rdx
movq %rdx, 243(%rsp)
movq  243(%rsp), %rdx
movq %rdx, 235(%rsp)
movq  529(%rsp), %rdx
movq %rdx, 227(%rsp)
leaq  227(%rsp), %rdx
movq %rdx, 219(%rsp)
movq $0, 211(%rsp)
movq  263(%rsp), %rdx
movq %rdx, 211(%rsp)
movq $0, 203(%rsp)
movq  219(%rsp), %rdx
movq %rdx, 203(%rsp)
#__parameter_offset_pass
leaq  203(%rsp), %rcx
callq printf
movb %al, 202(%rsp)
movb $0, 201(%rsp)
movb $93, 200(%rsp)
movb $100, 199(%rsp)
movb $37, 198(%rsp)
movb $91, 197(%rsp)
movb $32, 196(%rsp)
movb $102, 195(%rsp)
movb $111, 194(%rsp)
movb $32, 193(%rsp)
movb $104, 192(%rsp)
movb $116, 191(%rsp)
movb $103, 190(%rsp)
movb $110, 189(%rsp)
movb $101, 188(%rsp)
movb $108, 187(%rsp)
movb $32, 186(%rsp)
movb $115, 185(%rsp)
movb $105, 184(%rsp)
movb $32, 183(%rsp)
movb $41, 182(%rsp)
movb $115, 181(%rsp)
movb $37, 180(%rsp)
movb $40, 179(%rsp)
movb $32, 178(%rsp)
movb $103, 177(%rsp)
movb $110, 176(%rsp)
movb $105, 175(%rsp)
movb $114, 174(%rsp)
movb $116, 173(%rsp)
movb $115, 172(%rsp)
leaq  172(%rsp), %rdx
movq %rdx, 164(%rsp)
movq $0, 156(%rsp)
movq  421(%rsp), %rdx
movq %rdx, 156(%rsp)
#__parameter_offset_pass
leaq  156(%rsp), %rcx
callq strlen
movl %eax, 152(%rsp)
leaq  152(%rsp), %rdx
movq %rdx, 144(%rsp)
movq  144(%rsp), %rdx
movq %rdx, 136(%rsp)
movq  421(%rsp), %rdx
movq %rdx, 128(%rsp)
leaq  128(%rsp), %rdx
movq %rdx, 120(%rsp)
movq $0, 112(%rsp)
movq  164(%rsp), %rdx
movq %rdx, 112(%rsp)
movq $0, 104(%rsp)
movq  120(%rsp), %rdx
movq %rdx, 104(%rsp)
#__parameter_offset_pass
leaq  104(%rsp), %rcx
callq printf
movb %al, 103(%rsp)
movb $0, 102(%rsp)
movb $93, 101(%rsp)
movb $100, 100(%rsp)
movb $37, 99(%rsp)
movb $91, 98(%rsp)
movb $32, 97(%rsp)
movb $102, 96(%rsp)
movb $111, 95(%rsp)
movb $32, 94(%rsp)
movb $104, 93(%rsp)
movb $116, 92(%rsp)
movb $103, 91(%rsp)
movb $110, 90(%rsp)
movb $101, 89(%rsp)
movb $108, 88(%rsp)
movb $32, 87(%rsp)
movb $115, 86(%rsp)
movb $105, 85(%rsp)
movb $32, 84(%rsp)
movb $41, 83(%rsp)
movb $115, 82(%rsp)
movb $37, 81(%rsp)
movb $40, 80(%rsp)
movb $32, 79(%rsp)
movb $103, 78(%rsp)
movb $110, 77(%rsp)
movb $105, 76(%rsp)
movb $114, 75(%rsp)
movb $116, 74(%rsp)
movb $115, 73(%rsp)
leaq  73(%rsp), %rdx
movq %rdx, 65(%rsp)
movq $0, 57(%rsp)
movq  313(%rsp), %rdx
movq %rdx, 57(%rsp)
#__parameter_offset_pass
leaq  57(%rsp), %rcx
callq strlen
movl %eax, 53(%rsp)
leaq  53(%rsp), %rdx
movq %rdx, 45(%rsp)
movq  45(%rsp), %rdx
movq %rdx, 37(%rsp)
movq  313(%rsp), %rdx
movq %rdx, 29(%rsp)
leaq  29(%rsp), %rdx
movq %rdx, 21(%rsp)
movq $0, 13(%rsp)
movq  65(%rsp), %rdx
movq %rdx, 13(%rsp)
movq $0, 5(%rsp)
movq  21(%rsp), %rdx
movq %rdx, 5(%rsp)
#__parameter_offset_pass
leaq  5(%rsp), %rcx
callq printf
movb %al, 4(%rsp)
movl $0, 0(%rsp)
movl  0(%rsp), %eax
#__clear_scope_18
addq $637, %rsp
xor %rax, %rax
retq
#__clear_scope_18
addq $637, %rsp
#__end_scope_18
xor %rax, %rax
retq
.seh_endproc
	

scanf_mark:
    .asciz	"%s"

    .def	scanf;
	.scl	2;
	.type	32;
	.endef
	.section	.text,"xr",discard,scanf
	.globl	scanf                           # -- Begin function scanf
	.p2align	4
scanf:                                  # @scanf
.seh_proc scanf
# %bb.0:
	subq	$88, %rsp
	.seh_stackalloc 88
	.seh_endprologue
	movq	%r9, 120(%rsp)
	movq	%r8, 112(%rsp)
	movq	%rdx, 104(%rsp)
	movq	%rcx, 80(%rsp)
	leaq	104(%rsp), %rax
	movq	%rax, 64(%rsp)
	movq	64(%rsp), %rax
	movq	%rax, 48(%rsp)                  # 8-byte Spill
	movq	80(%rsp), %rax
	movq	%rax, 40(%rsp)                  # 8-byte Spill
	xorl	%ecx, %ecx
	movl	%ecx, 60(%rsp)                  # 4-byte Spill
	callq	__acrt_iob_func
	movq	40(%rsp), %rdx                  # 8-byte Reload
	movq	48(%rsp), %r9                   # 8-byte Reload
	movq	%rax, %rcx
	movl	60(%rsp), %eax                  # 4-byte Reload
	movl	%eax, %r8d
	callq	_vfscanf_l
	movl	%eax, 76(%rsp)
	movl	76(%rsp), %eax
	addq	$88, %rsp
	retq
	.seh_endproc
                                        # -- End function
	.def	_vsprintf_l;
	.scl	2;
	.type	32;
	.endef
	.section	.text,"xr",discard,_vsprintf_l
	.globl	_vsprintf_l                     # -- Begin function _vsprintf_l
	.p2align	4
_vsprintf_l:                            # @_vsprintf_l
.seh_proc _vsprintf_l
# %bb.0:
	subq	$72, %rsp
	.seh_stackalloc 72
	.seh_endprologue
	movq	%r9, 64(%rsp)
	movq	%r8, 56(%rsp)
	movq	%rdx, 48(%rsp)
	movq	%rcx, 40(%rsp)
	movq	64(%rsp), %rax
	movq	56(%rsp), %r9
	movq	48(%rsp), %r8
	movq	40(%rsp), %rcx
	movq	$-1, %rdx
	movq	%rax, 32(%rsp)
	callq	_vsnprintf_l
	nop
	addq	$72, %rsp
	retq
	.seh_endproc
                                        # -- End function
	.def	_vsnprintf_l;
	.scl	2;
	.type	32;
	.endef
	.section	.text,"xr",discard,_vsnprintf_l
	.globl	_vsnprintf_l                    # -- Begin function _vsnprintf_l
	.p2align	4
_vsnprintf_l:                           # @_vsnprintf_l
.seh_proc _vsnprintf_l
# %bb.0:
	subq	$136, %rsp
	.seh_stackalloc 136
	.seh_endprologue
	movq	176(%rsp), %rax
	movq	%r9, 128(%rsp)
	movq	%r8, 120(%rsp)
	movq	%rdx, 112(%rsp)
	movq	%rcx, 104(%rsp)
	movq	176(%rsp), %rax
	movq	%rax, 88(%rsp)                  # 8-byte Spill
	movq	128(%rsp), %rax
	movq	%rax, 80(%rsp)                  # 8-byte Spill
	movq	120(%rsp), %rax
	movq	%rax, 72(%rsp)                  # 8-byte Spill
	movq	112(%rsp), %rax
	movq	%rax, 64(%rsp)                  # 8-byte Spill
	movq	104(%rsp), %rax
	movq	%rax, 56(%rsp)                  # 8-byte Spill
	callq	__local_stdio_printf_options
	movq	56(%rsp), %rdx                  # 8-byte Reload
	movq	64(%rsp), %r8                   # 8-byte Reload
	movq	72(%rsp), %r9                   # 8-byte Reload
	movq	80(%rsp), %r10                  # 8-byte Reload
	movq	%rax, %rcx
	movq	88(%rsp), %rax                  # 8-byte Reload
	movq	(%rcx), %rcx
	orq	$1, %rcx
	movq	%r10, 32(%rsp)
	movq	%rax, 40(%rsp)
	callq	__stdio_common_vsprintf
	movl	%eax, 100(%rsp)
	cmpl	$0, 100(%rsp)
	jge	.LBB7_2
# %bb.1:
	movl	$4294967295, %eax               # imm = 0xFFFFFFFF
	movl	%eax, 52(%rsp)                  # 4-byte Spill
	jmp	.LBB7_3
.LBB7_2:
	movl	100(%rsp), %eax
	movl	%eax, 52(%rsp)                  # 4-byte Spill
.LBB7_3:
	movl	52(%rsp), %eax                  # 4-byte Reload
	addq	$136, %rsp
	retq
	.seh_endproc
                                        # -- End function
	.def	__local_stdio_printf_options;
	.scl	2;
	.type	32;
	.endef
	.section	.text,"xr",discard,__local_stdio_printf_options
	.globl	__local_stdio_printf_options    # -- Begin function __local_stdio_printf_options
	.p2align	4
__local_stdio_printf_options:           # @__local_stdio_printf_options
# %bb.0:
	leaq	__local_stdio_printf_options._OptionsStorage(%rip), %rax
	retq
                                        # -- End function
	.def	_vfscanf_l;
	.scl	2;
	.type	32;
	.endef
	.section	.text,"xr",discard,_vfscanf_l
	.globl	_vfscanf_l                      # -- Begin function _vfscanf_l
	.p2align	4
_vfscanf_l:                             # @_vfscanf_l
.seh_proc _vfscanf_l
# %bb.0:
	subq	$104, %rsp
	.seh_stackalloc 104
	.seh_endprologue
	movq	%r9, 96(%rsp)
	movq	%r8, 88(%rsp)
	movq	%rdx, 80(%rsp)
	movq	%rcx, 72(%rsp)
	movq	96(%rsp), %rax
	movq	%rax, 64(%rsp)                  # 8-byte Spill
	movq	88(%rsp), %rax
	movq	%rax, 56(%rsp)                  # 8-byte Spill
	movq	80(%rsp), %rax
	movq	%rax, 48(%rsp)                  # 8-byte Spill
	movq	72(%rsp), %rax
	movq	%rax, 40(%rsp)                  # 8-byte Spill
	callq	__local_stdio_scanf_options
	movq	40(%rsp), %rdx                  # 8-byte Reload
	movq	48(%rsp), %r8                   # 8-byte Reload
	movq	56(%rsp), %r9                   # 8-byte Reload
	movq	%rax, %rcx
	movq	64(%rsp), %rax                  # 8-byte Reload
	movq	(%rcx), %rcx
	movq	%rax, 32(%rsp)
	callq	__stdio_common_vfscanf
	nop
	addq	$104, %rsp
	retq
	.seh_endproc
                                        # -- End function
	.def	__local_stdio_scanf_options;
	.scl	2;
	.type	32;
	.endef
	.section	.text,"xr",discard,__local_stdio_scanf_options
	.globl	__local_stdio_scanf_options     # -- Begin function __local_stdio_scanf_options
	.p2align	4
__local_stdio_scanf_options:            # @__local_stdio_scanf_options
# %bb.0:
	leaq	__local_stdio_scanf_options._OptionsStorage(%rip), %rax
	retq
                                        # -- End function
	.section	.rdata,"dr",discard,"??_C@_02DKCKIIND@?$CFs?$AA@"
	.globl	"??_C@_02DKCKIIND@?$CFs?$AA@"   # @"??_C@_02DKCKIIND@?$CFs?$AA@"
"??_C@_02DKCKIIND@?$CFs?$AA@":
	.asciz	"%s"

	.lcomm	__local_stdio_printf_options._OptionsStorage,8,8 # @__local_stdio_printf_options._OptionsStorage
	.lcomm	__local_stdio_scanf_options._OptionsStorage,8,8 # @__local_stdio_scanf_options._OptionsStorage
	.addrsig
	.addrsig_sym _vsnprintf
	.addrsig_sym scanf
	.addrsig_sym _vsprintf_l
	.addrsig_sym _vsnprintf_l
	.addrsig_sym __stdio_common_vsprintf
	.addrsig_sym __local_stdio_printf_options
	.addrsig_sym _vfscanf_l
	.addrsig_sym __acrt_iob_func
	.addrsig_sym __stdio_common_vfscanf
	.addrsig_sym __local_stdio_scanf_options
	.addrsig_sym __local_stdio_printf_options._OptionsStorage
	.addrsig_sym __local_stdio_scanf_options._OptionsStorage

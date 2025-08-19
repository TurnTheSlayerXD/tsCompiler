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
.def	print_int;
.endef
.globl	print_int
print_int:
.seh_proc print_int
#__begin_scope_2
#__init_scope_2
subq $96, %rsp
movl 0(%rcx), %edx
movl %edx, 92(%rsp)
movb $0, 91(%rsp)
movb $0, 90(%rsp)
movb $0, 89(%rsp)
movb $0, 88(%rsp)
movb $0, 87(%rsp)
movb $0, 86(%rsp)
movb $0, 85(%rsp)
movb $0, 84(%rsp)
movb $0, 83(%rsp)
movb $0, 82(%rsp)
movb $0, 81(%rsp)
movb $0, 80(%rsp)
movb $0, 79(%rsp)
movb $0, 78(%rsp)
movb $0, 77(%rsp)
movb $0, 76(%rsp)
movb $0, 75(%rsp)
movb $0, 74(%rsp)
movb $0, 73(%rsp)
movb $0, 72(%rsp)
movb $0, 71(%rsp)
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
leaq  55(%rsp), %rdx
movq %rdx, 47(%rsp)
movq $0, 39(%rsp)
movq  47(%rsp), %rdx
movq %rdx, 39(%rsp)
movl $0, 35(%rsp)
movl  92(%rsp), %eax
movl  35(%rsp), %ebx
movb $1, 34(%rsp)
cmpl %eax, %ebx
je mark_5
movb $0, 34(%rsp)
mark_5 :
#IF
xor %edx, %edx
movb  34(%rsp), %dh
cmpb $0, %dh
je mark_3
#__end_scope_2
#__begin_scope_3
#__init_scope_3
subq $34, %rsp
movb $0, 33(%rsp)
movb $48, 32(%rsp)
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
#__clear_scope_3
addq $34, %rsp
#__end_scope_3
#__begin_scope_2
jmp mark_4
mark_3 :
#__end_scope_2
#__begin_scope_4
#__init_scope_4
subq $70, %rsp
movl $0, 66(%rsp)
movl $0, 62(%rsp)
movl  66(%rsp), %edx
movl %edx, 62(%rsp)
movl $1, 58(%rsp)
movl $0, 54(%rsp)
movl  58(%rsp), %edx
movl %edx, 54(%rsp)
movl $0, 50(%rsp)
movl  162(%rsp), %eax
movl  50(%rsp), %ebx
movb $1, 49(%rsp)
cmpl %eax, %ebx
jg mark_9
movb $0, 49(%rsp)
mark_9 :
#IF
xor %edx, %edx
movb  49(%rsp), %dh
cmpb $0, %dh
je mark_7
#__end_scope_4
#__begin_scope_5
#__init_scope_5
subq $36, %rsp
movl $1, 32(%rsp)
movl $0, 28(%rsp)
movl  28(%rsp), %edx
subl  32(%rsp), %edx
movl %edx, 24(%rsp)
movl  198(%rsp), %eax
imull  24(%rsp)
movl %eax, 20(%rsp)
movl  20(%rsp), %edx
movl %edx, 198(%rsp)
movl $1, 16(%rsp)
movl $0, 12(%rsp)
movl  12(%rsp), %edx
subl  16(%rsp), %edx
movl %edx, 8(%rsp)
movl  8(%rsp), %edx
movl %edx, 90(%rsp)
#__clear_scope_5
addq $36, %rsp
#__end_scope_5
#__begin_scope_4
jmp mark_8
mark_7 :
mark_8 :
#__end_scope_4
#__begin_scope_6
#__init_scope_6
subq $58, %rsp
mark_10 :
movl $0, 54(%rsp)
movl  220(%rsp), %eax
movl  54(%rsp), %ebx
movb $1, 53(%rsp)
cmpl %eax, %ebx
jl mark_12
movb $0, 53(%rsp)
mark_12 :
#WHILE
xor %edx, %edx
movb  53(%rsp), %dh
cmpb $0, %dh
je mark_11
movl $10, 49(%rsp)
movl  220(%rsp), %eax
cdq
idivl  49(%rsp)
movl %edx, 45(%rsp)
movl $0, 41(%rsp)
movl  45(%rsp), %edx
movl %edx, 41(%rsp)
movl $10, 37(%rsp)
movl  220(%rsp), %eax
cdq
idivl  37(%rsp)
movl %eax, 33(%rsp)
movl  33(%rsp), %edx
movl %edx, 220(%rsp)
movb $48, %ah
movb %ah, 32(%rsp)
movsbl  32(%rsp), %edx
movl %edx, 28(%rsp)
movl  28(%rsp), %edx
addl  41(%rsp), %edx
movl %edx, 24(%rsp)
movslq  120(%rsp), %rdx
imulq $1, %rdx
movq  167(%rsp), %rax
addq %rdx, %rax
movq %rax, 16(%rsp)
movq  16(%rsp), %rax
movb  24(%rsp), %dh
movb %dh, (%rax)
movl $1, 12(%rsp)
movl  120(%rsp), %edx
addl  12(%rsp), %edx
movl %edx, 8(%rsp)
movl  8(%rsp), %edx
movl %edx, 120(%rsp)
jmp mark_10
mark_11 :
#__clear_scope_6
addq $58, %rsp
#__end_scope_6
#__begin_scope_4
movl $1, 45(%rsp)
movl $0, 41(%rsp)
movl  41(%rsp), %edx
subl  45(%rsp), %edx
movl %edx, 37(%rsp)
movl  54(%rsp), %eax
movl  37(%rsp), %ebx
movb $1, 36(%rsp)
cmpl %eax, %ebx
je mark_15
movb $0, 36(%rsp)
mark_15 :
#IF
xor %edx, %edx
movb  36(%rsp), %dh
cmpb $0, %dh
je mark_13
#__end_scope_4
#__begin_scope_7
#__init_scope_7
subq $17, %rsp
movb $45, %ah
movb %ah, 16(%rsp)
movslq  79(%rsp), %rdx
imulq $1, %rdx
movq  126(%rsp), %rax
addq %rdx, %rax
movq %rax, 8(%rsp)
movq  8(%rsp), %rax
movb  16(%rsp), %dh
movb %dh, (%rax)
#__clear_scope_7
addq $17, %rsp
#__end_scope_7
#__begin_scope_4
jmp mark_14
mark_13 :
mark_14 :
movq $0, 28(%rsp)
movq  109(%rsp), %rdx
movq %rdx, 28(%rsp)
#__parameter_offset_pass
leaq  28(%rsp), %rcx
callq strlen
movl %eax, 24(%rsp)
movl $0, 20(%rsp)
movl  24(%rsp), %edx
movl %edx, 20(%rsp)
#__end_scope_4
#__begin_scope_8
#__init_scope_8
subq $92, %rsp
movl $0, 88(%rsp)
movl $0, 84(%rsp)
movl  88(%rsp), %edx
movl %edx, 84(%rsp)
mark_16 :
movl $2, 80(%rsp)
movl  112(%rsp), %eax
cdq
idivl  80(%rsp)
movl %eax, 76(%rsp)
movl  84(%rsp), %eax
movl  76(%rsp), %ebx
movb $1, 75(%rsp)
cmpl %eax, %ebx
jg mark_18
movb $0, 75(%rsp)
mark_18 :
#FOR
xor %edx, %edx
movb  75(%rsp), %dh
cmpb $0, %dh
je mark_17
movslq  84(%rsp), %rdx
imulq $1, %rdx
movq  201(%rsp), %rax
addq %rdx, %rax
movq %rax, 67(%rsp)
movq  67(%rsp), %rax
movb (%rax), %dh
movb %dh, 66(%rsp)
movb $0, %ah
movb %ah, 65(%rsp)
movb  66(%rsp), %dh
movb %dh, 65(%rsp)
movl $1, 61(%rsp)
movl  112(%rsp), %edx
subl  61(%rsp), %edx
movl %edx, 57(%rsp)
movl  57(%rsp), %edx
subl  84(%rsp), %edx
movl %edx, 53(%rsp)
movslq  53(%rsp), %rdx
imulq $1, %rdx
movq  201(%rsp), %rax
addq %rdx, %rax
movq %rax, 45(%rsp)
movq  45(%rsp), %rax
movb (%rax), %dh
movb %dh, 44(%rsp)
movslq  84(%rsp), %rdx
imulq $1, %rdx
movq  201(%rsp), %rax
addq %rdx, %rax
movq %rax, 36(%rsp)
movq  36(%rsp), %rax
movb  44(%rsp), %dh
movb %dh, (%rax)
movl $1, 32(%rsp)
movl  112(%rsp), %edx
subl  32(%rsp), %edx
movl %edx, 28(%rsp)
movl  28(%rsp), %edx
subl  84(%rsp), %edx
movl %edx, 24(%rsp)
movslq  24(%rsp), %rdx
imulq $1, %rdx
movq  201(%rsp), %rax
addq %rdx, %rax
movq %rax, 16(%rsp)
movq  16(%rsp), %rax
movb  65(%rsp), %dh
movb %dh, (%rax)
movl $1, 12(%rsp)
movl  84(%rsp), %edx
addl  12(%rsp), %edx
movl %edx, 8(%rsp)
movl  8(%rsp), %edx
movl %edx, 84(%rsp)
jmp mark_16
mark_17 :
#__clear_scope_8
addq $92, %rsp
#__end_scope_8
#__begin_scope_4
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 12(%rsp)
movl $0, 8(%rsp)
movq  12(%rsp), %rcx
leaq  8(%rsp), %r9
movq   109(%rsp), %rdx
movl   20(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
#__clear_scope_4
addq $70, %rsp
#__end_scope_4
#__begin_scope_2
jmp mark_4
mark_6 :
mark_4 :
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
addq $96, %rsp
#__end_scope_2
retq
.seh_endproc
.def	print_str;
.endef
.globl	print_str
print_str:
.seh_proc print_str
#__begin_scope_9
#__init_scope_9
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
#__clear_scope_9
addq $66, %rsp
#__end_scope_9
retq
.seh_endproc
.def	get_digit;
.endef
.globl	get_digit
get_digit:
.seh_proc get_digit
#__begin_scope_10
#__init_scope_10
subq $15, %rsp
movb 0(%rcx), %dh
movb %dh, 14(%rsp)
movb $48, %ah
movb %ah, 13(%rsp)
movb  14(%rsp), %dh
subb  13(%rsp), %dh
movb %dh, 12(%rsp)
movsbl  12(%rsp), %edx
movl %edx, 8(%rsp)
movl  8(%rsp), %eax
#__clear_scope_10
addq $15, %rsp
retq
#__clear_scope_10
addq $15, %rsp
#__end_scope_10
retq
.seh_endproc
.def	power;
.endef
.globl	power
power:
.seh_proc power
#__begin_scope_11
#__init_scope_11
subq $24, %rsp
movl 0(%rcx), %edx
movl %edx, 20(%rsp)
movl 4(%rcx), %edx
movl %edx, 16(%rsp)
movl $1, 12(%rsp)
movl $0, 8(%rsp)
movl  12(%rsp), %edx
movl %edx, 8(%rsp)
#__end_scope_11
#__begin_scope_12
#__init_scope_12
subq $25, %rsp
mark_19 :
movl $0, 21(%rsp)
movl  45(%rsp), %eax
movl  21(%rsp), %ebx
movb $1, 20(%rsp)
cmpl %eax, %ebx
jl mark_21
movb $0, 20(%rsp)
mark_21 :
#WHILE
xor %edx, %edx
movb  20(%rsp), %dh
cmpb $0, %dh
je mark_20
movl  33(%rsp), %eax
imull  41(%rsp)
movl %eax, 16(%rsp)
movl  16(%rsp), %edx
movl %edx, 33(%rsp)
movl $1, 12(%rsp)
movl  45(%rsp), %edx
subl  12(%rsp), %edx
movl %edx, 8(%rsp)
movl  8(%rsp), %edx
movl %edx, 45(%rsp)
jmp mark_19
mark_20 :
#__clear_scope_12
addq $25, %rsp
#__end_scope_12
#__begin_scope_11
movl  8(%rsp), %eax
#__clear_scope_11
addq $24, %rsp
retq
#__clear_scope_11
addq $24, %rsp
#__end_scope_11
retq
.seh_endproc
.def	parse_int_from_str;
.endef
.globl	parse_int_from_str
parse_int_from_str:
.seh_proc parse_int_from_str
#__begin_scope_13
#__init_scope_13
subq $84, %rsp
movq 0(%rcx), %rdx
movq %rdx, 76(%rsp)
movq $0, 68(%rsp)
movq  76(%rsp), %rdx
movq %rdx, 68(%rsp)
#__parameter_offset_pass
leaq  68(%rsp), %rcx
callq strlen
movl %eax, 64(%rsp)
movl $0, 60(%rsp)
movl  64(%rsp), %edx
movl %edx, 60(%rsp)
movl $0, 56(%rsp)
movl  60(%rsp), %eax
movl  56(%rsp), %ebx
movb $1, 55(%rsp)
cmpl %eax, %ebx
je mark_24
movb $0, 55(%rsp)
mark_24 :
#IF
xor %edx, %edx
movb  55(%rsp), %dh
cmpb $0, %dh
je mark_22
#__end_scope_13
#__begin_scope_14
#__init_scope_14
subq $20, %rsp
movl $1488, 16(%rsp)
movl $0, 12(%rsp)
movl  12(%rsp), %edx
subl  16(%rsp), %edx
movl %edx, 8(%rsp)
movl  8(%rsp), %eax
#__clear_scope_14
addq $20, %rsp
#__clear_scope_13
addq $84, %rsp
retq
#__clear_scope_14
addq $20, %rsp
#__end_scope_14
#__begin_scope_13
jmp mark_23
mark_22 :
mark_23 :
movq $0, 47(%rsp)
movq  76(%rsp), %rdx
movq %rdx, 47(%rsp)
movslq  60(%rsp), %rdx
imulq $1, %rdx
movq  76(%rsp), %rax
addq %rdx, %rax
movq %rax, 39(%rsp)
movq $0, 31(%rsp)
movq  39(%rsp), %rdx
movq %rdx, 31(%rsp)
movl $1, 27(%rsp)
movl $0, 23(%rsp)
movl  27(%rsp), %edx
movl %edx, 23(%rsp)
movq  47(%rsp), %rax
movb (%rax), %dh
movb %dh, 22(%rsp)
movb $45, %ah
movb %ah, 21(%rsp)
movb  22(%rsp), %ah
movb  21(%rsp), %al
movb $1, 20(%rsp)
cmpb %ah, %al
je mark_27
movb $0, 20(%rsp)
mark_27 :
#IF
xor %edx, %edx
movb  20(%rsp), %dh
cmpb $0, %dh
je mark_25
#__end_scope_13
#__begin_scope_15
#__init_scope_15
subq $32, %rsp
movl $1, 28(%rsp)
movl $0, 24(%rsp)
movl  24(%rsp), %edx
subl  28(%rsp), %edx
movl %edx, 20(%rsp)
movl  20(%rsp), %edx
movl %edx, 55(%rsp)
movl $1, 16(%rsp)
movslq  16(%rsp), %rdx
imulq $1, %rdx
movq  79(%rsp), %rax
addq %rdx, %rax
movq %rax, 8(%rsp)
movq  8(%rsp), %rdx
movq %rdx, 79(%rsp)
#__clear_scope_15
addq $32, %rsp
#__end_scope_15
#__begin_scope_13
jmp mark_26
mark_25 :
mark_26 :
movl $0, 16(%rsp)
movl $0, 12(%rsp)
movl  16(%rsp), %edx
movl %edx, 12(%rsp)
#__end_scope_13
#__begin_scope_16
#__init_scope_16
subq $74, %rsp
mark_28 :
movq  121(%rsp), %rax
movq  105(%rsp), %rbx
movb $1, 73(%rsp)
cmpq %rax, %rbx
jne mark_30
movb $0, 73(%rsp)
mark_30 :
#WHILE
xor %edx, %edx
movb  73(%rsp), %dh
cmpb $0, %dh
je mark_29
movq  121(%rsp), %rax
movb (%rax), %dh
movb %dh, 72(%rsp)
movb $0, %ah
movb %ah, 71(%rsp)
movb  72(%rsp), %dh
movb %dh, 71(%rsp)
#__parameter_offset_pass
leaq  71(%rsp), %rcx
callq get_digit
movl %eax, 67(%rsp)
movl $0, 63(%rsp)
movl  67(%rsp), %edx
movl %edx, 63(%rsp)
#__parameter_offset_pass
leaq  63(%rsp), %rcx
callq print_int
movb %al, 62(%rsp)
movl $10, 58(%rsp)
movl $1, 54(%rsp)
movslq  121(%rsp), %rdx
movq  105(%rsp), %rax
subq %rdx, %rax
movl %eax, 50(%rsp)
movl  50(%rsp), %edx
subl  54(%rsp), %edx
movl %edx, 46(%rsp)
movl $0, 42(%rsp)
movl  58(%rsp), %edx
movl %edx, 42(%rsp)
movl $0, 38(%rsp)
movl  46(%rsp), %edx
movl %edx, 38(%rsp)
#__parameter_offset_pass
leaq  38(%rsp), %rcx
callq power
movl %eax, 34(%rsp)
movq  121(%rsp), %rax
movb (%rax), %dh
movb %dh, 33(%rsp)
movb $0, %ah
movb %ah, 32(%rsp)
movb  33(%rsp), %dh
movb %dh, 32(%rsp)
#__parameter_offset_pass
leaq  32(%rsp), %rcx
callq get_digit
movl %eax, 28(%rsp)
movl  34(%rsp), %eax
imull  28(%rsp)
movl %eax, 24(%rsp)
movl  86(%rsp), %edx
addl  24(%rsp), %edx
movl %edx, 20(%rsp)
movl  20(%rsp), %edx
movl %edx, 86(%rsp)
movl $1, 16(%rsp)
movslq  16(%rsp), %rdx
imulq $1, %rdx
movq  121(%rsp), %rax
addq %rdx, %rax
movq %rax, 8(%rsp)
movq  8(%rsp), %rdx
movq %rdx, 121(%rsp)
jmp mark_28
mark_29 :
#__clear_scope_16
addq $74, %rsp
#__end_scope_16
#__begin_scope_13
movl  12(%rsp), %eax
imull  23(%rsp)
movl %eax, 8(%rsp)
movl  8(%rsp), %eax
#__clear_scope_13
addq $84, %rsp
retq
#__clear_scope_13
addq $84, %rsp
#__end_scope_13
retq
.seh_endproc
.def	main;
.endef
.globl	main
main:
.seh_proc main
#__begin_scope_17
#__init_scope_17
subq $63, %rsp
movl %ecx, 59(%rsp)
movq %rdx, 51(%rsp)
movb $0, 50(%rsp)
movb $56, 49(%rsp)
movb $56, 48(%rsp)
movb $52, 47(%rsp)
movb $49, 46(%rsp)
movb $45, 45(%rsp)
leaq  45(%rsp), %rdx
movq %rdx, 37(%rsp)
movq $0, 29(%rsp)
movq  37(%rsp), %rdx
movq %rdx, 29(%rsp)
movq $0, 21(%rsp)
movq  29(%rsp), %rdx
movq %rdx, 21(%rsp)
#__parameter_offset_pass
leaq  21(%rsp), %rcx
callq parse_int_from_str
movl %eax, 17(%rsp)
movl $0, 13(%rsp)
movl  17(%rsp), %edx
movl %edx, 13(%rsp)
movl $0, 9(%rsp)
movl  13(%rsp), %edx
movl %edx, 9(%rsp)
#__parameter_offset_pass
leaq  9(%rsp), %rcx
callq print_int
movb %al, 8(%rsp)
#__clear_scope_17
addq $63, %rsp
#__end_scope_17
xor %rax, %rax
retq
.seh_endproc

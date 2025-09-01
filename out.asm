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
subq $241, %rsp
movq 0(%rcx), %rdx
movq %rdx, 233(%rsp)
movq 8(%rcx), %rdx
movq %rdx, 225(%rsp)
movb $0, %ah
movb %ah, 224(%rsp)
movb $0, %ah
movb %ah, 223(%rsp)
movb $0, %ah
movb %ah, 222(%rsp)
movb $0, %ah
movb %ah, 221(%rsp)
movb $0, %ah
movb %ah, 220(%rsp)
movb $0, %ah
movb %ah, 219(%rsp)
movb $0, %ah
movb %ah, 218(%rsp)
movb $0, %ah
movb %ah, 217(%rsp)
movb $0, %ah
movb %ah, 216(%rsp)
movb $0, %ah
movb %ah, 215(%rsp)
movb $0, %ah
movb %ah, 214(%rsp)
movb $0, %ah
movb %ah, 213(%rsp)
movb $0, %ah
movb %ah, 212(%rsp)
movb $0, %ah
movb %ah, 211(%rsp)
movb $0, %ah
movb %ah, 210(%rsp)
movb $0, %ah
movb %ah, 209(%rsp)
movb $0, %ah
movb %ah, 208(%rsp)
movb $0, %ah
movb %ah, 207(%rsp)
movb $0, %ah
movb %ah, 206(%rsp)
movb $0, %ah
movb %ah, 205(%rsp)
movb $0, %ah
movb %ah, 204(%rsp)
movb $0, %ah
movb %ah, 203(%rsp)
movb $0, %ah
movb %ah, 202(%rsp)
movb $0, %ah
movb %ah, 201(%rsp)
movb $0, %ah
movb %ah, 200(%rsp)
movb $0, %ah
movb %ah, 199(%rsp)
movb $0, %ah
movb %ah, 198(%rsp)
movb $0, %ah
movb %ah, 197(%rsp)
movb $0, %ah
movb %ah, 196(%rsp)
movb $0, %ah
movb %ah, 195(%rsp)
movb $0, %ah
movb %ah, 194(%rsp)
movb $0, %ah
movb %ah, 193(%rsp)
movb $0, %ah
movb %ah, 192(%rsp)
movb $0, %ah
movb %ah, 191(%rsp)
movb $0, %ah
movb %ah, 190(%rsp)
movb $0, %ah
movb %ah, 189(%rsp)
movb $0, %ah
movb %ah, 188(%rsp)
movb $0, %ah
movb %ah, 187(%rsp)
movb $0, %ah
movb %ah, 186(%rsp)
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
movb $0, %ah
movb %ah, 175(%rsp)
movb $0, %ah
movb %ah, 174(%rsp)
movb $0, %ah
movb %ah, 173(%rsp)
movb $0, %ah
movb %ah, 172(%rsp)
movb $0, %ah
movb %ah, 171(%rsp)
movb $0, %ah
movb %ah, 170(%rsp)
movb $0, %ah
movb %ah, 169(%rsp)
movb $0, %ah
movb %ah, 168(%rsp)
movb $0, %ah
movb %ah, 167(%rsp)
movb $0, %ah
movb %ah, 166(%rsp)
movb $0, %ah
movb %ah, 165(%rsp)
movb $0, %ah
movb %ah, 164(%rsp)
movb $0, %ah
movb %ah, 163(%rsp)
movb $0, %ah
movb %ah, 162(%rsp)
movb $0, %ah
movb %ah, 161(%rsp)
movb $0, %ah
movb %ah, 160(%rsp)
movb $0, %ah
movb %ah, 159(%rsp)
movb $0, %ah
movb %ah, 158(%rsp)
movb $0, %ah
movb %ah, 157(%rsp)
movb $0, %ah
movb %ah, 156(%rsp)
movb $0, %ah
movb %ah, 155(%rsp)
movb $0, %ah
movb %ah, 154(%rsp)
movb $0, %ah
movb %ah, 153(%rsp)
movb $0, %ah
movb %ah, 152(%rsp)
movb $0, %ah
movb %ah, 151(%rsp)
movb $0, %ah
movb %ah, 150(%rsp)
movb $0, %ah
movb %ah, 149(%rsp)
movb $0, %ah
movb %ah, 148(%rsp)
movb $0, %ah
movb %ah, 147(%rsp)
movb $0, %ah
movb %ah, 146(%rsp)
movb $0, %ah
movb %ah, 145(%rsp)
movb $0, %ah
movb %ah, 144(%rsp)
movb $0, %ah
movb %ah, 143(%rsp)
movb $0, %ah
movb %ah, 142(%rsp)
movb $0, %ah
movb %ah, 141(%rsp)
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
leaq  125(%rsp), %rdx
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
movq  268(%rsp), %rax
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
movq  268(%rsp), %rax
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
movq  340(%rsp), %rdx
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
movq  408(%rsp), %rax
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
movq  400(%rsp), %rax
addq %rdx, %rax
movq %rax, 0(%rsp)
movq  0(%rsp), %rdx
movq %rdx, 400(%rsp)
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
movq  340(%rsp), %rdx
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
movq  408(%rsp), %rax
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
movq  400(%rsp), %rax
addq %rdx, %rax
movq %rax, 0(%rsp)
movq  0(%rsp), %rdx
movq %rdx, 400(%rsp)
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
movq  268(%rsp), %rax
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
movq  268(%rsp), %rax
addq %rdx, %rax
movq %rax, 0(%rsp)
movq  0(%rsp), %rdx
movq %rdx, 268(%rsp)
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
addq $241, %rsp
#__end_scope_13
retq
.seh_endproc
.def	factorial;
.endef
.globl	factorial
factorial:
.seh_proc factorial
#__begin_scope_18
#__init_scope_18
subq $29, %rsp
movl 0(%rcx), %edx
movl %edx, 25(%rsp)
movl $0, 21(%rsp)
movl  25(%rsp), %eax
movl  21(%rsp), %ebx
movb $1, 20(%rsp)
cmpl %eax, %ebx
je mark_39
movb $0, 20(%rsp)
mark_39 :
#IF
xor %edx, %edx
movb  20(%rsp), %dh
cmpb $0, %dh
je mark_37
#__end_scope_18
#__begin_scope_19
#__init_scope_19
subq $4, %rsp
movl $1, 0(%rsp)
movl  0(%rsp), %eax
#__clear_scope_19
addq $4, %rsp
#__clear_scope_18
addq $29, %rsp
retq
#__clear_scope_19
addq $4, %rsp
#__end_scope_19
#__begin_scope_18
jmp mark_38
mark_37 :
mark_38 :
movl $1, 16(%rsp)
movl  25(%rsp), %edx
subl  16(%rsp), %edx
movl %edx, 12(%rsp)
movl $0, 8(%rsp)
movl  12(%rsp), %edx
movl %edx, 8(%rsp)
#__parameter_offset_pass
leaq  8(%rsp), %rcx
callq factorial
movl %eax, 4(%rsp)
movl  4(%rsp), %eax
imull  25(%rsp)
movl %eax, 0(%rsp)
movl  0(%rsp), %eax
#__clear_scope_18
addq $29, %rsp
retq
#__clear_scope_18
addq $29, %rsp
#__end_scope_18
retq
.seh_endproc
.def	main;
.endef
.globl	main
main:
.seh_proc main
#__begin_scope_20
#__init_scope_20
subq $162, %rsp
movl %ecx, 158(%rsp)
movq %rdx, 150(%rsp)
movq $0, 149(%rsp)
movq $0, 148(%rsp)
movq $0, 147(%rsp)
movq $0, 146(%rsp)
movq $0, 145(%rsp)
movq $0, 144(%rsp)
movq $0, 143(%rsp)
movq $0, 142(%rsp)
movq $0, 141(%rsp)
movq $0, 140(%rsp)
movq $0, 139(%rsp)
movq $0, 138(%rsp)
movq $0, 137(%rsp)
movq $0, 136(%rsp)
movq $0, 135(%rsp)
movq $0, 134(%rsp)
movq $0, 133(%rsp)
movq $0, 132(%rsp)
movq $0, 131(%rsp)
movq $0, 130(%rsp)
movq $0, 129(%rsp)
movq $0, 128(%rsp)
movq $0, 127(%rsp)
movq $0, 126(%rsp)
movq $0, 125(%rsp)
movq $0, 124(%rsp)
movq $0, 123(%rsp)
movq $0, 122(%rsp)
movq $0, 121(%rsp)
movq $0, 120(%rsp)
movq $0, 119(%rsp)
movq $0, 118(%rsp)
movq $0, 117(%rsp)
movq $0, 116(%rsp)
movq $0, 115(%rsp)
movq $0, 114(%rsp)
movq $0, 113(%rsp)
movq $0, 112(%rsp)
movq $0, 111(%rsp)
movq $0, 110(%rsp)
movq $0, 109(%rsp)
movq $0, 108(%rsp)
movq $0, 107(%rsp)
movq $0, 106(%rsp)
movq $0, 105(%rsp)
movq $0, 104(%rsp)
movq $0, 103(%rsp)
movq $0, 102(%rsp)
movq $0, 101(%rsp)
movq $0, 100(%rsp)
movq $0, 99(%rsp)
movq $0, 98(%rsp)
movq $0, 97(%rsp)
movq $0, 96(%rsp)
movq $0, 95(%rsp)
movq $0, 94(%rsp)
movq $0, 93(%rsp)
movq $0, 92(%rsp)
movq $0, 91(%rsp)
movq $0, 90(%rsp)
movl $1488, 86(%rsp)
movl  86(%rsp), %edx
movl %edx, 146(%rsp)
leaq  110(%rsp), %rdx
movq %rdx, 78(%rsp)
movq  78(%rsp), %rdx
movq %rdx, 130(%rsp)
leaq  90(%rsp), %rdx
movq %rdx, 70(%rsp)
movq  70(%rsp), %rdx
movq %rdx, 138(%rsp)
addq $16, 130(%rsp)
movl $1489, 66(%rsp)
movq  130(%rsp), %rax
movl  66(%rsp), %edx
movl %edx, (%rax)
addq $16, 138(%rsp)
movl $1450, 62(%rsp)
movq  138(%rsp), %rax
movl  62(%rsp), %edx
movl %edx, (%rax)
movb $0, 61(%rsp)
movb $100, 60(%rsp)
movb $37, 59(%rsp)
movb $32, 58(%rsp)
movb $61, 57(%rsp)
movb $32, 56(%rsp)
movb $108, 55(%rsp)
movb $97, 54(%rsp)
movb $118, 53(%rsp)
movb $46, 52(%rsp)
movb $114, 51(%rsp)
movb $116, 50(%rsp)
movb $112, 49(%rsp)
leaq  49(%rsp), %rdx
movq %rdx, 41(%rsp)
addq $16, 130(%rsp)
movq  130(%rsp), %rax
leaq (%rax), %rdx
movq %rdx, 33(%rsp)
movq  33(%rsp), %rdx
movq %rdx, 25(%rsp)
leaq  25(%rsp), %rdx
movq %rdx, 17(%rsp)
movq $0, 9(%rsp)
movq  41(%rsp), %rdx
movq %rdx, 9(%rsp)
movq $0, 1(%rsp)
movq  17(%rsp), %rdx
movq %rdx, 1(%rsp)
#__parameter_offset_pass
leaq  1(%rsp), %rcx
callq printf
movb %al, 0(%rsp)
#__clear_scope_20
addq $162, %rsp
#__end_scope_20
xor %rax, %rax
retq
.seh_endproc

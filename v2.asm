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
.def	print_num;
.endef
.globl	print_num
print_num:
.seh_proc print_num
#__begin_scope_2
#__init_scope_2
subq $44, %rsp
movl 0(%rcx), %edx
movl %edx, 40(%rsp)
movb $0, 39(%rsp)
movb $0, 38(%rsp)
movb $0, 37(%rsp)
movb $0, 36(%rsp)
movb $0, 35(%rsp)
movb $0, 34(%rsp)
movb $0, 33(%rsp)
movb $0, 32(%rsp)
movb $0, 31(%rsp)
movb $0, 30(%rsp)
movb $0, 29(%rsp)
movb $0, 28(%rsp)
movb $0, 27(%rsp)
movb $0, 26(%rsp)
movb $0, 25(%rsp)
movb $0, 24(%rsp)
movb $0, 23(%rsp)
movb $0, 22(%rsp)
movb $0, 21(%rsp)
leaq  21(%rsp), %rdx
movq %rdx, 13(%rsp)
movl $0, 9(%rsp)
movl  40(%rsp), %eax
movl  9(%rsp), %ebx
movb $1, 8(%rsp)
cmpl %eax, %ebx
je mark_5
movb $0, 8(%rsp)
mark_5 :
#IF
xor %edx, %edx
movb  8(%rsp), %dh
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
subq $36, %rsp
movl $0, 32(%rsp)
#__end_scope_4
#__begin_scope_5
#__init_scope_5
subq $54, %rsp
mark_7 :
movl $0, 50(%rsp)
movl  130(%rsp), %eax
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
movl  130(%rsp), %eax
cdq
idivl  45(%rsp)
movl %edx, 41(%rsp)
movl $10, 37(%rsp)
movl  130(%rsp), %eax
cdq
idivl  37(%rsp)
movl %eax, 33(%rsp)
movl  33(%rsp), %edx
movl %edx, 130(%rsp)
movb $48, %ah
movb %ah, 32(%rsp)
movsbl  32(%rsp), %edx
movl %edx, 28(%rsp)
movl  41(%rsp), %edx
addl  28(%rsp), %edx
movl %edx, 24(%rsp)
movslq  86(%rsp), %rdx
imulq $1, %rdx
movq  103(%rsp), %rax
addq %rdx, %rax
movq %rax, 16(%rsp)
movq  16(%rsp), %rax
movb  24(%rsp), %dh
movb %dh, (%rax)
movl $1, 12(%rsp)
movl  86(%rsp), %edx
addl  12(%rsp), %edx
movl %edx, 8(%rsp)
movl  8(%rsp), %edx
movl %edx, 86(%rsp)
jmp mark_7
mark_8 :
#__clear_scope_5
addq $54, %rsp
#__end_scope_5
#__begin_scope_4
movq $0, 24(%rsp)
movq  49(%rsp), %rdx
movq %rdx, 24(%rsp)
#__parameter_offset_pass
leaq  24(%rsp), %rcx
callq strlen
movl %eax, 20(%rsp)
#__end_scope_4
#__begin_scope_6
#__init_scope_6
subq $87, %rsp
movl $0, 83(%rsp)
mark_10 :
movl $2, 79(%rsp)
movl  107(%rsp), %eax
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
movq  136(%rsp), %rax
addq %rdx, %rax
movq %rax, 66(%rsp)
movq  66(%rsp), %rax
movb (%rax), %dh
movb %dh, 65(%rsp)
movl $1, 61(%rsp)
movl  107(%rsp), %edx
subl  61(%rsp), %edx
movl %edx, 57(%rsp)
movl  57(%rsp), %edx
subl  83(%rsp), %edx
movl %edx, 53(%rsp)
movslq  53(%rsp), %rdx
imulq $1, %rdx
movq  136(%rsp), %rax
addq %rdx, %rax
movq %rax, 45(%rsp)
movq  45(%rsp), %rax
movb (%rax), %dh
movb %dh, 44(%rsp)
movslq  83(%rsp), %rdx
imulq $1, %rdx
movq  136(%rsp), %rax
addq %rdx, %rax
movq %rax, 36(%rsp)
movq  36(%rsp), %rax
movb  44(%rsp), %dh
movb %dh, (%rax)
movl $1, 32(%rsp)
movl  107(%rsp), %edx
subl  32(%rsp), %edx
movl %edx, 28(%rsp)
movl  28(%rsp), %edx
subl  83(%rsp), %edx
movl %edx, 24(%rsp)
movslq  24(%rsp), %rdx
imulq $1, %rdx
movq  136(%rsp), %rax
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
#__clear_scope_6
addq $87, %rsp
#__end_scope_6
#__begin_scope_4
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 12(%rsp)
movl $0, 8(%rsp)
movq  12(%rsp), %rcx
leaq  8(%rsp), %r9
movq   49(%rsp), %rdx
movl   20(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
#__clear_scope_4
addq $36, %rsp
#__end_scope_4
#__begin_scope_2
jmp mark_4
mark_6 :
mark_4 :
#__clear_scope_2
addq $44, %rsp
#__end_scope_2
retq
.seh_endproc
.def	print_str;
.endef
.globl	print_str
print_str:
.seh_proc print_str
#__begin_scope_7
#__init_scope_7
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
#__clear_scope_7
addq $40, %rsp
#__end_scope_7
retq
.seh_endproc
.def	say_hello;
.endef
.globl	say_hello
say_hello:
.seh_proc say_hello
#__begin_scope_8
#__init_scope_8
subq $68, %rsp
movb $0, 67(%rsp)
movb $116, 66(%rsp)
movb $112, 65(%rsp)
movb $105, 64(%rsp)
movb $114, 63(%rsp)
movb $99, 62(%rsp)
movb $115, 61(%rsp)
movb $101, 60(%rsp)
movb $112, 59(%rsp)
movb $121, 58(%rsp)
movb $84, 57(%rsp)
movb $32, 56(%rsp)
movb $104, 55(%rsp)
movb $116, 54(%rsp)
movb $105, 53(%rsp)
movb $119, 52(%rsp)
movb $32, 51(%rsp)
movb $100, 50(%rsp)
movb $101, 49(%rsp)
movb $108, 48(%rsp)
movb $105, 47(%rsp)
movb $112, 46(%rsp)
movb $109, 45(%rsp)
movb $111, 44(%rsp)
movb $99, 43(%rsp)
movb $32, 42(%rsp)
movb $103, 41(%rsp)
movb $110, 40(%rsp)
movb $97, 39(%rsp)
movb $108, 38(%rsp)
movb $32, 37(%rsp)
movb $67, 36(%rsp)
movb $32, 35(%rsp)
movb $109, 34(%rsp)
movb $111, 33(%rsp)
movb $114, 32(%rsp)
movb $102, 31(%rsp)
movb $32, 30(%rsp)
movb $111, 29(%rsp)
movb $108, 28(%rsp)
movb $108, 27(%rsp)
movb $101, 26(%rsp)
movb $72, 25(%rsp)
leaq  25(%rsp), %rdx
movq %rdx, 17(%rsp)
movq $0, 9(%rsp)
movq  17(%rsp), %rdx
movq %rdx, 9(%rsp)
#__parameter_offset_pass
leaq  9(%rsp), %rcx
callq print_str
movb %al, 8(%rsp)
#__clear_scope_8
addq $68, %rsp
#__end_scope_8
retq
.seh_endproc
.def	main;
.endef
.globl	main
main:
.seh_proc main
#__begin_scope_9
#__init_scope_9
subq $157, %rsp
movl %ecx, 153(%rsp)
movq %rdx, 145(%rsp)
movb $0, 144(%rsp)
movb $111, 143(%rsp)
movb $108, 142(%rsp)
movb $108, 141(%rsp)
movb $101, 140(%rsp)
movb $72, 139(%rsp)
leaq  139(%rsp), %rdx
movq %rdx, 131(%rsp)
movq $0, 123(%rsp)
movq  131(%rsp), %rdx
movq %rdx, 123(%rsp)
#__parameter_offset_pass
leaq  123(%rsp), %rcx
callq print_str
movb %al, 122(%rsp)
movb $0, 121(%rsp)
movb $10, 120(%rsp)
leaq  120(%rsp), %rdx
movq %rdx, 112(%rsp)
movq $0, 104(%rsp)
movq  112(%rsp), %rdx
movq %rdx, 104(%rsp)
#__parameter_offset_pass
leaq  104(%rsp), %rcx
callq print_str
movb %al, 103(%rsp)
movl $1, 99(%rsp)
movl $0, 95(%rsp)
movl  95(%rsp), %edx
addl  99(%rsp), %edx
movl %edx, 91(%rsp)
movl $3, 87(%rsp)
movl $6, 83(%rsp)
movl $8, 79(%rsp)
movl  79(%rsp), %edx
addl  83(%rsp), %edx
movl %edx, 75(%rsp)
movl  87(%rsp), %eax
imull  75(%rsp)
movl %eax, 71(%rsp)
movl  71(%rsp), %edx
subl  91(%rsp), %edx
movl %edx, 67(%rsp)
movl $5, 63(%rsp)
movl  67(%rsp), %eax
cdq
idivl  63(%rsp)
movl %eax, 59(%rsp)
movl $0, 55(%rsp)
movl  59(%rsp), %edx
movl %edx, 55(%rsp)
#__parameter_offset_pass
leaq  55(%rsp), %rcx
callq print_num
movb %al, 54(%rsp)
movb $0, 53(%rsp)
movb $10, 52(%rsp)
leaq  52(%rsp), %rdx
movq %rdx, 44(%rsp)
movq $0, 36(%rsp)
movq  44(%rsp), %rdx
movq %rdx, 36(%rsp)
#__parameter_offset_pass
leaq  36(%rsp), %rcx
callq print_str
movb %al, 35(%rsp)
callq say_hello
movb %al, 34(%rsp)
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
addq $157, %rsp
#__end_scope_9
xor %rax, %rax
retq
.seh_endproc

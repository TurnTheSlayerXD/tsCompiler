.def	main;
.endef
.globl	main
main:
.seh_proc main
#__begin_scope_0
#__init
subq $1000, %rsp
movq $0, 992(%rsp)
movb $0, 991(%rsp)
movb $10, 990(%rsp)
movb $100, 989(%rsp)
movb $108, 988(%rsp)
movb $114, 987(%rsp)
movb $111, 986(%rsp)
movb $119, 985(%rsp)
movb $32, 984(%rsp)
movb $44, 983(%rsp)
movb $111, 982(%rsp)
movb $108, 981(%rsp)
movb $108, 980(%rsp)
movb $101, 979(%rsp)
movb $72, 978(%rsp)
leaq 978(%rsp), %rdx
movq %rdx, 970(%rsp)
movq 970(%rsp), %rdx
movq %rdx, 992(%rsp)
#__end_scope_0
#__begin_scope_1
#__init
subq $1000, %rsp
movl $0, 966(%rsp)
movl $0, 962(%rsp)
movl 962(%rsp), %edx
movl %edx, 966(%rsp)
mark_0 :
movl $10, 958(%rsp)
movl 966(%rsp), %eax
movl 958(%rsp), %ebx
movb $1, 957(%rsp)
cmpl %eax, %ebx
jg mark_2
movb $0, 957(%rsp)
mark_2 :
#FOR
xor %edx, %edx
movb 957(%rsp), %dh
cmpb $0, %dh
je mark_1
#__end_scope_1
#__begin_scope_2
#__init
subq $1000, %rsp
movl $0, 953(%rsp)
movl $0, 949(%rsp)
movl 949(%rsp), %edx
movl %edx, 953(%rsp)
mark_3 :
movslq 953(%rsp), %rdx
imulq $1, %rdx
movq 992(%rsp), %rax
addq %rdx, %rax
movq %rax, 941(%rsp)
movq 941(%rsp), %rax
movb (%rax), %dh
movb %dh, 940(%rsp)
movb $0, %ah
movb %ah, 939(%rsp)
movb 940(%rsp), %ah
movb 939(%rsp), %al
movb $1, 938(%rsp)
cmpb %ah, %al
jne mark_5
movb $0, 938(%rsp)
mark_5 :
#FOR
xor %edx, %edx
movb 938(%rsp), %dh
cmpb $0, %dh
je mark_4
movslq 953(%rsp), %rdx
imulq $1, %rdx
movq 992(%rsp), %rax
addq %rdx, %rax
movq %rax, 930(%rsp)
movl $1, 926(%rsp)
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 918(%rsp)
movl $0, 914(%rsp)
movq 918(%rsp), %rcx
leaq 914(%rsp), %r9
movq  930(%rsp), %rdx
movl  926(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
movl $1, 910(%rsp)
movl 953(%rsp), %edx
addl 910(%rsp), %edx
movl %edx, 906(%rsp)
movl 906(%rsp), %edx
movl %edx, 953(%rsp)
jmp mark_3
mark_4 :
#__clear
addq $1000, %rsp
#__end_scope_2
#__begin_scope_1
movl $1, 902(%rsp)
movl 966(%rsp), %edx
addl 902(%rsp), %edx
movl %edx, 898(%rsp)
movl 898(%rsp), %edx
movl %edx, 966(%rsp)
jmp mark_0
mark_1 :
#__clear
addq $1000, %rsp
#__end_scope_1
#__begin_scope_0
#__clear
addq $1000, %rsp
#__end_scope_0
xor %eax, %eax
retq
.seh_endproc

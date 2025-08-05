.def	main;
.endef
.globl	main
main:
.seh_proc main
subq	$1000, %rsp
movl $0, 996(%rsp)
movl $1, 992(%rsp)
movl 992(%rsp), %edx
movl %edx, 996(%rsp)
mark_0:
movl $10, 988(%rsp)
movl 996(%rsp), %eax
movl 988(%rsp), %ebx
movb $1, 987(%rsp)
cmpl %eax, %ebx
jg mark_2
movb $0, 987(%rsp)
mark_2:
#FOR
xor %edx, %edx
movb 987(%rsp), %dh
cmpb $0, %dh
je mark_1
movl $5, 983(%rsp)
movl 996(%rsp), %eax
movl 983(%rsp), %ebx
movb $1, 982(%rsp)
cmpl %eax, %ebx
jl mark_5
movb $0, 982(%rsp)
mark_5:
#IF
xor %edx, %edx
movb 982(%rsp), %dh
cmpb $0, %dh
je mark_3
movb $0, 981(%rsp)
movb $32, 980(%rsp)
movb $53, 979(%rsp)
movb $62, 978(%rsp)
leaq 978(%rsp), %rdx
movq %rdx, 970(%rsp)
movl $4, 966(%rsp)
movl  $4294967285, %ecx
callq	*__imp_GetStdHandle(%rip)
movq	%rax, 958(%rsp)
movl	$0, 954(%rsp)
movq	958(%rsp), %rcx
leaq	954(%rsp), %r9
movq  970(%rsp), %rdx
movl  966(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
jmp mark_4
mark_3:
movb $0, 953(%rsp)
movb $32, 952(%rsp)
movb $53, 951(%rsp)
movb $61, 950(%rsp)
movb $60, 949(%rsp)
leaq 949(%rsp), %rdx
movq %rdx, 941(%rsp)
movl $4, 937(%rsp)
movl  $4294967285, %ecx
callq	*__imp_GetStdHandle(%rip)
movq	%rax, 929(%rsp)
movl	$0, 925(%rsp)
movq	929(%rsp), %rcx
leaq	925(%rsp), %r9
movq  941(%rsp), %rdx
movl  937(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
jmp mark_4
mark_6:
mark_4:
movl $1, 921(%rsp)
movl 996(%rsp), %edx
addl 921(%rsp), %edx
movl %edx, 917(%rsp)
movl 917(%rsp), %edx
movl %edx, 996(%rsp)
jmp mark_0
mark_1:
xor %eax, %eax
addq	$1000, %rsp
retq
.seh_endproc

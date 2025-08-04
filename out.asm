.def	main;
.endef
.globl	main
main:
.seh_proc main
subq	$1000, %rsp
movl $0, 996(%rsp)
movl $0, 992(%rsp)
movl 992(%rsp), %edx
movl %edx, 996(%rsp)
movq $0, 984(%rsp)
leaq 996(%rsp), %rdx
movq %rdx, 976(%rsp)
movq 976(%rsp), %rdx
movq %rdx, 984(%rsp)
movl $1, 972(%rsp)
movl $0, 968(%rsp)
movl 968(%rsp), %edx
subl 972(%rsp), %edx
movl %edx, 964(%rsp)
movl 964(%rsp), %edx
movl %edx, 996(%rsp)
leaq 996(%rsp), %rdx
movq %rdx, 956(%rsp)
movl $1, 952(%rsp)
movl 952(%rsp), %edx
movq 956(%rsp), %rax
movl %edx, (%rax)
#IF
xor %edx, %edx
movb 952(%rsp), %dh
cmpb $0, %dh
je mark_0
movb $0, 951(%rsp)
movb $33, 950(%rsp)
movb $48, 949(%rsp)
leaq 949(%rsp), %rdx
movq %rdx, 941(%rsp)
movl $2, 937(%rsp)
movl  $4294967285, %ecx
callq	*__imp_GetStdHandle(%rip)
movq	%rax, 929(%rsp)
movl	$0, 925(%rsp)
movq	929(%rsp), %rcx
leaq	925(%rsp), %r9
movq  941(%rsp), %rdx
movl  937(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
jmp mark_1
mark_0:
mark_1:
movl $0, 921(%rsp)
movl 996(%rsp), %eax
movl 921(%rsp), %ebx
movb $1, 920(%rsp)
cmpl %eax, %ebx
jg mark_4
movb $0, 920(%rsp)
mark_4:
#IF
xor %edx, %edx
movb 920(%rsp), %dh
cmpb $0, %dh
je mark_2
movb $0, 919(%rsp)
movb $33, 918(%rsp)
movb $49, 917(%rsp)
leaq 917(%rsp), %rdx
movq %rdx, 909(%rsp)
movl $2, 905(%rsp)
movl  $4294967285, %ecx
callq	*__imp_GetStdHandle(%rip)
movq	%rax, 897(%rsp)
movl	$0, 893(%rsp)
movq	897(%rsp), %rcx
leaq	893(%rsp), %r9
movq  909(%rsp), %rdx
movl  905(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
jmp mark_3
mark_2:
movb $0, 892(%rsp)
movb $33, 891(%rsp)
movb $50, 890(%rsp)
leaq 890(%rsp), %rdx
movq %rdx, 882(%rsp)
movl $2, 878(%rsp)
movl  $4294967285, %ecx
callq	*__imp_GetStdHandle(%rip)
movq	%rax, 870(%rsp)
movl	$0, 866(%rsp)
movq	870(%rsp), %rcx
leaq	866(%rsp), %r9
movq  882(%rsp), %rdx
movl  878(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
jmp mark_3
mark_5:
mark_3:
xor %eax, %eax
addq	$1000, %rsp
retq
.seh_endproc

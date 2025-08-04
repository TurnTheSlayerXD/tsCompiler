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
movl $0, 988(%rsp)
movl 996(%rsp), %eax
movl 988(%rsp), %ebx
movb $1, 987(%rsp)
cmpl %eax, %ebx
jle mark_2
movb $0, 987(%rsp)
mark_2:
#IF
xor %edx, %edx
movb 987(%rsp), %dh
cmpb $0, %dh
je mark_0
movb $0, 986(%rsp)
movb $33, 985(%rsp)
movb $48, 984(%rsp)
leaq 984(%rsp), %rdx
movq %rdx, 976(%rsp)
movl $2, 972(%rsp)
movl  $4294967285, %ecx
callq	*__imp_GetStdHandle(%rip)
movq	%rax, 964(%rsp)
movl	$0, 960(%rsp)
movq	964(%rsp), %rcx
leaq	960(%rsp), %r9
movq  976(%rsp), %rdx
movl  972(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
jmp mark_1
mark_0:
mark_1:
movl $0, 956(%rsp)
movl 996(%rsp), %eax
movl 956(%rsp), %ebx
movb $1, 955(%rsp)
cmpl %eax, %ebx
jg mark_5
movb $0, 955(%rsp)
mark_5:
#IF
xor %edx, %edx
movb 955(%rsp), %dh
cmpb $0, %dh
je mark_3
movb $0, 954(%rsp)
movb $33, 953(%rsp)
movb $49, 952(%rsp)
leaq 952(%rsp), %rdx
movq %rdx, 944(%rsp)
movl $2, 940(%rsp)
movl  $4294967285, %ecx
callq	*__imp_GetStdHandle(%rip)
movq	%rax, 932(%rsp)
movl	$0, 928(%rsp)
movq	932(%rsp), %rcx
leaq	928(%rsp), %r9
movq  944(%rsp), %rdx
movl  940(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
jmp mark_4
mark_3:
movb $0, 927(%rsp)
movb $33, 926(%rsp)
movb $50, 925(%rsp)
leaq 925(%rsp), %rdx
movq %rdx, 917(%rsp)
movl $2, 913(%rsp)
movl  $4294967285, %ecx
callq	*__imp_GetStdHandle(%rip)
movq	%rax, 905(%rsp)
movl	$0, 901(%rsp)
movq	905(%rsp), %rcx
leaq	901(%rsp), %r9
movq  917(%rsp), %rdx
movl  913(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
jmp mark_4
mark_6:
mark_4:
xor %eax, %eax
addq	$1000, %rsp
retq
.seh_endproc

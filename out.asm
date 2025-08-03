.def	main;
.endef
.globl	main
main:
.seh_proc main
subq	$100, %rsp
movl $0, 96(%rsp)
movl $1488, 92(%rsp)
movl 92(%rsp), %edx
movl %edx, 96(%rsp)
movq $0, 84(%rsp)
leaq 96(%rsp), %rdx
movq %rdx, 76(%rsp)
movq 76(%rsp), %rdx
movq %rdx, 84(%rsp)
movq $0, 68(%rsp)
leaq 84(%rsp), %rdx
movq %rdx, 60(%rsp)
movq 60(%rsp), %rdx
movq %rdx, 68(%rsp)
leaq 96(%rsp), %rdx
movq %rdx, 52(%rsp)
movl $4, 48(%rsp)
movl  $4294967285, %ecx
callq	*__imp_GetStdHandle(%rip)
movq	%rax, 40(%rsp)
movl	$0, 36(%rsp)
movq	40(%rsp), %rcx
leaq	36(%rsp), %r9
movq  52(%rsp), %rdx
movl  48(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
movq 68(%rsp), %rax
movq (%rax), %rdx
movq %rdx, 28(%rsp)
movq 28(%rsp), %rax
leaq (%rax), %rdx
movq %rdx, 20(%rsp)
movl $4, 16(%rsp)
movl  $4294967285, %ecx
callq	*__imp_GetStdHandle(%rip)
movq	%rax, 8(%rsp)
movl	$0, 4(%rsp)
movq	8(%rsp), %rcx
leaq	4(%rsp), %r9
movq  20(%rsp), %rdx
movl  16(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
xor %eax, %eax
addq	$100, %rsp
retq
.seh_endproc

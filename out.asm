.def	main;
.endef
.globl	main
main:
.seh_proc main
subq	$100, %rsp
movl $0, 96(%rsp)
movl $112312123123, 92(%rsp)
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
leaq 68(%rsp), %rdx
movq %rdx, 52(%rsp)
movq 52(%rsp), %rax
movq (%rax), %rdx
movq %rdx, 44(%rsp)
movq 44(%rsp), %rax
movq (%rax), %rdx
movq %rdx, 36(%rsp)
movl $1, 32(%rsp)
movl 32(%rsp), %edx
movq 36(%rsp), %rax
movl %edx, (%rax)
movl $10, 28(%rsp)
movl  $4294967285, %ecx
callq	*__imp_GetStdHandle(%rip)
movq	%rax, 20(%rsp)
movl	$0, 16(%rsp)
movq	20(%rsp), %rcx
leaq	16(%rsp), %r9
leaq  96(%rsp), %rdx
movl  28(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
xor %eax, %eax
addq	$100, %rsp
retq
.seh_endproc

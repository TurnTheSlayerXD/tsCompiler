	.def	main;
	.endef
	.globl	main                            # -- Begin function main
main:                                   # @main
.seh_proc main
	subq	$56, %rsp
	leaq	"??_C@_02DPKJAMEF@?$CFd?$AA@"(%rip), %rcx
	movl	$13, %edx
	callq	printf
	xorl	%eax, %eax
	addq	$56, %rsp
	retq
	.seh_endproc
                                        # -- End function
"??_C@_02DPKJAMEF@?$CFd?$AA@":
	.asciz	"%d"

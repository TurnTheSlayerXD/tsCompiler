.def	main;
.endef
.globl	main                            # -- Begin function main
main:                                   # @main
.seh_proc main
	subq	$40, %rsp
	leaq	"lel"(%rip), %rcx
	callq	printf
	xorl	%eax, %eax
	addq	$40, %rsp
	retq
	.seh_endproc
                                        # -- End function
"lel":
	.asciz	"Hello, world"
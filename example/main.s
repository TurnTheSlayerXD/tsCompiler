.def	main;
.endef
.globl	main                            # -- Begin function main
main:                                   # @main
.seh_proc main
	subq	$40, %rsp
	.seh_stackalloc 40
	.seh_endprologue
	leaq	""(%rip), %rcx
	callq	printf
	xorl	%eax, %eax
	addq	$40, %rsp
	retq
	.seh_endproc
                                        # -- End function
"lel":
	.asciz	"Hello, world"
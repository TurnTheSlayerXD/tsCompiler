	.def	fuu;
	.endef
	.globl	fuu                             # -- Begin function fuu
fuu:                                    # @fuu
.seh_proc fuu
	pushq	%rax
	movl	%ecx, 4(%rsp)
	movl	$1488, %eax                     # imm = 0x5D0
	popq	%rcx
	retq
	.seh_endproc
                                        # -- End function
	.def	main;
	.scl	2;
	.type	32;
	.endef
	.globl	main                            # -- Begin function main
	.p2align	4
main:                                   # @main
.seh_proc main
	subq	$56, %rsp
	.seh_endprologue
	movq	%rdx, 48(%rsp)
	movl	%ecx, 44(%rsp)
	movl	$1, %ecx
	callq	fuu
	xorl	%eax, %eax
	addq	$56, %rsp
	retq
	.seh_endproc
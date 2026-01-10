	.def	@feat.00;
	.scl	3;
	.type	0;
	.endef
	.globl	@feat.00
.set @feat.00, 0
	.file	"main.c"
	.def	main;
	.scl	2;
	.type	32;
	.endef
	.text
	.globl	main                            # -- Begin function main
	.p2align	4
main:                                   # @main
.seh_proc main
# %bb.0:
	subq	$32, %rsp
	.seh_stackalloc 32
	.seh_endprologue
	movq	%rdx, 24(%rsp)
	movl	%ecx, 20(%rsp)
	movb	$1, 19(%rsp)
	leaq	19(%rsp), %rax
	movq	%rax, 8(%rsp)
	movq	8(%rsp), %rax
	movb	$3, (%rax)
	movq	8(%rsp), %rax
	addq	$51, %rax
	movq	%rax, (%rsp)
	xorl	%eax, %eax
	addq	$32, %rsp
	retq
	.seh_endproc
                                        # -- End function
	.addrsig

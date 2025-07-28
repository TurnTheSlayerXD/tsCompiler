	.def	main;
	.endef
	.globl	main                            # -- Begin function main
main:                                   # @main
.seh_proc main
# %bb.0:
	subq	$88, %rsp
	.seh_stackalloc 88
	.seh_endprologue
	movl	$4294967285, %ecx               # imm = 0xFFFFFFF5
	callq	*__imp_GetStdHandle(%rip)
	
	movq	%rax, 56(%rsp)
	movl	$0, 52(%rsp)

	movq	56(%rsp), %rcx
	leaq	"??_C@_0M@LACCCNMM@hello?5world?$AA@"(%rip), %rdx
	movl	$11, %r8d
	leaq	52(%rsp), %r9
	xorl	%eax, %eax
                                        # kill: def $rax killed $eax
	callq	*__imp_WriteConsoleA(%rip)
	xorl	%eax, %eax
	addq	$88, %rsp
	retq
	.seh_endproc
"??_C@_0M@LACCCNMM@hello?5world?$AA@":
	.asciz	"hello world"

	.lcomm	__local_stdio_printf_options._OptionsStorage,8,8 # @__local_stdio_printf_options._OptionsStorage
	.section	.drectve,"yni"
	.ascii	" /DEFAULTLIB:uuid.lib"
	.ascii	" /DEFAULTLIB:uuid.lib"
	.addrsig
	.addrsig_sym _vsnprintf
	.addrsig_sym _vsprintf_l
	.addrsig_sym _vsnprintf_l
	.addrsig_sym __stdio_common_vsprintf
	.addrsig_sym __local_stdio_printf_options
	.addrsig_sym __local_stdio_printf_options._OptionsStorage

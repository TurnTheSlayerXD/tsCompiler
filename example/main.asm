	.def	@feat.00;
	.scl	3;
	.type	0;
	.endef
	.globl	@feat.00
.set @feat.00, 0
	.file	"main.c"
	.def	sprintf;
	.scl	2;
	.type	32;
	.endef
	.section	.text,"xr",discard,sprintf
	.globl	sprintf                         # -- Begin function sprintf
	.p2align	4
sprintf:                                # @sprintf
.seh_proc sprintf
# %bb.0:
	subq	$72, %rsp
	.seh_stackalloc 72
	.seh_endprologue
	movq	%r9, 104(%rsp)
	movq	%r8, 96(%rsp)
	movq	%rdx, 64(%rsp)
	movq	%rcx, 56(%rsp)
	leaq	96(%rsp), %rax
	movq	%rax, 40(%rsp)
	movq	40(%rsp), %r9
	movq	64(%rsp), %rdx
	movq	56(%rsp), %rcx
	xorl	%eax, %eax
	movl	%eax, %r8d
	callq	_vsprintf_l
	movl	%eax, 52(%rsp)
	movl	52(%rsp), %eax
	addq	$72, %rsp
	retq
	.seh_endproc
                                        # -- End function
	.def	vsprintf;
	.scl	2;
	.type	32;
	.endef
	.section	.text,"xr",discard,vsprintf
	.globl	vsprintf                        # -- Begin function vsprintf
	.p2align	4
vsprintf:                               # @vsprintf
.seh_proc vsprintf
# %bb.0:
	subq	$72, %rsp
	.seh_stackalloc 72
	.seh_endprologue
	movq	%r8, 64(%rsp)
	movq	%rdx, 56(%rsp)
	movq	%rcx, 48(%rsp)
	movq	64(%rsp), %rax
	movq	56(%rsp), %r8
	movq	48(%rsp), %rcx
	movq	$-1, %rdx
	xorl	%r9d, %r9d
                                        # kill: def $r9 killed $r9d
	movq	%rax, 32(%rsp)
	callq	_vsnprintf_l
	nop
	addq	$72, %rsp
	retq
	.seh_endproc
                                        # -- End function
	.def	_snprintf;
	.scl	2;
	.type	32;
	.endef
	.section	.text,"xr",discard,_snprintf
	.globl	_snprintf                       # -- Begin function _snprintf
	.p2align	4
_snprintf:                              # @_snprintf
.seh_proc _snprintf
# %bb.0:
	subq	$72, %rsp
	.seh_stackalloc 72
	.seh_endprologue
	movq	%r9, 104(%rsp)
	movq	%r8, 64(%rsp)
	movq	%rdx, 56(%rsp)
	movq	%rcx, 48(%rsp)
	leaq	104(%rsp), %rax
	movq	%rax, 32(%rsp)
	movq	32(%rsp), %r9
	movq	64(%rsp), %r8
	movq	56(%rsp), %rdx
	movq	48(%rsp), %rcx
	callq	_vsnprintf
	movl	%eax, 44(%rsp)
	movl	44(%rsp), %eax
	addq	$72, %rsp
	retq
	.seh_endproc
                                        # -- End function
	.def	_vsnprintf;
	.scl	2;
	.type	32;
	.endef
	.section	.text,"xr",discard,_vsnprintf
	.globl	_vsnprintf                      # -- Begin function _vsnprintf
	.p2align	4
_vsnprintf:                             # @_vsnprintf
.seh_proc _vsnprintf
# %bb.0:
	subq	$72, %rsp
	.seh_stackalloc 72
	.seh_endprologue
	movq	%r9, 64(%rsp)
	movq	%r8, 56(%rsp)
	movq	%rdx, 48(%rsp)
	movq	%rcx, 40(%rsp)
	movq	64(%rsp), %rax
	movq	56(%rsp), %r8
	movq	48(%rsp), %rdx
	movq	40(%rsp), %rcx
	xorl	%r9d, %r9d
                                        # kill: def $r9 killed $r9d
	movq	%rax, 32(%rsp)
	callq	_vsnprintf_l
	nop
	addq	$72, %rsp
	retq
	.seh_endproc
                                        # -- End function
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
	pushq	%r14
	.seh_pushreg %r14
	pushq	%rsi
	.seh_pushreg %rsi
	pushq	%rdi
	.seh_pushreg %rdi
	pushq	%rbx
	.seh_pushreg %rbx
	subq	$184, %rsp
	.seh_stackalloc 184
	.seh_endprologue
	movl	$0, 180(%rsp)
	movl	.L__const.main.msg1(%rip), %eax
	movl	%eax, 173(%rsp)
	movw	.L__const.main.msg1+4(%rip), %ax
	movw	%ax, 177(%rsp)
	movb	.L__const.main.msg1+6(%rip), %al
	movb	%al, 179(%rsp)

	movl	.L__const.main.msg2(%rip), %eax
	movl	%eax, 167(%rsp)
	movw	.L__const.main.msg2+4(%rip), %ax
	movw	%ax, 171(%rsp)

	movq	.L__const.main.msg3(%rip), %rax
	movq	%rax, 158(%rsp)
	movb	.L__const.main.msg3+8(%rip), %al
	movb	%al, 166(%rsp)

	movq	.L__const.main.msg4(%rip), %rax
	movq	%rax, 149(%rsp)
	movb	.L__const.main.msg4+8(%rip), %al
	movb	%al, 157(%rsp)

	movq	.L__const.main.msg5(%rip), %rax
	movq	%rax, 140(%rsp)
	movb	.L__const.main.msg5+8(%rip), %al
	movb	%al, 148(%rsp)

	movq	.L__const.main.msg6(%rip), %rax
	movq	%rax, 131(%rsp)
	movb	.L__const.main.msg6+8(%rip), %al
	movb	%al, 139(%rsp)

	movq	.L__const.main.msg7(%rip), %rax
	movq	%rax, 122(%rsp)
	movb	.L__const.main.msg7+8(%rip), %al
	movb	%al, 130(%rsp)

	movq	.L__const.main.msg8(%rip), %rax
	movq	%rax, 113(%rsp)
	movb	.L__const.main.msg8+8(%rip), %al
	movb	%al, 121(%rsp)

	movq	.L__const.main.msg9(%rip), %rax
	movq	%rax, 104(%rsp)
	movb	.L__const.main.msg9+8(%rip), %al
	movb	%al, 112(%rsp)

	movq	.L__const.main.msg10(%rip), %rax
	movq	%rax, 95(%rsp)
	movb	.L__const.main.msg10+8(%rip), %al
	movb	%al, 103(%rsp)

	leaq	95(%rsp), %r14
	leaq	104(%rsp), %rbx
	leaq	113(%rsp), %rdi
	leaq	122(%rsp), %rsi
	leaq	131(%rsp), %r11
	leaq	140(%rsp), %r10
	leaq	149(%rsp), %rcx
	leaq	158(%rsp), %r9
	leaq	167(%rsp), %r8
	leaq	173(%rsp), %rdx

	movq	%rsp, %rax
	movq	%r14, 80(%rax)
	movq	%rbx, 72(%rax)
	movq	%rdi, 64(%rax)
	movq	%rsi, 56(%rax)
	movq	%r11, 48(%rax)
	movq	%r10, 40(%rax)
	movq	%rcx, 32(%rax)

	leaq	"??_C@_0L@JDIGHCD@?$CFs?0?5?$CFs?5?$CFs?6?$AA@"(%rip), %rcx
	callq	printf
	xorl	%eax, %eax
	addq	$184, %rsp
	popq	%rbx
	popq	%rdi
	popq	%rsi
	popq	%r14
	retq
	.seh_endproc
                                        # -- End function
	.def	printf;
	.scl	2;
	.type	32;
	.endef
	.section	.text,"xr",discard,printf
	.globl	printf                          # -- Begin function printf
	.p2align	4
printf:                                 # @printf
.seh_proc printf
# %bb.0:
	subq	$72, %rsp
	.seh_stackalloc 72
	.seh_endprologue
	movq	%r9, 104(%rsp)
	movq	%r8, 96(%rsp)
	movq	%rdx, 88(%rsp)
	movq	%rcx, 64(%rsp)
	leaq	88(%rsp), %rax
	movq	%rax, 48(%rsp)
	movq	48(%rsp), %rax
	movq	%rax, 40(%rsp)                  # 8-byte Spill
	movq	64(%rsp), %rax
	movq	%rax, 32(%rsp)                  # 8-byte Spill
	movl	$1, %ecx
	callq	__acrt_iob_func
	movq	32(%rsp), %rdx                  # 8-byte Reload
	movq	40(%rsp), %r9                   # 8-byte Reload
	movq	%rax, %rcx
	xorl	%eax, %eax
	movl	%eax, %r8d
	callq	_vfprintf_l
	movl	%eax, 60(%rsp)
	movl	60(%rsp), %eax
	addq	$72, %rsp
	retq
	.seh_endproc
                                        # -- End function
	.def	_vsprintf_l;
	.scl	2;
	.type	32;
	.endef
	.section	.text,"xr",discard,_vsprintf_l
	.globl	_vsprintf_l                     # -- Begin function _vsprintf_l
	.p2align	4
_vsprintf_l:                            # @_vsprintf_l
.seh_proc _vsprintf_l
# %bb.0:
	subq	$72, %rsp
	.seh_stackalloc 72
	.seh_endprologue
	movq	%r9, 64(%rsp)
	movq	%r8, 56(%rsp)
	movq	%rdx, 48(%rsp)
	movq	%rcx, 40(%rsp)
	movq	64(%rsp), %rax
	movq	56(%rsp), %r9
	movq	48(%rsp), %r8
	movq	40(%rsp), %rcx
	movq	$-1, %rdx
	movq	%rax, 32(%rsp)
	callq	_vsnprintf_l
	nop
	addq	$72, %rsp
	retq
	.seh_endproc
                                        # -- End function
	.def	_vsnprintf_l;
	.scl	2;
	.type	32;
	.endef
	.section	.text,"xr",discard,_vsnprintf_l
	.globl	_vsnprintf_l                    # -- Begin function _vsnprintf_l
	.p2align	4
_vsnprintf_l:                           # @_vsnprintf_l
.seh_proc _vsnprintf_l
# %bb.0:
	subq	$136, %rsp
	.seh_stackalloc 136
	.seh_endprologue
	movq	176(%rsp), %rax
	movq	%r9, 128(%rsp)
	movq	%r8, 120(%rsp)
	movq	%rdx, 112(%rsp)
	movq	%rcx, 104(%rsp)
	movq	176(%rsp), %rax
	movq	%rax, 88(%rsp)                  # 8-byte Spill
	movq	128(%rsp), %rax
	movq	%rax, 80(%rsp)                  # 8-byte Spill
	movq	120(%rsp), %rax
	movq	%rax, 72(%rsp)                  # 8-byte Spill
	movq	112(%rsp), %rax
	movq	%rax, 64(%rsp)                  # 8-byte Spill
	movq	104(%rsp), %rax
	movq	%rax, 56(%rsp)                  # 8-byte Spill
	callq	__local_stdio_printf_options
	movq	56(%rsp), %rdx                  # 8-byte Reload
	movq	64(%rsp), %r8                   # 8-byte Reload
	movq	72(%rsp), %r9                   # 8-byte Reload
	movq	80(%rsp), %r10                  # 8-byte Reload
	movq	%rax, %rcx
	movq	88(%rsp), %rax                  # 8-byte Reload
	movq	(%rcx), %rcx
	orq	$1, %rcx
	movq	%r10, 32(%rsp)
	movq	%rax, 40(%rsp)
	callq	__stdio_common_vsprintf
	movl	%eax, 100(%rsp)
	cmpl	$0, 100(%rsp)
	jge	.LBB7_2
# %bb.1:
	movl	$4294967295, %eax               # imm = 0xFFFFFFFF
	movl	%eax, 52(%rsp)                  # 4-byte Spill
	jmp	.LBB7_3
.LBB7_2:
	movl	100(%rsp), %eax
	movl	%eax, 52(%rsp)                  # 4-byte Spill
.LBB7_3:
	movl	52(%rsp), %eax                  # 4-byte Reload
	addq	$136, %rsp
	retq
	.seh_endproc
                                        # -- End function
	.def	__local_stdio_printf_options;
	.scl	2;
	.type	32;
	.endef
	.section	.text,"xr",discard,__local_stdio_printf_options
	.globl	__local_stdio_printf_options    # -- Begin function __local_stdio_printf_options
	.p2align	4
__local_stdio_printf_options:           # @__local_stdio_printf_options
# %bb.0:
	leaq	__local_stdio_printf_options._OptionsStorage(%rip), %rax
	retq
                                        # -- End function
	.def	_vfprintf_l;
	.scl	2;
	.type	32;
	.endef
	.section	.text,"xr",discard,_vfprintf_l
	.globl	_vfprintf_l                     # -- Begin function _vfprintf_l
	.p2align	4
_vfprintf_l:                            # @_vfprintf_l
.seh_proc _vfprintf_l
# %bb.0:
	subq	$104, %rsp
	.seh_stackalloc 104
	.seh_endprologue
	movq	%r9, 96(%rsp)
	movq	%r8, 88(%rsp)
	movq	%rdx, 80(%rsp)
	movq	%rcx, 72(%rsp)
	movq	96(%rsp), %rax
	movq	%rax, 64(%rsp)                  # 8-byte Spill
	movq	88(%rsp), %rax
	movq	%rax, 56(%rsp)                  # 8-byte Spill
	movq	80(%rsp), %rax
	movq	%rax, 48(%rsp)                  # 8-byte Spill
	movq	72(%rsp), %rax
	movq	%rax, 40(%rsp)                  # 8-byte Spill
	callq	__local_stdio_printf_options
	movq	40(%rsp), %rdx                  # 8-byte Reload
	movq	48(%rsp), %r8                   # 8-byte Reload
	movq	56(%rsp), %r9                   # 8-byte Reload
	movq	%rax, %rcx
	movq	64(%rsp), %rax                  # 8-byte Reload
	movq	(%rcx), %rcx
	movq	%rax, 32(%rsp)
	callq	__stdio_common_vfprintf
	nop
	addq	$104, %rsp
	retq
	.seh_endproc
                                        # -- End function
	.section	.rdata,"dr"
.L__const.main.msg1:                    # @__const.main.msg1
	.asciz	"Hello|"

.L__const.main.msg2:                    # @__const.main.msg2
	.asciz	"World"

.L__const.main.msg3:                    # @__const.main.msg3
	.asciz	"UrMommy!"

.L__const.main.msg4:                    # @__const.main.msg4
	.asciz	"UrMommy!"

.L__const.main.msg5:                    # @__const.main.msg5
	.asciz	"UrMommy!"

.L__const.main.msg6:                    # @__const.main.msg6
	.asciz	"UrMommy!"

.L__const.main.msg7:                    # @__const.main.msg7
	.asciz	"UrMommy!"

.L__const.main.msg8:                    # @__const.main.msg8
	.asciz	"UrMommy!"

.L__const.main.msg9:                    # @__const.main.msg9
	.asciz	"UrMommy!"

.L__const.main.msg10:                   # @__const.main.msg10
	.asciz	"UrMommy!"

	.section	.rdata,"dr",discard,"??_C@_0L@JDIGHCD@?$CFs?0?5?$CFs?5?$CFs?6?$AA@"
	.globl	"??_C@_0L@JDIGHCD@?$CFs?0?5?$CFs?5?$CFs?6?$AA@" # @"??_C@_0L@JDIGHCD@?$CFs?0?5?$CFs?5?$CFs?6?$AA@"
"??_C@_0L@JDIGHCD@?$CFs?0?5?$CFs?5?$CFs?6?$AA@":
	.asciz	"%s, %s %s\n"

	.lcomm	__local_stdio_printf_options._OptionsStorage,8,8 # @__local_stdio_printf_options._OptionsStorage
	.addrsig
	.addrsig_sym _vsnprintf
	.addrsig_sym printf
	.addrsig_sym _vsprintf_l
	.addrsig_sym _vsnprintf_l
	.addrsig_sym __stdio_common_vsprintf
	.addrsig_sym __local_stdio_printf_options
	.addrsig_sym _vfprintf_l
	.addrsig_sym __acrt_iob_func
	.addrsig_sym __stdio_common_vfprintf
	.addrsig_sym __local_stdio_printf_options._OptionsStorage

export const SCANF_DECL = `	

scanf_mark:
    .asciz	"%s"

    .def	scanf;
	.scl	2;
	.type	32;
	.endef
	.section	.text,"xr",discard,scanf
	.globl	scanf                           # -- Begin function scanf
	.p2align	4
scanf:                                  # @scanf
.seh_proc scanf
# %bb.0:
	subq	$88, %rsp
	.seh_stackalloc 88
	.seh_endprologue
	movq	%r9, 120(%rsp)
	movq	%r8, 112(%rsp)
	movq	%rdx, 104(%rsp)
	movq	%rcx, 80(%rsp)
	leaq	104(%rsp), %rax
	movq	%rax, 64(%rsp)
	movq	64(%rsp), %rax
	movq	%rax, 48(%rsp)                  # 8-byte Spill
	movq	80(%rsp), %rax
	movq	%rax, 40(%rsp)                  # 8-byte Spill
	xorl	%ecx, %ecx
	movl	%ecx, 60(%rsp)                  # 4-byte Spill
	callq	__acrt_iob_func
	movq	40(%rsp), %rdx                  # 8-byte Reload
	movq	48(%rsp), %r9                   # 8-byte Reload
	movq	%rax, %rcx
	movl	60(%rsp), %eax                  # 4-byte Reload
	movl	%eax, %r8d
	callq	_vfscanf_l
	movl	%eax, 76(%rsp)
	movl	76(%rsp), %eax
	addq	$88, %rsp
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
	.def	_vfscanf_l;
	.scl	2;
	.type	32;
	.endef
	.section	.text,"xr",discard,_vfscanf_l
	.globl	_vfscanf_l                      # -- Begin function _vfscanf_l
	.p2align	4
_vfscanf_l:                             # @_vfscanf_l
.seh_proc _vfscanf_l
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
	callq	__local_stdio_scanf_options
	movq	40(%rsp), %rdx                  # 8-byte Reload
	movq	48(%rsp), %r8                   # 8-byte Reload
	movq	56(%rsp), %r9                   # 8-byte Reload
	movq	%rax, %rcx
	movq	64(%rsp), %rax                  # 8-byte Reload
	movq	(%rcx), %rcx
	movq	%rax, 32(%rsp)
	callq	__stdio_common_vfscanf
	nop
	addq	$104, %rsp
	retq
	.seh_endproc
                                        # -- End function
	.def	__local_stdio_scanf_options;
	.scl	2;
	.type	32;
	.endef
	.section	.text,"xr",discard,__local_stdio_scanf_options
	.globl	__local_stdio_scanf_options     # -- Begin function __local_stdio_scanf_options
	.p2align	4
__local_stdio_scanf_options:            # @__local_stdio_scanf_options
# %bb.0:
	leaq	__local_stdio_scanf_options._OptionsStorage(%rip), %rax
	retq
                                        # -- End function
	.section	.rdata,"dr",discard,"??_C@_02DKCKIIND@?$CFs?$AA@"
	.globl	"??_C@_02DKCKIIND@?$CFs?$AA@"   # @"??_C@_02DKCKIIND@?$CFs?$AA@"
"??_C@_02DKCKIIND@?$CFs?$AA@":
	.asciz	"%s"

	.lcomm	__local_stdio_printf_options._OptionsStorage,8,8 # @__local_stdio_printf_options._OptionsStorage
	.lcomm	__local_stdio_scanf_options._OptionsStorage,8,8 # @__local_stdio_scanf_options._OptionsStorage
	.addrsig
	.addrsig_sym _vsnprintf
	.addrsig_sym scanf
	.addrsig_sym _vsprintf_l
	.addrsig_sym _vsnprintf_l
	.addrsig_sym __stdio_common_vsprintf
	.addrsig_sym __local_stdio_printf_options
	.addrsig_sym _vfscanf_l
	.addrsig_sym __acrt_iob_func
	.addrsig_sym __stdio_common_vfscanf
	.addrsig_sym __local_stdio_scanf_options
	.addrsig_sym __local_stdio_printf_options._OptionsStorage
	.addrsig_sym __local_stdio_scanf_options._OptionsStorage
`;
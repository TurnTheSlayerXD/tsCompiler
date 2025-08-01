.def	main;
.endef
.globl	main
main:
.seh_proc main
subq	$100, %rsp
movl $0, 96(%rsp)
movl $1472, 92(%rsp)
movl 92(%rsp), %edx
movl %edx, 96(%rsp)
movl $0, 88(%rsp)
movl $0, 84(%rsp)
movl 84(%rsp), %edx
subl 96(%rsp), %edx
movl %edx, 80(%rsp)
movl 80(%rsp), %edx
movl %edx, 88(%rsp)
xor %eax, %eax
addq	$100, %rsp
retq
.seh_endproc

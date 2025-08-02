.def	main;
.endef
.globl	main
main:
.seh_proc main
subq	$100, %rsp
movl $0, 96(%rsp)
movl $123, 92(%rsp)
movl 92(%rsp), %edx
movl %edx, 96(%rsp)
movl $0, 88(%rsp)
movl $4, 84(%rsp)
movl 84(%rsp), %edx
movl %edx, 88(%rsp)
movl $0, 80(%rsp)
movl 96(%rsp), %edx
imull 88(%rsp), %edx
movl %edx, 76(%rsp)
movl $0, 72(%rsp)
movl 72(%rsp), %edx
subl 76(%rsp), %edx
movl %edx, 68(%rsp)
movl $6, 64(%rsp)
movl $43, 60(%rsp)
movl 64(%rsp), %edx
addl 60(%rsp), %edx
movl %edx, 56(%rsp)
movl 68(%rsp), %edx
addl 56(%rsp), %edx
movl %edx, 52(%rsp)
movl 52(%rsp), %edx
movl %edx, 80(%rsp)
xor %eax, %eax
addq	$100, %rsp
retq
.seh_endproc

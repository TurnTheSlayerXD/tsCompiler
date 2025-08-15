.def	main;
.endef
.globl	main
main:
.seh_proc main
#__begin_scope_0
#__init_scope_0
subq $20, %rsp
movl %ecx, 16(%rsp)
movq %rdx, 8(%rsp)
#__clear_scope_0
addq $20, %rsp
#__end_scope_0
xor %rax, %rax
retq
.seh_endproc

.def	main;
.endef
.globl	main
main:
.seh_proc main
#__begin_scope_0
#__init_scope_0
subq $1000, %rsp
movl %ecx, 996(%rsp)
movq %rdx, 988(%rsp)
#__clear_scope_0
addq $1000, %rsp
#__end_scope_0
xor %rax, %rax
retq
.seh_endproc

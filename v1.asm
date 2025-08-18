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
movb $0, 987(%rsp)
movb $75, 986(%rsp)
movb $67, 985(%rsp)
movb $65, 984(%rsp)
movb $70, 983(%rsp)
leaq 983(%rsp), %rdx
movq %rdx, 975(%rsp)
movb $0, 974(%rsp)
movb $100, 973(%rsp)
movb $108, 972(%rsp)
movb $114, 971(%rsp)
movb $111, 970(%rsp)
movb $119, 969(%rsp)
movb $32, 968(%rsp)
movb $44, 967(%rsp)
movb $111, 966(%rsp)
movb $108, 965(%rsp)
movb $108, 964(%rsp)
movb $101, 963(%rsp)
movb $72, 962(%rsp)
leaq 962(%rsp), %rdx
movq %rdx, 954(%rsp)
movl $1, 950(%rsp)
movslq 950(%rsp), %rdx
imulq $1, %rdx
movq 975(%rsp), %rax
addq %rdx, %rax
movq %rax, 942(%rsp)
leaq 954(%rsp), %rdx
movq %rdx, 934(%rsp)
movq 934(%rsp), %rax
movq 942(%rsp), %rdx
movq %rdx, (%rax)
movb $66, %ah
movb %ah, 933(%rsp)
movq 954(%rsp), %rax
movb 933(%rsp), %dh
movb %dh, (%rax)
movl $3, 929(%rsp)
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 921(%rsp)
movl $0, 917(%rsp)
movq 921(%rsp), %rcx
leaq 917(%rsp), %r9
movq  954(%rsp), %rdx
movl  929(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
#__clear_scope_0
addq $1000, %rsp
#__end_scope_0
xor %rax, %rax
retq
.seh_endproc

.def	strlen;
.endef
.globl	strlen
strlen:
.seh_proc strlen
#__begin_scope_0
#__init_scope_0
subq $1000, %rsp
movq 0(%rcx), %rdx
movq %rdx, 992(%rsp)
movl $0, 988(%rsp)
movl $0, 984(%rsp)
movl 988(%rsp), %edx
movl %edx, 984(%rsp)
#__end_scope_0
#__begin_scope_1
#__init_scope_1
subq $1000, %rsp
mark_0 :
movslq 984(%rsp), %rdx
imulq $1, %rdx
movq 992(%rsp), %rax
addq %rdx, %rax
movq %rax, 976(%rsp)
movq 976(%rsp), %rax
movb (%rax), %dh
movb %dh, 975(%rsp)
movb $0, %ah
movb %ah, 974(%rsp)
movb 975(%rsp), %ah
movb 974(%rsp), %al
movb $1, 973(%rsp)
cmpb %ah, %al
jne mark_2
movb $0, 973(%rsp)
mark_2 :
#WHILE
xor %edx, %edx
movb 973(%rsp), %dh
cmpb $0, %dh
je mark_1
movl $1, 969(%rsp)
movl 984(%rsp), %edx
addl 969(%rsp), %edx
movl %edx, 965(%rsp)
movl 965(%rsp), %edx
movl %edx, 984(%rsp)
jmp mark_0
mark_1 :
#__clear_scope_1
addq $1000, %rsp
#__end_scope_1
#__begin_scope_0
movl 984(%rsp), %eax
#__clear_scope_0
addq $1000, %rsp
retq
#__clear_scope_0
addq $1000, %rsp
#__end_scope_0
retq
.seh_endproc
.def	print_str;
.endef
.globl	print_str
print_str:
.seh_proc print_str
#__begin_scope_2
#__init_scope_2
subq $1000, %rsp
movq 0(%rcx), %rdx
movq %rdx, 957(%rsp)
movq $0, 949(%rsp)
movq 957(%rsp), %rdx
movq %rdx, 949(%rsp)
#__parameter_offset_pass
leaq 949(%rsp), %rcx
callq strlen
movl %eax, 945(%rsp)
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 937(%rsp)
movl $0, 933(%rsp)
movq 937(%rsp), %rcx
leaq 933(%rsp), %r9
movq  957(%rsp), %rdx
movl  945(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
#__clear_scope_2
addq $1000, %rsp
#__end_scope_2
retq
.seh_endproc
.def	main;
.endef
.globl	main
main:
.seh_proc main
#__begin_scope_3
#__init_scope_3
subq $1000, %rsp
movb $0, 932(%rsp)
movb $111, 931(%rsp)
movb $108, 930(%rsp)
movb $108, 929(%rsp)
movb $101, 928(%rsp)
movb $72, 927(%rsp)
leaq 927(%rsp), %rdx
movq %rdx, 919(%rsp)
movq $0, 911(%rsp)
movq 919(%rsp), %rdx
movq %rdx, 911(%rsp)
movq $0, 903(%rsp)
movq 911(%rsp), %rdx
movq %rdx, 903(%rsp)
#__parameter_offset_pass
leaq 903(%rsp), %rcx
callq print_str
movb %al, 902(%rsp)
#__clear_scope_3
addq $1000, %rsp
#__end_scope_3
xor %rax, %rax
retq
.seh_endproc

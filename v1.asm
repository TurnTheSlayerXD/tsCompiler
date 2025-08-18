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
#__end_scope_0
#__begin_scope_1
#__init_scope_1
subq $1000, %rsp
mark_0 :
movslq 988(%rsp), %rdx
imulq $1, %rdx
movq 992(%rsp), %rax
addq %rdx, %rax
movq %rax, 980(%rsp)
movq 980(%rsp), %rax
movb (%rax), %dh
movb %dh, 979(%rsp)
movb $0, %ah
movb %ah, 978(%rsp)
movb 979(%rsp), %ah
movb 978(%rsp), %al
movb $1, 977(%rsp)
cmpb %ah, %al
jne mark_2
movb $0, 977(%rsp)
mark_2 :
#WHILE
xor %edx, %edx
movb 977(%rsp), %dh
cmpb $0, %dh
je mark_1
movl $1, 973(%rsp)
movl 988(%rsp), %edx
addl 973(%rsp), %edx
movl %edx, 969(%rsp)
movl 969(%rsp), %edx
movl %edx, 988(%rsp)
jmp mark_0
mark_1 :
#__clear_scope_1
addq $1000, %rsp
#__end_scope_1
#__begin_scope_0
movl 988(%rsp), %eax
#__clear_scope_0
addq $1000, %rsp
retq
#__clear_scope_0
addq $1000, %rsp
#__end_scope_0
retq
.seh_endproc
.def	main;
.endef
.globl	main
main:
.seh_proc main
#__begin_scope_2
#__init_scope_2
subq $1000, %rsp
movl %ecx, 965(%rsp)
movq %rdx, 957(%rsp)
#__end_scope_2
#__begin_scope_3
#__init_scope_3
subq $1000, %rsp
movl $0, 953(%rsp)
mark_3 :
movl 953(%rsp), %eax
movl 965(%rsp), %ebx
movb $1, 952(%rsp)
cmpl %eax, %ebx
jg mark_5
movb $0, 952(%rsp)
mark_5 :
#FOR
xor %edx, %edx
movb 952(%rsp), %dh
cmpb $0, %dh
je mark_4
#__end_scope_3
#__begin_scope_4
#__init_scope_4
subq $1000, %rsp
movl $0, 948(%rsp)
mark_6 :
movslq 953(%rsp), %rdx
imulq $8, %rdx
movq 957(%rsp), %rax
addq %rdx, %rax
movq %rax, 940(%rsp)
movq 940(%rsp), %rax
movq (%rax), %rdx
movq %rdx, 932(%rsp)
movq $0, 924(%rsp)
movq 932(%rsp), %rdx
movq %rdx, 924(%rsp)
#__parameter_offset_pass
leaq 924(%rsp), %rcx
callq strlen
movl %eax, 920(%rsp)
movl 948(%rsp), %eax
movl 920(%rsp), %ebx
movb $1, 919(%rsp)
cmpl %eax, %ebx
jg mark_8
movb $0, 919(%rsp)
mark_8 :
#FOR
xor %edx, %edx
movb 919(%rsp), %dh
cmpb $0, %dh
je mark_7
movslq 953(%rsp), %rdx
imulq $8, %rdx
movq 957(%rsp), %rax
addq %rdx, %rax
movq %rax, 911(%rsp)
movq 911(%rsp), %rax
movq (%rax), %rdx
movq %rdx, 903(%rsp)
movslq 948(%rsp), %rdx
imulq $1, %rdx
movq 903(%rsp), %rax
addq %rdx, %rax
movq %rax, 895(%rsp)
movl $1, 891(%rsp)
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 883(%rsp)
movl $0, 879(%rsp)
movq 883(%rsp), %rcx
leaq 879(%rsp), %r9
movq  895(%rsp), %rdx
movl  891(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
movl $1, 875(%rsp)
movl 948(%rsp), %edx
addl 875(%rsp), %edx
movl %edx, 871(%rsp)
movl 871(%rsp), %edx
movl %edx, 948(%rsp)
jmp mark_6
mark_7 :
#__clear_scope_4
addq $1000, %rsp
#__end_scope_4
#__begin_scope_3
movb $0, 870(%rsp)
movb $10, 869(%rsp)
leaq 869(%rsp), %rdx
movq %rdx, 861(%rsp)
movl $1, 857(%rsp)
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 849(%rsp)
movl $0, 845(%rsp)
movq 849(%rsp), %rcx
leaq 845(%rsp), %r9
movq  861(%rsp), %rdx
movl  857(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
movl $1, 841(%rsp)
movl 953(%rsp), %edx
addl 841(%rsp), %edx
movl %edx, 837(%rsp)
movl 837(%rsp), %edx
movl %edx, 953(%rsp)
jmp mark_3
mark_4 :
#__clear_scope_3
addq $1000, %rsp
#__end_scope_3
#__begin_scope_2
#__clear_scope_2
addq $1000, %rsp
#__end_scope_2
xor %rax, %rax
retq
.seh_endproc

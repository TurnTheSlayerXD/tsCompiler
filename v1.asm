.def	main;
.endef
.globl	main
main:
.seh_proc main
#__begin_scope_0
#__init
subq $1000, %rsp
movl %ecx, 996(%rsp)
movq %rdx, 988(%rsp)
#__end_scope_0
#__begin_scope_1
#__init
subq $1000, %rsp
movl $0, 984(%rsp)
movl $1, 980(%rsp)
movl 980(%rsp), %edx
movl %edx, 984(%rsp)
mark_0 :
movl 984(%rsp), %eax
movl 996(%rsp), %ebx
movb $1, 979(%rsp)
cmpl %eax, %ebx
jg mark_2
movb $0, 979(%rsp)
mark_2 :
#FOR
xor %edx, %edx
movb 979(%rsp), %dh
cmpb $0, %dh
je mark_1
movl $0, 975(%rsp)
movl $0, 971(%rsp)
movl 971(%rsp), %edx
movl %edx, 975(%rsp)
#__end_scope_1
#__begin_scope_2
#__init
subq $1000, %rsp
movq $0, 963(%rsp)
movslq 984(%rsp), %rdx
imulq $8, %rdx
movq 988(%rsp), %rax
addq %rdx, %rax
movq %rax, 955(%rsp)
movq 955(%rsp), %rax
movq (%rax), %rdx
movq %rdx, 947(%rsp)
movq 947(%rsp), %rdx
movq %rdx, 963(%rsp)
mark_3 :
movq 963(%rsp), %rax
movb (%rax), %dh
movb %dh, 946(%rsp)
movb $0, %ah
movb %ah, 945(%rsp)
movb 946(%rsp), %ah
movb 945(%rsp), %al
movb $1, 944(%rsp)
cmpb %ah, %al
jne mark_5
movb $0, 944(%rsp)
mark_5 :
#FOR
xor %edx, %edx
movb 944(%rsp), %dh
cmpb $0, %dh
je mark_4
movl $1, 940(%rsp)
movl 975(%rsp), %edx
addl 940(%rsp), %edx
movl %edx, 936(%rsp)
movl 936(%rsp), %edx
movl %edx, 975(%rsp)
movl $1, 932(%rsp)
movslq 932(%rsp), %rdx
imulq $1, %rdx
movq 963(%rsp), %rax
addq %rdx, %rax
movq %rax, 924(%rsp)
movq 924(%rsp), %rdx
movq %rdx, 963(%rsp)
jmp mark_3
mark_4 :
#__clear
addq $1000, %rsp
#__end_scope_2
#__begin_scope_1
movb $0, %ah
movb %ah, 923(%rsp)
movb $48, %ah
movb %ah, 922(%rsp)
movsbl 922(%rsp), %edx
movl %edx, 918(%rsp)
movl 975(%rsp), %edx
addl 918(%rsp), %edx
movl %edx, 914(%rsp)
movb 914(%rsp), %dh
movb %dh, 923(%rsp)
leaq 923(%rsp), %rdx
movq %rdx, 906(%rsp)
movl $1, 902(%rsp)
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 894(%rsp)
movl $0, 890(%rsp)
movq 894(%rsp), %rcx
leaq 890(%rsp), %r9
movq  906(%rsp), %rdx
movl  902(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
movb $0, 889(%rsp)
movb $10, 888(%rsp)
leaq 888(%rsp), %rdx
movq %rdx, 880(%rsp)
movl $1, 876(%rsp)
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 868(%rsp)
movl $0, 864(%rsp)
movq 868(%rsp), %rcx
leaq 864(%rsp), %r9
movq  880(%rsp), %rdx
movl  876(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
movl $1, 860(%rsp)
movl 984(%rsp), %edx
addl 860(%rsp), %edx
movl %edx, 856(%rsp)
movl 856(%rsp), %edx
movl %edx, 984(%rsp)
jmp mark_0
mark_1 :
#__clear
addq $1000, %rsp
#__end_scope_1
#__begin_scope_0
#__clear
addq $1000, %rsp
#__end_scope_0
xor %eax, %eax
retq
.seh_endproc

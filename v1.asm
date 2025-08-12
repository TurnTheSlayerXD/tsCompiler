.def	fuu;
.endef
.globl	fuu
fuu:
.seh_proc fuu
#__begin_scope_0
#__init
subq $1000, %rsp
movl 0(%rcx), %edx
movl %edx, 996(%rsp)
movl 4(%rcx), %edx
movl %edx, 992(%rsp)
movl 8(%rcx), %edx
movl %edx, 988(%rsp)
#__end_scope_0
#__begin_scope_1
#__init
subq $1000, %rsp
movl $1, 984(%rsp)
movl 988(%rsp), %eax
movl 984(%rsp), %ebx
movb $1, 983(%rsp)
cmpl %eax, %ebx
je mark_2
movb $0, 983(%rsp)
mark_2 :
#IF
xor %edx, %edx
movb 983(%rsp), %dh
cmpb $0, %dh
je mark_0
movl $0, 979(%rsp)
movl 979(%rsp), %eax
addq $1000, %rsp
retq
movl $0, 975(%rsp)
addq $1000, %rsp
#__end_scope_1
#__begin_scope_0
jmp mark_1
mark_0 :
mark_1 :
movl 988(%rsp), %edx
addl 992(%rsp), %edx
movl %edx, 971(%rsp)
movl 971(%rsp), %edx
addl 996(%rsp), %edx
movl %edx, 967(%rsp)
movl 967(%rsp), %eax
addq $1000, %rsp
retq
movl 988(%rsp), %edx
addl 992(%rsp), %edx
movl %edx, 963(%rsp)
movl 963(%rsp), %edx
addl 996(%rsp), %edx
movl %edx, 959(%rsp)
addq $1000, %rsp
#__end_scope_0
xor %eax, %eax
retq
.seh_endproc
.def	main;
.endef
.globl	main
main:
.seh_proc main
#__begin_scope_2
#__init
subq $1000, %rsp
movl %ecx, 955(%rsp)
movq %rdx, 947(%rsp)
movb $0, %ah
movb %ah, 946(%rsp)
movl $1, 942(%rsp)
movl $2, 938(%rsp)
movl $3, 934(%rsp)
movl $0, 930(%rsp)
movl 942(%rsp), %edx
movl %edx, 930(%rsp)
movl $0, 926(%rsp)
movl 938(%rsp), %edx
movl %edx, 926(%rsp)
movl $0, 922(%rsp)
movl 934(%rsp), %edx
movl %edx, 922(%rsp)
#__parameter_offset_pass
leaq 922(%rsp), %rcx
callq fuu
movl %eax, 918(%rsp)
movl $6, 914(%rsp)
movl 918(%rsp), %edx
subl 914(%rsp), %edx
movl %edx, 910(%rsp)
movb $49, %ah
movb %ah, 909(%rsp)
movsbl 909(%rsp), %edx
movl %edx, 905(%rsp)
movl 910(%rsp), %edx
addl 905(%rsp), %edx
movl %edx, 901(%rsp)
movb 901(%rsp), %dh
movb %dh, 946(%rsp)
leaq 946(%rsp), %rdx
movq %rdx, 893(%rsp)
movl $1, 889(%rsp)
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 881(%rsp)
movl $0, 877(%rsp)
movq 881(%rsp), %rcx
leaq 877(%rsp), %r9
movq  893(%rsp), %rdx
movl  889(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
addq $1000, %rsp
#__end_scope_2
xor %eax, %eax
retq
.seh_endproc

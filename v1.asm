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
movl 984(%rsp), %edx
movl %edx, 988(%rsp)
#__end_scope_0
#__begin_scope_1
#__init_scope_1
subq $1000, %rsp
mark_0 :
movslq 988(%rsp), %rdx
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
movl 988(%rsp), %edx
addl 969(%rsp), %edx
movl %edx, 965(%rsp)
movl 965(%rsp), %edx
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
.def	print_num;
.endef
.globl	print_num
print_num:
.seh_proc print_num
#__begin_scope_2
#__init_scope_2
subq $1000, %rsp
movl 0(%rcx), %edx
movl %edx, 961(%rsp)
movq $0, 953(%rsp)
movb $0, 952(%rsp)
movb $0, 951(%rsp)
movb $0, 950(%rsp)
movb $0, 949(%rsp)
movb $0, 948(%rsp)
movb $0, 947(%rsp)
movb $0, 946(%rsp)
movb $0, 945(%rsp)
movb $0, 944(%rsp)
movb $0, 943(%rsp)
movb $0, 942(%rsp)
movb $0, 941(%rsp)
movb $0, 940(%rsp)
movb $0, 939(%rsp)
movb $0, 938(%rsp)
movb $0, 937(%rsp)
movb $0, 936(%rsp)
movb $0, 935(%rsp)
movb $0, 934(%rsp)
leaq 934(%rsp), %rdx
movq %rdx, 926(%rsp)
movq 926(%rsp), %rdx
movq %rdx, 953(%rsp)
movl $0, 922(%rsp)
movl $0, 918(%rsp)
movl 918(%rsp), %edx
movl %edx, 922(%rsp)
#__end_scope_2
#__begin_scope_3
#__init_scope_3
subq $1000, %rsp
mark_3 :
movl $0, 914(%rsp)
movl 961(%rsp), %eax
movl 914(%rsp), %ebx
movb $1, 913(%rsp)
cmpl %eax, %ebx
jl mark_5
movb $0, 913(%rsp)
mark_5 :
#WHILE
xor %edx, %edx
movb 913(%rsp), %dh
cmpb $0, %dh
je mark_4
movl $0, 909(%rsp)
movl $10, 905(%rsp)
movl 961(%rsp), %eax
cdq
idivl 905(%rsp)
movl %edx, 901(%rsp)
movl 901(%rsp), %edx
movl %edx, 909(%rsp)
movl $10, 897(%rsp)
movl 961(%rsp), %eax
cdq
idivl 897(%rsp)
movl %eax, 893(%rsp)
movl 893(%rsp), %edx
movl %edx, 961(%rsp)
movslq 922(%rsp), %rdx
imulq $1, %rdx
movq 953(%rsp), %rax
addq %rdx, %rax
movq %rax, 885(%rsp)
movb $48, %ah
movb %ah, 884(%rsp)
movsbl 884(%rsp), %edx
movl %edx, 880(%rsp)
movl 909(%rsp), %edx
addl 880(%rsp), %edx
movl %edx, 876(%rsp)
movq 885(%rsp), %rax
movb 876(%rsp), %dh
movb %dh, (%rax)
movl $1, 872(%rsp)
movl 922(%rsp), %edx
addl 872(%rsp), %edx
movl %edx, 868(%rsp)
movl 868(%rsp), %edx
movl %edx, 922(%rsp)
jmp mark_3
mark_4 :
#__clear_scope_3
addq $1000, %rsp
#__end_scope_3
#__begin_scope_2
movl $0, 864(%rsp)
movq $0, 856(%rsp)
movq 953(%rsp), %rdx
movq %rdx, 856(%rsp)
#__parameter_offset_pass
leaq 856(%rsp), %rcx
callq strlen
movl %eax, 852(%rsp)
movl 852(%rsp), %edx
movl %edx, 864(%rsp)
#__end_scope_2
#__begin_scope_4
#__init_scope_4
subq $1000, %rsp
movl $0, 848(%rsp)
movl $0, 844(%rsp)
movl 844(%rsp), %edx
movl %edx, 848(%rsp)
mark_6 :
movl $2, 840(%rsp)
movl 864(%rsp), %eax
cdq
idivl 840(%rsp)
movl %eax, 836(%rsp)
movl 848(%rsp), %eax
movl 836(%rsp), %ebx
movb $1, 835(%rsp)
cmpl %eax, %ebx
jg mark_8
movb $0, 835(%rsp)
mark_8 :
#FOR
xor %edx, %edx
movb 835(%rsp), %dh
cmpb $0, %dh
je mark_7
movb $0, %ah
movb %ah, 834(%rsp)
movslq 848(%rsp), %rdx
imulq $1, %rdx
movq 953(%rsp), %rax
addq %rdx, %rax
movq %rax, 826(%rsp)
movq 826(%rsp), %rax
movb (%rax), %dh
movb %dh, 825(%rsp)
movb 825(%rsp), %dh
movb %dh, 834(%rsp)
movslq 848(%rsp), %rdx
imulq $1, %rdx
movq 953(%rsp), %rax
addq %rdx, %rax
movq %rax, 817(%rsp)
movslq 864(%rsp), %rdx
imulq $1, %rdx
movq 953(%rsp), %rax
addq %rdx, %rax
movq %rax, 809(%rsp)
movl $1, 805(%rsp)
movslq 805(%rsp), %rdx
imulq $1, %rdx
movq 809(%rsp), %rax
subq %rdx, %rax
movq %rax, 797(%rsp)
movslq 848(%rsp), %rdx
imulq $1, %rdx
movq 797(%rsp), %rax
subq %rdx, %rax
movq %rax, 789(%rsp)
movq 789(%rsp), %rax
movb (%rax), %dh
movb %dh, 788(%rsp)
movq 817(%rsp), %rax
movb 788(%rsp), %dh
movb %dh, (%rax)
movslq 864(%rsp), %rdx
imulq $1, %rdx
movq 953(%rsp), %rax
addq %rdx, %rax
movq %rax, 780(%rsp)
movl $1, 776(%rsp)
movslq 776(%rsp), %rdx
imulq $1, %rdx
movq 780(%rsp), %rax
subq %rdx, %rax
movq %rax, 768(%rsp)
movslq 848(%rsp), %rdx
imulq $1, %rdx
movq 768(%rsp), %rax
subq %rdx, %rax
movq %rax, 760(%rsp)
movq 760(%rsp), %rax
movb 834(%rsp), %dh
movb %dh, (%rax)
movl $1, 756(%rsp)
movl 848(%rsp), %edx
addl 756(%rsp), %edx
movl %edx, 752(%rsp)
movl 752(%rsp), %edx
movl %edx, 848(%rsp)
jmp mark_6
mark_7 :
#__clear_scope_4
addq $1000, %rsp
#__end_scope_4
#__begin_scope_2
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 744(%rsp)
movl $0, 740(%rsp)
movq 744(%rsp), %rcx
leaq 740(%rsp), %r9
movq  953(%rsp), %rdx
movl  864(%rsp), %r8d
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
#__begin_scope_5
#__init_scope_5
subq $1000, %rsp
movl %ecx, 736(%rsp)
movq %rdx, 728(%rsp)
movl $0, 724(%rsp)
movl $14883, 720(%rsp)
movl 720(%rsp), %edx
movl %edx, 724(%rsp)
movl $0, 716(%rsp)
movl 724(%rsp), %edx
movl %edx, 716(%rsp)
#__parameter_offset_pass
leaq 716(%rsp), %rcx
callq print_num
movb %al, 715(%rsp)
#__clear_scope_5
addq $1000, %rsp
#__end_scope_5
xor %rax, %rax
retq
.seh_endproc

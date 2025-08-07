.def	main;
.endef
.globl	main
main:
.seh_proc main
subq	$1000, %rsp
movl $0, 996(%rsp)
movl $10, 992(%rsp)
movl 992(%rsp), %edx
movl %edx, 996(%rsp)
movq $0, 984(%rsp)
leaq 996(%rsp), %rdx
movq %rdx, 976(%rsp)
movq 976(%rsp), %rdx
movq %rdx, 984(%rsp)
mark_0:
movq 984(%rsp), %rax
movl (%rax), %edx
movl %edx, 972(%rsp)
movl $0, 968(%rsp)
movl 972(%rsp), %eax
movl 968(%rsp), %ebx
movb $1, 967(%rsp)
cmpl %eax, %ebx
jl mark_2
movb $0, 967(%rsp)
mark_2:
#WHILE
xor %edx, %edx
movb 967(%rsp), %dh
cmpb $0, %dh
je mark_1
movq 984(%rsp), %rax
movl (%rax), %edx
movl %edx, 963(%rsp)
movl $1, 959(%rsp)
movl 963(%rsp), %edx
addl 959(%rsp), %edx
movl %edx, 955(%rsp)
movl $2, 951(%rsp)
movl 955(%rsp), %eax
cdq
idivl 951(%rsp)
movl %edx, 947(%rsp)
movl $1, 943(%rsp)
movl 947(%rsp), %eax
movl 943(%rsp), %ebx
movb $1, 942(%rsp)
cmpl %eax, %ebx
je mark_5
movb $0, 942(%rsp)
mark_5:
#IF
xor %edx, %edx
movb 942(%rsp), %dh
cmpb $0, %dh
je mark_3
movb $0, 941(%rsp)
movb $32, 940(%rsp)
movb $124, 939(%rsp)
movb $32, 938(%rsp)
movb $78, 937(%rsp)
movb $69, 936(%rsp)
movb $86, 935(%rsp)
movb $69, 934(%rsp)
movb $32, 933(%rsp)
movb $84, 932(%rsp)
movb $79, 931(%rsp)
movb $78, 930(%rsp)
leaq 930(%rsp), %rdx
movq %rdx, 922(%rsp)
movl $13, 918(%rsp)
movl  $4294967285, %ecx
callq	*__imp_GetStdHandle(%rip)
movq	%rax, 910(%rsp)
movl	$0, 906(%rsp)
movq	910(%rsp), %rcx
leaq	906(%rsp), %r9
movq  922(%rsp), %rdx
movl  918(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
jmp mark_4
mark_3:
movq 984(%rsp), %rax
movl (%rax), %edx
movl %edx, 902(%rsp)
movl $1, 898(%rsp)
movl 902(%rsp), %edx
addl 898(%rsp), %edx
movl %edx, 894(%rsp)
movl $2, 890(%rsp)
movl 894(%rsp), %eax
cdq
idivl 890(%rsp)
movl %edx, 886(%rsp)
movl $0, 882(%rsp)
movl 886(%rsp), %eax
movl 882(%rsp), %ebx
movb $1, 881(%rsp)
cmpl %eax, %ebx
je mark_7
movb $0, 881(%rsp)
mark_7:
#IF
xor %edx, %edx
movb 881(%rsp), %dh
cmpb $0, %dh
je mark_6
movb $0, 880(%rsp)
movb $32, 879(%rsp)
movb $124, 878(%rsp)
movb $32, 877(%rsp)
movb $78, 876(%rsp)
movb $69, 875(%rsp)
movb $86, 874(%rsp)
movb $69, 873(%rsp)
leaq 873(%rsp), %rdx
movq %rdx, 865(%rsp)
movl $13, 861(%rsp)
movl  $4294967285, %ecx
callq	*__imp_GetStdHandle(%rip)
movq	%rax, 853(%rsp)
movl	$0, 849(%rsp)
movq	853(%rsp), %rcx
leaq	849(%rsp), %r9
movq  865(%rsp), %rdx
movl  861(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
jmp mark_4
mark_6:
movl $1, 845(%rsp)
movl $1, 841(%rsp)
movl 845(%rsp), %edx
addl 841(%rsp), %edx
movl %edx, 837(%rsp)
jmp mark_4
mark_8:
mark_4:
movl $1, 833(%rsp)
movq 984(%rsp), %rax
movl (%rax), %edx
movl %edx, 829(%rsp)
movl 829(%rsp), %edx
subl 833(%rsp), %edx
movl %edx, 825(%rsp)
movq 984(%rsp), %rax
movl 825(%rsp), %edx
movl %edx, (%rax)
jmp mark_0
mark_1:
xor %eax, %eax
addq	$1000, %rsp
retq
.seh_endproc

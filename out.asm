.def	main;
.endef
.globl	main
main:
.seh_proc main
subq	$1000, %rsp
movq $0, 992(%rsp)
movb $0, 991(%rsp)
movb $100, 990(%rsp)
movb $108, 989(%rsp)
movb $114, 988(%rsp)
movb $111, 987(%rsp)
movb $119, 986(%rsp)
movb $32, 985(%rsp)
movb $44, 984(%rsp)
movb $111, 983(%rsp)
movb $108, 982(%rsp)
movb $108, 981(%rsp)
movb $101, 980(%rsp)
movb $72, 979(%rsp)
leaq 979(%rsp), %rdx
movq %rdx, 971(%rsp)
movq 971(%rsp), %rdx
movq %rdx, 992(%rsp)
movb $0, 970(%rsp)
movb $91, 969(%rsp)
leaq 969(%rsp), %rdx
movq %rdx, 961(%rsp)
movl $1, 957(%rsp)
movl  $4294967285, %ecx
callq	*__imp_GetStdHandle(%rip)
movq	%rax, 949(%rsp)
movl	$0, 945(%rsp)
movq	949(%rsp), %rcx
leaq	945(%rsp), %r9
movq  961(%rsp), %rdx
movl  957(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
movq $0, 937(%rsp)
movq 992(%rsp), %rdx
movq %rdx, 937(%rsp)
mark_0:
movq 937(%rsp), %rax
movb (%rax), %dh
movb %dh, 936(%rsp)
movb $0, %ah
movb %ah, 935(%rsp)
movb 936(%rsp), %ah
movb 935(%rsp), %al
movb $1, 934(%rsp)
cmpb %ah, %al
jne mark_2
movb $0, 934(%rsp)
mark_2:
#FOR
xor %edx, %edx
movb 934(%rsp), %dh
cmpb $0, %dh
je mark_1
movl $1, 930(%rsp)
movl  $4294967285, %ecx
callq	*__imp_GetStdHandle(%rip)
movq	%rax, 922(%rsp)
movl	$0, 918(%rsp)
movq	922(%rsp), %rcx
leaq	918(%rsp), %r9
movq  937(%rsp), %rdx
movl  930(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
movl $1, 914(%rsp)
movslq 914(%rsp), %rdx
imulq $1, %rdx
movq 937(%rsp), %rax
addq %rdx, %rax
movq %rax, 906(%rsp)
movq 906(%rsp), %rdx
movq %rdx, 937(%rsp)
jmp mark_0
mark_1:
movb $0, 905(%rsp)
movb $93, 904(%rsp)
leaq 904(%rsp), %rdx
movq %rdx, 896(%rsp)
movl $1, 892(%rsp)
movl  $4294967285, %ecx
callq	*__imp_GetStdHandle(%rip)
movq	%rax, 884(%rsp)
movl	$0, 880(%rsp)
movq	884(%rsp), %rcx
leaq	880(%rsp), %r9
movq  896(%rsp), %rdx
movl  892(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
movb $0, 879(%rsp)
movb $10, 878(%rsp)
leaq 878(%rsp), %rdx
movq %rdx, 870(%rsp)
movl $1, 866(%rsp)
movl  $4294967285, %ecx
callq	*__imp_GetStdHandle(%rip)
movq	%rax, 858(%rsp)
movl	$0, 854(%rsp)
movq	858(%rsp), %rcx
leaq	854(%rsp), %r9
movq  870(%rsp), %rdx
movl  866(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
movb $0, 853(%rsp)
movb $91, 852(%rsp)
leaq 852(%rsp), %rdx
movq %rdx, 844(%rsp)
movl $1, 840(%rsp)
movl  $4294967285, %ecx
callq	*__imp_GetStdHandle(%rip)
movq	%rax, 832(%rsp)
movl	$0, 828(%rsp)
movq	832(%rsp), %rcx
leaq	828(%rsp), %r9
movq  844(%rsp), %rdx
movl  840(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
movq $0, 820(%rsp)
movq 992(%rsp), %rdx
movq %rdx, 820(%rsp)
mark_3:
movq 820(%rsp), %rax
movb (%rax), %dh
movb %dh, 819(%rsp)
movb $0, %ah
movb %ah, 818(%rsp)
movb 819(%rsp), %ah
movb 818(%rsp), %al
movb $1, 817(%rsp)
cmpb %ah, %al
jne mark_5
movb $0, 817(%rsp)
mark_5:
#FOR
xor %edx, %edx
movb 817(%rsp), %dh
cmpb $0, %dh
je mark_4
movl $1, 813(%rsp)
movl  $4294967285, %ecx
callq	*__imp_GetStdHandle(%rip)
movq	%rax, 805(%rsp)
movl	$0, 801(%rsp)
movq	805(%rsp), %rcx
leaq	801(%rsp), %r9
movq  820(%rsp), %rdx
movl  813(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
movl $1, 797(%rsp)
movslq 797(%rsp), %rdx
imulq $1, %rdx
movq 820(%rsp), %rax
addq %rdx, %rax
movq %rax, 789(%rsp)
movq 789(%rsp), %rdx
movq %rdx, 820(%rsp)
jmp mark_3
mark_4:
movb $0, 788(%rsp)
movb $93, 787(%rsp)
leaq 787(%rsp), %rdx
movq %rdx, 779(%rsp)
movl $1, 775(%rsp)
movl  $4294967285, %ecx
callq	*__imp_GetStdHandle(%rip)
movq	%rax, 767(%rsp)
movl	$0, 763(%rsp)
movq	767(%rsp), %rcx
leaq	763(%rsp), %r9
movq  779(%rsp), %rdx
movl  775(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
movb $0, 762(%rsp)
movb $10, 761(%rsp)
leaq 761(%rsp), %rdx
movq %rdx, 753(%rsp)
movl $1, 749(%rsp)
movl  $4294967285, %ecx
callq	*__imp_GetStdHandle(%rip)
movq	%rax, 741(%rsp)
movl	$0, 737(%rsp)
movq	741(%rsp), %rcx
leaq	737(%rsp), %r9
movq  753(%rsp), %rdx
movl  749(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
xor %eax, %eax
addq	$1000, %rsp
retq
.seh_endproc

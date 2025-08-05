.def	main;
.endef
.globl	main
main:
.seh_proc main
subq	$1000, %rsp
movl $0, 996(%rsp)
movl $1, 992(%rsp)
movl 996(%rsp), %eax
movl 992(%rsp), %ebx
movb $1, 991(%rsp)
cmpl %eax, %ebx
jl mark_2
movb $0, 991(%rsp)
mark_2:
movl $5, 987(%rsp)
movl $4, 983(%rsp)
movl 987(%rsp), %eax
movl 983(%rsp), %ebx
movb $1, 982(%rsp)
cmpl %eax, %ebx
jg mark_3
movb $0, 982(%rsp)
mark_3:
movb $1, 981(%rsp)
cmpb $0, 991(%rsp)
jne mark_4
movb $0, 981(%rsp)
mark_4:
movb $1, 980(%rsp)
cmpb $0, 982(%rsp)
jne mark_5
movb $0, 980(%rsp)
mark_5:
movb 981(%rsp), %dh
movb 980(%rsp), %al
orb %dh, %al
movb $1, 979(%rsp)
cmpb $0, %al
jne mark_6
movb $0, 979(%rsp)
mark_6:
#IF
xor %edx, %edx
movb 979(%rsp), %dh
cmpb $0, %dh
je mark_0
movb $0, 978(%rsp)
movb $33, 977(%rsp)
movb $49, 976(%rsp)
leaq 976(%rsp), %rdx
movq %rdx, 968(%rsp)
movl $2, 964(%rsp)
movl  $4294967285, %ecx
callq	*__imp_GetStdHandle(%rip)
movq	%rax, 956(%rsp)
movl	$0, 952(%rsp)
movq	956(%rsp), %rcx
leaq	952(%rsp), %r9
movq  968(%rsp), %rdx
movl  964(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
jmp mark_1
mark_0:
movl $1, 948(%rsp)
movl $2, 944(%rsp)
movl 948(%rsp), %eax
movl 944(%rsp), %ebx
movb $1, 943(%rsp)
cmpl %eax, %ebx
jl mark_8
movb $0, 943(%rsp)
mark_8:
#IF
xor %edx, %edx
movb 943(%rsp), %dh
cmpb $0, %dh
je mark_7
movb $0, 942(%rsp)
movb $33, 941(%rsp)
movb $50, 940(%rsp)
leaq 940(%rsp), %rdx
movq %rdx, 932(%rsp)
movl $2, 928(%rsp)
movl  $4294967285, %ecx
callq	*__imp_GetStdHandle(%rip)
movq	%rax, 920(%rsp)
movl	$0, 916(%rsp)
movq	920(%rsp), %rcx
leaq	916(%rsp), %r9
movq  932(%rsp), %rdx
movl  928(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
jmp mark_1
mark_7:
movb $0, 915(%rsp)
movb $33, 914(%rsp)
movb $51, 913(%rsp)
leaq 913(%rsp), %rdx
movq %rdx, 905(%rsp)
movl $2, 901(%rsp)
movl  $4294967285, %ecx
callq	*__imp_GetStdHandle(%rip)
movq	%rax, 893(%rsp)
movl	$0, 889(%rsp)
movq	893(%rsp), %rcx
leaq	889(%rsp), %r9
movq  905(%rsp), %rdx
movl  901(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
jmp mark_1
mark_9:
mark_1:
xor %eax, %eax
addq	$1000, %rsp
retq
.seh_endproc

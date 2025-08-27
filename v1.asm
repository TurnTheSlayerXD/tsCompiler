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
.def	print_str;
.endef
.globl	print_str
print_str:
.seh_proc print_str
#__begin_scope_2
#__init_scope_2
subq $1000, %rsp
movq 0(%rcx), %rdx
movq %rdx, 961(%rsp)
movq $0, 953(%rsp)
movq 961(%rsp), %rdx
movq %rdx, 953(%rsp)
#__parameter_offset_pass
leaq 953(%rsp), %rcx
callq strlen
movl %eax, 949(%rsp)
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 941(%rsp)
movl $0, 937(%rsp)
movq 941(%rsp), %rcx
leaq 937(%rsp), %r9
movq  961(%rsp), %rdx
movl  949(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
movb $0, 936(%rsp)
movb $10, 935(%rsp)
leaq 935(%rsp), %rdx
movq %rdx, 927(%rsp)
movl $1, 923(%rsp)
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 915(%rsp)
movl $0, 911(%rsp)
movq 915(%rsp), %rcx
leaq 911(%rsp), %r9
movq  927(%rsp), %rdx
movl  923(%rsp), %r8d
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
movl %ecx, 907(%rsp)
movq %rdx, 899(%rsp)
leaq 899(%rsp), %rdx
movq %rdx, 891(%rsp)
leaq 891(%rsp), %rdx
movq %rdx, 883(%rsp)
leaq 883(%rsp), %rdx
movq %rdx, 875(%rsp)
leaq 875(%rsp), %rdx
movq %rdx, 867(%rsp)
movl $0, 863(%rsp)
movslq 863(%rsp), %rdx
imulq $8, %rdx
movq 867(%rsp), %rax
addq %rdx, %rax
movq %rax, 855(%rsp)
movb $0, 854(%rsp)
movb $111, 853(%rsp)
movb $108, 852(%rsp)
movb $108, 851(%rsp)
movb $101, 850(%rsp)
movb $104, 849(%rsp)
leaq 849(%rsp), %rdx
movq %rdx, 841(%rsp)
movq 855(%rsp), %rax
movq 841(%rsp), %rdx
movq %rdx, (%rax)
movl $1, 837(%rsp)
movslq 837(%rsp), %rdx
imulq $8, %rdx
movq 867(%rsp), %rax
addq %rdx, %rax
movq %rax, 829(%rsp)
movb $0, 828(%rsp)
movb $100, 827(%rsp)
movb $108, 826(%rsp)
movb $114, 825(%rsp)
movb $111, 824(%rsp)
movb $119, 823(%rsp)
leaq 823(%rsp), %rdx
movq %rdx, 815(%rsp)
movq 829(%rsp), %rax
movq 815(%rsp), %rdx
movq %rdx, (%rax)
movl $2, 811(%rsp)
movslq 811(%rsp), %rdx
imulq $8, %rdx
movq 867(%rsp), %rax
addq %rdx, %rax
movq %rax, 803(%rsp)
movb $0, 802(%rsp)
movb $110, 801(%rsp)
movb $105, 800(%rsp)
movb $97, 799(%rsp)
movb $103, 798(%rsp)
movb $97, 797(%rsp)
leaq 797(%rsp), %rdx
movq %rdx, 789(%rsp)
movq 803(%rsp), %rax
movq 789(%rsp), %rdx
movq %rdx, (%rax)
movl $0, 785(%rsp)
movslq 785(%rsp), %rdx
imulq $8, %rdx
movq 867(%rsp), %rax
addq %rdx, %rax
movq %rax, 777(%rsp)
movq 777(%rsp), %rax
movq (%rax), %rdx
movq %rdx, 769(%rsp)
movq $0, 761(%rsp)
movq 769(%rsp), %rdx
movq %rdx, 761(%rsp)
#__parameter_offset_pass
leaq 761(%rsp), %rcx
callq print_str
movb %al, 760(%rsp)
movl $1, 756(%rsp)
movslq 756(%rsp), %rdx
imulq $8, %rdx
movq 867(%rsp), %rax
addq %rdx, %rax
movq %rax, 748(%rsp)
movq 748(%rsp), %rax
movq (%rax), %rdx
movq %rdx, 740(%rsp)
movq $0, 732(%rsp)
movq 740(%rsp), %rdx
movq %rdx, 732(%rsp)
#__parameter_offset_pass
leaq 732(%rsp), %rcx
callq print_str
movb %al, 731(%rsp)
movl $2, 727(%rsp)
movslq 727(%rsp), %rdx
imulq $8, %rdx
movq 867(%rsp), %rax
addq %rdx, %rax
movq %rax, 719(%rsp)
movq 719(%rsp), %rax
movq (%rax), %rdx
movq %rdx, 711(%rsp)
movq $0, 703(%rsp)
movq 711(%rsp), %rdx
movq %rdx, 703(%rsp)
#__parameter_offset_pass
leaq 703(%rsp), %rcx
callq print_str
movb %al, 702(%rsp)
#__clear_scope_3
addq $1000, %rsp
#__end_scope_3
xor %rax, %rax
retq
.seh_endproc

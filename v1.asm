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
movb $0, 936(%rsp)
movb $111, 935(%rsp)
movb $108, 934(%rsp)
movb $108, 933(%rsp)
movb $101, 932(%rsp)
movb $104, 931(%rsp)
leaq 931(%rsp), %rdx
movq %rdx, 923(%rsp)
movb $0, %ah
movb %ah, 922(%rsp)
movb $0, %ah
movb %ah, 921(%rsp)
movb $0, %ah
movb %ah, 920(%rsp)
movb $0, %ah
movb %ah, 919(%rsp)
movb $0, %ah
movb %ah, 918(%rsp)
movb $0, %ah
movb %ah, 917(%rsp)
movb $0, %ah
movb %ah, 916(%rsp)
movb $0, %ah
movb %ah, 915(%rsp)
movb $0, %ah
movb %ah, 914(%rsp)
movb $0, %ah
movb %ah, 913(%rsp)
leaq 913(%rsp), %rdx
movq %rdx, 905(%rsp)
movl $0, 901(%rsp)
movslq 901(%rsp), %rdx
imulq $1, %rdx
movq 905(%rsp), %rax
addq %rdx, %rax
movq %rax, 893(%rsp)
movl $0, 889(%rsp)
movslq 889(%rsp), %rdx
imulq $1, %rdx
movq 923(%rsp), %rax
addq %rdx, %rax
movq %rax, 881(%rsp)
movq 881(%rsp), %rax
movb (%rax), %dh
movb %dh, 880(%rsp)
movq 893(%rsp), %rax
movb 880(%rsp), %dh
movb %dh, (%rax)
movl $1, 876(%rsp)
movslq 876(%rsp), %rdx
imulq $1, %rdx
movq 905(%rsp), %rax
addq %rdx, %rax
movq %rax, 868(%rsp)
movl $1, 864(%rsp)
movslq 864(%rsp), %rdx
imulq $1, %rdx
movq 923(%rsp), %rax
addq %rdx, %rax
movq %rax, 856(%rsp)
movq 856(%rsp), %rax
movb (%rax), %dh
movb %dh, 855(%rsp)
movq 868(%rsp), %rax
movb 855(%rsp), %dh
movb %dh, (%rax)
movl $2, 851(%rsp)
movslq 851(%rsp), %rdx
imulq $1, %rdx
movq 905(%rsp), %rax
addq %rdx, %rax
movq %rax, 843(%rsp)
movl $2, 839(%rsp)
movslq 839(%rsp), %rdx
imulq $1, %rdx
movq 923(%rsp), %rax
addq %rdx, %rax
movq %rax, 831(%rsp)
movq 831(%rsp), %rax
movb (%rax), %dh
movb %dh, 830(%rsp)
movq 843(%rsp), %rax
movb 830(%rsp), %dh
movb %dh, (%rax)
movl $3, 826(%rsp)
movslq 826(%rsp), %rdx
imulq $1, %rdx
movq 905(%rsp), %rax
addq %rdx, %rax
movq %rax, 818(%rsp)
movl $3, 814(%rsp)
movslq 814(%rsp), %rdx
imulq $1, %rdx
movq 923(%rsp), %rax
addq %rdx, %rax
movq %rax, 806(%rsp)
movq 806(%rsp), %rax
movb (%rax), %dh
movb %dh, 805(%rsp)
movq 818(%rsp), %rax
movb 805(%rsp), %dh
movb %dh, (%rax)
movl $4, 801(%rsp)
movslq 801(%rsp), %rdx
imulq $1, %rdx
movq 905(%rsp), %rax
addq %rdx, %rax
movq %rax, 793(%rsp)
movl $4, 789(%rsp)
movslq 789(%rsp), %rdx
imulq $1, %rdx
movq 923(%rsp), %rax
addq %rdx, %rax
movq %rax, 781(%rsp)
movq 781(%rsp), %rax
movb (%rax), %dh
movb %dh, 780(%rsp)
movq 793(%rsp), %rax
movb 780(%rsp), %dh
movb %dh, (%rax)
movl $5, 776(%rsp)
movslq 776(%rsp), %rdx
imulq $1, %rdx
movq 905(%rsp), %rax
addq %rdx, %rax
movq %rax, 768(%rsp)
movb $70, %ah
movb %ah, 767(%rsp)
movq 768(%rsp), %rax
movb 767(%rsp), %dh
movb %dh, (%rax)
movl $6, 763(%rsp)
movslq 763(%rsp), %rdx
imulq $1, %rdx
movq 905(%rsp), %rax
addq %rdx, %rax
movq %rax, 755(%rsp)
movb $70, %ah
movb %ah, 754(%rsp)
movq 755(%rsp), %rax
movb 754(%rsp), %dh
movb %dh, (%rax)
movq $0, 746(%rsp)
movq 905(%rsp), %rdx
movq %rdx, 746(%rsp)
#__parameter_offset_pass
leaq 746(%rsp), %rcx
callq print_str
movb %al, 745(%rsp)
#__clear_scope_3
addq $1000, %rsp
#__end_scope_3
xor %rax, %rax
retq
.seh_endproc

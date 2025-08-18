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
.def	print_num;
.endef
.globl	print_num
print_num:
.seh_proc print_num
#__begin_scope_3
#__init_scope_3
subq $1000, %rsp
movl 0(%rcx), %edx
movl %edx, 933(%rsp)
movb $0, 932(%rsp)
movb $0, 931(%rsp)
movb $0, 930(%rsp)
movb $0, 929(%rsp)
movb $0, 928(%rsp)
movb $0, 927(%rsp)
movb $0, 926(%rsp)
movb $0, 925(%rsp)
movb $0, 924(%rsp)
movb $0, 923(%rsp)
movb $0, 922(%rsp)
movb $0, 921(%rsp)
movb $0, 920(%rsp)
movb $0, 919(%rsp)
movb $0, 918(%rsp)
movb $0, 917(%rsp)
movb $0, 916(%rsp)
movb $0, 915(%rsp)
movb $0, 914(%rsp)
leaq 914(%rsp), %rdx
movq %rdx, 906(%rsp)
movl $0, 902(%rsp)
movl 933(%rsp), %eax
movl 902(%rsp), %ebx
movb $1, 901(%rsp)
cmpl %eax, %ebx
je mark_5
movb $0, 901(%rsp)
mark_5 :
#IF
xor %edx, %edx
movb 901(%rsp), %dh
cmpb $0, %dh
je mark_3
#__end_scope_3
#__begin_scope_4
#__init_scope_4
subq $1000, %rsp
movb $0, 900(%rsp)
movb $48, 899(%rsp)
leaq 899(%rsp), %rdx
movq %rdx, 891(%rsp)
movl $1, 887(%rsp)
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 879(%rsp)
movl $0, 875(%rsp)
movq 879(%rsp), %rcx
leaq 875(%rsp), %r9
movq  891(%rsp), %rdx
movl  887(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
#__clear_scope_4
addq $1000, %rsp
#__end_scope_4
#__begin_scope_3
jmp mark_4
mark_3 :
#__end_scope_3
#__begin_scope_5
#__init_scope_5
subq $1000, %rsp
movl $0, 871(%rsp)
#__end_scope_5
#__begin_scope_6
#__init_scope_6
subq $1000, %rsp
mark_7 :
movl $0, 867(%rsp)
movl 933(%rsp), %eax
movl 867(%rsp), %ebx
movb $1, 866(%rsp)
cmpl %eax, %ebx
jl mark_9
movb $0, 866(%rsp)
mark_9 :
#WHILE
xor %edx, %edx
movb 866(%rsp), %dh
cmpb $0, %dh
je mark_8
movl $10, 862(%rsp)
movl 933(%rsp), %eax
cdq
idivl 862(%rsp)
movl %edx, 858(%rsp)
movl $10, 854(%rsp)
movl 933(%rsp), %eax
cdq
idivl 854(%rsp)
movl %eax, 850(%rsp)
movl 850(%rsp), %edx
movl %edx, 933(%rsp)
movb $48, %ah
movb %ah, 849(%rsp)
movsbl 849(%rsp), %edx
movl %edx, 845(%rsp)
movl 858(%rsp), %edx
addl 845(%rsp), %edx
movl %edx, 841(%rsp)
movslq 871(%rsp), %rdx
imulq $1, %rdx
movq 906(%rsp), %rax
addq %rdx, %rax
movq %rax, 833(%rsp)
movq 833(%rsp), %rax
movb 841(%rsp), %dh
movb %dh, (%rax)
movl $1, 829(%rsp)
movl 871(%rsp), %edx
addl 829(%rsp), %edx
movl %edx, 825(%rsp)
movl 825(%rsp), %edx
movl %edx, 871(%rsp)
jmp mark_7
mark_8 :
#__clear_scope_6
addq $1000, %rsp
#__end_scope_6
#__begin_scope_5
movq $0, 817(%rsp)
movq 906(%rsp), %rdx
movq %rdx, 817(%rsp)
#__parameter_offset_pass
leaq 817(%rsp), %rcx
callq strlen
movl %eax, 813(%rsp)
#__end_scope_5
#__begin_scope_7
#__init_scope_7
subq $1000, %rsp
movl $0, 809(%rsp)
mark_10 :
movl $2, 805(%rsp)
movl 813(%rsp), %eax
cdq
idivl 805(%rsp)
movl %eax, 801(%rsp)
movl 809(%rsp), %eax
movl 801(%rsp), %ebx
movb $1, 800(%rsp)
cmpl %eax, %ebx
jg mark_12
movb $0, 800(%rsp)
mark_12 :
#FOR
xor %edx, %edx
movb 800(%rsp), %dh
cmpb $0, %dh
je mark_11
movslq 809(%rsp), %rdx
imulq $1, %rdx
movq 906(%rsp), %rax
addq %rdx, %rax
movq %rax, 792(%rsp)
movq 792(%rsp), %rax
movb (%rax), %dh
movb %dh, 791(%rsp)
movl $1, 787(%rsp)
movl 813(%rsp), %edx
subl 787(%rsp), %edx
movl %edx, 783(%rsp)
movl 783(%rsp), %edx
subl 809(%rsp), %edx
movl %edx, 779(%rsp)
movslq 779(%rsp), %rdx
imulq $1, %rdx
movq 906(%rsp), %rax
addq %rdx, %rax
movq %rax, 771(%rsp)
movq 771(%rsp), %rax
movb (%rax), %dh
movb %dh, 770(%rsp)
movslq 809(%rsp), %rdx
imulq $1, %rdx
movq 906(%rsp), %rax
addq %rdx, %rax
movq %rax, 762(%rsp)
movq 762(%rsp), %rax
movb 770(%rsp), %dh
movb %dh, (%rax)
movl $1, 758(%rsp)
movl 813(%rsp), %edx
subl 758(%rsp), %edx
movl %edx, 754(%rsp)
movl 754(%rsp), %edx
subl 809(%rsp), %edx
movl %edx, 750(%rsp)
movslq 750(%rsp), %rdx
imulq $1, %rdx
movq 906(%rsp), %rax
addq %rdx, %rax
movq %rax, 742(%rsp)
movq 742(%rsp), %rax
movb 791(%rsp), %dh
movb %dh, (%rax)
movl $1, 738(%rsp)
movl 809(%rsp), %edx
addl 738(%rsp), %edx
movl %edx, 734(%rsp)
movl 734(%rsp), %edx
movl %edx, 809(%rsp)
jmp mark_10
mark_11 :
#__clear_scope_7
addq $1000, %rsp
#__end_scope_7
#__begin_scope_5
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 726(%rsp)
movl $0, 722(%rsp)
movq 726(%rsp), %rcx
leaq 722(%rsp), %r9
movq  906(%rsp), %rdx
movl  813(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
#__clear_scope_5
addq $1000, %rsp
#__end_scope_5
#__begin_scope_3
jmp mark_4
mark_6 :
mark_4 :
#__clear_scope_3
addq $1000, %rsp
#__end_scope_3
retq
.seh_endproc
.def	main;
.endef
.globl	main
main:
.seh_proc main
#__begin_scope_8
#__init_scope_8
subq $1000, %rsp
movl %ecx, 718(%rsp)
movq %rdx, 710(%rsp)
movl $1, 706(%rsp)
movl $2, 702(%rsp)
movl $3, 698(%rsp)
movl $4, 694(%rsp)
movl $5, 690(%rsp)
movl 690(%rsp), %edx
movl %edx, 686(%rsp)
movl 694(%rsp), %edx
movl %edx, 682(%rsp)
movl 698(%rsp), %edx
movl %edx, 678(%rsp)
movl 702(%rsp), %edx
movl %edx, 674(%rsp)
movl 706(%rsp), %edx
movl %edx, 670(%rsp)
leaq 670(%rsp), %rdx
movq %rdx, 662(%rsp)
#__end_scope_8
#__begin_scope_9
#__init_scope_9
subq $1000, %rsp
movl $0, 658(%rsp)
mark_13 :
movl $5, 654(%rsp)
movl 658(%rsp), %eax
movl 654(%rsp), %ebx
movb $1, 653(%rsp)
cmpl %eax, %ebx
jg mark_15
movb $0, 653(%rsp)
mark_15 :
#FOR
xor %edx, %edx
movb 653(%rsp), %dh
cmpb $0, %dh
je mark_14
movslq 658(%rsp), %rdx
imulq $4, %rdx
movq 662(%rsp), %rax
addq %rdx, %rax
movq %rax, 645(%rsp)
movq 645(%rsp), %rax
movl (%rax), %edx
movl %edx, 641(%rsp)
movl $0, 637(%rsp)
movl 641(%rsp), %edx
movl %edx, 637(%rsp)
#__parameter_offset_pass
leaq 637(%rsp), %rcx
callq print_num
movb %al, 636(%rsp)
movb $0, 635(%rsp)
movb $32, 634(%rsp)
leaq 634(%rsp), %rdx
movq %rdx, 626(%rsp)
movq $0, 618(%rsp)
movq 626(%rsp), %rdx
movq %rdx, 618(%rsp)
#__parameter_offset_pass
leaq 618(%rsp), %rcx
callq print_str
movb %al, 617(%rsp)
movl $1, 613(%rsp)
movl 658(%rsp), %edx
addl 613(%rsp), %edx
movl %edx, 609(%rsp)
movl 609(%rsp), %edx
movl %edx, 658(%rsp)
jmp mark_13
mark_14 :
#__clear_scope_9
addq $1000, %rsp
#__end_scope_9
#__begin_scope_8
movb $0, 608(%rsp)
movb $10, 607(%rsp)
leaq 607(%rsp), %rdx
movq %rdx, 599(%rsp)
movq $0, 591(%rsp)
movq 599(%rsp), %rdx
movq %rdx, 591(%rsp)
#__parameter_offset_pass
leaq 591(%rsp), %rcx
callq print_str
movb %al, 590(%rsp)
#__clear_scope_8
addq $1000, %rsp
#__end_scope_8
xor %rax, %rax
retq
.seh_endproc

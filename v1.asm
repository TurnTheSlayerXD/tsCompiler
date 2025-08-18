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
.def	print_num;
.endef
.globl	print_num
print_num:
.seh_proc print_num
#__begin_scope_2
#__init_scope_2
subq $1000, %rsp
movl 0(%rcx), %edx
movl %edx, 965(%rsp)
movb $0, 964(%rsp)
movb $0, 963(%rsp)
movb $0, 962(%rsp)
movb $0, 961(%rsp)
movb $0, 960(%rsp)
movb $0, 959(%rsp)
movb $0, 958(%rsp)
movb $0, 957(%rsp)
movb $0, 956(%rsp)
movb $0, 955(%rsp)
movb $0, 954(%rsp)
movb $0, 953(%rsp)
movb $0, 952(%rsp)
movb $0, 951(%rsp)
movb $0, 950(%rsp)
movb $0, 949(%rsp)
movb $0, 948(%rsp)
movb $0, 947(%rsp)
movb $0, 946(%rsp)
leaq 946(%rsp), %rdx
movq %rdx, 938(%rsp)
movl $0, 934(%rsp)
movl 965(%rsp), %eax
movl 934(%rsp), %ebx
movb $1, 933(%rsp)
cmpl %eax, %ebx
je mark_5
movb $0, 933(%rsp)
mark_5 :
#IF
xor %edx, %edx
movb 933(%rsp), %dh
cmpb $0, %dh
je mark_3
#__end_scope_2
#__begin_scope_3
#__init_scope_3
subq $1000, %rsp
movb $0, 932(%rsp)
movb $48, 931(%rsp)
leaq 931(%rsp), %rdx
movq %rdx, 923(%rsp)
movl $1, 919(%rsp)
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 911(%rsp)
movl $0, 907(%rsp)
movq 911(%rsp), %rcx
leaq 907(%rsp), %r9
movq  923(%rsp), %rdx
movl  919(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
#__clear_scope_3
addq $1000, %rsp
#__end_scope_3
#__begin_scope_2
jmp mark_4
mark_3 :
#__end_scope_2
#__begin_scope_4
#__init_scope_4
subq $1000, %rsp
movl $0, 903(%rsp)
#__end_scope_4
#__begin_scope_5
#__init_scope_5
subq $1000, %rsp
mark_7 :
movl $0, 899(%rsp)
movl 965(%rsp), %eax
movl 899(%rsp), %ebx
movb $1, 898(%rsp)
cmpl %eax, %ebx
jl mark_9
movb $0, 898(%rsp)
mark_9 :
#WHILE
xor %edx, %edx
movb 898(%rsp), %dh
cmpb $0, %dh
je mark_8
movl $10, 894(%rsp)
movl 965(%rsp), %eax
cdq
idivl 894(%rsp)
movl %edx, 890(%rsp)
movl $10, 886(%rsp)
movl 965(%rsp), %eax
cdq
idivl 886(%rsp)
movl %eax, 882(%rsp)
movl 882(%rsp), %edx
movl %edx, 965(%rsp)
movb $48, %ah
movb %ah, 881(%rsp)
movsbl 881(%rsp), %edx
movl %edx, 877(%rsp)
movl 890(%rsp), %edx
addl 877(%rsp), %edx
movl %edx, 873(%rsp)
movslq 903(%rsp), %rdx
imulq $1, %rdx
movq 938(%rsp), %rax
addq %rdx, %rax
movq %rax, 865(%rsp)
movq 865(%rsp), %rax
movb 873(%rsp), %dh
movb %dh, (%rax)
movl $1, 861(%rsp)
movl 903(%rsp), %edx
addl 861(%rsp), %edx
movl %edx, 857(%rsp)
movl 857(%rsp), %edx
movl %edx, 903(%rsp)
jmp mark_7
mark_8 :
#__clear_scope_5
addq $1000, %rsp
#__end_scope_5
#__begin_scope_4
movq $0, 849(%rsp)
movq 938(%rsp), %rdx
movq %rdx, 849(%rsp)
#__parameter_offset_pass
leaq 849(%rsp), %rcx
callq strlen
movl %eax, 845(%rsp)
#__end_scope_4
#__begin_scope_6
#__init_scope_6
subq $1000, %rsp
movl $0, 841(%rsp)
mark_10 :
movl $2, 837(%rsp)
movl 845(%rsp), %eax
cdq
idivl 837(%rsp)
movl %eax, 833(%rsp)
movl 841(%rsp), %eax
movl 833(%rsp), %ebx
movb $1, 832(%rsp)
cmpl %eax, %ebx
jg mark_12
movb $0, 832(%rsp)
mark_12 :
#FOR
xor %edx, %edx
movb 832(%rsp), %dh
cmpb $0, %dh
je mark_11
movslq 841(%rsp), %rdx
imulq $1, %rdx
movq 938(%rsp), %rax
addq %rdx, %rax
movq %rax, 824(%rsp)
movq 824(%rsp), %rax
movb (%rax), %dh
movb %dh, 823(%rsp)
movl $1, 819(%rsp)
movl 845(%rsp), %edx
subl 819(%rsp), %edx
movl %edx, 815(%rsp)
movl 815(%rsp), %edx
subl 841(%rsp), %edx
movl %edx, 811(%rsp)
movslq 811(%rsp), %rdx
imulq $1, %rdx
movq 938(%rsp), %rax
addq %rdx, %rax
movq %rax, 803(%rsp)
movq 803(%rsp), %rax
movb (%rax), %dh
movb %dh, 802(%rsp)
movslq 841(%rsp), %rdx
imulq $1, %rdx
movq 938(%rsp), %rax
addq %rdx, %rax
movq %rax, 794(%rsp)
movq 794(%rsp), %rax
movb 802(%rsp), %dh
movb %dh, (%rax)
movl $1, 790(%rsp)
movl 845(%rsp), %edx
subl 790(%rsp), %edx
movl %edx, 786(%rsp)
movl 786(%rsp), %edx
subl 841(%rsp), %edx
movl %edx, 782(%rsp)
movslq 782(%rsp), %rdx
imulq $1, %rdx
movq 938(%rsp), %rax
addq %rdx, %rax
movq %rax, 774(%rsp)
movq 774(%rsp), %rax
movb 823(%rsp), %dh
movb %dh, (%rax)
movl $1, 770(%rsp)
movl 841(%rsp), %edx
addl 770(%rsp), %edx
movl %edx, 766(%rsp)
movl 766(%rsp), %edx
movl %edx, 841(%rsp)
jmp mark_10
mark_11 :
#__clear_scope_6
addq $1000, %rsp
#__end_scope_6
#__begin_scope_4
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 758(%rsp)
movl $0, 754(%rsp)
movq 758(%rsp), %rcx
leaq 754(%rsp), %r9
movq  938(%rsp), %rdx
movl  845(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
#__clear_scope_4
addq $1000, %rsp
#__end_scope_4
#__begin_scope_2
jmp mark_4
mark_6 :
mark_4 :
#__clear_scope_2
addq $1000, %rsp
#__end_scope_2
retq
.seh_endproc
.def	print_str;
.endef
.globl	print_str
print_str:
.seh_proc print_str
#__begin_scope_7
#__init_scope_7
subq $1000, %rsp
movq 0(%rcx), %rdx
movq %rdx, 746(%rsp)
movq $0, 738(%rsp)
movq 746(%rsp), %rdx
movq %rdx, 738(%rsp)
#__parameter_offset_pass
leaq 738(%rsp), %rcx
callq strlen
movl %eax, 734(%rsp)
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 726(%rsp)
movl $0, 722(%rsp)
movq 726(%rsp), %rcx
leaq 722(%rsp), %r9
movq  746(%rsp), %rdx
movl  734(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
#__clear_scope_7
addq $1000, %rsp
#__end_scope_7
retq
.seh_endproc
.def	say_hello;
.endef
.globl	say_hello
say_hello:
.seh_proc say_hello
#__begin_scope_8
#__init_scope_8
subq $1000, %rsp
movb $0, 721(%rsp)
movb $116, 720(%rsp)
movb $112, 719(%rsp)
movb $105, 718(%rsp)
movb $114, 717(%rsp)
movb $99, 716(%rsp)
movb $115, 715(%rsp)
movb $101, 714(%rsp)
movb $112, 713(%rsp)
movb $121, 712(%rsp)
movb $84, 711(%rsp)
movb $32, 710(%rsp)
movb $104, 709(%rsp)
movb $116, 708(%rsp)
movb $105, 707(%rsp)
movb $119, 706(%rsp)
movb $32, 705(%rsp)
movb $100, 704(%rsp)
movb $101, 703(%rsp)
movb $108, 702(%rsp)
movb $105, 701(%rsp)
movb $112, 700(%rsp)
movb $109, 699(%rsp)
movb $111, 698(%rsp)
movb $99, 697(%rsp)
movb $32, 696(%rsp)
movb $103, 695(%rsp)
movb $110, 694(%rsp)
movb $97, 693(%rsp)
movb $108, 692(%rsp)
movb $32, 691(%rsp)
movb $67, 690(%rsp)
movb $32, 689(%rsp)
movb $109, 688(%rsp)
movb $111, 687(%rsp)
movb $114, 686(%rsp)
movb $102, 685(%rsp)
movb $32, 684(%rsp)
movb $111, 683(%rsp)
movb $108, 682(%rsp)
movb $108, 681(%rsp)
movb $101, 680(%rsp)
movb $72, 679(%rsp)
leaq 679(%rsp), %rdx
movq %rdx, 671(%rsp)
movq $0, 663(%rsp)
movq 671(%rsp), %rdx
movq %rdx, 663(%rsp)
#__parameter_offset_pass
leaq 663(%rsp), %rcx
callq print_str
movb %al, 662(%rsp)
#__clear_scope_8
addq $1000, %rsp
#__end_scope_8
retq
.seh_endproc
.def	main;
.endef
.globl	main
main:
.seh_proc main
#__begin_scope_9
#__init_scope_9
subq $1000, %rsp
movl %ecx, 658(%rsp)
movq %rdx, 650(%rsp)
movb $0, 649(%rsp)
movb $111, 648(%rsp)
movb $108, 647(%rsp)
movb $108, 646(%rsp)
movb $101, 645(%rsp)
movb $72, 644(%rsp)
leaq 644(%rsp), %rdx
movq %rdx, 636(%rsp)
movq $0, 628(%rsp)
movq 636(%rsp), %rdx
movq %rdx, 628(%rsp)
#__parameter_offset_pass
leaq 628(%rsp), %rcx
callq print_str
movb %al, 627(%rsp)
movb $0, 626(%rsp)
movb $10, 625(%rsp)
leaq 625(%rsp), %rdx
movq %rdx, 617(%rsp)
movq $0, 609(%rsp)
movq 617(%rsp), %rdx
movq %rdx, 609(%rsp)
#__parameter_offset_pass
leaq 609(%rsp), %rcx
callq print_str
movb %al, 608(%rsp)
movl $1, 604(%rsp)
movl $0, 600(%rsp)
movl 600(%rsp), %edx
addl 604(%rsp), %edx
movl %edx, 596(%rsp)
movl $3, 592(%rsp)
movl $6, 588(%rsp)
movl $8, 584(%rsp)
movl 584(%rsp), %edx
addl 588(%rsp), %edx
movl %edx, 580(%rsp)
movl 592(%rsp), %eax
imull 580(%rsp)
movl %eax, 576(%rsp)
movl 576(%rsp), %edx
subl 596(%rsp), %edx
movl %edx, 572(%rsp)
movl $5, 568(%rsp)
movl 572(%rsp), %eax
cdq
idivl 568(%rsp)
movl %eax, 564(%rsp)
movl $0, 560(%rsp)
movl 564(%rsp), %edx
movl %edx, 560(%rsp)
#__parameter_offset_pass
leaq 560(%rsp), %rcx
callq print_num
movb %al, 559(%rsp)
movb $0, 558(%rsp)
movb $10, 557(%rsp)
leaq 557(%rsp), %rdx
movq %rdx, 549(%rsp)
movq $0, 541(%rsp)
movq 549(%rsp), %rdx
movq %rdx, 541(%rsp)
#__parameter_offset_pass
leaq 541(%rsp), %rcx
callq print_str
movb %al, 540(%rsp)
callq say_hello
movb %al, 539(%rsp)
movb $0, 538(%rsp)
movb $10, 537(%rsp)
leaq 537(%rsp), %rdx
movq %rdx, 529(%rsp)
movl $1, 525(%rsp)
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 517(%rsp)
movl $0, 513(%rsp)
movq 517(%rsp), %rcx
leaq 513(%rsp), %r9
movq  529(%rsp), %rdx
movl  525(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
#__clear_scope_9
addq $1000, %rsp
#__end_scope_9
xor %rax, %rax
retq
.seh_endproc

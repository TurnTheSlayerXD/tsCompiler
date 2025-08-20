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
movl 988(%rsp), %edx
movl %edx, 984(%rsp)
#__end_scope_0
#__begin_scope_1
#__init_scope_1
subq $1000, %rsp
mark_0 :
movslq 984(%rsp), %rdx
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
movl 984(%rsp), %edx
addl 969(%rsp), %edx
movl %edx, 965(%rsp)
movl 965(%rsp), %edx
movl %edx, 984(%rsp)
jmp mark_0
mark_1 :
#__clear_scope_1
addq $1000, %rsp
#__end_scope_1
#__begin_scope_0
movl 984(%rsp), %eax
#__clear_scope_0
addq $1000, %rsp
retq
#__clear_scope_0
addq $1000, %rsp
#__end_scope_0
retq
.seh_endproc
.def	print_int;
.endef
.globl	print_int
print_int:
.seh_proc print_int
#__begin_scope_2
#__init_scope_2
subq $1000, %rsp
movl 0(%rcx), %edx
movl %edx, 961(%rsp)
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
movb $0, 933(%rsp)
movb $0, 932(%rsp)
movb $0, 931(%rsp)
movb $0, 930(%rsp)
movb $0, 929(%rsp)
movb $0, 928(%rsp)
movb $0, 927(%rsp)
movb $0, 926(%rsp)
movb $0, 925(%rsp)
movb $0, 924(%rsp)
leaq 924(%rsp), %rdx
movq %rdx, 916(%rsp)
movq $0, 908(%rsp)
movq 916(%rsp), %rdx
movq %rdx, 908(%rsp)
movl $0, 904(%rsp)
movl 961(%rsp), %eax
movl 904(%rsp), %ebx
movb $1, 903(%rsp)
cmpl %eax, %ebx
je mark_5
movb $0, 903(%rsp)
mark_5 :
#IF
xor %edx, %edx
movb 903(%rsp), %dh
cmpb $0, %dh
je mark_3
#__end_scope_2
#__begin_scope_3
#__init_scope_3
subq $1000, %rsp
movb $0, 902(%rsp)
movb $48, 901(%rsp)
leaq 901(%rsp), %rdx
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
movl $0, 873(%rsp)
movl $0, 869(%rsp)
movl 873(%rsp), %edx
movl %edx, 869(%rsp)
movl $1, 865(%rsp)
movl $0, 861(%rsp)
movl 865(%rsp), %edx
movl %edx, 861(%rsp)
movl $0, 857(%rsp)
movl 961(%rsp), %eax
movl 857(%rsp), %ebx
movb $1, 856(%rsp)
cmpl %eax, %ebx
jg mark_9
movb $0, 856(%rsp)
mark_9 :
#IF
xor %edx, %edx
movb 856(%rsp), %dh
cmpb $0, %dh
je mark_7
#__end_scope_4
#__begin_scope_5
#__init_scope_5
subq $1000, %rsp
movl $1, 852(%rsp)
movl $0, 848(%rsp)
movl 848(%rsp), %edx
subl 852(%rsp), %edx
movl %edx, 844(%rsp)
movl 961(%rsp), %eax
imull 844(%rsp)
movl %eax, 840(%rsp)
movl 840(%rsp), %edx
movl %edx, 961(%rsp)
movl $1, 836(%rsp)
movl $0, 832(%rsp)
movl 832(%rsp), %edx
subl 836(%rsp), %edx
movl %edx, 828(%rsp)
movl 828(%rsp), %edx
movl %edx, 861(%rsp)
#__clear_scope_5
addq $1000, %rsp
#__end_scope_5
#__begin_scope_4
jmp mark_8
mark_7 :
mark_8 :
#__end_scope_4
#__begin_scope_6
#__init_scope_6
subq $1000, %rsp
mark_10 :
movl $0, 824(%rsp)
movl 961(%rsp), %eax
movl 824(%rsp), %ebx
movb $1, 823(%rsp)
cmpl %eax, %ebx
jl mark_12
movb $0, 823(%rsp)
mark_12 :
#WHILE
xor %edx, %edx
movb 823(%rsp), %dh
cmpb $0, %dh
je mark_11
movl $10, 819(%rsp)
movl 961(%rsp), %eax
cdq
idivl 819(%rsp)
movl %edx, 815(%rsp)
movl $0, 811(%rsp)
movl 815(%rsp), %edx
movl %edx, 811(%rsp)
movl $10, 807(%rsp)
movl 961(%rsp), %eax
cdq
idivl 807(%rsp)
movl %eax, 803(%rsp)
movl 803(%rsp), %edx
movl %edx, 961(%rsp)
movb $48, %ah
movb %ah, 802(%rsp)
movsbl 802(%rsp), %edx
movl %edx, 798(%rsp)
movl 798(%rsp), %edx
addl 811(%rsp), %edx
movl %edx, 794(%rsp)
movslq 869(%rsp), %rdx
imulq $1, %rdx
movq 908(%rsp), %rax
addq %rdx, %rax
movq %rax, 786(%rsp)
movq 786(%rsp), %rax
movb 794(%rsp), %dh
movb %dh, (%rax)
movl $1, 782(%rsp)
movl 869(%rsp), %edx
addl 782(%rsp), %edx
movl %edx, 778(%rsp)
movl 778(%rsp), %edx
movl %edx, 869(%rsp)
jmp mark_10
mark_11 :
#__clear_scope_6
addq $1000, %rsp
#__end_scope_6
#__begin_scope_4
movl $1, 774(%rsp)
movl $0, 770(%rsp)
movl 770(%rsp), %edx
subl 774(%rsp), %edx
movl %edx, 766(%rsp)
movl 861(%rsp), %eax
movl 766(%rsp), %ebx
movb $1, 765(%rsp)
cmpl %eax, %ebx
je mark_15
movb $0, 765(%rsp)
mark_15 :
#IF
xor %edx, %edx
movb 765(%rsp), %dh
cmpb $0, %dh
je mark_13
#__end_scope_4
#__begin_scope_7
#__init_scope_7
subq $1000, %rsp
movb $45, %ah
movb %ah, 764(%rsp)
movslq 869(%rsp), %rdx
imulq $1, %rdx
movq 908(%rsp), %rax
addq %rdx, %rax
movq %rax, 756(%rsp)
movq 756(%rsp), %rax
movb 764(%rsp), %dh
movb %dh, (%rax)
#__clear_scope_7
addq $1000, %rsp
#__end_scope_7
#__begin_scope_4
jmp mark_14
mark_13 :
mark_14 :
movq $0, 748(%rsp)
movq 908(%rsp), %rdx
movq %rdx, 748(%rsp)
#__parameter_offset_pass
leaq 748(%rsp), %rcx
callq strlen
movl %eax, 744(%rsp)
movl $0, 740(%rsp)
movl 744(%rsp), %edx
movl %edx, 740(%rsp)
#__end_scope_4
#__begin_scope_8
#__init_scope_8
subq $1000, %rsp
movl $0, 736(%rsp)
movl $0, 732(%rsp)
movl 736(%rsp), %edx
movl %edx, 732(%rsp)
mark_16 :
movl $2, 728(%rsp)
movl 740(%rsp), %eax
cdq
idivl 728(%rsp)
movl %eax, 724(%rsp)
movl 732(%rsp), %eax
movl 724(%rsp), %ebx
movb $1, 723(%rsp)
cmpl %eax, %ebx
jg mark_18
movb $0, 723(%rsp)
mark_18 :
#FOR
xor %edx, %edx
movb 723(%rsp), %dh
cmpb $0, %dh
je mark_17
movslq 732(%rsp), %rdx
imulq $1, %rdx
movq 908(%rsp), %rax
addq %rdx, %rax
movq %rax, 715(%rsp)
movq 715(%rsp), %rax
movb (%rax), %dh
movb %dh, 714(%rsp)
movb $0, %ah
movb %ah, 713(%rsp)
movb 714(%rsp), %dh
movb %dh, 713(%rsp)
movl $1, 709(%rsp)
movl 740(%rsp), %edx
subl 709(%rsp), %edx
movl %edx, 705(%rsp)
movl 705(%rsp), %edx
subl 732(%rsp), %edx
movl %edx, 701(%rsp)
movslq 701(%rsp), %rdx
imulq $1, %rdx
movq 908(%rsp), %rax
addq %rdx, %rax
movq %rax, 693(%rsp)
movq 693(%rsp), %rax
movb (%rax), %dh
movb %dh, 692(%rsp)
movslq 732(%rsp), %rdx
imulq $1, %rdx
movq 908(%rsp), %rax
addq %rdx, %rax
movq %rax, 684(%rsp)
movq 684(%rsp), %rax
movb 692(%rsp), %dh
movb %dh, (%rax)
movl $1, 680(%rsp)
movl 740(%rsp), %edx
subl 680(%rsp), %edx
movl %edx, 676(%rsp)
movl 676(%rsp), %edx
subl 732(%rsp), %edx
movl %edx, 672(%rsp)
movslq 672(%rsp), %rdx
imulq $1, %rdx
movq 908(%rsp), %rax
addq %rdx, %rax
movq %rax, 664(%rsp)
movq 664(%rsp), %rax
movb 713(%rsp), %dh
movb %dh, (%rax)
movl $1, 660(%rsp)
movl 732(%rsp), %edx
addl 660(%rsp), %edx
movl %edx, 656(%rsp)
movl 656(%rsp), %edx
movl %edx, 732(%rsp)
jmp mark_16
mark_17 :
#__clear_scope_8
addq $1000, %rsp
#__end_scope_8
#__begin_scope_4
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 648(%rsp)
movl $0, 644(%rsp)
movq 648(%rsp), %rcx
leaq 644(%rsp), %r9
movq  908(%rsp), %rdx
movl  740(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
#__clear_scope_4
addq $1000, %rsp
#__end_scope_4
#__begin_scope_2
jmp mark_4
mark_6 :
mark_4 :
movb $0, 643(%rsp)
movb $10, 642(%rsp)
leaq 642(%rsp), %rdx
movq %rdx, 634(%rsp)
movl $1, 630(%rsp)
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 622(%rsp)
movl $0, 618(%rsp)
movq 622(%rsp), %rcx
leaq 618(%rsp), %r9
movq  634(%rsp), %rdx
movl  630(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
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
#__begin_scope_9
#__init_scope_9
subq $1000, %rsp
movq 0(%rcx), %rdx
movq %rdx, 610(%rsp)
movq $0, 602(%rsp)
movq 610(%rsp), %rdx
movq %rdx, 602(%rsp)
#__parameter_offset_pass
leaq 602(%rsp), %rcx
callq strlen
movl %eax, 598(%rsp)
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 590(%rsp)
movl $0, 586(%rsp)
movq 590(%rsp), %rcx
leaq 586(%rsp), %r9
movq  610(%rsp), %rdx
movl  598(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
movb $0, 585(%rsp)
movb $10, 584(%rsp)
leaq 584(%rsp), %rdx
movq %rdx, 576(%rsp)
movl $1, 572(%rsp)
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 564(%rsp)
movl $0, 560(%rsp)
movq 564(%rsp), %rcx
leaq 560(%rsp), %r9
movq  576(%rsp), %rdx
movl  572(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
#__clear_scope_9
addq $1000, %rsp
#__end_scope_9
retq
.seh_endproc
.def	get_digit;
.endef
.globl	get_digit
get_digit:
.seh_proc get_digit
#__begin_scope_10
#__init_scope_10
subq $1000, %rsp
movb 0(%rcx), %dh
movb %dh, 559(%rsp)
movb $48, %ah
movb %ah, 558(%rsp)
movb 559(%rsp), %dh
subb 558(%rsp), %dh
movb %dh, 557(%rsp)
movsbl 557(%rsp), %edx
movl %edx, 553(%rsp)
movl 553(%rsp), %eax
#__clear_scope_10
addq $1000, %rsp
retq
#__clear_scope_10
addq $1000, %rsp
#__end_scope_10
retq
.seh_endproc
.def	power;
.endef
.globl	power
power:
.seh_proc power
#__begin_scope_11
#__init_scope_11
subq $1000, %rsp
movl 0(%rcx), %edx
movl %edx, 549(%rsp)
movl 4(%rcx), %edx
movl %edx, 545(%rsp)
movl $1, 541(%rsp)
movl $0, 537(%rsp)
movl 541(%rsp), %edx
movl %edx, 537(%rsp)
#__end_scope_11
#__begin_scope_12
#__init_scope_12
subq $1000, %rsp
mark_19 :
movl $0, 533(%rsp)
movl 549(%rsp), %eax
movl 533(%rsp), %ebx
movb $1, 532(%rsp)
cmpl %eax, %ebx
jl mark_21
movb $0, 532(%rsp)
mark_21 :
#WHILE
xor %edx, %edx
movb 532(%rsp), %dh
cmpb $0, %dh
je mark_20
movl 537(%rsp), %eax
imull 545(%rsp)
movl %eax, 528(%rsp)
movl 528(%rsp), %edx
movl %edx, 537(%rsp)
movl $1, 524(%rsp)
movl 549(%rsp), %edx
subl 524(%rsp), %edx
movl %edx, 520(%rsp)
movl 520(%rsp), %edx
movl %edx, 549(%rsp)
jmp mark_19
mark_20 :
#__clear_scope_12
addq $1000, %rsp
#__end_scope_12
#__begin_scope_11
movl 537(%rsp), %eax
#__clear_scope_11
addq $1000, %rsp
retq
#__clear_scope_11
addq $1000, %rsp
#__end_scope_11
retq
.seh_endproc
.def	parse_int_from_str;
.endef
.globl	parse_int_from_str
parse_int_from_str:
.seh_proc parse_int_from_str
#__begin_scope_13
#__init_scope_13
subq $1000, %rsp
movq 0(%rcx), %rdx
movq %rdx, 512(%rsp)
movq $0, 504(%rsp)
movq 512(%rsp), %rdx
movq %rdx, 504(%rsp)
#__parameter_offset_pass
leaq 504(%rsp), %rcx
callq strlen
movl %eax, 500(%rsp)
movl $0, 496(%rsp)
movl 500(%rsp), %edx
movl %edx, 496(%rsp)
movl $0, 492(%rsp)
movl 496(%rsp), %eax
movl 492(%rsp), %ebx
movb $1, 491(%rsp)
cmpl %eax, %ebx
je mark_24
movb $0, 491(%rsp)
mark_24 :
#IF
xor %edx, %edx
movb 491(%rsp), %dh
cmpb $0, %dh
je mark_22
#__end_scope_13
#__begin_scope_14
#__init_scope_14
subq $1000, %rsp
movl $1488, 487(%rsp)
movl $0, 483(%rsp)
movl 483(%rsp), %edx
subl 487(%rsp), %edx
movl %edx, 479(%rsp)
movl 479(%rsp), %eax
#__clear_scope_14
addq $1000, %rsp
#__clear_scope_13
addq $1000, %rsp
retq
#__clear_scope_14
addq $1000, %rsp
#__end_scope_14
#__begin_scope_13
jmp mark_23
mark_22 :
mark_23 :
movq $0, 471(%rsp)
movq 512(%rsp), %rdx
movq %rdx, 471(%rsp)
movslq 496(%rsp), %rdx
imulq $1, %rdx
movq 512(%rsp), %rax
addq %rdx, %rax
movq %rax, 463(%rsp)
movq $0, 455(%rsp)
movq 463(%rsp), %rdx
movq %rdx, 455(%rsp)
movl $1, 451(%rsp)
movl $0, 447(%rsp)
movl 451(%rsp), %edx
movl %edx, 447(%rsp)
movq 471(%rsp), %rax
movb (%rax), %dh
movb %dh, 446(%rsp)
movb $45, %ah
movb %ah, 445(%rsp)
movb 446(%rsp), %ah
movb 445(%rsp), %al
movb $1, 444(%rsp)
cmpb %ah, %al
je mark_27
movb $0, 444(%rsp)
mark_27 :
#IF
xor %edx, %edx
movb 444(%rsp), %dh
cmpb $0, %dh
je mark_25
#__end_scope_13
#__begin_scope_15
#__init_scope_15
subq $1000, %rsp
movl $1, 440(%rsp)
movl $0, 436(%rsp)
movl 436(%rsp), %edx
subl 440(%rsp), %edx
movl %edx, 432(%rsp)
movl 432(%rsp), %edx
movl %edx, 447(%rsp)
movl $1, 428(%rsp)
movslq 428(%rsp), %rdx
imulq $1, %rdx
movq 471(%rsp), %rax
addq %rdx, %rax
movq %rax, 420(%rsp)
movq 420(%rsp), %rdx
movq %rdx, 471(%rsp)
#__clear_scope_15
addq $1000, %rsp
#__end_scope_15
#__begin_scope_13
jmp mark_26
mark_25 :
mark_26 :
movl $0, 416(%rsp)
movl $0, 412(%rsp)
movl 416(%rsp), %edx
movl %edx, 412(%rsp)
#__end_scope_13
#__begin_scope_16
#__init_scope_16
subq $1000, %rsp
mark_28 :
movq 471(%rsp), %rax
movq 455(%rsp), %rbx
movb $1, 411(%rsp)
cmpq %rax, %rbx
jne mark_30
movb $0, 411(%rsp)
mark_30 :
#WHILE
xor %edx, %edx
movb 411(%rsp), %dh
cmpb $0, %dh
je mark_29
movl $10, 407(%rsp)
movl $1, 403(%rsp)
movslq 471(%rsp), %rdx
movq 455(%rsp), %rax
subq %rdx, %rax
movl %eax, 399(%rsp)
movl 399(%rsp), %edx
subl 403(%rsp), %edx
movl %edx, 395(%rsp)
movl $0, 391(%rsp)
movl 407(%rsp), %edx
movl %edx, 391(%rsp)
movl $0, 387(%rsp)
movl 395(%rsp), %edx
movl %edx, 387(%rsp)
#__parameter_offset_pass
leaq 387(%rsp), %rcx
callq power
movl %eax, 383(%rsp)
movq 471(%rsp), %rax
movb (%rax), %dh
movb %dh, 382(%rsp)
movb $0, %ah
movb %ah, 381(%rsp)
movb 382(%rsp), %dh
movb %dh, 381(%rsp)
#__parameter_offset_pass
leaq 381(%rsp), %rcx
callq get_digit
movl %eax, 377(%rsp)
movl 383(%rsp), %eax
imull 377(%rsp)
movl %eax, 373(%rsp)
movl 412(%rsp), %edx
addl 373(%rsp), %edx
movl %edx, 369(%rsp)
movl 369(%rsp), %edx
movl %edx, 412(%rsp)
movl $1, 365(%rsp)
movslq 365(%rsp), %rdx
imulq $1, %rdx
movq 471(%rsp), %rax
addq %rdx, %rax
movq %rax, 357(%rsp)
movq 357(%rsp), %rdx
movq %rdx, 471(%rsp)
jmp mark_28
mark_29 :
#__clear_scope_16
addq $1000, %rsp
#__end_scope_16
#__begin_scope_13
movl 412(%rsp), %eax
imull 447(%rsp)
movl %eax, 353(%rsp)
movl 353(%rsp), %eax
#__clear_scope_13
addq $1000, %rsp
retq
#__clear_scope_13
addq $1000, %rsp
#__end_scope_13
retq
.seh_endproc
.def	main;
.endef
.globl	main
main:
.seh_proc main
#__begin_scope_17
#__init_scope_17
subq $1000, %rsp
movl %ecx, 349(%rsp)
movq %rdx, 341(%rsp)
movb $0, 340(%rsp)
movb $56, 339(%rsp)
movb $56, 338(%rsp)
movb $52, 337(%rsp)
movb $49, 336(%rsp)
movb $45, 335(%rsp)
leaq 335(%rsp), %rdx
movq %rdx, 327(%rsp)
movq $0, 319(%rsp)
movq 327(%rsp), %rdx
movq %rdx, 319(%rsp)
movq $0, 311(%rsp)
movq 319(%rsp), %rdx
movq %rdx, 311(%rsp)
#__parameter_offset_pass
leaq 311(%rsp), %rcx
callq parse_int_from_str
movl %eax, 307(%rsp)
movl $0, 303(%rsp)
movl 307(%rsp), %edx
movl %edx, 303(%rsp)
movl $0, 299(%rsp)
movl $0, 295(%rsp)
movl 299(%rsp), %edx
movl %edx, 295(%rsp)
movl $0, 291(%rsp)
movl 299(%rsp), %eax
movl 291(%rsp), %ebx
movb $1, 290(%rsp)
cmpl %eax, %ebx
je mark_33
movb $0, 290(%rsp)
mark_33 :
#IF
xor %edx, %edx
movb 290(%rsp), %dh
cmpb $0, %dh
je mark_31
#__end_scope_17
#__begin_scope_18
#__init_scope_18
subq $1000, %rsp
movb $0, 289(%rsp)
movb $48, 288(%rsp)
movb $32, 287(%rsp)
movb $111, 286(%rsp)
movb $116, 285(%rsp)
movb $32, 284(%rsp)
movb $108, 283(%rsp)
movb $97, 282(%rsp)
movb $117, 281(%rsp)
movb $113, 280(%rsp)
movb $101, 279(%rsp)
movb $32, 278(%rsp)
movb $115, 277(%rsp)
movb $105, 276(%rsp)
movb $32, 275(%rsp)
movb $120, 274(%rsp)
leaq 274(%rsp), %rdx
movq %rdx, 266(%rsp)
movq $0, 258(%rsp)
movq 266(%rsp), %rdx
movq %rdx, 258(%rsp)
#__parameter_offset_pass
leaq 258(%rsp), %rcx
callq print_str
movb %al, 257(%rsp)
#__clear_scope_18
addq $1000, %rsp
#__end_scope_18
#__begin_scope_17
jmp mark_32
mark_31 :
#__end_scope_17
#__begin_scope_19
#__init_scope_19
subq $1000, %rsp
movb $0, 256(%rsp)
movb $48, 255(%rsp)
movb $32, 254(%rsp)
movb $111, 253(%rsp)
movb $116, 252(%rsp)
movb $32, 251(%rsp)
movb $108, 250(%rsp)
movb $97, 249(%rsp)
movb $117, 248(%rsp)
movb $113, 247(%rsp)
movb $101, 246(%rsp)
movb $32, 245(%rsp)
movb $116, 244(%rsp)
movb $111, 243(%rsp)
movb $110, 242(%rsp)
movb $32, 241(%rsp)
movb $115, 240(%rsp)
movb $105, 239(%rsp)
movb $32, 238(%rsp)
movb $120, 237(%rsp)
leaq 237(%rsp), %rdx
movq %rdx, 229(%rsp)
movq $0, 221(%rsp)
movq 229(%rsp), %rdx
movq %rdx, 221(%rsp)
#__parameter_offset_pass
leaq 221(%rsp), %rcx
callq print_str
movb %al, 220(%rsp)
#__clear_scope_19
addq $1000, %rsp
#__end_scope_19
#__begin_scope_17
jmp mark_32
mark_34 :
mark_32 :
movl $0, 216(%rsp)
movl 303(%rsp), %edx
movl %edx, 216(%rsp)
#__parameter_offset_pass
leaq 216(%rsp), %rcx
callq print_int
movb %al, 215(%rsp)
#__clear_scope_17
addq $1000, %rsp
#__end_scope_17
xor %rax, %rax
retq
.seh_endproc

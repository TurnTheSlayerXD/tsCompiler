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
.def	num_to_str;
.endef
.globl	num_to_str
num_to_str:
.seh_proc num_to_str
#__begin_scope_3
#__init_scope_3
subq $1000, %rsp
movl 0(%rcx), %edx
movl %edx, 907(%rsp)
movq 4(%rcx), %rdx
movq %rdx, 899(%rsp)
movl $0, 895(%rsp)
movl 907(%rsp), %eax
movl 895(%rsp), %ebx
movb $1, 894(%rsp)
cmpl %eax, %ebx
je mark_5
movb $0, 894(%rsp)
mark_5 :
#IF
xor %edx, %edx
movb 894(%rsp), %dh
cmpb $0, %dh
je mark_3
#__end_scope_3
#__begin_scope_4
#__init_scope_4
subq $1000, %rsp
movl $0, 890(%rsp)
movslq 890(%rsp), %rdx
imulq $1, %rdx
movq 899(%rsp), %rax
addq %rdx, %rax
movq %rax, 882(%rsp)
movb $48, %ah
movb %ah, 881(%rsp)
movq 882(%rsp), %rax
movb 881(%rsp), %dh
movb %dh, (%rax)
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
movl $0, 877(%rsp)
#__end_scope_5
#__begin_scope_6
#__init_scope_6
subq $1000, %rsp
mark_7 :
movl $0, 873(%rsp)
movl 907(%rsp), %eax
movl 873(%rsp), %ebx
movb $1, 872(%rsp)
cmpl %eax, %ebx
jl mark_9
movb $0, 872(%rsp)
mark_9 :
#WHILE
xor %edx, %edx
movb 872(%rsp), %dh
cmpb $0, %dh
je mark_8
movl $10, 868(%rsp)
movl 907(%rsp), %eax
cdq
idivl 868(%rsp)
movl %edx, 864(%rsp)
movl $10, 860(%rsp)
movl 907(%rsp), %eax
cdq
idivl 860(%rsp)
movl %eax, 856(%rsp)
movl 856(%rsp), %edx
movl %edx, 907(%rsp)
movslq 877(%rsp), %rdx
imulq $1, %rdx
movq 899(%rsp), %rax
addq %rdx, %rax
movq %rax, 848(%rsp)
movb $48, %ah
movb %ah, 847(%rsp)
movsbl 847(%rsp), %edx
movl %edx, 843(%rsp)
movl 843(%rsp), %edx
addl 864(%rsp), %edx
movl %edx, 839(%rsp)
movq 848(%rsp), %rax
movb 839(%rsp), %dh
movb %dh, (%rax)
movl $1, 835(%rsp)
movl 877(%rsp), %edx
addl 835(%rsp), %edx
movl %edx, 831(%rsp)
movl 831(%rsp), %edx
movl %edx, 877(%rsp)
jmp mark_7
mark_8 :
#__clear_scope_6
addq $1000, %rsp
#__end_scope_6
#__begin_scope_5
movq $0, 823(%rsp)
movq 899(%rsp), %rdx
movq %rdx, 823(%rsp)
#__parameter_offset_pass
leaq 823(%rsp), %rcx
callq strlen
movl %eax, 819(%rsp)
#__end_scope_5
#__begin_scope_7
#__init_scope_7
subq $1000, %rsp
movl $0, 815(%rsp)
mark_10 :
movl $2, 811(%rsp)
movl 819(%rsp), %eax
cdq
idivl 811(%rsp)
movl %eax, 807(%rsp)
movl 815(%rsp), %eax
movl 807(%rsp), %ebx
movb $1, 806(%rsp)
cmpl %eax, %ebx
jg mark_12
movb $0, 806(%rsp)
mark_12 :
#FOR
xor %edx, %edx
movb 806(%rsp), %dh
cmpb $0, %dh
je mark_11
movslq 815(%rsp), %rdx
imulq $1, %rdx
movq 899(%rsp), %rax
addq %rdx, %rax
movq %rax, 798(%rsp)
movq 798(%rsp), %rax
movb (%rax), %dh
movb %dh, 797(%rsp)
movslq 815(%rsp), %rdx
imulq $1, %rdx
movq 899(%rsp), %rax
addq %rdx, %rax
movq %rax, 789(%rsp)
movl $1, 785(%rsp)
movl 819(%rsp), %edx
subl 785(%rsp), %edx
movl %edx, 781(%rsp)
movl 781(%rsp), %edx
subl 815(%rsp), %edx
movl %edx, 777(%rsp)
movslq 777(%rsp), %rdx
imulq $1, %rdx
movq 899(%rsp), %rax
addq %rdx, %rax
movq %rax, 769(%rsp)
movq 769(%rsp), %rax
movb (%rax), %dh
movb %dh, 768(%rsp)
movq 789(%rsp), %rax
movb 768(%rsp), %dh
movb %dh, (%rax)
movl $1, 764(%rsp)
movl 819(%rsp), %edx
subl 764(%rsp), %edx
movl %edx, 760(%rsp)
movl 760(%rsp), %edx
subl 815(%rsp), %edx
movl %edx, 756(%rsp)
movslq 756(%rsp), %rdx
imulq $1, %rdx
movq 899(%rsp), %rax
addq %rdx, %rax
movq %rax, 748(%rsp)
movq 748(%rsp), %rax
movb 797(%rsp), %dh
movb %dh, (%rax)
movl $1, 744(%rsp)
movl 815(%rsp), %edx
addl 744(%rsp), %edx
movl %edx, 740(%rsp)
movl 740(%rsp), %edx
movl %edx, 815(%rsp)
jmp mark_10
mark_11 :
#__clear_scope_7
addq $1000, %rsp
#__end_scope_7
#__begin_scope_5
#__clear_scope_5
addq $1000, %rsp
#__end_scope_5
#__begin_scope_3
jmp mark_4
mark_6 :
mark_4 :
movq $0, 732(%rsp)
movq 899(%rsp), %rdx
movq %rdx, 732(%rsp)
#__parameter_offset_pass
leaq 732(%rsp), %rcx
callq strlen
movl %eax, 728(%rsp)
movslq 728(%rsp), %rdx
imulq $1, %rdx
movq 899(%rsp), %rax
addq %rdx, %rax
movq %rax, 720(%rsp)
movq 720(%rsp), %rax
#__clear_scope_3
addq $1000, %rsp
retq
#__clear_scope_3
addq $1000, %rsp
#__end_scope_3
retq
.seh_endproc
.def	starts_with;
.endef
.globl	starts_with
starts_with:
.seh_proc starts_with
#__begin_scope_8
#__init_scope_8
subq $1000, %rsp
movq 0(%rcx), %rdx
movq %rdx, 712(%rsp)
movq 8(%rcx), %rdx
movq %rdx, 704(%rsp)
#__end_scope_8
#__begin_scope_9
#__init_scope_9
subq $1000, %rsp
mark_13 :
movq 712(%rsp), %rax
movb (%rax), %dh
movb %dh, 703(%rsp)
movb $0, %ah
movb %ah, 702(%rsp)
movb 703(%rsp), %ah
movb 702(%rsp), %al
movb $1, 701(%rsp)
cmpb %ah, %al
jne mark_15
movb $0, 701(%rsp)
mark_15 :
movq 704(%rsp), %rax
movb (%rax), %dh
movb %dh, 700(%rsp)
movq 712(%rsp), %rax
movb (%rax), %dh
movb %dh, 699(%rsp)
movb 700(%rsp), %ah
movb 699(%rsp), %al
movb $1, 698(%rsp)
cmpb %ah, %al
je mark_16
movb $0, 698(%rsp)
mark_16 :
movb $1, 697(%rsp)
cmpb $0, 701(%rsp)
jne mark_17
movb $0, 697(%rsp)
mark_17 :
movb $1, 696(%rsp)
cmpb $0, 698(%rsp)
jne mark_18
movb $0, 696(%rsp)
mark_18 :
movb 697(%rsp), %dh
movb 696(%rsp), %al
andb %dh, %al
movb $1, 695(%rsp)
cmpb $0, %al
jne mark_19
movb $0, 695(%rsp)
mark_19 :
#WHILE
xor %edx, %edx
movb 695(%rsp), %dh
cmpb $0, %dh
je mark_14
movl $1, 691(%rsp)
movslq 691(%rsp), %rdx
imulq $1, %rdx
movq 704(%rsp), %rax
addq %rdx, %rax
movq %rax, 683(%rsp)
movq 683(%rsp), %rdx
movq %rdx, 704(%rsp)
movl $1, 679(%rsp)
movslq 679(%rsp), %rdx
imulq $1, %rdx
movq 712(%rsp), %rax
addq %rdx, %rax
movq %rax, 671(%rsp)
movq 671(%rsp), %rdx
movq %rdx, 712(%rsp)
jmp mark_13
mark_14 :
#__clear_scope_9
addq $1000, %rsp
#__end_scope_9
#__begin_scope_8
movq 712(%rsp), %rax
movb (%rax), %dh
movb %dh, 670(%rsp)
movb $0, %ah
movb %ah, 669(%rsp)
movb 670(%rsp), %ah
movb 669(%rsp), %al
movb $1, 668(%rsp)
cmpb %ah, %al
jne mark_22
movb $0, 668(%rsp)
mark_22 :
#IF
xor %edx, %edx
movb 668(%rsp), %dh
cmpb $0, %dh
je mark_20
#__end_scope_8
#__begin_scope_10
#__init_scope_10
subq $1000, %rsp
movl $0, 664(%rsp)
movl 664(%rsp), %eax
#__clear_scope_10
addq $1000, %rsp
#__clear_scope_8
addq $1000, %rsp
retq
#__clear_scope_10
addq $1000, %rsp
#__end_scope_10
#__begin_scope_8
jmp mark_21
mark_20 :
mark_21 :
movl $1, 660(%rsp)
movl 660(%rsp), %eax
#__clear_scope_8
addq $1000, %rsp
retq
#__clear_scope_8
addq $1000, %rsp
#__end_scope_8
retq
.seh_endproc
.def	write_to;
.endef
.globl	write_to
write_to:
.seh_proc write_to
#__begin_scope_11
#__init_scope_11
subq $1000, %rsp
movq 0(%rcx), %rdx
movq %rdx, 652(%rsp)
movq 8(%rcx), %rdx
movq %rdx, 644(%rsp)
#__end_scope_11
#__begin_scope_12
#__init_scope_12
subq $1000, %rsp
mark_23 :
movq 652(%rsp), %rax
movb (%rax), %dh
movb %dh, 643(%rsp)
movb $0, %ah
movb %ah, 642(%rsp)
movb 643(%rsp), %ah
movb 642(%rsp), %al
movb $1, 641(%rsp)
cmpb %ah, %al
jne mark_25
movb $0, 641(%rsp)
mark_25 :
#WHILE
xor %edx, %edx
movb 641(%rsp), %dh
cmpb $0, %dh
je mark_24
movq 652(%rsp), %rax
movb (%rax), %dh
movb %dh, 640(%rsp)
movq 644(%rsp), %rax
movb 640(%rsp), %dh
movb %dh, (%rax)
movl $1, 636(%rsp)
movslq 636(%rsp), %rdx
imulq $1, %rdx
movq 644(%rsp), %rax
addq %rdx, %rax
movq %rax, 628(%rsp)
movq 628(%rsp), %rdx
movq %rdx, 644(%rsp)
movl $1, 624(%rsp)
movslq 624(%rsp), %rdx
imulq $1, %rdx
movq 652(%rsp), %rax
addq %rdx, %rax
movq %rax, 616(%rsp)
movq 616(%rsp), %rdx
movq %rdx, 652(%rsp)
jmp mark_23
mark_24 :
#__clear_scope_12
addq $1000, %rsp
#__end_scope_12
#__begin_scope_11
movq 644(%rsp), %rax
#__clear_scope_11
addq $1000, %rsp
retq
#__clear_scope_11
addq $1000, %rsp
#__end_scope_11
retq
.seh_endproc
.def	printf;
.endef
.globl	printf
printf:
.seh_proc printf
#__begin_scope_13
#__init_scope_13
subq $1000, %rsp
movq 0(%rcx), %rdx
movq %rdx, 608(%rsp)
movq 8(%rcx), %rdx
movq %rdx, 600(%rsp)
movb $0, %ah
movb %ah, 599(%rsp)
movb $0, %ah
movb %ah, 598(%rsp)
movb $0, %ah
movb %ah, 597(%rsp)
movb $0, %ah
movb %ah, 596(%rsp)
movb $0, %ah
movb %ah, 595(%rsp)
movb $0, %ah
movb %ah, 594(%rsp)
movb $0, %ah
movb %ah, 593(%rsp)
movb $0, %ah
movb %ah, 592(%rsp)
movb $0, %ah
movb %ah, 591(%rsp)
movb $0, %ah
movb %ah, 590(%rsp)
movb $0, %ah
movb %ah, 589(%rsp)
movb $0, %ah
movb %ah, 588(%rsp)
movb $0, %ah
movb %ah, 587(%rsp)
movb $0, %ah
movb %ah, 586(%rsp)
movb $0, %ah
movb %ah, 585(%rsp)
movb $0, %ah
movb %ah, 584(%rsp)
movb $0, %ah
movb %ah, 583(%rsp)
movb $0, %ah
movb %ah, 582(%rsp)
movb $0, %ah
movb %ah, 581(%rsp)
movb $0, %ah
movb %ah, 580(%rsp)
movb $0, %ah
movb %ah, 579(%rsp)
movb $0, %ah
movb %ah, 578(%rsp)
movb $0, %ah
movb %ah, 577(%rsp)
movb $0, %ah
movb %ah, 576(%rsp)
movb $0, %ah
movb %ah, 575(%rsp)
movb $0, %ah
movb %ah, 574(%rsp)
movb $0, %ah
movb %ah, 573(%rsp)
movb $0, %ah
movb %ah, 572(%rsp)
movb $0, %ah
movb %ah, 571(%rsp)
movb $0, %ah
movb %ah, 570(%rsp)
movb $0, %ah
movb %ah, 569(%rsp)
movb $0, %ah
movb %ah, 568(%rsp)
movb $0, %ah
movb %ah, 567(%rsp)
movb $0, %ah
movb %ah, 566(%rsp)
movb $0, %ah
movb %ah, 565(%rsp)
movb $0, %ah
movb %ah, 564(%rsp)
movb $0, %ah
movb %ah, 563(%rsp)
movb $0, %ah
movb %ah, 562(%rsp)
movb $0, %ah
movb %ah, 561(%rsp)
movb $0, %ah
movb %ah, 560(%rsp)
movb $0, %ah
movb %ah, 559(%rsp)
movb $0, %ah
movb %ah, 558(%rsp)
movb $0, %ah
movb %ah, 557(%rsp)
movb $0, %ah
movb %ah, 556(%rsp)
movb $0, %ah
movb %ah, 555(%rsp)
movb $0, %ah
movb %ah, 554(%rsp)
movb $0, %ah
movb %ah, 553(%rsp)
movb $0, %ah
movb %ah, 552(%rsp)
movb $0, %ah
movb %ah, 551(%rsp)
movb $0, %ah
movb %ah, 550(%rsp)
movb $0, %ah
movb %ah, 549(%rsp)
movb $0, %ah
movb %ah, 548(%rsp)
movb $0, %ah
movb %ah, 547(%rsp)
movb $0, %ah
movb %ah, 546(%rsp)
movb $0, %ah
movb %ah, 545(%rsp)
movb $0, %ah
movb %ah, 544(%rsp)
movb $0, %ah
movb %ah, 543(%rsp)
movb $0, %ah
movb %ah, 542(%rsp)
movb $0, %ah
movb %ah, 541(%rsp)
movb $0, %ah
movb %ah, 540(%rsp)
movb $0, %ah
movb %ah, 539(%rsp)
movb $0, %ah
movb %ah, 538(%rsp)
movb $0, %ah
movb %ah, 537(%rsp)
movb $0, %ah
movb %ah, 536(%rsp)
movb $0, %ah
movb %ah, 535(%rsp)
movb $0, %ah
movb %ah, 534(%rsp)
movb $0, %ah
movb %ah, 533(%rsp)
movb $0, %ah
movb %ah, 532(%rsp)
movb $0, %ah
movb %ah, 531(%rsp)
movb $0, %ah
movb %ah, 530(%rsp)
movb $0, %ah
movb %ah, 529(%rsp)
movb $0, %ah
movb %ah, 528(%rsp)
movb $0, %ah
movb %ah, 527(%rsp)
movb $0, %ah
movb %ah, 526(%rsp)
movb $0, %ah
movb %ah, 525(%rsp)
movb $0, %ah
movb %ah, 524(%rsp)
movb $0, %ah
movb %ah, 523(%rsp)
movb $0, %ah
movb %ah, 522(%rsp)
movb $0, %ah
movb %ah, 521(%rsp)
movb $0, %ah
movb %ah, 520(%rsp)
movb $0, %ah
movb %ah, 519(%rsp)
movb $0, %ah
movb %ah, 518(%rsp)
movb $0, %ah
movb %ah, 517(%rsp)
movb $0, %ah
movb %ah, 516(%rsp)
movb $0, %ah
movb %ah, 515(%rsp)
movb $0, %ah
movb %ah, 514(%rsp)
movb $0, %ah
movb %ah, 513(%rsp)
movb $0, %ah
movb %ah, 512(%rsp)
movb $0, %ah
movb %ah, 511(%rsp)
movb $0, %ah
movb %ah, 510(%rsp)
movb $0, %ah
movb %ah, 509(%rsp)
movb $0, %ah
movb %ah, 508(%rsp)
movb $0, %ah
movb %ah, 507(%rsp)
movb $0, %ah
movb %ah, 506(%rsp)
movb $0, %ah
movb %ah, 505(%rsp)
movb $0, %ah
movb %ah, 504(%rsp)
movb $0, %ah
movb %ah, 503(%rsp)
movb $0, %ah
movb %ah, 502(%rsp)
movb $0, %ah
movb %ah, 501(%rsp)
movb $0, %ah
movb %ah, 500(%rsp)
leaq 500(%rsp), %rdx
movq %rdx, 400(%rsp)
movq $0, 392(%rsp)
movq 400(%rsp), %rdx
movq %rdx, 392(%rsp)
movl $0, 388(%rsp)
movl $0, 384(%rsp)
#__end_scope_13
#__begin_scope_14
#__init_scope_14
subq $1000, %rsp
mark_26 :
movq 600(%rsp), %rax
movb (%rax), %dh
movb %dh, 383(%rsp)
movb $0, %ah
movb %ah, 382(%rsp)
movb 383(%rsp), %ah
movb 382(%rsp), %al
movb $1, 381(%rsp)
cmpb %ah, %al
jne mark_28
movb $0, 381(%rsp)
mark_28 :
#WHILE
xor %edx, %edx
movb 381(%rsp), %dh
cmpb $0, %dh
je mark_27
movl $1, 377(%rsp)
movslq 377(%rsp), %rdx
imulq $1, %rdx
movq 600(%rsp), %rax
addq %rdx, %rax
movq %rax, 369(%rsp)
movq 369(%rsp), %rax
movb (%rax), %dh
movb %dh, 368(%rsp)
movb $0, %ah
movb %ah, 367(%rsp)
movb 368(%rsp), %ah
movb 367(%rsp), %al
movb $1, 366(%rsp)
cmpb %ah, %al
jne mark_31
movb $0, 366(%rsp)
mark_31 :
#IF
xor %edx, %edx
movb 366(%rsp), %dh
cmpb $0, %dh
je mark_29
#__end_scope_14
#__begin_scope_15
#__init_scope_15
subq $1000, %rsp
movb $0, 365(%rsp)
movb $115, 364(%rsp)
movb $37, 363(%rsp)
leaq 363(%rsp), %rdx
movq %rdx, 355(%rsp)
movq $0, 347(%rsp)
movq 600(%rsp), %rdx
movq %rdx, 347(%rsp)
movq $0, 339(%rsp)
movq 355(%rsp), %rdx
movq %rdx, 339(%rsp)
#__parameter_offset_pass
leaq 339(%rsp), %rcx
callq starts_with
movl %eax, 335(%rsp)
movl $1, 331(%rsp)
movl 335(%rsp), %eax
movl 331(%rsp), %ebx
movb $1, 330(%rsp)
cmpl %eax, %ebx
je mark_34
movb $0, 330(%rsp)
mark_34 :
#IF
xor %edx, %edx
movb 330(%rsp), %dh
cmpb $0, %dh
je mark_32
#__end_scope_15
#__begin_scope_16
#__init_scope_16
subq $1000, %rsp
movslq 384(%rsp), %rdx
imulq $8, %rdx
movq 608(%rsp), %rax
addq %rdx, %rax
movq %rax, 322(%rsp)
movq 322(%rsp), %rax
movq (%rax), %rdx
movq %rdx, 314(%rsp)
movq $0, 306(%rsp)
movq 392(%rsp), %rdx
movq %rdx, 306(%rsp)
movq $0, 298(%rsp)
movq 314(%rsp), %rdx
movq %rdx, 298(%rsp)
#__parameter_offset_pass
leaq 298(%rsp), %rcx
callq write_to
movq %rax, 290(%rsp)
movq 290(%rsp), %rdx
movq %rdx, 392(%rsp)
movl $1, 286(%rsp)
movl 384(%rsp), %edx
addl 286(%rsp), %edx
movl %edx, 282(%rsp)
movl 282(%rsp), %edx
movl %edx, 384(%rsp)
movl $2, 278(%rsp)
movslq 278(%rsp), %rdx
imulq $1, %rdx
movq 600(%rsp), %rax
addq %rdx, %rax
movq %rax, 270(%rsp)
movq 270(%rsp), %rdx
movq %rdx, 600(%rsp)
#__clear_scope_16
addq $1000, %rsp
#__end_scope_16
#__clear_scope_15
addq $1000, %rsp
#__end_scope_15
jmp mark_26
#__clear_scope_16
addq $1000, %rsp
#__end_scope_16
#__begin_scope_15
jmp mark_33
mark_32 :
movb $0, 269(%rsp)
movb $100, 268(%rsp)
movb $37, 267(%rsp)
leaq 267(%rsp), %rdx
movq %rdx, 259(%rsp)
movq $0, 251(%rsp)
movq 600(%rsp), %rdx
movq %rdx, 251(%rsp)
movq $0, 243(%rsp)
movq 259(%rsp), %rdx
movq %rdx, 243(%rsp)
#__parameter_offset_pass
leaq 243(%rsp), %rcx
callq starts_with
movl %eax, 239(%rsp)
movl $1, 235(%rsp)
movl 239(%rsp), %eax
movl 235(%rsp), %ebx
movb $1, 234(%rsp)
cmpl %eax, %ebx
je mark_36
movb $0, 234(%rsp)
mark_36 :
#IF
xor %edx, %edx
movb 234(%rsp), %dh
cmpb $0, %dh
je mark_35
#__end_scope_15
#__begin_scope_17
#__init_scope_17
subq $1000, %rsp
movslq 384(%rsp), %rdx
imulq $8, %rdx
movq 608(%rsp), %rax
addq %rdx, %rax
movq %rax, 226(%rsp)
movq 226(%rsp), %rax
movq (%rax), %rdx
movq %rdx, 218(%rsp)
movq 218(%rsp), %rax
movl (%rax), %edx
movl %edx, 214(%rsp)
movq $0, 206(%rsp)
movq 392(%rsp), %rdx
movq %rdx, 206(%rsp)
movl $0, 202(%rsp)
movl 214(%rsp), %edx
movl %edx, 202(%rsp)
#__parameter_offset_pass
leaq 202(%rsp), %rcx
callq num_to_str
movq %rax, 194(%rsp)
movq 194(%rsp), %rdx
movq %rdx, 392(%rsp)
movl $1, 190(%rsp)
movl 384(%rsp), %edx
addl 190(%rsp), %edx
movl %edx, 186(%rsp)
movl 186(%rsp), %edx
movl %edx, 384(%rsp)
movl $2, 182(%rsp)
movslq 182(%rsp), %rdx
imulq $1, %rdx
movq 600(%rsp), %rax
addq %rdx, %rax
movq %rax, 174(%rsp)
movq 174(%rsp), %rdx
movq %rdx, 600(%rsp)
#__clear_scope_17
addq $1000, %rsp
#__end_scope_17
#__clear_scope_15
addq $1000, %rsp
#__end_scope_15
jmp mark_26
#__clear_scope_17
addq $1000, %rsp
#__end_scope_17
#__begin_scope_15
jmp mark_33
mark_35 :
mark_33 :
#__clear_scope_15
addq $1000, %rsp
#__end_scope_15
#__begin_scope_14
jmp mark_30
mark_29 :
mark_30 :
movq 600(%rsp), %rax
movb (%rax), %dh
movb %dh, 173(%rsp)
movq 392(%rsp), %rax
movb 173(%rsp), %dh
movb %dh, (%rax)
movl $1, 169(%rsp)
movslq 169(%rsp), %rdx
imulq $1, %rdx
movq 392(%rsp), %rax
addq %rdx, %rax
movq %rax, 161(%rsp)
movq 161(%rsp), %rdx
movq %rdx, 392(%rsp)
movl $1, 157(%rsp)
movslq 157(%rsp), %rdx
imulq $1, %rdx
movq 600(%rsp), %rax
addq %rdx, %rax
movq %rax, 149(%rsp)
movq 149(%rsp), %rdx
movq %rdx, 600(%rsp)
jmp mark_26
mark_27 :
#__clear_scope_14
addq $1000, %rsp
#__end_scope_14
#__begin_scope_13
movq $0, 141(%rsp)
movq 400(%rsp), %rdx
movq %rdx, 141(%rsp)
#__parameter_offset_pass
leaq 141(%rsp), %rcx
callq print_str
movb %al, 140(%rsp)
#__clear_scope_13
addq $1000, %rsp
#__end_scope_13
retq
.seh_endproc
.def	factorial;
.endef
.globl	factorial
factorial:
.seh_proc factorial
#__begin_scope_18
#__init_scope_18
subq $1000, %rsp
movl 0(%rcx), %edx
movl %edx, 136(%rsp)
movl $0, 132(%rsp)
movl 136(%rsp), %eax
movl 132(%rsp), %ebx
movb $1, 131(%rsp)
cmpl %eax, %ebx
je mark_39
movb $0, 131(%rsp)
mark_39 :
#IF
xor %edx, %edx
movb 131(%rsp), %dh
cmpb $0, %dh
je mark_37
#__end_scope_18
#__begin_scope_19
#__init_scope_19
subq $1000, %rsp
movl $1, 127(%rsp)
movl 127(%rsp), %eax
#__clear_scope_19
addq $1000, %rsp
#__clear_scope_18
addq $1000, %rsp
retq
#__clear_scope_19
addq $1000, %rsp
#__end_scope_19
#__begin_scope_18
jmp mark_38
mark_37 :
mark_38 :
movl $1, 123(%rsp)
movl 136(%rsp), %edx
subl 123(%rsp), %edx
movl %edx, 119(%rsp)
movl $0, 115(%rsp)
movl 119(%rsp), %edx
movl %edx, 115(%rsp)
#__parameter_offset_pass
leaq 115(%rsp), %rcx
callq factorial
movl %eax, 111(%rsp)
movl 111(%rsp), %eax
imull 136(%rsp)
movl %eax, 107(%rsp)
movl 107(%rsp), %eax
#__clear_scope_18
addq $1000, %rsp
retq
#__clear_scope_18
addq $1000, %rsp
#__end_scope_18
retq
.seh_endproc
.def	main;
.endef
.globl	main
main:
.seh_proc main
#__begin_scope_20
#__init_scope_20
subq $1000, %rsp
movl %ecx, 103(%rsp)
movq %rdx, 95(%rsp)
movq $0, 94(%rsp)
movq $0, 93(%rsp)
movq $0, 92(%rsp)
movq $0, 91(%rsp)
movq $0, 90(%rsp)
movq $0, 89(%rsp)
movq $0, 88(%rsp)
movq $0, 87(%rsp)
movq $0, 86(%rsp)
movq $0, 85(%rsp)
movq $0, 84(%rsp)
movq $0, 83(%rsp)
movq $0, 82(%rsp)
movq $0, 81(%rsp)
movq $0, 80(%rsp)
movq $0, 79(%rsp)
movq $0, 78(%rsp)
movq $0, 77(%rsp)
movq $0, 76(%rsp)
movq $0, 75(%rsp)
movq $0, 74(%rsp)
movq $0, 73(%rsp)
movq $0, 72(%rsp)
movq $0, 71(%rsp)
movq $0, 70(%rsp)
movq $0, 69(%rsp)
movq $0, 68(%rsp)
movq $0, 67(%rsp)
movq $0, 66(%rsp)
movq $0, 65(%rsp)
movq $0, 64(%rsp)
movq $0, 63(%rsp)
movq $0, 62(%rsp)
movq $0, 61(%rsp)
movq $0, 60(%rsp)
movq $0, 59(%rsp)
movq $0, 58(%rsp)
movq $0, 57(%rsp)
movq $0, 56(%rsp)
movq $0, 55(%rsp)
movq $0, 54(%rsp)
movq $0, 53(%rsp)
movq $0, 52(%rsp)
movq $0, 51(%rsp)
movq $0, 50(%rsp)
movq $0, 49(%rsp)
movq $0, 48(%rsp)
movq $0, 47(%rsp)
movq $0, 46(%rsp)
movq $0, 45(%rsp)
movq $0, 44(%rsp)
movq $0, 43(%rsp)
movq $0, 42(%rsp)
movq $0, 41(%rsp)
movq $0, 40(%rsp)
movq $0, 39(%rsp)
movq $0, 38(%rsp)
movq $0, 37(%rsp)
movq $0, 36(%rsp)
movq $0, 35(%rsp)
#offset of struct field: val
movl $1488, 31(%rsp)
movl 31(%rsp), %edx
movl %edx, 91(%rsp)
#offset of struct field: left
leaq 55(%rsp), %rdx
movq %rdx, 23(%rsp)
movq 23(%rsp), %rdx
movq %rdx, 75(%rsp)
#offset of struct field: right
leaq 35(%rsp), %rdx
movq %rdx, 15(%rsp)
movq 15(%rsp), %rdx
movq %rdx, 83(%rsp)
#offset of struct field: left
movq 75(%rsp), %rdx
movq %rdx, 7(%rsp)
addq $16, 7(%rsp)
#offset of struct PTR field: val
movl $1489, 3(%rsp)
movq 7(%rsp), %rax
movl 3(%rsp), %edx
movl %edx, (%rax)
#offset of struct field: right
movq 83(%rsp), %rdx
movq %rdx, -5(%rsp)
addq $16, -5(%rsp)
#offset of struct PTR field: val
movl $1450, -9(%rsp)
movq -5(%rsp), %rax
movl -9(%rsp), %edx
movl %edx, (%rax)
#offset of struct field: val
#offset of struct field: left
movq 75(%rsp), %rdx
movq %rdx, -17(%rsp)
addq $16, -17(%rsp)
#offset of struct PTR field: val
movq -17(%rsp), %rax
movl (%rax), %edx
movl %edx, -22(%rsp)
movl 71(%rsp), %eax
movl -22(%rsp), %ebx
movb $1, -18(%rsp)
cmpl %eax, %ebx
je mark_42
movb $0, -18(%rsp)
mark_42 :
#IF
xor %edx, %edx
movb -18(%rsp), %dh
cmpb $0, %dh
je mark_40
#__end_scope_20
#__begin_scope_21
#__init_scope_21
subq $1000, %rsp
movb $0, -23(%rsp)
movb $101, -24(%rsp)
movb $99, -25(%rsp)
movb $105, -26(%rsp)
movb $78, -27(%rsp)
leaq -27(%rsp), %rdx
movq %rdx, -35(%rsp)
movl $0, -39(%rsp)
leaq -39(%rsp), %rdx
movq %rdx, -47(%rsp)
movq -47(%rsp), %rdx
movq %rdx, -55(%rsp)
leaq -55(%rsp), %rdx
movq %rdx, -63(%rsp)
movq $0, -71(%rsp)
movq -35(%rsp), %rdx
movq %rdx, -71(%rsp)
movq $0, -79(%rsp)
movq -63(%rsp), %rdx
movq %rdx, -79(%rsp)
#__parameter_offset_pass
leaq -79(%rsp), %rcx
callq printf
movb %al, -80(%rsp)
#__clear_scope_21
addq $1000, %rsp
#__end_scope_21
#__begin_scope_20
jmp mark_41
mark_40 :
#__end_scope_20
#__begin_scope_22
#__init_scope_22
subq $1000, %rsp
movb $0, -81(%rsp)
movb $107, -82(%rsp)
movb $99, -83(%rsp)
movb $117, -84(%rsp)
movb $102, -85(%rsp)
leaq -85(%rsp), %rdx
movq %rdx, -93(%rsp)
movl $0, -97(%rsp)
leaq -97(%rsp), %rdx
movq %rdx, -105(%rsp)
movq -105(%rsp), %rdx
movq %rdx, -113(%rsp)
leaq -113(%rsp), %rdx
movq %rdx, -121(%rsp)
movq $0, -129(%rsp)
movq -93(%rsp), %rdx
movq %rdx, -129(%rsp)
movq $0, -137(%rsp)
movq -121(%rsp), %rdx
movq %rdx, -137(%rsp)
#__parameter_offset_pass
leaq -137(%rsp), %rcx
callq printf
movb %al, -138(%rsp)
#__clear_scope_22
addq $1000, %rsp
#__end_scope_22
#__begin_scope_20
jmp mark_41
mark_43 :
mark_41 :
movb $0, -139(%rsp)
movb $100, -140(%rsp)
movb $37, -141(%rsp)
movb $32, -142(%rsp)
movb $61, -143(%rsp)
movb $32, -144(%rsp)
movb $108, -145(%rsp)
movb $97, -146(%rsp)
movb $118, -147(%rsp)
movb $46, -148(%rsp)
movb $114, -149(%rsp)
movb $116, -150(%rsp)
movb $112, -151(%rsp)
leaq -151(%rsp), %rdx
movq %rdx, -159(%rsp)
#offset of struct field: right
movq 83(%rsp), %rdx
movq %rdx, -167(%rsp)
addq $16, -167(%rsp)
#offset of struct PTR field: val
movq -167(%rsp), %rax
leaq (%rax), %rdx
movq %rdx, -175(%rsp)
movq -175(%rsp), %rdx
movq %rdx, -183(%rsp)
leaq -183(%rsp), %rdx
movq %rdx, -191(%rsp)
movq $0, -199(%rsp)
movq -159(%rsp), %rdx
movq %rdx, -199(%rsp)
movq $0, -207(%rsp)
movq -191(%rsp), %rdx
movq %rdx, -207(%rsp)
#__parameter_offset_pass
leaq -207(%rsp), %rcx
callq printf
movb %al, -208(%rsp)
#__clear_scope_20
addq $1000, %rsp
#__end_scope_20
xor %rax, %rax
retq
.seh_endproc

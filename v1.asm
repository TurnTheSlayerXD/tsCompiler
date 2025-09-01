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
movq %rdx, 492(%rsp)
movq $0, 484(%rsp)
movq 492(%rsp), %rdx
movq %rdx, 484(%rsp)
movl $0, 480(%rsp)
movl $0, 476(%rsp)
#__end_scope_13
#__begin_scope_14
#__init_scope_14
subq $1000, %rsp
mark_26 :
movq 600(%rsp), %rax
movb (%rax), %dh
movb %dh, 475(%rsp)
movb $0, %ah
movb %ah, 474(%rsp)
movb 475(%rsp), %ah
movb 474(%rsp), %al
movb $1, 473(%rsp)
cmpb %ah, %al
jne mark_28
movb $0, 473(%rsp)
mark_28 :
#WHILE
xor %edx, %edx
movb 473(%rsp), %dh
cmpb $0, %dh
je mark_27
movl $1, 469(%rsp)
movslq 469(%rsp), %rdx
imulq $1, %rdx
movq 600(%rsp), %rax
addq %rdx, %rax
movq %rax, 461(%rsp)
movq 461(%rsp), %rax
movb (%rax), %dh
movb %dh, 460(%rsp)
movb $0, %ah
movb %ah, 459(%rsp)
movb 460(%rsp), %ah
movb 459(%rsp), %al
movb $1, 458(%rsp)
cmpb %ah, %al
jne mark_31
movb $0, 458(%rsp)
mark_31 :
#IF
xor %edx, %edx
movb 458(%rsp), %dh
cmpb $0, %dh
je mark_29
#__end_scope_14
#__begin_scope_15
#__init_scope_15
subq $1000, %rsp
movb $0, 457(%rsp)
movb $115, 456(%rsp)
movb $37, 455(%rsp)
leaq 455(%rsp), %rdx
movq %rdx, 447(%rsp)
movq $0, 439(%rsp)
movq 600(%rsp), %rdx
movq %rdx, 439(%rsp)
movq $0, 431(%rsp)
movq 447(%rsp), %rdx
movq %rdx, 431(%rsp)
#__parameter_offset_pass
leaq 431(%rsp), %rcx
callq starts_with
movl %eax, 427(%rsp)
movl $1, 423(%rsp)
movl 427(%rsp), %eax
movl 423(%rsp), %ebx
movb $1, 422(%rsp)
cmpl %eax, %ebx
je mark_34
movb $0, 422(%rsp)
mark_34 :
#IF
xor %edx, %edx
movb 422(%rsp), %dh
cmpb $0, %dh
je mark_32
#__end_scope_15
#__begin_scope_16
#__init_scope_16
subq $1000, %rsp
movslq 476(%rsp), %rdx
imulq $8, %rdx
movq 608(%rsp), %rax
addq %rdx, %rax
movq %rax, 414(%rsp)
movq 414(%rsp), %rax
movq (%rax), %rdx
movq %rdx, 406(%rsp)
movq $0, 398(%rsp)
movq 484(%rsp), %rdx
movq %rdx, 398(%rsp)
movq $0, 390(%rsp)
movq 406(%rsp), %rdx
movq %rdx, 390(%rsp)
#__parameter_offset_pass
leaq 390(%rsp), %rcx
callq write_to
movq %rax, 382(%rsp)
movq 382(%rsp), %rdx
movq %rdx, 484(%rsp)
movl $1, 378(%rsp)
movl 476(%rsp), %edx
addl 378(%rsp), %edx
movl %edx, 374(%rsp)
movl 374(%rsp), %edx
movl %edx, 476(%rsp)
movl $2, 370(%rsp)
movslq 370(%rsp), %rdx
imulq $1, %rdx
movq 600(%rsp), %rax
addq %rdx, %rax
movq %rax, 362(%rsp)
movq 362(%rsp), %rdx
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
movb $0, 361(%rsp)
movb $100, 360(%rsp)
movb $37, 359(%rsp)
leaq 359(%rsp), %rdx
movq %rdx, 351(%rsp)
movq $0, 343(%rsp)
movq 600(%rsp), %rdx
movq %rdx, 343(%rsp)
movq $0, 335(%rsp)
movq 351(%rsp), %rdx
movq %rdx, 335(%rsp)
#__parameter_offset_pass
leaq 335(%rsp), %rcx
callq starts_with
movl %eax, 331(%rsp)
movl $1, 327(%rsp)
movl 331(%rsp), %eax
movl 327(%rsp), %ebx
movb $1, 326(%rsp)
cmpl %eax, %ebx
je mark_36
movb $0, 326(%rsp)
mark_36 :
#IF
xor %edx, %edx
movb 326(%rsp), %dh
cmpb $0, %dh
je mark_35
#__end_scope_15
#__begin_scope_17
#__init_scope_17
subq $1000, %rsp
movslq 476(%rsp), %rdx
imulq $8, %rdx
movq 608(%rsp), %rax
addq %rdx, %rax
movq %rax, 318(%rsp)
movq 318(%rsp), %rax
movq (%rax), %rdx
movq %rdx, 310(%rsp)
movq 310(%rsp), %rax
movl (%rax), %edx
movl %edx, 306(%rsp)
movq $0, 298(%rsp)
movq 484(%rsp), %rdx
movq %rdx, 298(%rsp)
movl $0, 294(%rsp)
movl 306(%rsp), %edx
movl %edx, 294(%rsp)
#__parameter_offset_pass
leaq 294(%rsp), %rcx
callq num_to_str
movq %rax, 286(%rsp)
movq 286(%rsp), %rdx
movq %rdx, 484(%rsp)
movl $1, 282(%rsp)
movl 476(%rsp), %edx
addl 282(%rsp), %edx
movl %edx, 278(%rsp)
movl 278(%rsp), %edx
movl %edx, 476(%rsp)
movl $2, 274(%rsp)
movslq 274(%rsp), %rdx
imulq $1, %rdx
movq 600(%rsp), %rax
addq %rdx, %rax
movq %rax, 266(%rsp)
movq 266(%rsp), %rdx
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
movb %dh, 265(%rsp)
movq 484(%rsp), %rax
movb 265(%rsp), %dh
movb %dh, (%rax)
movl $1, 261(%rsp)
movslq 261(%rsp), %rdx
imulq $1, %rdx
movq 484(%rsp), %rax
addq %rdx, %rax
movq %rax, 253(%rsp)
movq 253(%rsp), %rdx
movq %rdx, 484(%rsp)
movl $1, 249(%rsp)
movslq 249(%rsp), %rdx
imulq $1, %rdx
movq 600(%rsp), %rax
addq %rdx, %rax
movq %rax, 241(%rsp)
movq 241(%rsp), %rdx
movq %rdx, 600(%rsp)
jmp mark_26
mark_27 :
#__clear_scope_14
addq $1000, %rsp
#__end_scope_14
#__begin_scope_13
movq $0, 233(%rsp)
movq 492(%rsp), %rdx
movq %rdx, 233(%rsp)
#__parameter_offset_pass
leaq 233(%rsp), %rcx
callq print_str
movb %al, 232(%rsp)
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
movl %edx, 228(%rsp)
movl $0, 224(%rsp)
movl 228(%rsp), %eax
movl 224(%rsp), %ebx
movb $1, 223(%rsp)
cmpl %eax, %ebx
je mark_39
movb $0, 223(%rsp)
mark_39 :
#IF
xor %edx, %edx
movb 223(%rsp), %dh
cmpb $0, %dh
je mark_37
#__end_scope_18
#__begin_scope_19
#__init_scope_19
subq $1000, %rsp
movl $1, 219(%rsp)
movl 219(%rsp), %eax
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
movl $1, 215(%rsp)
movl 228(%rsp), %edx
subl 215(%rsp), %edx
movl %edx, 211(%rsp)
movl $0, 207(%rsp)
movl 211(%rsp), %edx
movl %edx, 207(%rsp)
#__parameter_offset_pass
leaq 207(%rsp), %rcx
callq factorial
movl %eax, 203(%rsp)
movl 203(%rsp), %eax
imull 228(%rsp)
movl %eax, 199(%rsp)
movl 199(%rsp), %eax
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
movl %ecx, 195(%rsp)
movq %rdx, 187(%rsp)
movl $10, 183(%rsp)
movl $0, 179(%rsp)
movl 183(%rsp), %edx
movl %edx, 179(%rsp)
#__parameter_offset_pass
leaq 179(%rsp), %rcx
callq factorial
movl %eax, 175(%rsp)
movb $0, 174(%rsp)
movb $100, 173(%rsp)
movb $37, 172(%rsp)
movb $32, 171(%rsp)
movb $58, 170(%rsp)
movb $116, 169(%rsp)
movb $108, 168(%rsp)
movb $117, 167(%rsp)
movb $115, 166(%rsp)
movb $101, 165(%rsp)
movb $82, 164(%rsp)
leaq 164(%rsp), %rdx
movq %rdx, 156(%rsp)
leaq 175(%rsp), %rdx
movq %rdx, 148(%rsp)
movq 148(%rsp), %rdx
movq %rdx, 140(%rsp)
leaq 140(%rsp), %rdx
movq %rdx, 132(%rsp)
movq $0, 124(%rsp)
movq 156(%rsp), %rdx
movq %rdx, 124(%rsp)
movq $0, 116(%rsp)
movq 132(%rsp), %rdx
movq %rdx, 116(%rsp)
#__parameter_offset_pass
leaq 116(%rsp), %rcx
callq printf
movb %al, 115(%rsp)
#__clear_scope_20
addq $1000, %rsp
#__end_scope_20
xor %rax, %rax
retq
.seh_endproc

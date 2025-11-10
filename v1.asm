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
.def	main;
.endef
.globl	main
main:
.seh_proc main
#__begin_scope_18
#__init_scope_18
subq $1000, %rsp
movb $0, %ah
movb %ah, 231(%rsp)
movb $0, %ah
movb %ah, 230(%rsp)
movb $0, %ah
movb %ah, 229(%rsp)
movb $0, %ah
movb %ah, 228(%rsp)
movb $0, %ah
movb %ah, 227(%rsp)
movb $0, %ah
movb %ah, 226(%rsp)
movb $0, %ah
movb %ah, 225(%rsp)
movb $0, %ah
movb %ah, 224(%rsp)
movb $0, %ah
movb %ah, 223(%rsp)
movb $0, %ah
movb %ah, 222(%rsp)
movb $0, %ah
movb %ah, 221(%rsp)
movb $0, %ah
movb %ah, 220(%rsp)
movb $0, %ah
movb %ah, 219(%rsp)
movb $0, %ah
movb %ah, 218(%rsp)
movb $0, %ah
movb %ah, 217(%rsp)
movb $0, %ah
movb %ah, 216(%rsp)
movb $0, %ah
movb %ah, 215(%rsp)
movb $0, %ah
movb %ah, 214(%rsp)
movb $0, %ah
movb %ah, 213(%rsp)
movb $0, %ah
movb %ah, 212(%rsp)
movb $0, %ah
movb %ah, 211(%rsp)
movb $0, %ah
movb %ah, 210(%rsp)
movb $0, %ah
movb %ah, 209(%rsp)
movb $0, %ah
movb %ah, 208(%rsp)
movb $0, %ah
movb %ah, 207(%rsp)
movb $0, %ah
movb %ah, 206(%rsp)
movb $0, %ah
movb %ah, 205(%rsp)
movb $0, %ah
movb %ah, 204(%rsp)
movb $0, %ah
movb %ah, 203(%rsp)
movb $0, %ah
movb %ah, 202(%rsp)
movb $0, %ah
movb %ah, 201(%rsp)
movb $0, %ah
movb %ah, 200(%rsp)
movb $0, %ah
movb %ah, 199(%rsp)
movb $0, %ah
movb %ah, 198(%rsp)
movb $0, %ah
movb %ah, 197(%rsp)
movb $0, %ah
movb %ah, 196(%rsp)
movb $0, %ah
movb %ah, 195(%rsp)
movb $0, %ah
movb %ah, 194(%rsp)
movb $0, %ah
movb %ah, 193(%rsp)
movb $0, %ah
movb %ah, 192(%rsp)
movb $0, %ah
movb %ah, 191(%rsp)
movb $0, %ah
movb %ah, 190(%rsp)
movb $0, %ah
movb %ah, 189(%rsp)
movb $0, %ah
movb %ah, 188(%rsp)
movb $0, %ah
movb %ah, 187(%rsp)
movb $0, %ah
movb %ah, 186(%rsp)
movb $0, %ah
movb %ah, 185(%rsp)
movb $0, %ah
movb %ah, 184(%rsp)
movb $0, %ah
movb %ah, 183(%rsp)
movb $0, %ah
movb %ah, 182(%rsp)
movb $0, %ah
movb %ah, 181(%rsp)
movb $0, %ah
movb %ah, 180(%rsp)
movb $0, %ah
movb %ah, 179(%rsp)
movb $0, %ah
movb %ah, 178(%rsp)
movb $0, %ah
movb %ah, 177(%rsp)
movb $0, %ah
movb %ah, 176(%rsp)
movb $0, %ah
movb %ah, 175(%rsp)
movb $0, %ah
movb %ah, 174(%rsp)
movb $0, %ah
movb %ah, 173(%rsp)
movb $0, %ah
movb %ah, 172(%rsp)
movb $0, %ah
movb %ah, 171(%rsp)
movb $0, %ah
movb %ah, 170(%rsp)
movb $0, %ah
movb %ah, 169(%rsp)
movb $0, %ah
movb %ah, 168(%rsp)
movb $0, %ah
movb %ah, 167(%rsp)
movb $0, %ah
movb %ah, 166(%rsp)
movb $0, %ah
movb %ah, 165(%rsp)
movb $0, %ah
movb %ah, 164(%rsp)
movb $0, %ah
movb %ah, 163(%rsp)
movb $0, %ah
movb %ah, 162(%rsp)
movb $0, %ah
movb %ah, 161(%rsp)
movb $0, %ah
movb %ah, 160(%rsp)
movb $0, %ah
movb %ah, 159(%rsp)
movb $0, %ah
movb %ah, 158(%rsp)
movb $0, %ah
movb %ah, 157(%rsp)
movb $0, %ah
movb %ah, 156(%rsp)
movb $0, %ah
movb %ah, 155(%rsp)
movb $0, %ah
movb %ah, 154(%rsp)
movb $0, %ah
movb %ah, 153(%rsp)
movb $0, %ah
movb %ah, 152(%rsp)
movb $0, %ah
movb %ah, 151(%rsp)
movb $0, %ah
movb %ah, 150(%rsp)
movb $0, %ah
movb %ah, 149(%rsp)
movb $0, %ah
movb %ah, 148(%rsp)
movb $0, %ah
movb %ah, 147(%rsp)
movb $0, %ah
movb %ah, 146(%rsp)
movb $0, %ah
movb %ah, 145(%rsp)
movb $0, %ah
movb %ah, 144(%rsp)
movb $0, %ah
movb %ah, 143(%rsp)
movb $0, %ah
movb %ah, 142(%rsp)
movb $0, %ah
movb %ah, 141(%rsp)
movb $0, %ah
movb %ah, 140(%rsp)
movb $0, %ah
movb %ah, 139(%rsp)
movb $0, %ah
movb %ah, 138(%rsp)
movb $0, %ah
movb %ah, 137(%rsp)
movb $0, %ah
movb %ah, 136(%rsp)
movb $0, %ah
movb %ah, 135(%rsp)
movb $0, %ah
movb %ah, 134(%rsp)
movb $0, %ah
movb %ah, 133(%rsp)
movb $0, %ah
movb %ah, 132(%rsp)
leaq 132(%rsp), %rdx
movq %rdx, 124(%rsp)
movb $0, %ah
movb %ah, 123(%rsp)
movb $0, %ah
movb %ah, 122(%rsp)
movb $0, %ah
movb %ah, 121(%rsp)
movb $0, %ah
movb %ah, 120(%rsp)
movb $0, %ah
movb %ah, 119(%rsp)
movb $0, %ah
movb %ah, 118(%rsp)
movb $0, %ah
movb %ah, 117(%rsp)
movb $0, %ah
movb %ah, 116(%rsp)
movb $0, %ah
movb %ah, 115(%rsp)
movb $0, %ah
movb %ah, 114(%rsp)
movb $0, %ah
movb %ah, 113(%rsp)
movb $0, %ah
movb %ah, 112(%rsp)
movb $0, %ah
movb %ah, 111(%rsp)
movb $0, %ah
movb %ah, 110(%rsp)
movb $0, %ah
movb %ah, 109(%rsp)
movb $0, %ah
movb %ah, 108(%rsp)
movb $0, %ah
movb %ah, 107(%rsp)
movb $0, %ah
movb %ah, 106(%rsp)
movb $0, %ah
movb %ah, 105(%rsp)
movb $0, %ah
movb %ah, 104(%rsp)
movb $0, %ah
movb %ah, 103(%rsp)
movb $0, %ah
movb %ah, 102(%rsp)
movb $0, %ah
movb %ah, 101(%rsp)
movb $0, %ah
movb %ah, 100(%rsp)
movb $0, %ah
movb %ah, 99(%rsp)
movb $0, %ah
movb %ah, 98(%rsp)
movb $0, %ah
movb %ah, 97(%rsp)
movb $0, %ah
movb %ah, 96(%rsp)
movb $0, %ah
movb %ah, 95(%rsp)
movb $0, %ah
movb %ah, 94(%rsp)
movb $0, %ah
movb %ah, 93(%rsp)
movb $0, %ah
movb %ah, 92(%rsp)
movb $0, %ah
movb %ah, 91(%rsp)
movb $0, %ah
movb %ah, 90(%rsp)
movb $0, %ah
movb %ah, 89(%rsp)
movb $0, %ah
movb %ah, 88(%rsp)
movb $0, %ah
movb %ah, 87(%rsp)
movb $0, %ah
movb %ah, 86(%rsp)
movb $0, %ah
movb %ah, 85(%rsp)
movb $0, %ah
movb %ah, 84(%rsp)
movb $0, %ah
movb %ah, 83(%rsp)
movb $0, %ah
movb %ah, 82(%rsp)
movb $0, %ah
movb %ah, 81(%rsp)
movb $0, %ah
movb %ah, 80(%rsp)
movb $0, %ah
movb %ah, 79(%rsp)
movb $0, %ah
movb %ah, 78(%rsp)
movb $0, %ah
movb %ah, 77(%rsp)
movb $0, %ah
movb %ah, 76(%rsp)
movb $0, %ah
movb %ah, 75(%rsp)
movb $0, %ah
movb %ah, 74(%rsp)
movb $0, %ah
movb %ah, 73(%rsp)
movb $0, %ah
movb %ah, 72(%rsp)
movb $0, %ah
movb %ah, 71(%rsp)
movb $0, %ah
movb %ah, 70(%rsp)
movb $0, %ah
movb %ah, 69(%rsp)
movb $0, %ah
movb %ah, 68(%rsp)
movb $0, %ah
movb %ah, 67(%rsp)
movb $0, %ah
movb %ah, 66(%rsp)
movb $0, %ah
movb %ah, 65(%rsp)
movb $0, %ah
movb %ah, 64(%rsp)
movb $0, %ah
movb %ah, 63(%rsp)
movb $0, %ah
movb %ah, 62(%rsp)
movb $0, %ah
movb %ah, 61(%rsp)
movb $0, %ah
movb %ah, 60(%rsp)
movb $0, %ah
movb %ah, 59(%rsp)
movb $0, %ah
movb %ah, 58(%rsp)
movb $0, %ah
movb %ah, 57(%rsp)
movb $0, %ah
movb %ah, 56(%rsp)
movb $0, %ah
movb %ah, 55(%rsp)
movb $0, %ah
movb %ah, 54(%rsp)
movb $0, %ah
movb %ah, 53(%rsp)
movb $0, %ah
movb %ah, 52(%rsp)
movb $0, %ah
movb %ah, 51(%rsp)
movb $0, %ah
movb %ah, 50(%rsp)
movb $0, %ah
movb %ah, 49(%rsp)
movb $0, %ah
movb %ah, 48(%rsp)
movb $0, %ah
movb %ah, 47(%rsp)
movb $0, %ah
movb %ah, 46(%rsp)
movb $0, %ah
movb %ah, 45(%rsp)
movb $0, %ah
movb %ah, 44(%rsp)
movb $0, %ah
movb %ah, 43(%rsp)
movb $0, %ah
movb %ah, 42(%rsp)
movb $0, %ah
movb %ah, 41(%rsp)
movb $0, %ah
movb %ah, 40(%rsp)
movb $0, %ah
movb %ah, 39(%rsp)
movb $0, %ah
movb %ah, 38(%rsp)
movb $0, %ah
movb %ah, 37(%rsp)
movb $0, %ah
movb %ah, 36(%rsp)
movb $0, %ah
movb %ah, 35(%rsp)
movb $0, %ah
movb %ah, 34(%rsp)
movb $0, %ah
movb %ah, 33(%rsp)
movb $0, %ah
movb %ah, 32(%rsp)
movb $0, %ah
movb %ah, 31(%rsp)
movb $0, %ah
movb %ah, 30(%rsp)
movb $0, %ah
movb %ah, 29(%rsp)
movb $0, %ah
movb %ah, 28(%rsp)
movb $0, %ah
movb %ah, 27(%rsp)
movb $0, %ah
movb %ah, 26(%rsp)
movb $0, %ah
movb %ah, 25(%rsp)
movb $0, %ah
movb %ah, 24(%rsp)
leaq 24(%rsp), %rdx
movq %rdx, 16(%rsp)
movb $0, %ah
movb %ah, 15(%rsp)
movb $0, %ah
movb %ah, 14(%rsp)
movb $0, %ah
movb %ah, 13(%rsp)
movb $0, %ah
movb %ah, 12(%rsp)
movb $0, %ah
movb %ah, 11(%rsp)
movb $0, %ah
movb %ah, 10(%rsp)
movb $0, %ah
movb %ah, 9(%rsp)
movb $0, %ah
movb %ah, 8(%rsp)
movb $0, %ah
movb %ah, 7(%rsp)
movb $0, %ah
movb %ah, 6(%rsp)
movb $0, %ah
movb %ah, 5(%rsp)
movb $0, %ah
movb %ah, 4(%rsp)
movb $0, %ah
movb %ah, 3(%rsp)
movb $0, %ah
movb %ah, 2(%rsp)
movb $0, %ah
movb %ah, 1(%rsp)
movb $0, %ah
movb %ah, 0(%rsp)
movb $0, %ah
movb %ah, -1(%rsp)
movb $0, %ah
movb %ah, -2(%rsp)
movb $0, %ah
movb %ah, -3(%rsp)
movb $0, %ah
movb %ah, -4(%rsp)
movb $0, %ah
movb %ah, -5(%rsp)
movb $0, %ah
movb %ah, -6(%rsp)
movb $0, %ah
movb %ah, -7(%rsp)
movb $0, %ah
movb %ah, -8(%rsp)
movb $0, %ah
movb %ah, -9(%rsp)
movb $0, %ah
movb %ah, -10(%rsp)
movb $0, %ah
movb %ah, -11(%rsp)
movb $0, %ah
movb %ah, -12(%rsp)
movb $0, %ah
movb %ah, -13(%rsp)
movb $0, %ah
movb %ah, -14(%rsp)
movb $0, %ah
movb %ah, -15(%rsp)
movb $0, %ah
movb %ah, -16(%rsp)
movb $0, %ah
movb %ah, -17(%rsp)
movb $0, %ah
movb %ah, -18(%rsp)
movb $0, %ah
movb %ah, -19(%rsp)
movb $0, %ah
movb %ah, -20(%rsp)
movb $0, %ah
movb %ah, -21(%rsp)
movb $0, %ah
movb %ah, -22(%rsp)
movb $0, %ah
movb %ah, -23(%rsp)
movb $0, %ah
movb %ah, -24(%rsp)
movb $0, %ah
movb %ah, -25(%rsp)
movb $0, %ah
movb %ah, -26(%rsp)
movb $0, %ah
movb %ah, -27(%rsp)
movb $0, %ah
movb %ah, -28(%rsp)
movb $0, %ah
movb %ah, -29(%rsp)
movb $0, %ah
movb %ah, -30(%rsp)
movb $0, %ah
movb %ah, -31(%rsp)
movb $0, %ah
movb %ah, -32(%rsp)
movb $0, %ah
movb %ah, -33(%rsp)
movb $0, %ah
movb %ah, -34(%rsp)
movb $0, %ah
movb %ah, -35(%rsp)
movb $0, %ah
movb %ah, -36(%rsp)
movb $0, %ah
movb %ah, -37(%rsp)
movb $0, %ah
movb %ah, -38(%rsp)
movb $0, %ah
movb %ah, -39(%rsp)
movb $0, %ah
movb %ah, -40(%rsp)
movb $0, %ah
movb %ah, -41(%rsp)
movb $0, %ah
movb %ah, -42(%rsp)
movb $0, %ah
movb %ah, -43(%rsp)
movb $0, %ah
movb %ah, -44(%rsp)
movb $0, %ah
movb %ah, -45(%rsp)
movb $0, %ah
movb %ah, -46(%rsp)
movb $0, %ah
movb %ah, -47(%rsp)
movb $0, %ah
movb %ah, -48(%rsp)
movb $0, %ah
movb %ah, -49(%rsp)
movb $0, %ah
movb %ah, -50(%rsp)
movb $0, %ah
movb %ah, -51(%rsp)
movb $0, %ah
movb %ah, -52(%rsp)
movb $0, %ah
movb %ah, -53(%rsp)
movb $0, %ah
movb %ah, -54(%rsp)
movb $0, %ah
movb %ah, -55(%rsp)
movb $0, %ah
movb %ah, -56(%rsp)
movb $0, %ah
movb %ah, -57(%rsp)
movb $0, %ah
movb %ah, -58(%rsp)
movb $0, %ah
movb %ah, -59(%rsp)
movb $0, %ah
movb %ah, -60(%rsp)
movb $0, %ah
movb %ah, -61(%rsp)
movb $0, %ah
movb %ah, -62(%rsp)
movb $0, %ah
movb %ah, -63(%rsp)
movb $0, %ah
movb %ah, -64(%rsp)
movb $0, %ah
movb %ah, -65(%rsp)
movb $0, %ah
movb %ah, -66(%rsp)
movb $0, %ah
movb %ah, -67(%rsp)
movb $0, %ah
movb %ah, -68(%rsp)
movb $0, %ah
movb %ah, -69(%rsp)
movb $0, %ah
movb %ah, -70(%rsp)
movb $0, %ah
movb %ah, -71(%rsp)
movb $0, %ah
movb %ah, -72(%rsp)
movb $0, %ah
movb %ah, -73(%rsp)
movb $0, %ah
movb %ah, -74(%rsp)
movb $0, %ah
movb %ah, -75(%rsp)
movb $0, %ah
movb %ah, -76(%rsp)
movb $0, %ah
movb %ah, -77(%rsp)
movb $0, %ah
movb %ah, -78(%rsp)
movb $0, %ah
movb %ah, -79(%rsp)
movb $0, %ah
movb %ah, -80(%rsp)
movb $0, %ah
movb %ah, -81(%rsp)
movb $0, %ah
movb %ah, -82(%rsp)
movb $0, %ah
movb %ah, -83(%rsp)
movb $0, %ah
movb %ah, -84(%rsp)
leaq -84(%rsp), %rdx
movq %rdx, -92(%rsp)
movl $0, -96(%rsp)
movq 124(%rsp), %rdx
leaq scanf_mark(%rip), %rcx
movq $0, %rax
callq	scanf
movl $0, -100(%rsp)
movq 16(%rsp), %rdx
leaq scanf_mark(%rip), %rcx
movq $0, %rax
callq	scanf
movl $0, -104(%rsp)
movq -92(%rsp), %rdx
leaq scanf_mark(%rip), %rcx
movq $0, %rax
callq	scanf
movb $0, -105(%rsp)
movb $93, -106(%rsp)
movb $100, -107(%rsp)
movb $37, -108(%rsp)
movb $91, -109(%rsp)
movb $32, -110(%rsp)
movb $102, -111(%rsp)
movb $111, -112(%rsp)
movb $32, -113(%rsp)
movb $104, -114(%rsp)
movb $116, -115(%rsp)
movb $103, -116(%rsp)
movb $110, -117(%rsp)
movb $101, -118(%rsp)
movb $108, -119(%rsp)
movb $32, -120(%rsp)
movb $115, -121(%rsp)
movb $105, -122(%rsp)
movb $32, -123(%rsp)
movb $41, -124(%rsp)
movb $115, -125(%rsp)
movb $37, -126(%rsp)
movb $40, -127(%rsp)
movb $32, -128(%rsp)
movb $103, -129(%rsp)
movb $110, -130(%rsp)
movb $105, -131(%rsp)
movb $114, -132(%rsp)
movb $116, -133(%rsp)
movb $115, -134(%rsp)
leaq -134(%rsp), %rdx
movq %rdx, -142(%rsp)
movq $0, -150(%rsp)
movq 124(%rsp), %rdx
movq %rdx, -150(%rsp)
#__parameter_offset_pass
leaq -150(%rsp), %rcx
callq strlen
movl %eax, -154(%rsp)
leaq -154(%rsp), %rdx
movq %rdx, -162(%rsp)
movq -162(%rsp), %rdx
movq %rdx, -170(%rsp)
movq 124(%rsp), %rdx
movq %rdx, -178(%rsp)
leaq -178(%rsp), %rdx
movq %rdx, -186(%rsp)
movq $0, -194(%rsp)
movq -142(%rsp), %rdx
movq %rdx, -194(%rsp)
movq $0, -202(%rsp)
movq -186(%rsp), %rdx
movq %rdx, -202(%rsp)
#__parameter_offset_pass
leaq -202(%rsp), %rcx
callq printf
movb %al, -203(%rsp)
movb $0, -204(%rsp)
movb $93, -205(%rsp)
movb $100, -206(%rsp)
movb $37, -207(%rsp)
movb $91, -208(%rsp)
movb $32, -209(%rsp)
movb $102, -210(%rsp)
movb $111, -211(%rsp)
movb $32, -212(%rsp)
movb $104, -213(%rsp)
movb $116, -214(%rsp)
movb $103, -215(%rsp)
movb $110, -216(%rsp)
movb $101, -217(%rsp)
movb $108, -218(%rsp)
movb $32, -219(%rsp)
movb $115, -220(%rsp)
movb $105, -221(%rsp)
movb $32, -222(%rsp)
movb $41, -223(%rsp)
movb $115, -224(%rsp)
movb $37, -225(%rsp)
movb $40, -226(%rsp)
movb $32, -227(%rsp)
movb $103, -228(%rsp)
movb $110, -229(%rsp)
movb $105, -230(%rsp)
movb $114, -231(%rsp)
movb $116, -232(%rsp)
movb $115, -233(%rsp)
leaq -233(%rsp), %rdx
movq %rdx, -241(%rsp)
movq $0, -249(%rsp)
movq 16(%rsp), %rdx
movq %rdx, -249(%rsp)
#__parameter_offset_pass
leaq -249(%rsp), %rcx
callq strlen
movl %eax, -253(%rsp)
leaq -253(%rsp), %rdx
movq %rdx, -261(%rsp)
movq -261(%rsp), %rdx
movq %rdx, -269(%rsp)
movq 16(%rsp), %rdx
movq %rdx, -277(%rsp)
leaq -277(%rsp), %rdx
movq %rdx, -285(%rsp)
movq $0, -293(%rsp)
movq -241(%rsp), %rdx
movq %rdx, -293(%rsp)
movq $0, -301(%rsp)
movq -285(%rsp), %rdx
movq %rdx, -301(%rsp)
#__parameter_offset_pass
leaq -301(%rsp), %rcx
callq printf
movb %al, -302(%rsp)
movb $0, -303(%rsp)
movb $93, -304(%rsp)
movb $100, -305(%rsp)
movb $37, -306(%rsp)
movb $91, -307(%rsp)
movb $32, -308(%rsp)
movb $102, -309(%rsp)
movb $111, -310(%rsp)
movb $32, -311(%rsp)
movb $104, -312(%rsp)
movb $116, -313(%rsp)
movb $103, -314(%rsp)
movb $110, -315(%rsp)
movb $101, -316(%rsp)
movb $108, -317(%rsp)
movb $32, -318(%rsp)
movb $115, -319(%rsp)
movb $105, -320(%rsp)
movb $32, -321(%rsp)
movb $41, -322(%rsp)
movb $115, -323(%rsp)
movb $37, -324(%rsp)
movb $40, -325(%rsp)
movb $32, -326(%rsp)
movb $103, -327(%rsp)
movb $110, -328(%rsp)
movb $105, -329(%rsp)
movb $114, -330(%rsp)
movb $116, -331(%rsp)
movb $115, -332(%rsp)
leaq -332(%rsp), %rdx
movq %rdx, -340(%rsp)
movq $0, -348(%rsp)
movq -92(%rsp), %rdx
movq %rdx, -348(%rsp)
#__parameter_offset_pass
leaq -348(%rsp), %rcx
callq strlen
movl %eax, -352(%rsp)
leaq -352(%rsp), %rdx
movq %rdx, -360(%rsp)
movq -360(%rsp), %rdx
movq %rdx, -368(%rsp)
movq -92(%rsp), %rdx
movq %rdx, -376(%rsp)
leaq -376(%rsp), %rdx
movq %rdx, -384(%rsp)
movq $0, -392(%rsp)
movq -340(%rsp), %rdx
movq %rdx, -392(%rsp)
movq $0, -400(%rsp)
movq -384(%rsp), %rdx
movq %rdx, -400(%rsp)
#__parameter_offset_pass
leaq -400(%rsp), %rcx
callq printf
movb %al, -401(%rsp)
movl $0, -405(%rsp)
movl -405(%rsp), %eax
#__clear_scope_18
addq $1000, %rsp
xor %rax, %rax
retq
#__clear_scope_18
addq $1000, %rsp
#__end_scope_18
xor %rax, %rax
retq
.seh_endproc

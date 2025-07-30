.def	main;
                                     .endef
                                     .globl	main
                                     main:
                                     .seh_proc main
                                     subq	$100, %rsp
                                     
                    movb $82, 99(%rsp)
                    
                    movb $69, 98(%rsp)
                    
                    movb $76, 97(%rsp)
                    
                    movb $73, 96(%rsp)
                    
                    movb $80, 95(%rsp)
                    
                    movb $77, 94(%rsp)
                    
                    movb $79, 93(%rsp)
                    
                    movb $67, 92(%rsp)
                    
                    movb $32, 91(%rsp)
                    
                    movb $83, 90(%rsp)
                    
                    movb $84, 89(%rsp)
                    
                    movb $32, 88(%rsp)
                    
                    movb $44, 87(%rsp)
                    
                    movb $111, 86(%rsp)
                    
                    movb $108, 85(%rsp)
                    
                    movb $108, 84(%rsp)
                    
                    movb $101, 83(%rsp)
                    
                    movb $104, 82(%rsp)
                    
            movl $18, 78(%rsp)
            
                    	movl  $4294967285, %ecx               # imm = 0xFFFFFFF5
                    	callq	*__imp_GetStdHandle(%rip)
                    	movq	%rax, 70(%rsp)
                    	movl	$0, 66(%rsp)
                    	movq	70(%rsp), %rcx
                    	leaq	66(%rsp), %r9
                        
                        leaq  82(%rsp), %rdx
                    
                        movl  78(%rsp), %r8d
                    
                        callq	 *__imp_WriteConsoleA(%rip)
                    xor %eax, %eax
                                     addq	$100, %rsp
	                                 retq
	                                 .seh_endproc
                                     
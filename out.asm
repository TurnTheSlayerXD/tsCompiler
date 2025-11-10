.def	strlen;
.endef
.globl	strlen
strlen:
.seh_proc strlen
#__begin_scope_0
#__init_scope_0
subq $12, %rsp
movq 0(%rcx), %rdx
movq %rdx, 4(%rsp)
movl $0, 0(%rsp)
#__end_scope_0
#__begin_scope_1
#__init_scope_1
subq $19, %rsp
mark_0 :
movslq  19(%rsp), %rdx
imulq $1, %rdx
movq  23(%rsp), %rax
addq %rdx, %rax
movq %rax, 11(%rsp)
movq  11(%rsp), %rax
movb (%rax), %dh
movb %dh, 10(%rsp)
movb $0, %ah
movb %ah, 9(%rsp)
movb  10(%rsp), %ah
movb  9(%rsp), %al
movb $1, 8(%rsp)
cmpb %ah, %al
jne mark_2
movb $0, 8(%rsp)
mark_2 :
#WHILE
xor %edx, %edx
movb  8(%rsp), %dh
cmpb $0, %dh
je mark_1
movl $1, 4(%rsp)
movl  19(%rsp), %edx
addl  4(%rsp), %edx
movl %edx, 0(%rsp)
movl  0(%rsp), %edx
movl %edx, 19(%rsp)
jmp mark_0
mark_1 :
#__clear_scope_1
addq $19, %rsp
#__end_scope_1
#__begin_scope_0
movl  0(%rsp), %eax
#__clear_scope_0
addq $12, %rsp
retq
#__clear_scope_0
addq $12, %rsp
#__end_scope_0
retq
.seh_endproc
.def	main;
.endef
.globl	main
main:
.seh_proc main
#__begin_scope_2
#__init_scope_2
subq $412, %rsp
movb $0, %ah
movb %ah, 411(%rsp)
movb $0, %ah
movb %ah, 410(%rsp)
movb $0, %ah
movb %ah, 409(%rsp)
movb $0, %ah
movb %ah, 408(%rsp)
movb $0, %ah
movb %ah, 407(%rsp)
movb $0, %ah
movb %ah, 406(%rsp)
movb $0, %ah
movb %ah, 405(%rsp)
movb $0, %ah
movb %ah, 404(%rsp)
movb $0, %ah
movb %ah, 403(%rsp)
movb $0, %ah
movb %ah, 402(%rsp)
movb $0, %ah
movb %ah, 401(%rsp)
movb $0, %ah
movb %ah, 400(%rsp)
movb $0, %ah
movb %ah, 399(%rsp)
movb $0, %ah
movb %ah, 398(%rsp)
movb $0, %ah
movb %ah, 397(%rsp)
movb $0, %ah
movb %ah, 396(%rsp)
movb $0, %ah
movb %ah, 395(%rsp)
movb $0, %ah
movb %ah, 394(%rsp)
movb $0, %ah
movb %ah, 393(%rsp)
movb $0, %ah
movb %ah, 392(%rsp)
movb $0, %ah
movb %ah, 391(%rsp)
movb $0, %ah
movb %ah, 390(%rsp)
movb $0, %ah
movb %ah, 389(%rsp)
movb $0, %ah
movb %ah, 388(%rsp)
movb $0, %ah
movb %ah, 387(%rsp)
movb $0, %ah
movb %ah, 386(%rsp)
movb $0, %ah
movb %ah, 385(%rsp)
movb $0, %ah
movb %ah, 384(%rsp)
movb $0, %ah
movb %ah, 383(%rsp)
movb $0, %ah
movb %ah, 382(%rsp)
movb $0, %ah
movb %ah, 381(%rsp)
movb $0, %ah
movb %ah, 380(%rsp)
movb $0, %ah
movb %ah, 379(%rsp)
movb $0, %ah
movb %ah, 378(%rsp)
movb $0, %ah
movb %ah, 377(%rsp)
movb $0, %ah
movb %ah, 376(%rsp)
movb $0, %ah
movb %ah, 375(%rsp)
movb $0, %ah
movb %ah, 374(%rsp)
movb $0, %ah
movb %ah, 373(%rsp)
movb $0, %ah
movb %ah, 372(%rsp)
movb $0, %ah
movb %ah, 371(%rsp)
movb $0, %ah
movb %ah, 370(%rsp)
movb $0, %ah
movb %ah, 369(%rsp)
movb $0, %ah
movb %ah, 368(%rsp)
movb $0, %ah
movb %ah, 367(%rsp)
movb $0, %ah
movb %ah, 366(%rsp)
movb $0, %ah
movb %ah, 365(%rsp)
movb $0, %ah
movb %ah, 364(%rsp)
movb $0, %ah
movb %ah, 363(%rsp)
movb $0, %ah
movb %ah, 362(%rsp)
movb $0, %ah
movb %ah, 361(%rsp)
movb $0, %ah
movb %ah, 360(%rsp)
movb $0, %ah
movb %ah, 359(%rsp)
movb $0, %ah
movb %ah, 358(%rsp)
movb $0, %ah
movb %ah, 357(%rsp)
movb $0, %ah
movb %ah, 356(%rsp)
movb $0, %ah
movb %ah, 355(%rsp)
movb $0, %ah
movb %ah, 354(%rsp)
movb $0, %ah
movb %ah, 353(%rsp)
movb $0, %ah
movb %ah, 352(%rsp)
movb $0, %ah
movb %ah, 351(%rsp)
movb $0, %ah
movb %ah, 350(%rsp)
movb $0, %ah
movb %ah, 349(%rsp)
movb $0, %ah
movb %ah, 348(%rsp)
movb $0, %ah
movb %ah, 347(%rsp)
movb $0, %ah
movb %ah, 346(%rsp)
movb $0, %ah
movb %ah, 345(%rsp)
movb $0, %ah
movb %ah, 344(%rsp)
movb $0, %ah
movb %ah, 343(%rsp)
movb $0, %ah
movb %ah, 342(%rsp)
movb $0, %ah
movb %ah, 341(%rsp)
movb $0, %ah
movb %ah, 340(%rsp)
movb $0, %ah
movb %ah, 339(%rsp)
movb $0, %ah
movb %ah, 338(%rsp)
movb $0, %ah
movb %ah, 337(%rsp)
movb $0, %ah
movb %ah, 336(%rsp)
movb $0, %ah
movb %ah, 335(%rsp)
movb $0, %ah
movb %ah, 334(%rsp)
movb $0, %ah
movb %ah, 333(%rsp)
movb $0, %ah
movb %ah, 332(%rsp)
movb $0, %ah
movb %ah, 331(%rsp)
movb $0, %ah
movb %ah, 330(%rsp)
movb $0, %ah
movb %ah, 329(%rsp)
movb $0, %ah
movb %ah, 328(%rsp)
movb $0, %ah
movb %ah, 327(%rsp)
movb $0, %ah
movb %ah, 326(%rsp)
movb $0, %ah
movb %ah, 325(%rsp)
movb $0, %ah
movb %ah, 324(%rsp)
movb $0, %ah
movb %ah, 323(%rsp)
movb $0, %ah
movb %ah, 322(%rsp)
movb $0, %ah
movb %ah, 321(%rsp)
movb $0, %ah
movb %ah, 320(%rsp)
movb $0, %ah
movb %ah, 319(%rsp)
movb $0, %ah
movb %ah, 318(%rsp)
movb $0, %ah
movb %ah, 317(%rsp)
movb $0, %ah
movb %ah, 316(%rsp)
movb $0, %ah
movb %ah, 315(%rsp)
movb $0, %ah
movb %ah, 314(%rsp)
movb $0, %ah
movb %ah, 313(%rsp)
movb $0, %ah
movb %ah, 312(%rsp)
leaq  312(%rsp), %rdx
movq %rdx, 304(%rsp)
movb $0, %ah
movb %ah, 303(%rsp)
movb $0, %ah
movb %ah, 302(%rsp)
movb $0, %ah
movb %ah, 301(%rsp)
movb $0, %ah
movb %ah, 300(%rsp)
movb $0, %ah
movb %ah, 299(%rsp)
movb $0, %ah
movb %ah, 298(%rsp)
movb $0, %ah
movb %ah, 297(%rsp)
movb $0, %ah
movb %ah, 296(%rsp)
movb $0, %ah
movb %ah, 295(%rsp)
movb $0, %ah
movb %ah, 294(%rsp)
movb $0, %ah
movb %ah, 293(%rsp)
movb $0, %ah
movb %ah, 292(%rsp)
movb $0, %ah
movb %ah, 291(%rsp)
movb $0, %ah
movb %ah, 290(%rsp)
movb $0, %ah
movb %ah, 289(%rsp)
movb $0, %ah
movb %ah, 288(%rsp)
movb $0, %ah
movb %ah, 287(%rsp)
movb $0, %ah
movb %ah, 286(%rsp)
movb $0, %ah
movb %ah, 285(%rsp)
movb $0, %ah
movb %ah, 284(%rsp)
movb $0, %ah
movb %ah, 283(%rsp)
movb $0, %ah
movb %ah, 282(%rsp)
movb $0, %ah
movb %ah, 281(%rsp)
movb $0, %ah
movb %ah, 280(%rsp)
movb $0, %ah
movb %ah, 279(%rsp)
movb $0, %ah
movb %ah, 278(%rsp)
movb $0, %ah
movb %ah, 277(%rsp)
movb $0, %ah
movb %ah, 276(%rsp)
movb $0, %ah
movb %ah, 275(%rsp)
movb $0, %ah
movb %ah, 274(%rsp)
movb $0, %ah
movb %ah, 273(%rsp)
movb $0, %ah
movb %ah, 272(%rsp)
movb $0, %ah
movb %ah, 271(%rsp)
movb $0, %ah
movb %ah, 270(%rsp)
movb $0, %ah
movb %ah, 269(%rsp)
movb $0, %ah
movb %ah, 268(%rsp)
movb $0, %ah
movb %ah, 267(%rsp)
movb $0, %ah
movb %ah, 266(%rsp)
movb $0, %ah
movb %ah, 265(%rsp)
movb $0, %ah
movb %ah, 264(%rsp)
movb $0, %ah
movb %ah, 263(%rsp)
movb $0, %ah
movb %ah, 262(%rsp)
movb $0, %ah
movb %ah, 261(%rsp)
movb $0, %ah
movb %ah, 260(%rsp)
movb $0, %ah
movb %ah, 259(%rsp)
movb $0, %ah
movb %ah, 258(%rsp)
movb $0, %ah
movb %ah, 257(%rsp)
movb $0, %ah
movb %ah, 256(%rsp)
movb $0, %ah
movb %ah, 255(%rsp)
movb $0, %ah
movb %ah, 254(%rsp)
movb $0, %ah
movb %ah, 253(%rsp)
movb $0, %ah
movb %ah, 252(%rsp)
movb $0, %ah
movb %ah, 251(%rsp)
movb $0, %ah
movb %ah, 250(%rsp)
movb $0, %ah
movb %ah, 249(%rsp)
movb $0, %ah
movb %ah, 248(%rsp)
movb $0, %ah
movb %ah, 247(%rsp)
movb $0, %ah
movb %ah, 246(%rsp)
movb $0, %ah
movb %ah, 245(%rsp)
movb $0, %ah
movb %ah, 244(%rsp)
movb $0, %ah
movb %ah, 243(%rsp)
movb $0, %ah
movb %ah, 242(%rsp)
movb $0, %ah
movb %ah, 241(%rsp)
movb $0, %ah
movb %ah, 240(%rsp)
movb $0, %ah
movb %ah, 239(%rsp)
movb $0, %ah
movb %ah, 238(%rsp)
movb $0, %ah
movb %ah, 237(%rsp)
movb $0, %ah
movb %ah, 236(%rsp)
movb $0, %ah
movb %ah, 235(%rsp)
movb $0, %ah
movb %ah, 234(%rsp)
movb $0, %ah
movb %ah, 233(%rsp)
movb $0, %ah
movb %ah, 232(%rsp)
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
leaq  204(%rsp), %rdx
movq %rdx, 196(%rsp)
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
movb $0, %ah
movb %ah, 131(%rsp)
movb $0, %ah
movb %ah, 130(%rsp)
movb $0, %ah
movb %ah, 129(%rsp)
movb $0, %ah
movb %ah, 128(%rsp)
movb $0, %ah
movb %ah, 127(%rsp)
movb $0, %ah
movb %ah, 126(%rsp)
movb $0, %ah
movb %ah, 125(%rsp)
movb $0, %ah
movb %ah, 124(%rsp)
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
leaq  96(%rsp), %rdx
movq %rdx, 88(%rsp)
movl $0, 84(%rsp)
movq  304(%rsp), %rdx
leaq scanf_mark(%rip), %rcx
movq $0, %rax
callq	scanf
movl $0, 80(%rsp)
movq  196(%rsp), %rdx
leaq scanf_mark(%rip), %rcx
movq $0, %rax
callq	scanf
movl $0, 76(%rsp)
movq  88(%rsp), %rdx
leaq scanf_mark(%rip), %rcx
movq $0, %rax
callq	scanf
movq $0, 68(%rsp)
movq  304(%rsp), %rdx
movq %rdx, 68(%rsp)
#__parameter_offset_pass
leaq  68(%rsp), %rcx
callq strlen
movl %eax, 64(%rsp)
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 56(%rsp)
movl $0, 52(%rsp)
movq  56(%rsp), %rcx
leaq  52(%rsp), %r9
movq   304(%rsp), %rdx
movl   64(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
movq $0, 44(%rsp)
movq  196(%rsp), %rdx
movq %rdx, 44(%rsp)
#__parameter_offset_pass
leaq  44(%rsp), %rcx
callq strlen
movl %eax, 40(%rsp)
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 32(%rsp)
movl $0, 28(%rsp)
movq  32(%rsp), %rcx
leaq  28(%rsp), %r9
movq   196(%rsp), %rdx
movl   40(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
movq $0, 20(%rsp)
movq  88(%rsp), %rdx
movq %rdx, 20(%rsp)
#__parameter_offset_pass
leaq  20(%rsp), %rcx
callq strlen
movl %eax, 16(%rsp)
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 8(%rsp)
movl $0, 4(%rsp)
movq  8(%rsp), %rcx
leaq  4(%rsp), %r9
movq   88(%rsp), %rdx
movl   16(%rsp), %r8d
callq	 *__imp_WriteConsoleA(%rip)
movl $0, 0(%rsp)
movl  0(%rsp), %eax
#__clear_scope_2
addq $412, %rsp
xor %rax, %rax
retq
#__clear_scope_2
addq $412, %rsp
#__end_scope_2
xor %rax, %rax
retq
.seh_endproc
	

scanf_mark:
    .asciz	"%s"

    .def	scanf;
	.scl	2;
	.type	32;
	.endef
	.section	.text,"xr",discard,scanf
	.globl	scanf                           # -- Begin function scanf
	.p2align	4
scanf:                                  # @scanf
.seh_proc scanf
# %bb.0:
	subq	$88, %rsp
	.seh_stackalloc 88
	.seh_endprologue
	movq	%r9, 120(%rsp)
	movq	%r8, 112(%rsp)
	movq	%rdx, 104(%rsp)
	movq	%rcx, 80(%rsp)
	leaq	104(%rsp), %rax
	movq	%rax, 64(%rsp)
	movq	64(%rsp), %rax
	movq	%rax, 48(%rsp)                  # 8-byte Spill
	movq	80(%rsp), %rax
	movq	%rax, 40(%rsp)                  # 8-byte Spill
	xorl	%ecx, %ecx
	movl	%ecx, 60(%rsp)                  # 4-byte Spill
	callq	__acrt_iob_func
	movq	40(%rsp), %rdx                  # 8-byte Reload
	movq	48(%rsp), %r9                   # 8-byte Reload
	movq	%rax, %rcx
	movl	60(%rsp), %eax                  # 4-byte Reload
	movl	%eax, %r8d
	callq	_vfscanf_l
	movl	%eax, 76(%rsp)
	movl	76(%rsp), %eax
	addq	$88, %rsp
	retq
	.seh_endproc
                                        # -- End function
	.def	_vsprintf_l;
	.scl	2;
	.type	32;
	.endef
	.section	.text,"xr",discard,_vsprintf_l
	.globl	_vsprintf_l                     # -- Begin function _vsprintf_l
	.p2align	4
_vsprintf_l:                            # @_vsprintf_l
.seh_proc _vsprintf_l
# %bb.0:
	subq	$72, %rsp
	.seh_stackalloc 72
	.seh_endprologue
	movq	%r9, 64(%rsp)
	movq	%r8, 56(%rsp)
	movq	%rdx, 48(%rsp)
	movq	%rcx, 40(%rsp)
	movq	64(%rsp), %rax
	movq	56(%rsp), %r9
	movq	48(%rsp), %r8
	movq	40(%rsp), %rcx
	movq	$-1, %rdx
	movq	%rax, 32(%rsp)
	callq	_vsnprintf_l
	nop
	addq	$72, %rsp
	retq
	.seh_endproc
                                        # -- End function
	.def	_vsnprintf_l;
	.scl	2;
	.type	32;
	.endef
	.section	.text,"xr",discard,_vsnprintf_l
	.globl	_vsnprintf_l                    # -- Begin function _vsnprintf_l
	.p2align	4
_vsnprintf_l:                           # @_vsnprintf_l
.seh_proc _vsnprintf_l
# %bb.0:
	subq	$136, %rsp
	.seh_stackalloc 136
	.seh_endprologue
	movq	176(%rsp), %rax
	movq	%r9, 128(%rsp)
	movq	%r8, 120(%rsp)
	movq	%rdx, 112(%rsp)
	movq	%rcx, 104(%rsp)
	movq	176(%rsp), %rax
	movq	%rax, 88(%rsp)                  # 8-byte Spill
	movq	128(%rsp), %rax
	movq	%rax, 80(%rsp)                  # 8-byte Spill
	movq	120(%rsp), %rax
	movq	%rax, 72(%rsp)                  # 8-byte Spill
	movq	112(%rsp), %rax
	movq	%rax, 64(%rsp)                  # 8-byte Spill
	movq	104(%rsp), %rax
	movq	%rax, 56(%rsp)                  # 8-byte Spill
	callq	__local_stdio_printf_options
	movq	56(%rsp), %rdx                  # 8-byte Reload
	movq	64(%rsp), %r8                   # 8-byte Reload
	movq	72(%rsp), %r9                   # 8-byte Reload
	movq	80(%rsp), %r10                  # 8-byte Reload
	movq	%rax, %rcx
	movq	88(%rsp), %rax                  # 8-byte Reload
	movq	(%rcx), %rcx
	orq	$1, %rcx
	movq	%r10, 32(%rsp)
	movq	%rax, 40(%rsp)
	callq	__stdio_common_vsprintf
	movl	%eax, 100(%rsp)
	cmpl	$0, 100(%rsp)
	jge	.LBB7_2
# %bb.1:
	movl	$4294967295, %eax               # imm = 0xFFFFFFFF
	movl	%eax, 52(%rsp)                  # 4-byte Spill
	jmp	.LBB7_3
.LBB7_2:
	movl	100(%rsp), %eax
	movl	%eax, 52(%rsp)                  # 4-byte Spill
.LBB7_3:
	movl	52(%rsp), %eax                  # 4-byte Reload
	addq	$136, %rsp
	retq
	.seh_endproc
                                        # -- End function
	.def	__local_stdio_printf_options;
	.scl	2;
	.type	32;
	.endef
	.section	.text,"xr",discard,__local_stdio_printf_options
	.globl	__local_stdio_printf_options    # -- Begin function __local_stdio_printf_options
	.p2align	4
__local_stdio_printf_options:           # @__local_stdio_printf_options
# %bb.0:
	leaq	__local_stdio_printf_options._OptionsStorage(%rip), %rax
	retq
                                        # -- End function
	.def	_vfscanf_l;
	.scl	2;
	.type	32;
	.endef
	.section	.text,"xr",discard,_vfscanf_l
	.globl	_vfscanf_l                      # -- Begin function _vfscanf_l
	.p2align	4
_vfscanf_l:                             # @_vfscanf_l
.seh_proc _vfscanf_l
# %bb.0:
	subq	$104, %rsp
	.seh_stackalloc 104
	.seh_endprologue
	movq	%r9, 96(%rsp)
	movq	%r8, 88(%rsp)
	movq	%rdx, 80(%rsp)
	movq	%rcx, 72(%rsp)
	movq	96(%rsp), %rax
	movq	%rax, 64(%rsp)                  # 8-byte Spill
	movq	88(%rsp), %rax
	movq	%rax, 56(%rsp)                  # 8-byte Spill
	movq	80(%rsp), %rax
	movq	%rax, 48(%rsp)                  # 8-byte Spill
	movq	72(%rsp), %rax
	movq	%rax, 40(%rsp)                  # 8-byte Spill
	callq	__local_stdio_scanf_options
	movq	40(%rsp), %rdx                  # 8-byte Reload
	movq	48(%rsp), %r8                   # 8-byte Reload
	movq	56(%rsp), %r9                   # 8-byte Reload
	movq	%rax, %rcx
	movq	64(%rsp), %rax                  # 8-byte Reload
	movq	(%rcx), %rcx
	movq	%rax, 32(%rsp)
	callq	__stdio_common_vfscanf
	nop
	addq	$104, %rsp
	retq
	.seh_endproc
                                        # -- End function
	.def	__local_stdio_scanf_options;
	.scl	2;
	.type	32;
	.endef
	.section	.text,"xr",discard,__local_stdio_scanf_options
	.globl	__local_stdio_scanf_options     # -- Begin function __local_stdio_scanf_options
	.p2align	4
__local_stdio_scanf_options:            # @__local_stdio_scanf_options
# %bb.0:
	leaq	__local_stdio_scanf_options._OptionsStorage(%rip), %rax
	retq
                                        # -- End function
	.section	.rdata,"dr",discard,"??_C@_02DKCKIIND@?$CFs?$AA@"
	.globl	"??_C@_02DKCKIIND@?$CFs?$AA@"   # @"??_C@_02DKCKIIND@?$CFs?$AA@"
"??_C@_02DKCKIIND@?$CFs?$AA@":
	.asciz	"%s"

	.lcomm	__local_stdio_printf_options._OptionsStorage,8,8 # @__local_stdio_printf_options._OptionsStorage
	.lcomm	__local_stdio_scanf_options._OptionsStorage,8,8 # @__local_stdio_scanf_options._OptionsStorage
	.addrsig
	.addrsig_sym _vsnprintf
	.addrsig_sym scanf
	.addrsig_sym _vsprintf_l
	.addrsig_sym _vsnprintf_l
	.addrsig_sym __stdio_common_vsprintf
	.addrsig_sym __local_stdio_printf_options
	.addrsig_sym _vfscanf_l
	.addrsig_sym __acrt_iob_func
	.addrsig_sym __stdio_common_vfscanf
	.addrsig_sym __local_stdio_scanf_options
	.addrsig_sym __local_stdio_printf_options._OptionsStorage
	.addrsig_sym __local_stdio_scanf_options._OptionsStorage

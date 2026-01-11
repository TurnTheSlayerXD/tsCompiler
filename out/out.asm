.def main
.endef
.globl main
main:
.seh_proc main
#SCOPE START GLOBAL_SCOPE_FUN_SCOPE_0
subq $112, %rsp
movl %ecx, 108(%rsp)
movq %rdx, 100(%rsp)
movl $0, 96(%rsp)
movl $0, 92(%rsp)
movl 92(%rsp), %ebx
movl %ebx, 96(%rsp)
movq $0, 84(%rsp)
#SCOPE START GLOBAL_SCOPE_FUN_SCOPE_0_CYCLE_SCOPE_0
subq $48, %rsp
movl $0, 44(%rsp)
movl $0, 40(%rsp)
movl 40(%rsp), %ebx
movl %ebx, 44(%rsp)
mark_GLOBAL_SCOPE_FUN_SCOPE_0_CYCLE_SCOPE_0_0:
movl $10, 36(%rsp)
movl 44(%rsp), %eax
movl 36(%rsp), %ebx
movb $1, 35(%rsp)
cmpl %ebx, %eax
jl mark_GLOBAL_SCOPE_FUN_SCOPE_0_CYCLE_SCOPE_0_2
movb $0, 35(%rsp)
mark_GLOBAL_SCOPE_FUN_SCOPE_0_CYCLE_SCOPE_0_2:
      #FOR
xor %edx, %edx
movb 35(%rsp), %dh
cmpb $0, %dh
je mark_GLOBAL_SCOPE_FUN_SCOPE_0_CYCLE_SCOPE_0_1
movq 44(%rsp), %rax
imulq $1
addq 132(%rsp), %rax
movq %rax, 27(%rsp)
movb $97, 26(%rsp)
movsbl 26(%rsp), %ebx
movl %ebx, 22(%rsp)
movb 26(%rsp), %ah
addb 22(%rsp), %ah
movb %ah, 21(%rsp)
movb 21(%rsp), %bh
movq 27(%rsp), %rcx
movb %bh, (%rcx)
movl $1, 17(%rsp)
movl 44(%rsp), %eax
addl 17(%rsp), %eax
movl %eax, 13(%rsp)
movl 13(%rsp), %ebx
movl %ebx, 44(%rsp)
jmp mark_GLOBAL_SCOPE_FUN_SCOPE_0_CYCLE_SCOPE_0_0
jmp mark_GLOBAL_SCOPE_FUN_SCOPE_0_CYCLE_SCOPE_0_1
addq $48, %rsp
#SCOPE END GLOBAL_SCOPE_FUN_SCOPE_0_CYCLE_SCOPE_0
movl $9, 80(%rsp)
movq 80(%rsp), %rax
imulq $1
addq 84(%rsp), %rax
movq %rax, 72(%rsp)
movb $0, 71(%rsp)
movb 71(%rsp), %bh
movq 72(%rsp), %rcx
movb %bh, (%rcx)
movl $10, 67(%rsp)
movl $4294967285, %ecx
callq *__imp_GetStdHandle(%rip)
movq %rax, 59(%rsp)
movl $0, 55(%rsp)
movq 59(%rsp), %rcx
leaq 55(%rsp), %r9
movq 84(%rsp), %rdx
movl 67(%rsp), %r8d
leaq 47(%rsp), %r9
movq $0, 47(%rsp)
movq $0, 15(%rsp)
callq *__imp_WriteConsoleA(%rip)
addq $112, %rsp
#SCOPE END GLOBAL_SCOPE_FUN_SCOPE_0
xor %rax, %rax
retq
.seh_endproc
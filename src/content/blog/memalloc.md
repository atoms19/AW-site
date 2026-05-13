---
title : 'memory allocation and GC'
description: 'understanding memory allocation and garbage collection'
pubDate: 'Oct 13 2025'
heroImage: ''
unreleased : true
---

# memory
i've been fascinated by memory allocation and wanted to understand exactly how it works, from the internals 


# digital understanding

memory is a fundamental component of computers,
so we figured out how to make the gates and circuit preserve their states for longer. thats how it came to be.
bistable circuit configurations like pairing two nots together or feeding the output of a nand gate back to another gave us latches

latcehs preserve the state but we wanted more control over them we so tuned them to be triggered on the edge of a clock signal ( a continues oscilating signal ) 
thus we created flip flops. we paired them together to make registers , which can store multiple bits of info hence store numbers 
then with the onset of integrated circuits we could pack more and more stuff then we created RAM

# how do we interact with RAM 

RAM (random access memory) is litterally just that we have a memory addressable space and we just can access any address and read and write to it at random 
most ram has a single unit as 8bytes or so i think, we can interact directly with RAM but most of us dont 
big MAN OS and its Memory management unit stands between you and the RAM , to prevent you from missusing it 

unless you are a kernel developer or driver developer or into low level stuff u wont intract directly with addresses on ram 
when u run a program , your OS steps in and takes care of a lot of things 



### we live in a world of abstractions 

lots of the complexity is abstracted away , and its for its own good we would never be able to do all the things we do if we had to constantly think about 
memory corruption and stuff,

OS basically handles multiple programs and make sure that they all have sufficient memory , and makes sure that no one is trying to access each others memory or take up too much space
so OS is like a safeguard on all that 
and your program by default gets stack memory and heap memory 




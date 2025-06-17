---
title : 'How does Operating Systems Work'
description: 'What i think operating systems work like'
pubDate: 'jun 17 2025'
heroImage: 'https://pbs.twimg.com/media/FA1WrP5VgAUB36b.jpg:large'
---

# what is this Operating Systems bs 
like when i first learnt about computers and OSes in depth i had this question why OS 
like why can't we give cpu instructions directly as 0s and 1s in a program 
doesnt seem so hard why install this 10GB OPerating system thingy just so that i could write a file 
this is what led me here to discuss the OS

so first of all what exactly is the need for an OS 
so we humans somehow managed to turn rock into circuits that can add numbers and follow
instructions if the instructions where given in 0s and 1s
and thats what we call computer

computers at the beginning was hardwared to ask for instructions to be entred 
Operating Systems changed this it gave us a place to store all programs 
operate multiple programs at once and also abstracted away the complexity of everything 

# how does an OS work 

OS is just what we call the entire thing as a whole OS is made out of serveral programs
at its heart is a program called the kernel but before we dive in lets see what happens when your computer boots


# BOOT PROCESS

- first thing that happens is your cpu turns on and enters rest mode or smthn and then it starts executing code at address 0XFFFFF or smthn not sure
but anyways it executes the code and it is mapped to a chip at the mother board wher a software called 
BIOS or UEFI exists (this is firmware)

BIOS is seen in older computers and is simpler to learn and UEFI is seen in newer ones
BIOS (Basic Input Output System) and UEFI (unified existansible firmware interface)

once BIOS/UEFI starts executing it starts 
## POST 
(power on self test) basically it turns on each component like ram , cpu gpu and stuff and check if its working 
if its not working it will display an error
and stops the boot process

## finding boot partition 
in BIOS systems the first part of the disk is mapped to boot related things
and in UEFI theres this boot partition `nvmeP1/boot`
and thats where your bootloader lives 

## bootloader 
whats a bootloader its the program that will boot your OS like it will set it up 
and turn on the kernel and stuff 

it does stuff like show you the grub menu , and stuff grub btw is grand bootloader smthn 
so ya it does all that and once kernel starts executing bootloader will stop its execution 
now everything is left to the main guy the kernel 

## kernel 
Kernel is the heart and soul of the operating system its like a platform where other apps are run 
linux kernel is so OP,like hell

this is like a platform for every other program to run it made computer programs more accessible 
kernel is the only program that runs in CPU in **ring 0** (aka kernel mode)

when you boot your computer , first thing that bootloader does is load the kernel into ram 
and start kernel , kernel has full control over the cpu
every other program runs on top of the kernel ie kernel calls them.

Kernels are optimized beasts they have everything from process management to file system management
and the devs who make it are soo OVerpowerdly intelligent that their brains might be larger than our planet 
metaphorically 

kernel provides these APIs to interact with it and utilize its features so

#### example 

we are tasked to make an app called vidcall which allows peeps to video call others 
but we can either make it as a pure binary from scrathc designed to run without an OS
or as an app designed to run in linux 


1) without OS implementation

you'll have to write how the computer interacts with hardware componenets , logic for how your app will 
talk to the display the user is using how it will talk to its camera what voltage to send 
what pixels to write up , how each font is rendered , how the gui will be renderd 
how your computer interacts with the disk to write data into it how should output be formated and everything 
and user will not be confident to run this thing as it might corrupt his data even with all this work

this is like a simple app will take GBs of code or even more its madness
we have to implement all the things ourselves 

2) with kernel 
things are a lot easier things just work you could just use c programs open files close them 
open a window you can use gtk toolkits to render window faster 

kernel handles talking of different hardware no need to worry about disk drivers etc


### drivers
drivers are programs that are designed to talk to kernel and hardware 
they be like midddleman between hardware and kernel 
and kernel talks to the app

so kernel does all the heavy lifting also it manages security and prevents apps from overwiting one another 
mad respect to those kernel devs out there 
but drivers are important as kernel doesnt know how to talk to hardware directly 
its the drivers that tell to do so 

like for any  hardware let it be you gpu , to operate it one must know which and which 
ports and circuits to send signals to make the chip perform this and this task 
so there is a gpu driver is like the logic for that as a program 

Nvidia doesnt like competition and didnt opensource the driver for their gpu so like they could gate keep their secrets , such evil
that aside there are like huge manuals on how to talk to machine out there so like driver devs
has a good grip on c and learning those things i believe


### kernels are not same 

different kernels are different like windows kernel is not same as linux kernel and so on 
theyll have different APIs theyll have different filesystems theyll have different set of drivers

since drivers talk to hardware and kernel 
no windows driver wont work for linux so that is that

same reason why windows app wont run on linux and vice versa cause kernel APIs are differnt 


### kernels mount filesystems 
filesystems are like entire datastructures to store stuff in disk in a meaningfull way and apis to retrieve and open the data stored 
in a way that makes sense for humans
we came up with file names to assign to a specific address in the disk so much is handled by there kernel 
here 

filesystems are of difffernt tyeps and some of them have encryption compression some of them dont some of them work on everything 
some of them dont and so on 

- Btrfs is the linux cuttting edge one 
- ext4 is linux default works fine
- NTFS is windows's one 

and stuff like FAT32 and fat64 etc are used in pendrives boot partition etc
linux kernel can identify partition formats and switch to that compatabilty so damm smart



there is so much stuff to learn its so vast isnt it so lets skip past a lot of things and just say
we have kernel started the first program that kernel starts is the initSystem 
process id one this is responsible for starting other processes and background tasks aka (daemons)

now most peeps use systemd cause it manages stuff like login logout , user entry journal and network and much more
systemd is not the only one tho some people like void linux users have their own i forgor its name which is lighter 
init system will also start the shell

and if you are on arch linux like me youll be greeeted with a tty 
tty is a program that just does the bare minimum we can see the shell and interact with it what is a shell you ask its another program duhh 

## shell 

a shell is a program that accepts human readabilsh syntax parses them and tells the kernel 
so its like a middleman between kernel and you 

altho its human readable only technical people use it , your granny prolly wont be using the shell
unless she is Ex compsci major or smthn 
anyways 
shell has commands like 

``` 
atoms> mkdir hello
 ```
the arrow you see there is the prompt , thats why we call stuff command prompt 
its a stuff you configure in your shell

mkdir is a c program compiled to binary that talks to kernel api and asks it to create a directory there 
so you can see its like a way to launch programs to itneract with kernel also you could 
do some shell scripting and adding logic etc

I personally use ZSh or nushell
but most famous shell is defo bash 
shell files are made executable .sh 


# font rendering

in a tty you can see fonts , there are bitmaps of each letter stored in kernel that is used to display fonts in a tty
bitmaps are pixelated grid of what all to light up they donts scale well 

kernel handles all the driver talk and using the display to display them woahh

you could use your computer just fine from the shell and tty but most modern peeps
we need a GUI


# GUI Graphical User Interface
a GUI is basically OP , it allows us to visually see stuff all the windows the buttons all is GUI
so GUI is  implemented by a program that talks to kernel to make and render this and such 

they call stuff called screen buffers and the kernel will draw them with help of display driver 

what is responsible for this a display server it handles the drawing of rectangles and buffers on screen

a window manager is another program that manages stuff like position of windows and stuff 
so it tells the display server what to draw and where 

the gui for apps like the buttons and evrything you see inside the app is rendered by itself 
like it can be opengl or using stuff like gtk or an electron app with chromes renderer
so ig that makes enough sense and this whatever being rendeerd gets passed window manager does the management of position of windows 
and additonal styling like canvas drawin blur etc and finally passes the output to display server which will draw the thing
it also handles keybord related stuff

and fonts are loaded from ttf  files its like vector fonts basically maths
and there are libraries for text shaping rendering etc
 and while using a terminal inside a gui environment tedxt is rendered like this 
with math 

# KDE and GNOME
these are desktop environments and what they are is a suite of (background working programs daemons) a window manager and other programs
like taskbar notification bar quick settings and all those things

sounds fckin cool right how clueless we normies are when it comes to whats going on in computers

so whats our plan we are going to make a fuckin OS by ourselves cause 
whatever these  peeps are gate keeping we will sieze it 
like they gate keep stuff from us sayin shit is soo hard we cant dooo it 
but actually shit is easy they just make it sound hard so they can have coolness all to themselves
>_< 

altho like what we are gonna make is a toy OS and wont even be near the fraction of what a real OS is 
we will learn something from it

next part defo ill showcase my toy bootloader or OS lol just for the fun of it 
(ps the image is not my rice i stole the image for it from google )


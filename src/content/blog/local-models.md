---
title : 'how to run llama.cpp in smartphones'
description: 'well be exploring how to get llama.cpp running in smartphones'
pubDate: 'May 28 2026'
heroImage: ''
---

# i love llamam.cpp

i am all in for local llms and i think they are the true future of ai for most of us common
folks , maybe enterprise hosting will continue but for most daily tasks local models are great
so to run them u need beefy computers with huge ram right ?

well No exactly , my compuer is an intel alderlake 11th gen i5 no dedicated gpu
theres integrated graphics tho( whihc is pretty usesless(foreshadowing))

## moving away from ollama

ollama is this cool wrapper around llama but i dont really like it i moved away
from it because choices with llama.cpp you have more configuration you can bring any model from
hugging face and has better speeds i think
i didnt want the wrapper i wanted the core so i made the choice of switching 

main reason being i wanted to run uncensored models , i think censorship is ass and useless
like why even bother a kid is probably not gonna install llama.cpp and download things ( i might be wrong )
and even if they do what is this gatekeeping of information and i hate it so
yes hauhauCS whoever you are thank u for making great uncensored models

# enough yap lets get into action

so first things first we need to decide what device we are working with
since the title of this blog is all about running it in smartphones smartphones it is

so ill give u a heads up on the speed
my phone is 8gb ram running a snapdragon 7s gen 3
just a mid range processor 
but it has a gpu aderno or smthn which is good 


so i compiled llama cpp for my laptop once and got around `7tps` at starting averaging around `6-5tps`
in phone its the same i was super surprised like boy tps is around the same as a beefy lap plugged into supply
isnt that crazy
and also i compiled for cpu only since i neglected existence of my iris xe igpu but that was a good thing
i tried to compile for it support then results where underwhelming iris xe actually performs way worse than cpu all by itself
due to overhead and not having dedicated vram

so we are working with phones we are gonna be compiling and all so we need a terminal

## termux enters the chat

termux is a linux emulator inside android to get it go to some oneline apk store and install it
make sure its safe
my recommendation is to go download fdroid
then download termux from there 

once termux is setup great now you have a terminal in android capable of doing everything from compiling c code
to running llama lets go

# install the packages 

you could try to clone llama.cpp from github into the termux and compile the whole thing
make sure u dont do too much `-t` cause too much tasks can overwhelm the system and lead to android
killing it (signal 9) so try to compile it in 2 tasks 

better than compiling is to just get the packages way faster and saves you lots of time

```
  pkg install llama-cpp 
```

this gives you access to commands like `llama-cli` and `llama-server` directly and u wont have to cd to some bin folder to run those
which is nice


there are 2 backend options available that is vulkan and opencl
i have tried with vulkan and i was getting errors so opencl worked for me ill be just talking about it here
```
  pkg install llama-cpp-opencl-backend
```

```
  pkg install opencl-vendor-driver
```
```
  pkg install ocl-icd
```

now we have all the packages ready for running llama-cpp
make sure you dont have both backends tho i had issues for so long cause there were both vulkan backend and opencl in my system in that case i just removed
vulkan packages toolkits etc from termux if you are following along from the start dont worry you never installed vulkan packages 


# telling dynamic linkers to look for right .so files

```
 export LD_LIBRARY_PATH="$TERMUX__PREFIX/opt/vendor/lib"
 mkdir -p "$LD_LIBRARY_PATH"
 cp "/system/vendor/lib64/libOpenCL.so" "$LD_LIBRARY_PATH"
 cp "/system/vendor/lib64/libOpenCL_adreno.so" "$LD_LIBRARY_PATH" 
```
most termux systems doesnt know where these linker files are and installing it 
and compiling it inside termux is also difficult so we are just gonna copy the files from
android to termux accessible partition 

this is a one time job make sure you export LD_LIBRARY_PATH in bashrc or smthn

just run these commands and you are good to go 


# Downloading models

i find it easier to install models with wget or curl
```
  pkg install wget
```

now go to hugging face and select model you want click the correct quantization u need
then copy the link of the download button

paste it next wget and run

```
  wget -O <file name>  <downlaod link>
  
```

give any filename tbh whatever you like with the right extension
`model.gguf`
is what i used
lol

i tried with qwen 3.6 1.5b Q4_KM and gemma 4 E2B Q3
both were givign a respectable 7tps 


# running 
now that we have a model installed we can finally run it 

```
  llama-server -m <path to model file> -c <context size> -ngl <gpu offloading layer count> -t < no of tasks>
```
after testing out everytign ngl 90 with t 2 worked the best for me 
for inference and everything
i still keep the context size around 1024 or 2056 cause models can eat up your ram and 8gb aint much
your phone will feel sluggish af

write an alias for this in bashrc cause why bother typing this thing every time 

# seeeing it in browser
llama server has a nice web ui thats why i love it
so go to localhost:8080 in your browser and enjoy your local llm

your phone is with you 90% of the time in case of emergency these tools can give good info
to some extend if it doesnt hallucinate like crazy 
even when theres no internet 


---
title : 'trying out flutter'
description: 'i am trying out flutter'
pubDate: 'Jul 14 2026'
heroImage: ''
---

# why flutter 

idk i felt like making mobile apps and having previously tried using react native i did not 
enjoy writing it as much as it introduces more complexity while trying out things 
like native modules and more 

the main problem i encountered with react native maybe i did not give it enough time ,but i saw expo
as some form of vercel like entitiy that has taken over react native web 
and it provides useful apis and libraries that hides the complexity of native sdks that are available for android
for the cost of vendor lock in which i did not like 

# setting up flutter 

having previously encountered build errors due to bad jdk version match 
this time i started by downloadign an older version of jdk


## installing right java version 

```bash
sudo pacman -S jdk21-openjdk
```

then i set the default to jdk21


```bash
archlinuxjava set java-21-openjdk
```

now running `java --version` gives us the 21.0 the current LTS build

## installing android studio

now that java is installed i decided to install 

```
yay -S android-stuido
```
went through the walk through and installed the standard verison and sdk 36 or smthn 

### installed command line tools 

went to settings -> sdk -> sdk tools (tab) -> android command line tools (check) 
click okay 
this installes the command line tools that are required by flutter

## installing flutter 

instsalling flutter just 
```
yay -S flutter-bin
```
and we approve a bunch of licenses 

```
flutter doctor --licenses
```

and finally we have everything ready 

# trying out some projects

```
flutter create project-name
```
creates a new project 


ill be doing a series on how to get stuff setup lets now setup our phone

tap build no 7 times bing bada boom and u are a devleoper 
now go to options usb debugging cause wireless idk bro 

just do shit and suit yourself dart series will be done in a week by the end well know how to build solid dart apps 


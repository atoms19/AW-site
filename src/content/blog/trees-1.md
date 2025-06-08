---
title : 'trees Introduction'
description : 'tree datastructure'
pubDate : 'jun 8 2025'
---


hey Readers, this article is focused on what trees and graphs are 
and their implementations in C/ts
if possible I'd like to go through breadth first and depth first traversals 

so basically when I wanted to do dsa things that scare me the most are trees idk why heaps seems much easier to understand compared to trees they come in wide variety and has scary names like AVL tree , binary tree, binary search tree 
so to get rid of the fear of this lets jump into it (this article will take more time than rest cause i wanna really establish the concepts here)

lets take a look at the defenition in maths 
they say tree is a hierarchial datastructure with nodes and edges 
i understand that 
```
    5
   / \
  2   3
 / \   \
0  1   2
```
so the part that holds the number is called nodes and the edges is the lines that connect two nodes together ig
but i never really understood what edges are they are like where are they when u define a struct that has 
```c

struct treeNode{
     int data;
     struct treeNode * right;
     struct treeNode * left;     
};
```
nodes can literally keep pointers to its left and right children and since i didnt exactly define a tree edge it felt really confusing 

and apparently the nodes at the end with no further branching are called leaves 

a general tree can have n number of branches per node and can hold data in any way you please 

### binary trees 
binary trees can only have 2 children per node

### binary search trees
these are binary trees where all nodes have their left branch of smaller value and right branch of higher value 

### AVL tree 
it is balancing binary search tree , where the height difference between left and right subtrees is at most 1

it wont hang wierdly like 

```
  5
 / \    (not avl tree)
4   7
   / \
  6   2
       \
       10


  5
 / \     (avl tree)
4   7
   / \
  6   2
```

used for database indices and searching inserts and deletes 

garbage collections , IP lookup , routing
AST  in compilers use avl tree for efficient symbol table management 

file system management 
AI descision trees 
GPS 



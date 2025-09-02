---
title : 'understanding LRU cache'
description: 'a basic overview of how lru caches work and their implementation'
pubDate: 'Sep 02 2025'
heroImage: ''
---


## Basic Idea

suppose you live by yourself in a small apartment, and time to time you buy items for your needs , but your apartment is very tiny and often it gets 
filled up to the point you cant add anymore items , but at the end of the day you need space for your new items ,so what does any logical being do 
he'll throw out some of the items from his apratment that he no longer uses in other words he throws out the least recently used items to make space for the new ones
this is exactly what a LRU cache does 

when the array is full and a new item needs to be added the least recently used item is removed from the cache to make space for the new one


## Naive solution 

now to convert this problem into programming one needs to keep track of his new items and old items 
easiest way to do this is an array suppose i have an array 
we are modelling the apartment problem itself here not the actual lru cache data structure

```c
char* items[5] ={ "new tooth brush" , "clothes" ,"laptop" ,"old clothes","old toothbrush" };

```
as you can see towards the front of the array we would keep the most recently used items and towards the back of the array we would keep the least recently used items
and suppose the maximum capacity of our apartment is 5 items , so items array cant be longer than 5 items

and now what happens when you use an item , we can have a function called `useItem()` for that

```c
useItem("laptop");
```

now that we have used this item laptop it will move towards the front of the array as laptop is now the most recently used item 

```c
{ "laptop" , "new tooth brush" , "clothes" ,"old clothes","old toothbrush" }
```

now what happens when we want to add a new item to our items list , suppose i bought myself a new pair of shoes 
we can just add it to the items list right ?, no our items list can only hold 5 items , so lets remove our least recently used item 
which we will find towards the end of the array 


```c
addItem("new shoes");
```

and we will remove the item at index 4 (last index) and then lets add new item to the itemsList 
since this is a new item and we just added it in , its the most recent item so it will go towards the front of the array


```c
{ "new shoes" , "laptop" , "new tooth brush" , "clothes" ,"old clothes"}
```

the size of the array is still 5 which is the maximum capacity of our apartment but hey we atleast managed to fit our new shoes 😀


suppose i used my old clothes 
then it would come towards the front of the array 
and when i add a new item again when the capacity is full it will remove the least recently used item at the end to make space for the new item 

now when i explicily decide to throw out an item from my apartment i can just remove it from the array and shift all the items to the left 

```c
removeItem("new tooth brush");

removeItem("clothes")
```
```c
{ "new shoes" , "laptop", "old clothes"  }
```

now theres space for an item cause our capacity is 5 and we only have 3 items now
so when we add a new item we can just shift all the elements to right and add the new item to the front no need to throw out a new item 
we can add two more items like this 
untill our array gets filled again and then we will have to throw out the least recently used item again 

### summary 
anyways thats the basic idea nothing complicated just an array to keep items , and towards its end we have the least recently used items 
whenver we use an item in that array it comes forward to first position , when we add a new item and the array is full we remove the last item and add the new item to the front of the array 
when we explicily remove an item we just remove it from the array and shift all the items to left


## basic implementation in c

code might look long but its just c being c python code would be a couple of lines long but c makes us understand the real problem with this approach 

```c
#include <stdio.h>

char* items[5];  //global array to hold strings
int capacity=5;  //maximum capacity of array 
int size = 5;   //current size of array 


void addItem(char* newitem){
    if(size == capacity){ //if array is full 
        //remove last item (least recently used item)
        items[capacity-1] = NULL; //removing last item 
        size--; //decreasing size of array 
    }
    //shift all items to right 
    for(int i=size-1 ; i>=0 ; i--){
        items[i+1] = items[i];
    }
    //add new item to front of array
    items[0] = newitem;
    size++; //increase size of array 
}
//          |
//   [1,2,3,4,5,6]
//   [0,1,2,3,5,6] shift elements at the right of index to left by 1 place to make room in the front
//   [4,1,2,3,5,6] add the item used to the new place
void useItem(char* item){
    int index = -1;
    //find index of item in array : same as linear search 
    for(int i=0 ; i<size ; i++){
        if(items[i] == item){
            index = i;
            break;
        }
    }
    if(index == -1){
        printf("item not found\n");
        return;
    }
    //shift all items to right from index to 0
    char* temp = items[index]; //store the item at the index as shifiting will overwrite it 
    for(int i=index ; i>0 ; i--){
        items[i] = items[i-1];
    }
    //add item to front of array
    items[0] = temp;
}


void removeItem(char* item){
    int index = -1;
    //find index of item in array : same as linear search 
    for(int i=0 ; i<size ; i++){
        if(items[i] == item){
            index = i;
            break;
        }
    }
    if(index == -1){
        printf("item not found\n");
        return;
    }
    //shift all items to left from index to size-1
    for(int i=index ; i<size-1 ; i++){
        items[i] = items[i+1];
    }
    items[size-1] = NULL; //remove last item as it is now duplicate
    size--; //decrease size of array 
}



int main(void){
    //initializing array with some items 
    items[0] = "new tooth brush";
    items[1] = "clothes";
    items[2] = "laptop";
    items[3] = "old clothes";
    items[4] = "old toothbrush";

    //using an item 
    useItem("laptop");
    //adding a new item 
    addItem("new shoes");
    //removing an item 
    removeItem("new tooth brush");

    //printing all items in array 
    for(int i=0 ; i<size ; i++){
        printf("%s\n",items[i]);
    }

    return 0;
}
```


### problems with this approach

if you havent noticed by now this approach is very inefficient
lets say the time complexity of adding a new item is O(n) because in worst case we have to shift all the items to the right (almost all cases in our implementation)
the time complexity of using an item is also O(n) because if we were to use the last item we will have to shift all elements to put it to the front
the time complexity of removing an item is also O(n) because in worst case we still have to shift all elements 



so lots of shifiting ,and linear searching involved in this method 
how can we constructively improve up on this approach ?


- do we know a data structure capable of inserting elements and reordering elements without needing to shift all elements ?
- do we know a data structure capable of searching elements in less than linear time ?


yes we do

## the second approach (OPTIMAL appraoch)

our first question is answered by linkedlists 
linkedlists allows for O(1) insertion and deletion of nodes


lets reimagine our old approach with linkedlist 
we are going to be using doubly linkedlist as we can then traversefrom both ends 
```c
struct Node {
    char* item;
    struct Node* next;
    struct Node* prev;
};
struct Node* head = NULL; //head of linkedlist
struct Node* tail = NULL; //tail of linkedlist

```

so now in this case we dont need any shifting to add a new element to the front 
just make a new node set its next to the current head and set head to this new node
and to remove the last element just set tail to tail->prev and set tail->next to null
and to use an item we just need to remove it from its current position and add it it to the front 
all these operations take o(1) time

but what about searching an item in the linkedlist ?
we still have to do linear search in linkedlist to find an item this is inefficient 


to solve this problem we can use a hashmap
a hashmap is nothing but like a table of key value pairs basically we are writing down what item is at what index
so that we can directly access it in o(1) time

for example heres a python dictionary, this is a hashmap
the blow code is a basic implementation in python to show how it works
```python

cache = {
    "new tooth brush" : node1,
    "clothes" : node2,
    "laptop" : node3,
    "old clothes" : node4,
    "old toothbrush" : node5
}

# now to access a node aka search we just have to do cache[item]
def useitem(item):
    if(item not in cache):
        print("item not found")
        return
    node = cache[item]  # O(1) time complexity we get the node of laptop 
    node.next=None  # we can now remove it from its current position in O(1) time
    node.prev=None
    head.prev = node  # add it to the front in O(1) time
    node.next = head
    head = node
    node.prev = NULL
    return


def addItem(item):
    if(size == capacity): #if array is full 
        #remove last item (least recently used item)
        cache.pop(tail.value) # remove it from hashmap in O(1) time
        tail = tail.prev  # remove it from linkedlist in O(1) time
        tail.next = NULL
        size-=1; #decreasing size of array 
    #add new item to front of linkedlist in O(1) time
    newnode = Node(item)
    newnode.next = head
    head.prev = newnode
    head = newnode
    newnode.prev = NULL
    cache[item] = newnode  # add it to hashmap in O(1) time
    size+=1; #increase size of array

def removeItem(item):
    if(item not in cache):
        print("item not found")
        return
    node = cache[item]  # O(1) time complexity we get the node of
    cache.pop(item) # remove it from hashmap in O(1) time
    #remove it from linkedlist in O(1) time
    if(node.prev):
        node.prev.next = node.next
    if(node.next):
        node.next.prev = node.prev
    if(node == head):
        head = node.next
    if(node == tail):
        tail = node.prev
            
    size-=1; #decrease size of array

```

but sadly we got no hashmap in C , in python it was builtin litterally every other language has it but nope not in c 🥲
we have to take things into our own hands and implement it ourselves

I wont be discussing how the hashmap works here as it would take a lot of time , to discuss the hashing function to collission handling and everything 
-do refer external resources to understand how hashmaps work
-we are going to need to implement a basic hashmap to speeden up the process of searching


## project structure 


linkedlist.h : contains the function definitions to manipulate the linkedlist
linkedlist.c : contains the functions to manipulate the linkedlist

hashmap.h : contains the functions definitions to manipulate the hashmap
hashmap.c : contains the functions to manipulate the hashmap

main.c : contains the main function to test the lru cache

### working with multiple files 


---

#### Using Header Files

Header files (`.h`) declare functions, structs, and macros to share between `.c` files.

##### 1. **Header File (`linkedlist.h`)**

```c
#ifndef LINKEDLIST_H
#define LINKEDLIST_H

typedef struct Node {
    int data;
    struct Node* next;
} Node;

Node* createNode(int data);
void appendNode(Node** head, int data);
void printList(Node* head);
void freeList(Node* head);

#endif
```

##### 2. **Source File (`linkedlist.c`)**

```c
#include <stdio.h>
#include <stdlib.h>
#include "linkedlist.h"

Node* createNode(int data) { /*...*/ }
void appendNode(Node** head, int data) { /*...*/ }
void printList(Node* head) { /*...*/ }
void freeList(Node* head) { /*...*/ }
```

##### 3. **Main File (`main.c`)**

```c
#include "linkedlist.h"
#include "hashmap.h"

int main() {
    Node* head = NULL;
    appendNode(&head, 10);
    appendNode(&head, 20);
    printList(head);
    freeList(head);
    return 0;
}
```

### 4. **Compile**

```bash
gcc main.c linkedlist.c hashmap.c -o lru_cache
./lru_cache
```

**Tips:**

* Keep declarations in `.h` and implementations in `.c`.
* Use `#ifndef/#define/#endif` to avoid multiple inclusion.


this is just an example btw to get an idea of how we are going to handle multiple files in c

---


## conclusion 

so thats its a basic outline of our project , to demystify lru caches a bit 
they arent as scary as they sound 


just that we need to implement a doubly linkedlist and a hashmap to get the optimal time complexity of O(1) for all operations
to do it with array is easy 

do read up on refrences and understand how hashmaps and doubly linkedlists work

## references for hashmap and doubly linkedList:
- [hash tables](https://benhoyt.com/writings/hash-table-in-c/)
    - blog by some guy gives explanation to do it in c
- [douubly linkedl list](https://www.geeksforgeeks.org/c/doubly-linked-list-in-c/)
    - geeks for geeks refrence 

incase things doesnt makes sense checkout more refrences

## refrences for lru cache
- [leetcode solutions](https://leetcode.com/problems/lru-cache/solutions/)
    - many good answeres here 
- [lecture by striver](https://takeuforward.org/data-structure/implement-lru-cache/)
    - very detailed explanation 
- [github refrence](https://github.com/dogukanozdemir/C-LRU-CACHE)
    - once we mess up we can look at other's code 

---
title : 'intro to sorting algorithms 4'
description: 'heap sort'
pubDate: 'jun 8 2025'
---


Hey reader. finally we have done it we have overcame the challenges of many sorting algorithms and has arrived at heap sort 

lets throw in our route map again

1) insertion sort [x]
2) selection sort [x]

3) merge sort [x]
5) quick sort [x]

6) bubble sort [x]
7) cocktail shaker sort [x]

8) heap sort <
9) priority ques <

10) counting sort
11) radix sort

heap sort is radically different from previous sorting algorithms as they rely on a new data structure which you may or may not be familiar with , a max-heap 
think of it as a heap where the largest things stays on top sorta like billionaires in our society lol


its basically a tree data structure which follows heap min and max operations or satisfies their conditions 


```

        5
      /   \
     3    4 
    /  \
   2   1 

```
now what we do basically is make these max heap from the array that we wanna sort lets use a function `buildHeap()` for that 
and then since heap is already sorted we are done .right ?

NO , its never that easy 
max heap just shows you that the one on top is the largest it necessarily doesnt follow a sorted order 

when we build the heap once we get the first largest element now that we know the largest element lets put it to the end of the array 
by swapping the last element to this largest element (root of the heap)
also remove this largest element from the heap , so in next iteration we find the second largest


now rebuild the heap , `heapifydown()` which is a function that will like go through the heap again and get the largest at the root again  which will result in the second largest element being found now replace the second last index with this and so on 

and in time youll have the entire array sorted
building heap takes O(n) and heapify takes O(log n) 
overall this process is time complexity of **O(n log n)** over all cases

and it is inplace sorting so O(1) space complexity very good damm 
and it doesnt rely on recursion that much lol


its used in priority ques task scheduling etc very useful

now to get to the heart of heap sort its pretty difficult yk i cant just memorize an code and call it a day lets ask why it works 

### important things to be aware of 
fancy guys might not tell u this but an array can be used as a heap , oop programmers would have already made a class heapnode by now 

why does an array work as a heap and how 
```
  6
 / \
4    5
/ \   \
2  1   3

lets make this into an array from 
let heap =[6,4,5,2,1,3]

```
this makes things easier for us we could just make an array and call it a heap without having to define classes etc

you might be saying but how does this beat a regular class or struct based definition

```c

struct HeapNode{
     int data;
     struct HeapNode * right,left,parent;

}

```
which gives u ability to access the right and left node of any node using the members right and left and parent node by using .parent 

very cool but u can do litterally do all the same with just maths and array 
```
 0 1 2 3 4 5
[6,4,5,2,1,3]
```
let see some patterns look how the right children of any element are odd numbers and left ones are even indices 

that makes to get the index of right child of nth element just find nth odd number , 2*n +1

and to find left child of nth element just do 2*n + 2 (since index starts with 0 we have to account for that by adding 2 ) 

notice how the parent is just i-1 for right nodes and i-2 for left 
left node are given by i=2p+2 then p (parent index) by rearranging is
`p=(i-2)/2`
right nodes are given by i=2p+1
`p=(i-1)/2`

we take floor of the formula for p to find the p since parent index cant be decimal 
`Math.floor((i-1)/2)`gives parent index of any node with index i 

so voila you just made a heap using just array and a bit of maths 

now what we have created is just a heap its not a min heap or max heap for that we need to write logic for the largest element to be on top of the heap (heapifydown) 

we start at each node and check if its children are larger than it if it is we swap the node with the child 
and continue untill all nodes satisfies this heap property (for max heap)


```ts
heapifyDown(array,size,startIndex=0){
left=2*startIndex+ 2
right=2*startIndex + 1
whattoswap=startIndex

if(right < n){ //checking if right exists"
     if(array[right] > array[startIndex]){
        whattoswap=right
     }
}

if(left < n){ //checking if right exists"
     if(array[left] > array[startIndex]){
        whattoswap=left
     }
}

if(whattoswap!==startIndex){
    temp=array[whattoswap]
    array[whattoswap]=array[startIndex]
    array[startIndex]=temp

     //recursively call it 
     heapifyDown(array,size,whattoswap)
}



}

heapifyDown(a,10)

```

heapify down is an important function as this forms the basis for converting an array into a max heap 
to do so we start from the bottom up implying we start from the end of the array and build the heap by using heapify to modify the array in such a way that parents are larger than childrenn

from about half of the length of array you have leaf nodes so u should start from there and work towards 0 

```ts
buildHeap(array){

for(i=array.len/2 ; i>=0 ;i--){
    heapifyDown(array,array.len,i)
}

}

}

```
when adding elements to a heap you might encounter heapifyUp which works its way up from the bottom and swaps elements that dont fit 
with its parents this is also useful but not useful here 
anyways ill drop a quick algorithm of how they work 
```ts
heapifyUp(array,index){
    if index==0 return 
    parent=floor(index-1/2)
    if array[index] > array[parent] then
        // swap them too lazy to write 
        heapifyUp(array,parent)

}
```



now we are ready to tackle heap sort algorithm 
which will first build a max heap then use iteratively gets the 

```ts
heapsort(array){
    buildHeap(array)
    for(i=n-1; i >0; i--){
        root=array[0]
        array[0]=array[i]
        array[i]=root
        heapifyDown(array,i,0)
    }


}


```

well there u have it heap sort what a wonderful sorting algorithm which has so many low level applications now like i said before lets discuss priority scheduling which is an application of heapsort 

# priority scheduling 
in Os processes has to be scheduled and for scheduling process we often use heaps for priority based scheduling , since heaps can help us keep track of the task with most priority 

it is used in both preemptive and non premptive priority scheduling ( preemptive just means inturupts are allowed during process runs ) 

also used in shortest job next algorithms (min heaps prolly)

its for another article since this is already too long 











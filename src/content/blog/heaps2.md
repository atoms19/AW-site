---
title : 'heaps revisited'
description: 'time has come to revisit heaps'
pubDate: 'Oct 04 2025'
heroImage: ''
---



# heaps revisited 

i have covered heaps before but at that time i was in a rush and could not go into the depth of the topic as i usually love 
so here is a revisied blog to explore heaps in much more detail 

## heaps breifing 
heaps are datastructers ( they are trees basically) that follows a heap property, quite similar to binary search trees
but here just that either roots are greater than equal to their children ( max heaps) or roots are less than equal to their children ( min heaps)

yes we have 2 types of heaps 
1) max heap : here root is greater than equal to its children
2) min heap : here root is less than equal to its children

### heap representation
heaps for the simplicity of implementation is always represented using arrays nothing is stopping you from using linkedlist trees 
but arrays are simpler than that 


## representing trees as arrays 
i assume a lot of previous knowledge of trees etc so ill just breif 
basically 

you can do like parent, left child , right child , left child of left child , right child of left child , left child of right child , right child of right child and so on
and put em in a list 

like this 
          10
        /    \
      15      30
     /  \    /  \
   40   50  100  40

can be represented as
[10, 15, 30, 40, 50, 100, 40]

and the given the index of any node u can get its left child by 2*i + 1 and right child by 2*i + 2 and parent by (i-1)//2
if you follow 0 based indexing 
but thats hard we follow 1 based indexing this makes things more easier 

basically we leave out the first index and start from 1
[_, 10, 15, 30, 40, 50, 100, 40]

now left child is 2*i and right child is 2*i + 1 and parent is i//2

super easy 

# heapify

heapify is a confusing name cause it could either stand for the proces of making a heap from an array or just swapping elements to maintain the heap property
in my case i'd like to refer to the latter one as heapify 
and the former one as build heap which is what makes logical sense anyways 


#### what does heapify do ?
bro its easy just play like inspector and look if there is some children that are violating the heap property 
if yes then swap em with its parent and continue down the tree 

yes its a recursive algorithm and a confusing one at that 
lets break it down to simpler terms 

#### buildHeap

build heap is the process of converting a regualr array to a heap ( regular tree to a heap tree)
this is done by calling heapify on all non leaf nodes from the bottom up 

why bottom up ? , cause heap property assumes that the children of any nodes are already heaps
so we just swap in one go so for the swapping to be correct we need to start from the bottom up 
also calling heapify on leaf nodes is pointless cause they dont have any children to be swapping with 

so we start from non leaf nodes to the root node , root node is on index 1 (as we follow 1 based indexing for ease)
given an array of size n , its lef nodes are at index n-1 , so the last non leaf node is at index (n-1)//2 (parent of last leaf node)


```js
fun buildHeap(arr){ 
    let n = arrayLength(arr)
    for( i in (n-1)/2 -> 1){
        heapify(arr, i)
    }
}

```

> **flex** i am not using pseudo code here, its code in AWL >_< my own language (compiler is there in my github)

#### heapify
we breifed on its operation before we are gonna discuss its algorithm yet again 
so basically it validates heap property for a given node and its children 

it assumes the children are already heaps thats why the whole bottom up fiasco
and its a recursive algorithm cause a single swap does not gurantee the heap property for the subtree rooted at the swapped child
for example
``` 
    10
   /  \ 
  5    30
 /  \
 40   1
```
is supposed to be a min heap 
so one was supposed to be on top anyways lets call heapify on 10 , it sees that 5 is smaller than 10 and swaps it right away
```
      5
     /  \
    10    30
    /  \
   40   1
```
is 10 in the right positon yet ?
no cause 1 is smaller than 10  in this case we descend down the tree and call heapify on the swapped node again ie position of 10 ( aka ex 5)
```
      5
     /  \
    1    30
   /  \
  40   10
```

now its in the right order 
so heapify can be thoguht of as putting elements in the right position in a heap
lets now write an algorithm for it

as this version of heapify descends down the tree its called `heapify down`  
we will learn about a sift up version later `heapify up`

for max heap the property is that root >= children
for min heap the property is that root <= children

for max heap we find the largest among the root and its children, if root we dont swap else we swap with children and call heapify on the swapped child
for min heap we find the smallest among the root and its children, if root we dont swap else we swap with children and call heapify on the swapped child

##### heapify for min heap 
```js
fun heapify( tree , root ){
    if( i > arrayLength(tree) ) return  # out of bounds 
    let left = 2*root
    let right = 2*root + 1
    let smallest = root
    if ( left < arrayLength(arr) ){
       if( tree[left] < tree[smallest] ) smallest = left
    }
    if ( right < arrayLength(arr) ){
       if( tree[right] < tree[smallest] ) smallest = right
    }
    if( smallest != root ){
       let temp = tree[smallest]
        tree[smallest] = tree[root]
        tree[root] = temp  
       heapify( tree, smallest )
    }
}
```

##### heapify for max heap 
```js
fun heapify( tree , root ){
    if( i > arrayLength(tree) ) return  # out of bounds 
    let left = 2*root
    let right = 2*root + 1
    let largest = root
    if ( left < arrayLength(arr) ){
       if( tree[left] > tree[largest] ) largest = left
    }
    if ( right < arrayLength(arr) ){
       if( tree[right] > tree[largest] ) largest = right
    }
    if( largest != root ){
         let temp = tree[largest]
         tree[largest] = tree[root]
         tree[root] = temp
       heapify( tree, largest )
    }
}
```


thats it my peeps, heaps are fun and useful for priority queues and other stuff like heapsort 
but are we done ? we are diving into details we are revisiting priority queues as well as heapsort and diving into complexity of the operations

# Operations on heaps 

what use is a datastructure if u cant add or remove elements from it
obv we can do it naively by adding to the end of the array and calling buildHeap again
and u could call buildHeap again after removing elements to maintain the heap property

but thats inefficient giving us O(n) time compexity for both operations 
so we need better ways to do it


## insert 
so when i insert an element in a heap i add it to the end of the array , then i could call like a function called `heapify up` or `sift up`
that would take the element and move it upwards to the right position just like heapify down but in reverse

why do we need a new function for this cant we just add the element at the front and then call heapify down ?
yes it works but its inefficient again 
to make room in the front we need to shift all elements to the front giving us O(n) time complexity
on top of this calling heapify down would take O(log n) time

so total time complexity would be O(n) + O(log n) = O(n)
exactly what we wanted to avoid

so we create a new function `heapify up` or `sift up`
```js

fun heapifyUp(tree,index){
   if( index < = 1 ) return # root node or out of bounds   
   let parent = index / 2
   if( parent < arrayLength(tree) ){
       if( tree[parent] > tree[index] ){  # for min heap
           let temp = tree[parent]
           tree[parent] = tree[index]
           tree[index] = temp
           heapifyUp(tree, parent)
       }
   }
}

``` 

this allows us to insert in O(log n) time complexity



```js
fun insert(tree, value){
    tree.push(value) # add to end of array
    heapifyUp(tree, arrayLength(tree) - 1) # call heapify up on the new element
}
```

# removal of root element
we have no use of removing arbitrary elements from a heap other than the root element cause root element is the only one that is guranteed to be the smallest or largest element
so we just take the array remove it and done right we could do heapify down on the new root to maintain the heap propery right ?

NOPE 
we cant just remove the root element and call heapify down on the new root
cause removing the root element would leave a hole in the array 2 children with no parent
and we need heaps to be complete binary trees 

so to fill the blank we take the last element and move it to the root position and call heapifyDown on it

```js
fun removeRoot(tree){
    if( arrayLength(tree) <= 1 ) return null # empty tree
    let root = tree[1]
    tree[1] = tree[arrayLength(tree) - 1] # move last element
    tree.pop() # remove last element
    heapify(tree, 1) # call heapify down on new root
    return root
}
```
# Complexity analysis 
## time complexity
### heapify 
worst case time complexity of heapify of O(log n) as it gets halfed for a binary tree as we descend down the tree
best case time complexity of O(1) as it might not need to swap at all

### buildHeap
this might come out as a surprising result , most yall expecting O(n log n ) already as we are calling almost n/2 times and heapify which itself takes O(log n) 
but its not the case 
cause we are buidling up from the bottom only a few nodes near the root will take O(log n) time
and most of the nodes will take O(1) time as they are leaf nodes or near

so the time complexity is O(n) to our surpise 

( mathematical proof might be added later when i feel a bit nerdy)

### insert
insertion takes O(log n) as heapify up takes O(log n) time

### removeRoot
removal of root takes O(log n) time as heapify down takes O(log n)

## space complexity
heaps take O(n) space as they are represented using arrays

# Applications of heaps 

# Heap Sort 

my intution tell me like i build the heap then i take the min element aka root then enque it into a queue then i remove it from the heap then call heapify down again (remove method swap with last) take the new root enqueu and continue till there is no element left in the heap
my queue is basically the result 
```js
fun heapSort(arr){
    let heap = buildHeap(arr)
    let result = []
    while( arrayLength(heap) > 1 ){
        let min = removeRoot(heap)
        result.push(min)

    }
    return result
}
```

this is conceptually is easier to understand its inefficient and we cs guys are nitpicky about efficiency
we gotta make this in-place without need for a new array 


so how do we do that ?

we can build a max heap so largest elements are at the root 
we take the root and swap it with the last element we decrease the size of the heap by 1 ( basically it will ignore the last element we added now) 
we call heapify down on the new root
this repeated process will give us a sorted array in place 
its being built up from the back cause we are decreasing the size of the heap 
all the way till it becomes 1 so heapifyDown will stop descending earlier on wont mess with the ones we have already moved to the back 


```js
fun heapSort(arr){
   let heap = buildMaxHeap(arr) # build max heap 
   while( heap.size > 1 ){
       swap(heap[1], heap[heap.size - 1]) # swap root with last element
       heap.size--
         heapify(heap, 1) # call heapify down on new root
   }
}
```

this will sort the array in place
# Complexity analysis of heapsort

## time complexity
building the heap takes O(n) time
we call n-1 times removeRoot which takes O(log n) time
so total time complexity is O(n) + O(n log n) = O(n log n)

## space complexity
heapsort takes O(1) space as it is done in place
if recursion stack space is considered then O(log n) space is taken

# priority queues 
you can use structures instead of just integers in heaps and u can sort them based on a priority value or smthn 
and u get working priority queues with relative ease
 no need of insertion sort or anything

(this is left as excerise to the reader)

# conclusion 
heaps are super op , and really just easy to implement , intutive as well 
just understand the core concepts 

- heapify assumes children to be heaps , descend down to the swapped child to maintain heap property 
- while building heap start from bottom non leaf nodes to the root
- heapify up for insertion , go to the parent if violated and continue till root
- for removal of root swap with last element and call heapify down on new root

thats all peeps ❤️ to all peeps reading this  

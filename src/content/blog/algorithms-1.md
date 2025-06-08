---
title : 'intro to sorting algorithms 1 '
description: ' insertion sort and selection sort '
pubDate: 'jun 8 2025'
---

Hey reader , you have stumbled across a series of posts where I'll be speed running through algorithms for sorting arrays ,linked-lists , heaps etc 

this series will deeply go into the algorithms and try to understand them ,when I was starting I felt like algorithms are something you have to come up on your own like independently discover then after long hours and wasting a lot of time I realized I am not the tourist lol. 
my IQ is barely enough to do Javascript so i shouldn't waste my time trying to race to the moon using an aircraft that barely flies 


well this course is for you as a dumb dumb I explain these things as dumb dumbs would understand   

sorting algorithms came from the need to sort things cause humans are fundamentally data organizing machines , so its only natural that we love sorted data

so when we had stored items in memory as arrays trees etc we also wanted to sort them in ascending or descending order 
and we developed many algorithms for it each algorithm has a tradeoff and some advantages 

so we will look into that exactly 
# sorting algorithms

1) **insertion sort**  <
2) **selection sort** <

3) merge sort
4) quick sort
 
5) bubble sort
6) cocktail shaker sort 
 
7) heap sort 
8) intro to priority ques

9) counting sort 
10) radix sort  

we will go over each and identify their time complexity ( time efficiency ) space complexity (space efficiency) their algorithm and  implementation

this article is meant to be small and readable so i decided ill be going at 2 algorithms per article , in this one we will be covering insertion sort and selection sort  



### insertion sort 
insertion sort kinda feels like putting things to its actual place , like while going through the things to sort when we something we put it at its correct place 

this is how humans naturally sort things like suppose we have a bunch of screws we have to sort them such that the rustiest screw comes first and shiniest screw at last , so when going over the screw we will put the rusty ones at the start and arrange them one by one 

this algorithm happens a lot by shifting things , it starts by comparing element at second position (index: 1) to the one at index: 0 if it is lesser then it shifts it to the right and the loop continues till the second element gets into the right position and outer loop continues this and make this happens till all the elements 
are in the right position 

note that the comparison happens to elements before the selected element so the time complexity is incremental and its O(n^2)
in worst case and O(n) in best case already sorted array 

we are only using a single storage space and it is constant , that is to store the element which we are selecting for the iteration making space complexity just O(1) and in-place swapping so its independent of no of elements 

we will be using typescript

initial implementation ( this is not o(1) as we arent using any extra space at all ) 
```ts
let a=[1,2,5,3,6]

for(let i=1; i < a.length ;i++){
     let j=i-1 //setting j to the previous index of i 
     while(a[i]<a[j] && j >=0){ //condition  
           a[j+1]=a[j] //shifting to the right 
           j-=1
       }
     a[j+1]=a[i]
}
```
[cool](https://www.youtube.com/embed/Q1JdRUh1_98?si=oP9v6NKq58MCmPwz)

### some doubts i had initially 

1) where does the array shift into , wont this overwrite one of the elements yes while shifting we are essentially using up the space of the selected element we will overwrite the selected element so its important to store the element before we begin shifting making the space complexity O(1) again 

2) another doubt i had was why j+1 and not j while setting the last bit 
but that is also cleared up as the loop ends it subtracts a j again from the actual j where we have to enter the item so it is one less , to get the actual index to insert our key we get the a[j+1]

3)one more doubt i had was what lies there in a[j+1] wont that be overwritten , since we shifted the last element we shifted is present as a duplicate on a[j+1] so we can overwrite that with no worries 
4) j is greater than 0 condition is given to stop our loop at 0 even if the condition hasn't been satisfied yet

so that gives rise to our final implementation

```ts
let a=[1,2,5,3,6]

for(let i=1; i < a.length ;i++){
     let j=i-1 //setting j to the previous index of i 
     let key = a[i] //storing the selected element 
     while(a[j]>key && j >=0){ //condition  
           a[j+1]=a[j] //shifting to the right 
           j-=1
       }
     a[j+1]=key 
}
```  

### more info 

- insertion sort has space complexity O(1) and time complexity that varies from O(n) - O(n^2) , O(n) for already sorted array and o(n^2) for reversely sorted array

- can be used in small datasets where the data is nearly sorted as performance would be close to O(n) 

- it is a stable sorting algorithm implying that for equal elements the order of the elements will be preserved based on their appearance in the original unsorted array 

# Selection sort

this sorting algorithm is where we choose the smallest element from unsorted part and swap it to the first element of the unsorted part 

the algorithm itself is quite easy
Given an array arr of size n:
    Loop from i = 0 to n-2.
    Find the index of the smallest element in the remaining unsorted array.
    Swap it with arr[i].
    Continue until all elements are sorted.

my initial implementation was like this 
```ts
let a=[1,3,2,6,4]

for(let i=0 ; i <a.length ; i++){
   let smallestAt=i
  for(let j=i ; j< a.length ;j++){
        if(a[j] < a[smallestAt]){
            smallestAt=j
          }          
   }
   //swapping
   let temp=a[i]
   a[i]=a[smallestAt]
   a[smallestAt] =temp
}
```


i stored the index of the smallest element as it is needed for swapping in the end 

with some critical evaluation i realized i only need to swap if a smaller element than the element at i was found and also i only need to compare it to the elements after i , so i+1 
why should i compare it to itself 

```ts
let a=[1,3,2,6,4]

for(let i=0 ; i <a.length ; i++){
   let smallestAt=i
  for(let j=i+1 ; j< a.length ;j++){
        if(a[j] < a[smallestAt]){
            smallestAt=j
          }          
   }
   //swapping
   if(smallestAt!= i){
   let temp=a[i]
   a[i]=a[smallestAt]
   a[smallestAt] =temp
}
}
```

{% embed https://www.youtube.com/embed/Iccmrk2ZWoc?si=3v0CGSeb7d5iyH-j %}

selection sort is intutive when u think of it , its like picking the smallest one of the unsorted part comparing it with we have already sorted and swapping them 

but this shit is not efficient like look at this blud we are comparing and constantly looking for smallest element making the time complexity of this O(n^2) no matter how the array is sorted 


worst case , average case , best case it is all time complexity is O(n^2) and 
it sorts in-place so no extra memory is needed hence O(1) space complexity 

also its not stable and for equal elements your order might not be preserved

seems like a downgrade from insertion sort at first but this is a simple algorithm that can be used in small datasets where the need for stability is not there  and minimizing the number of swaps 

selection sort only performs n-1 swaps for an array of n elements while sorting it while insertion sort performs lots of swaps (for shifting etc O(n^2) swaps in worst case)

this nature of selection sort makes it a good choice for large chunks of data where swaps are expensive 
told ya each algorithm is special in its own way and don't discriminate lol  

tysm for your time hope u find it useful 


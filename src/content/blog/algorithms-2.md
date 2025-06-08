---
title : 'intro to sorting algorithms 2 '
description: 'merge sort and quick sort'
pubDate: 'jun 8 2025'
---
Hey reader , back again ? so lets brush up what we learnt last article so we've discussed about insertion sort and selection sort , one works by shifting and inserting other by finding smallest and swapping ,etc etc and so on check on the older article if u haven't read that already

lets throw in our route map again 

1) insertion sort  [x]
2) selection sort [x]

3) merge sort <
5) quick sort <
 
6) bubble sort
7) cocktail shaker sort 
 
8) heap sort 
9) priority ques

10) counting sort 
11) radix sort  

we have reached merge sort and quick sort 
now these guys are used everywhere in programming as they scale well for big datasets they are the best we got 

both of them works by the principle of divide and conqueror ,which works very well and can even topple the largest of largest empires to its knees (rip india)
same goes for data when u break it down to smaller chunks and sort them portion by portion eventually you'll have the entire data sorted  

# merge sort 

merge sorts works by repeatedly halfing the array till it becomes sigular and addding them together while sorting them along the way 

our implementation is pretty damm cool

```ts
function merge(left,right){
        let sortedArry=[]
        let i=0;
        let j=0;

        while(i< left.length && j<right.length){
                if(left[i]<right[i]){
                    sortedArry.push(left[i])
                    i++
                }else{
                    sortedArry.push(right[i])
                    j++
                }
        }
        return [...sortedArray,...left.slice(i),right.slice(j)]

}

function mergeSort(arry){
         if(arry.length<=1) {
            return arry
         }
         let mid=Math.floor(arr.length/2)
         let left=mergeSort(arry.slice(0,mid))
         let right =maergeSort(arry.slice(mid))
        


        return merge(left,right)
}

```
but its rather confusing when u think about the call stack so lets break the call stack down 
```
<  initailly lets consider an array of 6 elems

mergeSort is called 
it finds half 3
right half is set to mergesort of half 3 -> 
                    |- mergesort called of arry element 3 
                            |- finds half as 1 
                            | - mergesort called again on 1 
                                        |- array returned 1 
                            |- mergesort called again on 2 
                                        |- array split and mergesort called again on 1 and 1 
                            |- merges(2 1)
                            | returns sorted right half 
                     |- mergesort called of arry element 3 
                            |- finds half as 1 
                            | - mergesort called again on 1 
                                        |- array returned 1 
                            |- mergesort called again on 2 
                                        |- array split and mergesort called again on 1 and 1 
                            |- merges(2 1)
                            | returns sorted left half 
                    | merges them together to get final sorted array 
```

merge sort always shows the time complexity of O(nlog n) and space complexity of O(n)
since it doesnt varies the average case worst case and the best case are all the same and it is O(n log n)

merge sort is a stable sorting algorithm meaning that order of the elements with equal values are presevrved when comparing to the original as they appear first 

it is very useful to sort linkedlists
as linkedlist does not support indexing and random acess halfing them with slow and fast pointers work best making it suitable 
no need of extra space as pointers can be swapped directly 
consistant time complexity O(n log n)

disadvantage : memory usage and recursive overhead 

# quick sort 
i always thought quick sort hard but turns out it easy as well 
so basically we divide array based on a piviot element and then put elements bigger than pivot to its right and lesser to its left
then we recursively do it with left part and right part 

and at the end we will have a sorted array 

pivot choice is very important as it decides the performance of the algorithm 
here we went for the easist where we use the last element as the pivot 

{% embed https://www.youtube.com/embed/dbU7vOEvnjY?si=E6iAKPILK88DhspQ %}
```ts
function quickSort(arr){
    if(arr.length==1){
        return arr
    }

    let pivot=arr[arr.length-1]
    let right =arr.filter(e=> e > pivot)
    let left =arr.filter(e=>e< pivot)
    
    return [...quickSort(left),pivot,quickSort(right)]

}

```
using first element or last element as pivots work best for random data but fails for sorted or reverse sorted data and drops to O(n^2) time complexity 


other pivots we can use are 
- random pivot 

```ts
function quickSort(arr) {
    if (arr.length <= 1) return arr;
    
    let pivotIndex = Math.floor(Math.random() * arr.length);
    let pivot = arr[pivotIndex];

    let left = arr.filter((x, i) => x < pivot && i !== pivotIndex);
    let right = arr.filter((x, i) => x >= pivot && i !== pivotIndex);

    return [...quickSort(left), pivot, ...quickSort(right)];
}

```

works best for large datasets, avoids worst case scenario

- median of three pivot 
```ts
function median(arr){
    let first=arr[0]
    let last=arr[arr.length-1]
    let mid =Math.floor(arr.length/2)

    return [first,last,mid].sort()[1] //sort and get the central element 

}

```
prevents worst case scenario and stable 
slight overhead in calculating median each time 

- median of median pivot 
bit more complex but it gurantees O (n log n ) complexity but overhead of some compute
slower than others 

useful to find kth smallest element or smthn

splits array into group of 5 then find median of those groups then recursively finds median of those medians and then so on till it finds a pivot

quick sort is not stable sorting 
quick sort works in place so its used in general pourpose codes 


## conclusion 
ik this chapter feels a bit rushed and not to the point , well its cause its 4 in the morning and my back hurts and all i had for dinner was a frickin orange and i am writing this just so that i am dedicated to learning these 

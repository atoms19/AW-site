---
title : 'intro to sorting algorithms 3'
description: 'bubble sort and cocktail shaker sort'
pubDate: 'jun 8 2025'
---


Hey reader , welcome back so lets brush up what we learnt last article so we've discussed about insertion sort and selection sort , one works by shifting and inserting other by finding smallest and swapping , merge sort works by divide and conquor and merging and quicksort works by sorting around a pivot
etc etc and so on check on the older article if u haven't read that already

lets throw in our route map again

1) insertion sort  [x]
2) selection sort [x]

3) merge sort [x]
5) quick sort [x]
 
6) bubble sort <
7) cocktail shaker sort <
 
8) heap sort 
9) priority ques

10) counting sort 
11) radix sort                            

now we will be learning bubble sort and cocktail shaker sort
 
# bubble sort
 bubble sort works by constantly swapping adjacent elements , it has a time complexity of O(n^2) almost all the time except when the array is sorted already and its O(n)
 it performs a lot of swaps making it very innefficient but despite all this bubble sort is easy to implement so it is widely used to teach kids sorting 

 ```js 
function  bubbleSort(arr) {
    let swaped;
    for(let i=0;i<arr.length;i++){
        swaped=false 
        for(let j=0; j< n-i-1 ; j++){
            if(arr[j]>arr[j+1]){
                temp=arr[j+1]
                arr[j+1]=arr[j]
                arr[j]=temp
                swaped=true
            }
        }
        if(!swaped) break
    }
    
}
 ```

 # cocktail shaker sort 

 this is bubble sort but 2x it does forward and backwards traversal and then it swaps , but this reduces the number of swaps needed somehow 

 ```ts 
function  cockSort(arr) {
    let swaped;
    do{
        swaped=false

    for(let j=0;j<arr.length;j++){
            if(arr[j]>arr[j+1]){
                temp=arr[j+1]
                arr[j+1]=arr[j]
                arr[j]=temp
                swaped=true
     }
    

    if(!swaped) break
    swaped=false

    
        for(let j=arr.length-1; j>=0 ; j--){
            if(arr[j]>arr[j+1]){
                temp=arr[j+1]
                arr[j+1]=arr[j]
                arr[j]=temp
                swaped=true
     }
      


    }

    }while(swaped)
    
}

```

tad bit better than bubble sort still is impractical for normal use cases when large data arises 
since it still has a worst case time complexity of O(n^2)
and best case if sorted O(n)



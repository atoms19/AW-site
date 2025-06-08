---
title : 'intro to sorting algorithms 5'
description: 'counting sort and radix sort'
pubDate: 'jun 8 2025'
---


Hey reader. lets wrap this up shall we we will be learning non comparitive sorting algorithms today

lets throw in our route map again

1) insertion sort [x]
2) selection sort [x]

3) merge sort [x]
5) quick sort [x]

6) bubble sort [x]
7) cocktail shaker sort [x]

8) heap sort [x]
9) priority ques [x]

10) counting sort <
11) radix sort<



# counting sort 

this is a  non comparative sorting algorithm that works in a different way to all the other sorting algorithms we have seen so far
because instead of sorting by comparing this seems to work differently 


of course we need more space for this but its worth it let me break down the counting sort algorithm 

```ts

[5,6,1,2,0,2]
 0 1 2 3 4 5 - indexing

[1,1,2,0,0,1,1] - frequency array
 0 1 2 3 4 5 6 - indexing corresponds to value of number we are counting
 
[1,2,4,4,4,5,6] - cumulative frequency array this (add up elements of            
 0 1 2 3 4 5 6    frequency array as we traverse)


-------

now we work backwards to make the sorted list ,our cumulative array stores the position of elements , the key is indexing 
we traverse the main array from left to right 

2 is valued as 4 in cummulative array so we place it at 4-1 = 3 index (indexing starts from 0)

[_, _, _, 2, _, _]

decrement the cumulative count of 2 to 3 since one is done 

now 0 is at position 1 , which is 1-1 =0 th index

[0, _, _, 2, _, _]

decrement cumulative count to 0 

now 2 again since we have modified our cumulative array to have 3 in 2nd index from the first step we place 2 at 3-1=2th index

[0, _, 2, 2, _, _]

we continue as 1 we find it pos 2 (2-1=1) and then 6 at 5th index 5 at 4th index
[0,1,2,2,5,6] sorted array 

``` 

algortithm itself is peak dont u think we can just overwrite the frequency array to store the cumulative array instead of making a new array which saves space 

### implementation
```ts
 countingSort(array) {
    int min = Array.min(array)
    int max = Array.max(array)
    counting = Array(max - min + 1).fill(0)

    for (i in 0...array.length) { // building frequency array
        counting[array[i] - min] += 1  // this shift is because indexing of counting is smaller than array so we shift it by min 
    }

    for (i in 1...counting.length) {
        counting[i] += counting[i - 1]
    }

    let sorted = Array(array.length)

    for (i in array.length...0) { // reverse traversal of main array
        num = array[i]
        sorted[counting[num - min] - 1] = num
        counting[num - min] -= 1 
    }

    return sorted
}

```


### features

1) very fast for small datasets
2) stable algorithm (duplicates order preserved)
3) O(n+k ) linear time complexity


disadvantages
1) insanely bad for large datasets k>>n
2) space complexity of O(1)
3) only works for integers 
4) not suitable for linkedlists



# Radix sort 

this is also a non comparative sorting algorithm eeks ;)
its built on top of counting sort ( u could change this if u want )

basically it works by finding the msd of largest number and then sorting the array based on the units place , 10th place etc.. till it reaches the msd's place



```ts
radixSort(array){
int max=Array.max(array)
int digits=1

while(Math.floor(max/digits) >0){
countingSortByDigit(array,digits)
digits=digits*10
}

return array
}

countingSortByDigit(array, digit) {
     output =  Array(array.length).fill(0); // Temporary output array
     counting = new Array(10).fill(0); // We need only 10 slots (digits 0-9)

    // Build frequency array
    for (i in 0...array.length) {
        let digit = Math.floor(array[i] / digitPlace) % 10;
        counting[digit]++; 
    }

    //  Compute cumulative frequency
    for (i in 1...10) {
        counting[i] += counting[i - 1];
    }

    for (i in array.length - 1...0) {
        let num = array[i];
        let digit = Math.floor(num / digitPlace) % 10;
        output[counting[digit] - 1] = num; 
        counting[digit]-=1
    }
    for (i in 0...array.length) {
        array[i] = output[i];
    }
}

```
we modify the counting sort to keep the last digit or the places digits to its indexing and then when accessing them we do the same 

O(n+10) complexity per a digits place 

hence `O(d(n+k))`

since k=10 (0-9)
O(d*n) neglecting k 
max=10^d
log 10 max=d
hence O(n log 10 (max)) is also a form of writing this 

# features 
stable sorting algorithm 
o(n+k) due to coutning sort
if d is large not that good 
works in fixed length data 

so what we have learnt is the LSD radix sort its great for fixed length data but there is one more radix sort MSD radix sort it works better for diffrent length data and floats


it is very similiar but instead of going from lsd to msd it goes for a recursive top down approach where it goes from msd to lsd 

we wont be covering this but ill leave the code here if u wanna check it out (i ai'd it )

```ts
function msdRadixSort(array, left = 0, right = array.length - 1, digitPlace = null) {
    if (left >= right) return; // Base case: Only one element or empty

    if (digitPlace === null) {
        let maxNumber = Math.max(...array);
        digitPlace = Math.pow(10, Math.floor(Math.log10(maxNumber))); // Start from highest power of 10
    }

    let buckets = Array.from({ length: 10 }, () => []); // Create 10 buckets for digits 0-9

    // Step 1: Distribute numbers into buckets based on the MSD
    for (let i = left; i <= right; i++) {
        let digit = Math.floor(array[i] / digitPlace) % 10;
        buckets[digit].push(array[i]);
    }

    // Step 2: Recursively sort each bucket and overwrite the original array
    let index = left;
    for (let i = 0; i < 10; i++) {
        if (buckets[i].length > 0) {
            for (let num of buckets[i]) {
                array[index++] = num; // Place back sorted numbers
            }
            msdRadixSort(array, index - buckets[i].length, index - 1, digitPlace / 10); // Recursive call for the next digit place
        }
    }
}
```

thats it guys and gals we are wrapping up our intro to sorting algorithms series there are a couple of promises i werent able to keep but ill do fullfil them later on 

like priority ques were harder than expected for me then theres bucket sort and the other things which i have left out btw if u havent noticed msd radix uses bucketsort


basically putting things into buckets and then sorting them using a basic sorting algo ig like insertion or selection sort

this is not the end ill be back to serve my empty ghost audience of webscrapping bots 
next i plan on doing a intro to searching algorithms series 

and before that i might do an article on trees ,linkedlist or ques god knows anyways thanks 



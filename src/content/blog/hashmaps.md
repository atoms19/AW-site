---
title : 'creating hashmaps in c'
description: 'for the fun of it'
pubDate: 'Sep 24 2025'
heroImage: ''
unreleased: true 
---


# What are Hashmaps ?

they are known by many names hash tables, Maps , dictionaries etc
essentially its a lookup table that stores key value pairs 

## why are they usesful ?

they allow for O(1) lookups of data

## hashmaps across languages  
almost all languages has hashmaps in their arsenal , their usage and api varies but underlying principle remains the same 
they all allow to store a value associated with a key and it gives back the value corresponding to the provided key during lookup


### cpp
cpp has unordered_map in its STL library which implements hashmaps
```cpp
#include <iostream>
#include <unordered_map>
using namespace std;

int main(){
    unordered_map<string, int> myMap;
    myMap["apple"] = 1;
    myMap["banana"] = 2;

    cout << "Value for 'apple': " << myMap["apple"] << endl;
    return 0;
}

```
### Java
java has hashMaps in its util package 
```java
import java.util.HashMap;

public class Main{
    public static void main(String[] args){
        HashMap<String, Integer> myMap = new HashMap<>();
        myMap.put("apple", 1);
        myMap.put("banana", 2);

        System.out.println("Value for 'apple': " + myMap.get("apple"));
    }
}
```
### python
python has dictionaries which are implemented as hashmaps
```python
my_dict = { }
my_dict["apple"] = 1
my_dict["banana"] = 2


print("Value for 'apple':", my_dict["apple"])
```

### typescript 
typescript has Map object which implements hashmaps
```typescript
let myMap = new Map<string, number>();
myMap.set("apple", 1);
myMap.set("banana", 2);
console.log("Value for 'apple':", myMap.get("apple"));
```

## hash maps in c 

c does not have built in hashmaps in its standard library , we will have to build one ourselves
doing so would improve our understanding of hashmaps and their innner workings 



## how does hashmaps work underneath 

we know that accessing an element in an array is O(1) operation
as we just prob the memory address that is base_address + index * size_of_element

but indices can only be numbers hashmaps allows us to access numbers using strings or other complex data types as keys 
how do we acchieve that ?

only if there was a way to convert strings into unique numbers that can be used as indices 
that is exactly what a hashmap does 

when u give it a key it take that key and runs it through a hash function
`hashfunction(key) -> index`
hash function's job is to convert the string to a unique number that can be used as an index

suppose we have a hashmap of size 10 and we want to store the value 42 with the key "apple"
the hash function will take "apple" and convert it to a number between 0 and 9 (size of hashmap - 1)
let's say it converts it to 3

we will store the value 42 at index 3 of the array
hashmap[3] = 42
now when we want to retrieve the value associated with the key "apple" 
we will run the key again through the hash function and get the index 3

## lets implement a simple hashmap in c 


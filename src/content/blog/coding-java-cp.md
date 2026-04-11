---
title : 'trying CP in Java'
description: 'handful of notes for doing competitive programming in java'
pubDate: 'Apr 11 2026'
heroImage: ''
---

# using java for CP
i like java more than cpp and its messy style of writing code , java is more intentional 
clean and just the way i like it this is a translation of most of the cpp techniques 
used in competitive programming to java and how to use them effectively in java

## warning 

I in no way is a good competitive programmer , i just do leetcode so that i can crack a job 
interview someday , i do not have the IQ or mental strength required to be a competitive programmer
this template was made just so that i could get a better grasp of java as its my language of choice to 
do leetcode in 

if you can understand CPP code , and is okay with its hedious syntax then you should just 
use it
in Java its almost always slower than cpp so if u are serious about competitive programming and want to win contests then you should just use cpp
I am just a guy using java for sake of cracking job interviews 

the code below has java 16+ syntax 
so heads up if u use java 8 in 2026

## java template 
```java
import java.util.*;

public class  Main {
    public static void main(String[] args) {
            // your code here
    }
}
```

compiling 
```bash
javac Main.java
```
running 
```bash
java Main
```

## fast input output 

the scanner class is too slow for cp we can make our own fast input and output class in our
template to make it faster 

```java
import java.io.*;
import java.util.*;

class FastIO {
    BufferedReader reader;
    StringTokenizer tokenizer;
    public FastIO() {
        reader = new BufferedReader(new InputStreamReader(System.in));
    }
    String next() {
         while (tokenizer == null || !tokenizer.hasMoreTokens()){
            try {
                tokenizer = new StringTokenizer(reader.readLine());
            } catch (IOException e) {
               e.printStackTrace();
            }
        }
        return s.nextToken();
    }

    int nextInt() {
        return Integer.parseInt(next());
    }
    int nextLong() {
         return Long.parseLong(next());
    }
    double nextDouble() {
        return Double.parseDouble(next());
    }
    String nextLine() {
        String str = "";
        try {
            str = reader.readLine();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

well for most leetcode problems a fastreder isnt necessary  


# basic algorithm

how to find maximum subarray sum in java

O(n) solution 
```java
public int maxSubArray(int[] nums) {
    int maxSum = Integer.MIN_VALUE;
    int currentSum = 0;
    for (int num : nums ) {
        currentSum = Math.max(num, currentSum + num);
        maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum;
```

this was just an example in cses handp for teaching time complexity 
but anyways i thought i'd include it here 


# sorting in java

## sorting normal arrays using Arrays.sort() method 
```java
import java.util.Arrays;


int[] arr = {5, 2, 8, 1, 3};
Arrays.sort(arr);
```
### reverse sorting 

sorting in reverse order can be done using comparators 
Collections provide a good comparator for reverse order sorting but it only works for boxed types like Integer and not for primitive types like int so we need to use Integer[] instead of int[] for reverse sorting

```java
import java.util.Arrays;
import java.util.Collections;

Integer[] arr = {5, 2, 8, 1, 3};
Arrays.sort(arr, Collections.reverseOrder());
```

another way to do it is to use `StreamsAPI`

```java
int arr[] = {5,2,8,1,3};
arr = Arrays.stream(arr).boxed().sorted(Collections.reverseOrder()).mapToInt(Integer::intValue).toArray();
```

we first convert the arrays to a stream then box the primitive int to Integer then sort it in reverse order using the comparator and then unbox it back to int array

if it was already an Integer array we can just do 
```java
Integer[] arr = {5, 2, 8, 1, 3};
arr = Arrays.stream(arr).sorted(Collections.reverseOrder()).toArray(Integer[]::new);
```

## sorting ArrayList 

we can use `sort()` method of the arrayList to sort it 
```java
import java.util.ArrayList;

List<Integer> list = new ArrayList<>();
list.add(5);
list.add(2);
list.add(8);
list.add(1);
list.add(3);

list.sort(null); // sorts in natural order 
```

to sort in reverse order we just use a comparator 
```java
list.sort(Collections.reverseOrder());
``` 
since list is already Integer we can directly use the comparator without needing to box or unbox anything

### comparators 

some cases we need to sort object based on some of their attributes for example if we have a class `Person` with attributes `name` and `age` and we want to sort a list of people based on their age we can use a comparator 
a person class and we need to sort them by age 
we can just use a custom comparator for that 
```java
class Person {
    String name;
    int age;
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    public int getAge() {
        return age;
    }
}

List<Person> people = new ArrayList<>();
people.add(new Person("Alice", 30));
people.add(new Person("Bob", 25));
people.add(new Person("Charlie", 35));

people.sort((a,b)->Integer.compare(a.age,b.age)); // sorts by age in ascending order 
```
to sort in reverse order we can just swap a and b in the comparator
```java
people.sort((a,b)->Integer.compare(b.age,a.age); // sorts by age in descending order 
```

a cleaner way to do it is to use the `Comparator.comparingInt()` method which is a static method that takes a function that extracts the int value from the object and returns a comparator that compares the int values 
```java
people.sort(Comparator.comparingInt(Person::getAge)); // uses the getAge method to extract the age and sort by it in ascending order 

people.sort(Comparator.comparingInt(p->p.age)); // same as above but using a lambda expression instead of method reference

// descending order
people.sort(Comparator.comparingInt(Person::getAge).reversed()); // sorts by age

people.sort(Comparator.comparingInt(p->p.age).reversed()); // same as above but using a lambda expression instead of method reference
```


### multistep sorting 
Comparator API allows for mutlistep sorting using `thenComparing()` method which is a default method that takes another comparator and returns a new comparator that first compares using the original comparator and if they are equal then compares using the second comparator
```java
people.sort(Comparator.comparingInt(Person::getAge).thenComparing(p->p.name)); // sorts by age in ascending order and if ages are equal then sorts by name in ascending order
```
these comaprator themselves can nest other comparators for example if we have another attribute `height` in the person class and we want to sort by age then by height then by name we can do 
```java
class Person {
    String name;
    int age;
    int height;
    public Person(String name, int age, int height) {
        this.name = name;
        this.age = age;
        this.height = height;
    }
}

people.sort(Comparator.comparingInt(p->p.age).thenComparing(Comparator.comparingInt(p->p.height)).thenComparing(p->p.name)); // sorts by age then by height then by name in ascending order
``` 
### sorting with streams 
non destructive sorting can be done using streams 
```java
List<Integer> sortedList = list.steam().sorted().toList();
```

## sorting Strings 

lets first discuss how to sort an array of strings 
```java
String[] arr = {"banana", "apple", "cherry"};
Arrays.sort(arr);
```
this will sort the array in lexicographical order

to sort in reverse order we can use the same technique as before 
```java
String[] arr = {"banana", "apple", "cherry"};
Arrays.sort(arr, Collections.reverseOrder());
```

arrayList of strings can be sorted using the same technique as before 
```java
List<String> list = new ArrayList<>();
list.add("banana");
list.add("apple");
list.add("cherry");

list.sort(null); // sorts in natural order
```
to sort in reverse order
```java
list.sort(Collections.reverseOrder());
```
to sort case insensitive we can use a custom comparator 
```java
list.sort(String.CASE_INSENSITIVE_ORDER); // sorts in case insensitive order
```
we can also just call reversed method on the comparator to sort in reverse case insensitive order 
```java
list.sort(String.CASE_INSENSITIVE_ORDER.reversed()); // sorts in reverse case insensitive order
```

### sorting a string 

easiest way to do it is to convert the string to a char array then sort it and convert it back to stirng 
```java
String str = "banana";
char[] arr = str.toCharArray();
Arrays.sort(arr);
String sortedStr = new String(arr);
```
however to sort it in reverse order we can use a custom comparator for the char array 
```java
String str = "banana";
char[] arr = str.toCharArray();
Arrays.sort(arr);
String sortedStr = new StringBuilder(new String(arr)).reverse().toString();
```
we reverse the ascending sorted string to get the descending sorted string
time saver apporach
```java

String sortedStr = Stream.of(str.split("")).sorted(Comparator.reverseOrder()).collect(Collectors.joining());
```

##  comparison in list of arrays

sometimes we wanna store [x,y] arrays in a list like list of all points and wants them sorted
in  a way that it sorts by x first if not then y is checked 

u can do this with comparator chaining 

```java
points.sort(Comparator.comparingInt(point->point.x).thenComparing(Comparator.comparingInt(point->point.y)))
```

in cpp we have pair class that automatically implements it but in java we recommend using meanigful names 
we can implement a  pair class if we want

```java
record Pair(int first , int second) implements Comparable<Point> {
        @Override
        public int compareTo(Pair other){
                if(this.first != other.first){
                     return Integer.compare(this.first,other.first);
                }
                return Integer.compare(this.second,other.second);
        }

}
```

or we can just write the comparator we used 

```java
record Pair(int first,int second) implements Comparable<Pair>{
    @Override
    public int compareTo(Pair other){
            return Comparator.comparingInt(Pair::first)
                         .thenComparingInt(Pair::second)
                         .compare(this, other);
    }
}

```
for tuple like behaviour in cpp where one comparison chained by next element 
lexicographical comparison of list we


we can easily extend this 
```java
record Tuple(int first,int second,int third) implements Comparable<Tuple>{
        @Override
        public int Tuple(Tuple second){
            return Comparator.comparingInt(Tuple::first)
                         .thenComparingInt(Tuple::second)
                         .thenComparingInt(Tuple::third)
                         .compare(this, other);
        }
}
```

this can be sorted by 
```java
ls.sort(null)
Collections.sort(ls)
```

# binary Search in java
binary search can be done using `Arrays.binarySearch()` method for arrays and `Collections.binarySearch()` method for lists 

```java
int[] arr = {1, 2, 3, 4, 5};
int index = Arrays.binarySearch(arr, 3); // returns the index of the element if
```

```java
List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
int index = Collections.binarySearch(list, 3); // returns the index of the element if
```

we also get the insertion point if the element is not found 
```java
int index = Arrays.binarySearch(arr, 6); // returns -6 which means the element is not found and can be inserted at index 5
index = Math.abs(index+1); // to get the insertion point we take the absolute value of the index and subtract 1 from it
```

first lower bound gives the first element in the array that is atleast the target value 
and first upper bound gives the first element in the array that is greater than the target value 

there is no builtin method for this but we can get this using a treeSet 

```java
TreeSet<Integer> set = new TreeSet<>();
set.add(1);
set.add(2);
set.add(3);

set.ceiling(2); // returns 2 which is the first element that is atleast 2
set.higher(2); // returns 3 which is the first element that is greater than
```
tree map also provides `set.floor()` and `set.lower()` methods which return the first element that is at most the target value and the first element that is less than the target value respectively

to convert an array or arraylist into treeset its pretty easy
```java
// for array
int[] arr = {1, 2, 3, 4, 5};
TreeSet<Integer> set = new TreeSet<>(Arrays.stream(arr).boxed().toList());
// for arraylist
List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
TreeSet<Integer> set = new TreeSet<>(list);
```
treeSet is internally using a Red Black tree which is a self balancing binary search tree so all the operations like add, remove, ceiling, higher, floor, lower etc are all O(log n) time complexity
treeSet relies on the treeMap for its implementation so all the operations are O(log n) time complexity and it also maintains the elements in sorted order so we can use it for binary search and also for getting the first element that is atleast or greater than the target value using ceiling and higher methods respectively


# data structures in java


## array lists 
dynamic Arrays or ArrayList in java is a resizable array that can grow and shrink in size as needed
```java
List<Integer> list = new ArrayList<>();
list.add(1);
list.add(2);
list.add(3);
```
to access the elements in the arraylist we can use the `get()` method 
```java
int firstElement = list.get(0); // returns 1
```
to print an arraylist we can use the `toString()` method 
```java
System.out.println(list); // prints [1, 2, 3]
```
to remove the last element from the arraylist we can use the `remove()` method 
```java
list.remove(list.size() - 1); // removes the last element from the list
```

to initialize an arraylist with a specific size we can use the constructor that takes the initial capacity as an argument 
```java
List<Integer> list = new ArrayList<>(100); // initializes an arraylist with an initial capacity of 100
```
what about initializeing all elemets with a certain value 
```java
List<Integer> list = new ArrayList<>(Collections.nCopies(100, 0)); // initializes an arraylist with 100 elements all initialized to 0
```
to convert an array to an arraylist we can use the `Arrays.asList()` method
```java
Integer[] arr = {1, 2, 3, 4, 5};
List<Integer> list = Arrays.asList(arr); // converts the array to an arraylist
```
to convert an arraylist to an array we can use the `toArray()` method
```java
List<Integer> list = Arrays.asList(1, 2, 3, 4)
Integer[] arr = list.toArray(new Integer[0]); // converts the arraylist to an array
```


## strings 

we can use the `String` class in java to work with strings 
```java
String str = "Hello, World!";
```
to get the length of the string we can use the `length()` method
```java
int length = str.length(); // returns 13
```
to get a character at a specific index we can use the `charAt()` method
```java
char firstChar = str.charAt(0); // returns 'H'
```
to concatenate two strings we can use the `concat()` method or the `+` operator
```java
String str1 = "Hello, ";
String str2 = "World!";
String result = str1.concat(str2); // returns "Hello, World!"
String result2 = str1 + str2; // also returns "Hello, World!"
```

we can convert a string to a char array using the `toCharArray()` method 


we can get a substring of a string using the `substring()` method 
```java
String str = "Hello, World!";
String subStr = str.substring(0, 5); // returns "Hello"
```
to split a string into an array of substrings we can use the `split()` method
```java
String str = "Hello, World!";
String[] parts = str.split(", "); // returns ["Hello", "World!"]
```

## Sets 

### treeSets 
whenver you want a tree based ordered Set we can rely on treeSet 
relies on tree so uses O(log n)
```java
TreeSet<Integer> ts = new TreeSet<>();
```

 tree set elements are distinct , u cant have duplicates in it
 ```java
 ts.add(3);
 ts.add(2);
 ts.add(5);
 ts.remove(4);
```

it also has methods to remove first element and last element 

```java
ts.pollFirst();
ts.pollLast();
```

to remove all elements that matches a condition 
```java
ts.removeIf(x->x>25)
```
### hashSet
this is unordered set , but its operations are O(1)

```java
HashSet<Integer> set = new HashSet<>();
set.add(4);
set.add(10);

set.contains(4); // boolean to check 

set.remove(10);

set.size();
set.clear();

```
search isnt possible with this 

java Sets doesnt allow duplicates, trying to add a duplicate element will not throw an error but it will simply ignore the duplicate and the set will remain unchanged.

>Sets that allow multiple occurrences of the same element great for tracking counts of elements , and also retaining lowerbound upperbound functionality of treeSet but with duplicates
>it also has unorderd version of it unordered_multiset which is based on hashSet and has O(1) operations but no order , which is very convienient for counting elements fast 
>in  java we can implement it with maps (more verbose ) well see more about maps in next section 


```java

HashMap<Integer, Integer> multiSet = new HashMap<>(); 
multiSet.put(1, multiSet.getOrDefault(1, 0) + 1); // add 1 to the count of element 1
multiSet.put(2, multiSet.getOrDefault(2, 0) + 1); // add 1 to the count of element 2
multiSet.put(1, multiSet.getOrDefault(1, 0) + 1); // add 1 to the count of element 1 again


// to get the count of any element
int countOf1 = multiSet.getOrDefault(1, 0); // returns 2

// to remove an element we can just decrease its count
multiSet.put(1, multiSet.getOrDefault(1, 0) - 1); // removes one occurrence of element 1

```

if you want the properties of a treeSet with duplicates you can use a TreeMap to implement it 
```java
TreeMap<Integer, Integer> multiSet = new TreeMap<>();
multiSet.put(1, multiSet.getOrDefault(1, 0) + 1); // add 1 to the count of element 1
multiSet.put(2, multiSet.getOrDefault(2, 0) + 1); // add 1
multiSet.put(1, multiSet.getOrDefault(1, 0) + 1); // add 1 to the count of element 1 again

// to get the count of any element
int countOf1 = multiSet.getOrDefault(1, 0); // returns

// to remove an element we can just decrease its count
multiSet.put(1, multiSet.getOrDefault(1, 0) - 1); // removes one occurrence of element 1
```

In my personal opinion javas explicit way of implementing a muliset is better than cpps implicit way of doing it with a multiset
using map to count things is such a common technique in coding


## Maps 

maps are the underlying data structure behind the hashSet and treeSet so they have the same time complexity for their operations

### hashMap 

```java
HashMap<String, Integer> map = new HashMap<>();
map.put("apple", 1);
map.put("banana", 2);
map.get("apple"); // returns 1
map.containsKey("banana"); // returns true
map.remove("apple");
```
### treeMap 

```java
TreeMap<String, Integer> map = new TreeMap<>();
map.put("apple", 1);
map.put("banana", 2);
map.get("apple"); // returns 1
map.containsKey("banana"); // returns true
map.remove("apple");
```

treemaps are self balancing binary search trees so they maintain the keys in sorted order and also provide methods for getting the first key, last key, ceiling key, floor key etc which are not available in hashMap 

```java
map.firstKey(); // returns the first key in the map
map.lastKey(); // returns the last key in the map
map.ceilingKey("avocado"); // returns the least key greater than or equal to "
map.floorKey("avocado"); // returns the greatest key less than or equal to "avocado"
```

hashmaps are faster than treemaps for most operations but treemaps provide more functionality and maintain the keys in sorted order so they are useful when we need to maintain the order of the keys or when we need to perform range queries on the keys

to print all key values in a map we can use the `entrySet()` method which returns a set of key value pairs and we can iterate over it using a for each loop 
```java
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}
```

to iterate over the keys in a map we can use the `keySet()` method which returns a set of keys and we can iterate over it using a for each loop 
```java
for (String key : map.keySet()) {
    System.out.println(key);
}
```
to iterate over the values in a map we can use the `values()` method which returns a collection of values and we can iterate over it using a for each loop 
```java
for (Integer value : map.values()) {
    System.out.println(value);
}
```

other operations commonly performed are 
```java
map.getOrDefault("orange", 0); // returns the value associated with "orange" if it exists, otherwise returns 0
map.putIfAbsent("grape", 3); // puts the key "grape" with value 3 if it is not already present in the map, otherwise does nothing
map.replace("banana", 4); // replaces the value associated with "banana" with 4 if it exists 
map.replace("banana", 2, 5); // replaces the value associated with "banana" with 5 if it is currently 2, otherwise does nothing
```


## Iterators in java
iterators are used to iterate over the elements in a collection like a list, set or map 
```java
List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
Iterator<Integer> iterator = list.iterator();

while (iterator.hasNext()) {
    Integer element = iterator.next();
    System.out.println(element);
}
```

### some useful mehtods from collections 
```java
Collections.reverse(list); // reverses the order of the elements in the list 
Collections.shuffle(list); // randomly shuffles the elements in the list

//with seed 
Collections.shuffle(list, new Random(seed)); // randomly shuffles the elements in the list using a specific seed for reproducibility
```
we can use sublist method to get a sublist of a list 
```java
List<Integer> subList = list.subList(1, 4); // returns a view of the portion of the list between the specified fromIndex (inclusive) and toIndex (exclusive)
```

iterating over a sublist 
```java
for (Integer element : list.subList(1, 4)) {
    System.out.println(element);
}
```


### set iterators 

in java sets can be used as queues and stacks 
most of them provide  methods to get the first and last element in the set respectively 
```java
TreeSet<Integer> set = new TreeSet<>();
set.add(1);
set.add(2);
set.add(3);

set.first(); // returns 1
set.last(); // returns 3
```
iterating from the first element to the last element 
```java
Iterator<Integer> iterator = set.iterator();
while (iterator.hasNext()) {
    Integer element = iterator.next();
    System.out.println(element);
}
```
iterating from the last element to the first element
```java
Iterator<Integer> iterator = set.descendingIterator();
while (iterator.hasNext()) {
    Integer element = iterator.next();
    System.out.println(element);
}
```

iterating from a specific element to the last element 
```java
Iterator<Integer> iterator = set.tailSet(2).iterator();
while (iterator.hasNext()) {
    Integer element = iterator.next();
    System.out.println(element);
}
```
tailset returns a view of the portion of the set whose elements are greater than or equal to the specified element
iterating from a specific element to the first element 
```java
Iterator<Integer> iterator = set.headSet(2, true).descendingIterator();
while (iterator.hasNext()) {
    Integer element = iterator.next();
    System.out.println(element);
}
```
headset returns a view of the portion of the set whose elements are less than (or equal to if the second argument is true) the specified element


## BitSets

in java java.utils.BitSet class provides a way to represent a set of bits or boolean values in a compact and efficient way 
```java
BitSet bitSet = new BitSet(1001010);
bitSet.set(0); // sets the bit at index 0 to true
bitSet.set(2); // sets the bit at index 2 to true
bitSet.get(0); // returns true 
bitSet.flip(1); // flips the bit at index 1 (if it was false it becomes true and if it was true it becomes false)
bitSet.clear(2); // sets the bit at index 2 to false
bitSet.nextSetBit(0); // returns the index of the next set bit (true bit) starting from index 0
bitSet.nextClearBit(0); // returns the index of the next clear bit (false bit) starting from index 0
```

bit sets also provide methods for performing bitwise operations like and, or, xor etc 
```java
BitSet bitSet1 = new BitSet(1001010);
bitSet1.set(0);
//.... sets the bits in bitSet1 
BitSet bitSet2 = new BitSet(1010101);
// sets the bits in bitSet2
bitSet1.xor(bitSet2); // performs a bitwise exclusive OR operation on the two bit sets and stores the result in bitSet1
bitSet1.and(bitSet2); // performs a bitwise AND operation on the two bit
bitSet1.or(bitSet2); // performs a bitwise OR operation on the two bit sets and stores the result in bitSet1
```
initialiing a bit set with a binary string 
```java
String binaryString = "1001010";
BitSet bitSet = new BitSet(binaryString.length());
for (int i = 0; i < binaryString.length(); i++) {
    if (binaryString.charAt(i) == '1') {
        bitSet.set(i);
    }
}
```

initializing a bit set with a long value 
```java
long value = 1001010L;
BitSet bitSet = BitSet.valueOf(new long[]{value});
```

or more concisely 
```java
BitSet bitSet = BitSet.valueOf(new long[]{1001010L});
```


## DeQueue 

java has Dequeu interface which is implemented by ArrayDeque class 
```java
Deque<Integer> deque = new ArrayDeque<>();
deque.addFirst(1); // adds 1 to the front of the deque
deque.addLast(2); // adds 2 to the back of the deque
deque.getFirst(); // returns 1
deque.getLast(); // returns 2
deque.removeFirst(); // removes and returns the first element of the deque
deque.removeLast(); // removes and returns the last element of the deque
deque.pollFirst(); // removes and returns the first element of the deque or returns null if the deque is empty
deque.pollLast(); // removes and returns the last element of the deque or returns null if the deque is empty
deque.isEmpty(); // returns true if the deque is empty, false otherwise
deque.size(); // returns the number of elements in the deque
```

it can also be implemented by a linked list using the LinkedList class which also implements the Deque interface 
```java
Deque<Integer> deque = new LinkedList<>();
deque.addFirst(1); // adds 1 to the front of the deque
deque.addLast(2); // adds 2 to the back of the deque
deque.getFirst(); // returns 1
deque.getLast(); // returns 2
deque.removeFirst(); // removes and returns the first element of the deque
deque.removeLast(); // removes and returns the last element of the deque
deque.pollFirst(); // removes and returns the first element of the deque or returns null if the deque is empty
deque.pollLast(); // removes and returns the last element of the deque or returns null if the
deque.isEmpty(); // returns true if the deque is empty, false otherwise 
deque.size(); // returns the number of elements in the deque
```
linked list is slower tan arrayDeque


## Stacks 
stack interface is implemented by the Stack class which is based on a vector and also by the ArrayDeque class which is based on a resizable array 
```java
Stack<Integer> stack = new Stack<>();
stack.push(1); // pushes 1 onto the stack
stack.push(2); // pushes 2 onto the stack
stack.peek(); // returns the top element of the stack without removing it (returns 2)
stack.pop(); // removes and returns the top element of the stack (returns 2)
stack.isEmpty(); // returns true if the stack is empty, false otherwise
stack.size(); // returns the number of elements in the stack

arrayDeque can also be used as a stack by using the push, peek and pop methods

```
```java
Deque<Integer> stack = new ArrayDeque<>();
stack.push(1); // pushes 1 onto the stack
stack.push(2); // pushes 2 onto the stack
stack.peek(); // returns the top element of the stack without removing it (returns 2)
stack.pop(); // removes and returns the top element of the stack (returns 2)
stack.isEmpty(); // returns true if the stack is empty, false otherwise
stack.size(); // returns the number of elements in the stack
```

Queue interface is implemented by the LinkedList class and also by the ArrayDeque class 
```java
Queue<Integer> queue = new LinkedList<>();
queue.add(1); // adds 1 to the back of the queue
queue.add(2); // adds 2 to the back of the queue
queue.peek(); // returns the front element of the queue without removing it (returns 1)
queue.poll(); // removes and returns the front element of the queue (returns 1)
queue.isEmpty(); // returns true if the queue is empty, false otherwise
queue.offer(3); // adds 3 to the back of the queue and returns true if the element was added successfully, false otherwise
```
```java
Queue<Integer> queue = new ArrayDeque<>();
queue.add(1); // adds 1 to the back of the queue
queue.add(2); // adds 2 to the back of the queue
queue.peek(); // returns the front element of the queue without removing it (returns 1)
queue.poll(); // removes and returns the front element of the queue (returns 1)
queue.isEmpty(); // returns true if the queue is empty, false otherwise
queue.offer(3); // adds 3 to the back of the queue and returns true if the element was added successfully, false otherwise 
```
## priorityQueue 
implemented by the PriorityQueue class which is based on a binary heap 
```java
PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.add(3); // adds 3 to the priority queue
pq.add(1); // adds 1 to the priority queue
pq.add(2); // adds 2 to the priority queue
pq.remove(2); // removes 2 from the priority queue
pq.peek(); // returns the smallest element in the priority queue without removing it (returns 1)
pq.poll(); // removes and returns the smallest element in the priority queue (returns 1)
pq.isEmpty(); // returns true if the priority queue is empty, false otherwise
pq.size(); // returns the number of elements in the priority queue
```

using custom comparators with priority queues 
```java
PriorityQueue<Integer> pq = new PriorityQueue<>(Comparator.reverseOrder()); // creates a max heap
pq.add(3); // adds 3 to the priority queue
pq.add(1); // adds 1 to the priority queue
pq.add(2); // adds 2 to the priority queue
pq.peek(); // returns the largest element in the priority queue without removing it (returns 3
pq.poll(); // removes and returns the largest element in the priority queue (returns 3)
```

## final CP template 

well i AI generated a template that would cover for most loses in competitive programming and also has a lot of the techniques we discussed in this article 
```java
import java.util.*;
import java.io.*;

public class Main {
    static FastReader in = new FastReader();
    static PrintWriter out = new PrintWriter(System.out);

    // --- CORE SOLVE LOGIC ---
    public static void solve(int tCase) {
        // Your logic for each test case goes here
        // Example: 
        // int n = in.nextInt();
        // out.println("Case " + tCase + ": " + n);
    }

    public static void main(String[] args) {
        // Read number of test cases
        int t = 1; 
        try {
            String next = in.next();
            if (next != null) {
                t = Integer.parseInt(next);
            }
        } catch (Exception e) {
            t = 1; // Default to 1 if input is weird
        }

        for (int i = 1; i <= t; i++) {
            solve(i);
        }
        
        out.flush();
        out.close();
    }

    // --- 1. FENWICK TREE (Order Statistics / Prefix Sums) ---
    static class FenwickTree {
        int[] tree;
        int n;
        FenwickTree(int n) { this.n = n; this.tree = new int[n + 1]; }
        
        void update(int i, int val) {
            for (; i <= n; i += i & -i) tree[i] += val;
        }
        
        int query(int i) {
            int sum = 0;
            for (; i > 0; i -= i & -i) sum += tree[i];
            return sum;
        }

        int findKth(int k) {
            int idx = 0, total = 0;
            for (int i = 1 << (31 - Integer.numberOfLeadingZeros(n)); i > 0; i >>= 1) {
                if (idx + i <= n && total + tree[idx + i] < k) {
                    idx += i;
                    total += tree[idx];
                }
            }
            return idx + 1;
        }
    }

    // --- 2. PAIR (Record for Immutability & Auto Equals/Hash) ---
    record Pair<A extends Comparable<A>, B extends Comparable<B>>(A first, B second) 
        implements Comparable<Pair<A, B>> {
        public int compareTo(Pair<A, B> other) {
            int cmp = this.first.compareTo(other.first);
            return cmp != 0 ? cmp : this.second.compareTo(other.second);
        }
    }

    // --- 3. MULTISET (Sorted duplicates) ---
    static class MultiSet<T extends Comparable<T>> {
        TreeMap<T, Integer> map = new TreeMap<>();
        int size = 0;
        void add(T x) { map.put(x, map.getOrDefault(x, 0) + 1); size++; }
        void remove(T x) {
            if (!map.containsKey(x)) return;
            int cnt = map.get(x);
            if (cnt == 1) map.remove(x); else map.put(x, cnt - 1);
            size--;
        }
        int count(T x) { return map.getOrDefault(x, 0); }
        T first() { return map.firstKey(); }
        T last() { return map.lastKey(); }
    }

    // --- 4. FAST SORT (Avoids O(N^2) Anti-testcases) ---
    static void shuffleSort(int[] a) {
        Random rnd = new Random();
        for (int i = 0; i < a.length; i++) {
            int j = rnd.nextInt(a.length), t = a[i]; a[i] = a[j]; a[j] = t;
        }
        Arrays.sort(a);
    }

    // --- 5. FAST I/O ---
    static class FastReader {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer("");
        String next() {
            while (st == null || !st.hasMoreElements()) {
                try {
                    String line = br.readLine();
                    if (line == null) return null;
                    st = new StringTokenizer(line);
                } catch (IOException e) { return null; }
            }
            return st.nextToken();
        }
        int nextInt() { return Integer.parseInt(next()); }
        long nextLong() { return Long.parseLong(next()); }
        double nextDouble() { return Double.parseDouble(next()); }
    }
}
```

this is a bit overkill 

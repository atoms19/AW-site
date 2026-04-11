---
title : 'Disjoint sets are cool'
description: 'all about disjoint sets'
pubDate: 'Dec 19 2025'
heroImage: ''
---


# Disjoin sets 

so there was this one topic i was putting off since i heard some people say it was hard
Disjoint sets and union find data structure 

but as my moto goes "dont say anything is hard just cause some guy said so"
so i tried to learn it from you know the dsa youtubers like striver 

42 mins of boring lecture and was tired i hated it didnt understood anything 
they explain it as if its rocket science 
its really not its simple as asking a girl which family she belongs to
or asking who owns this company or who is the leader of this tribe 


# tribes of island okaaaaa
lets say theres this fucking island with so many tribes each with their own leader 
these tribes sometimes form alliances and merge into a bigger tribe and they elect a new leader for their big tribe 

you are robert crosy an explorer from england who explores island okaaa 
you come acrross many tribesmen but you dont know which tribe they belong to so you ask them 

"hey bro can you tell me which tribe you belong to ?"
theyll point you to their leader

thats fricking it thats disjoint sets in a nutshell , no math no graphs no trees 
its just all about asking a element which set it belongs to (in slightly mathematical terms)

# modelling disjoint sets

lets become robert crosy and see what he makes out of this situation 

when two tribes come together lets call that procedure "union"
when you ask a tribesmen which tribe he belongs to lets call that procedure "find"
when a new tribe is formed we create a new set for it lets call that "make"

when a tribe is created it starts with one person the leader then he forms his tribe the he influences his tribesmen to follow him 
every tribesmen will have a pointer to their leader ( will know who their leader is)

# linked list implementation 

if each person points to their leader ( ultimate leader ) then we can easily find which tribe they belong to
this is the easiest way to implement disjoint sets 

```c
struct Node {
  int data;
  Node* parent;
};

struct Set {
    Node* leader;
    int size;
    Node *members;
    };
```

we represent each set as a linkedlist 

- makeSet : create a new set with one member O(1)
- findSet : follow the parent pointer till you reach the leader O(1)
- unionSet : make the leader of one set point to the leader of another set O(n)


while union is happening every member of the one set has to update their parent pointer to point to the new leader
this is O(n) operation

# optimizations
we can optimize union operation using a rule called union by size/rank
we should only merge smaller set into larger set

cause in this case we only have to update the parent pointer of smaller set members
which is less work 

put this as this tribe A has 100 members and tribe B has 10 members 
when they merge we make leader of B point to leader of A
now only 10 members of B have to update their parent pointer
instead of 100 members of A updating their parent pointer
this way we can reduce the time complexity of union operation to O(log n) in worst case



# Tree implementation

in this case not every member knows who thier ultimate leader is
they only know who their immediate leader is
so to find the ultimate leader we have to follow the parent pointer till we reach the root

its like asking whos your boss till you reach the ceo 

```c
struct Node {
    int data;
    Node* parent;
    int rank; // for union by rank optimization
};
```

- makeSet : create a new set with one member O(1)
- findSet : follow the parent pointer till you reach the leader O(h) h is height
- unionSet : make the leader of one set point to the leader of another set O(1)


in this case union is easiest as all u have to do is swap the parent pointer of one leader to another
# optimizations

we loose out on find operation here as it can take O(h) time in worst case
so we have to make sure that height of tree is minimized

we can do this by rank optimization

rank optimization is similar to size optimization
rank of a set is aproximately the height of the tree
when we do union we make sure that smaller rank tree is merged under larger rank tree

and whenver we merge trees with equal rank we increase the rank by 1
rank does not represent exact height but it helps to minimize the height of tree
making o(log n) time complexity for find operation in worst case

# path compression 

find operation is still not optimal or close to O(1)
we have to ask each member who their leader is till we reach the root
what if u find the leader once and make every member point directly to the leader

so u tell them "hey bro your leader is actually this guy"
this way next time when u ask them who their leader is they can directly point to the leader
this is called path compression 

```c
Node* findSet(Node* node) {
    if (node->parent != node) {
        node->parent = findSet(node->parent); // Path compression
    }
    return node->parent;
}
```
this optimization makes sure that every time we do find operation
we make every member in the path point directly to the leader
this way next time we do find operation on any of these members it will be O(1)

with both optimizations combined the amortized time complexity for each operation becomes nearly O(1)

we can think of path compression as a way to flatten the tree structure of the sets

so as robert crossy each time we ask a tribesman who thier leader is and we find out the real leader we go back and tell everyone 
who their real leader is so that next time we ask them they can directly point to the real leader instead of going through the chain of command again
theyll just remember thier leader for you 
and next time you ask them they can directly point to the leader without having to go through the whole chain of command again


during path compression tress hieght is logically flattened but the rank remains unchanged 
this is why rank is not called hieght its more of an upper bound on the height than the actual height 
we dont bother updating the rank as it would be too much work and it does not affect the correctness of the algorithm


# Implementation 

```c

typedef struct Node{
    int data;
    struct Node * parent;
    int rank; 
} Node;

Node *makeSet(int data) {
        // create a new set with one member 
        Node * newNode = (Node *)malloc(sizeof(Node));
        newNode->data = data;
        newNode->parent = newNode; // point to itself as its own leader
        newNode->rank = 0; // initial rank is 0
        return newNode;
}

Node *findSet(Node *node){
    if (node->parent != node ){
       node->parent = findSet(node->parent); // path compression (recursive)
    }
    return node->parent; // return the leader of the set
}

void unionSet(Node * n1 , Node * n2){
   Node * leader1 = findSet(n1);
   Node * leader2 = findSet(n2);
    if (leader1 == leader2) return; // already in the same set

    if( leader1->rank > leader2->rank){
        leader2->parent = leader1;
    }else if (leader1->rank < leader2->rank){
        leader1->parent = leader2; 
    }else {
        leader2->parent = leader1;
        leader1->rank++; // increase rank if both have same rank
    }
}



```


this is a great way but is there a more efficient and cache friendly way to make uninon find data structure 
we can use an array based implementation

in an array each element at any index is treated as a node and its value is the index of its parent 

so we can have an array 

```
 0 1 2 3 4 5 6 7 8 9 10
[5,3,9,-, ,1,-1, , ,6, ,]
```

here we can follow node 0 
we get  0->5->1->3 and so on we can follow the values on indexes to form a chain from any index

we need a way to end the chain with leader we can do this in two ways we 
can do some value thats unique which we can quickly identify as leader like -1 
since neative indexing isnt followed or a value we can easily check against like Integer.MAX_VALUE

or they can just link to themselves like we did earlier with pointer appraoch
by having the value equal to their index 

```
 0 1 2 3 4 5 6 7 8 9 10
[5,3,9,3,4,1,6,7,8,6,10,10]
```

we can see index 3 is a leader as it points to itself and value is equal to index


with this alone we can implement makeSet and findSet easily 
```c
void makeSet(int *parent , int i){
    parent[i] = i; // point to itself as its own leader
}

int findSet(int *parent , int i){
    if (parent[i] != i){ // checking if its not a leader
        parent[i] = findSet(parent , parent[i]); // path compression
    }
    return parent[i]; // return the leader of the set
}


```

now what we loose out is the ability to store ranks or sizes of the set on each element as they arent structs
we can easily get around this by using another array to store the ranks or sizes of the elements


```c 
 // array to store ranks of the sets
int array[MAX_SIZE]; // array to store parent pointers
int * ranks = (int *) calloc(MAX_SIZE , sizeof(int)); // initialized to 0 

```


```c
void unionSet(int *parent , int *rank , int i , int j){
    int leader1 = findSet(parent , i);
    int leader2 = findSet(parent , j);
    if (leader1 == leader2) return; // already in the same set
    if (rank[leader1] > rank[leader2]){
        parent[leader2] = leader1;
    }else if (rank[leader1] < rank[leader2]){
        parent[leader1] = leader2;
    }else {
        parent[leader2] = leader1;
        rank[leader1]++; // increase rank if both have same rank
    }
}
```


with negative inedxing for leaders we can even get rid of the need for a secondary array 
as the modulus value of the leaders negative value can be used as rank or size of the set 

which can be implemneted as 

```c
void unionSet(int *parent , int i , int j){
    int leader1 = findSet(parent , i);
    int leader2 = findSet(parent , j);
    if (leader1 == leader2) return; // already in the same set
    if (parent[leader1] < parent[leader2]){ // comparing negative values
        parent[leader1] += parent[leader2]; // update size of leader1 set
        parent[leader2] = leader1; // make leader2 point to leader1
    }else {
        parent[leader2] += parent[leader1]; // update size of leader2 set
        parent[leader1] = leader2; // make leader1 point to leader2
    }
```

or using rank instead of size 

```c
void unionSet(int *parent , int i , int j){
    int leader1 = findSet(parent , i);
    int leader2 = findSet(parent , j);
    if (leader1 == leader2) return; // already in the same set
    if (parent[leader1] < parent[leader2]){ // comparing negative values
        parent[leader1] = leader2; // make leader1 point to leader2
    }else if (parent[leader1] > parent[leader2]){
        parent[leader2] = leader1; // make leader2 point to leader1
    }else {
        parent[leader2] = leader1; // make leader2 point to leader1
        parent[leader1]--; // increase rank of leader1 set (more negative)
    }
```

this is peak performance for disjoint sets data structure

now can we see an application of disjoint sets in real life

## disjoint sets to find the number of provinces 

leetcode 547

```java

class Solution {
    public int findCircleNum(int[][] isConnected) {
        UnionSet us = new UnionSet(isConnected.length);
        for(int i =0; i < isConnected.length;i++){
            us.make(i);
        }
        for(int i = 0 ; i < isConnected.length; i++){
            for(int j = 0 ; j < isConnected.length;j++){
                if(isConnected[i][j]==1){
                us.union(i,j);
                }
            }
        }
        return us.setCount;
    }
}

class UnionSet {
    public int arr[];
    public int ranks[];
    public int setCount;
    UnionSet(int size){
        arr = new int[size];
        ranks = new int[size];
        setCount = 0;
    }

    void make(int i){
        arr[i]=i;
        ranks[i]=0;
        setCount++;
    }

    int findSet(int i){
      if(arr[i]!=i){
        arr[i]=findSet(arr[i]);
      }
      return arr[i];
    }
    void union(int a,int b){
        int l1=findSet(a);
        int l2 = findSet(b);
        if(l1 == l2) return;
        setCount--;
        if(ranks[l1] > ranks[l2]){
            arr[l2]=l1;
        }else if(ranks[l2] > ranks[l1]){
            arr[l1]=l2;
        }else{
            arr[l2]=l1;
            ranks[l1]++;
        }
    }
}
```

## insight 

UNION FIND ONLY WORKS FOR UNDIRECTED GRPAH BASED PROBLEMS
whenever there is DIRECTIONALITY it is better to use BFS OR DFS

one such trick question : leetcode 2101


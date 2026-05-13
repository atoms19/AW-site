---
title : 'understanding self balancing trees'
description: 'exploring the ridiculously cool self balancing trees'
pubDate: 'Jan 25 2026'
heroImage: ''
unreleased: true
---


# what are self balancing trees 

 a normal binary search tree has a search time of O(log n) cause each node splits the 
 solution space in half exactly but what if one branch has more nodes than the other 
 then this split wouldnt be equal , this would lead to a skewed tree with a slower 
 search time of O(n) in the worst case


 how can we fix this ? 
 we invent trees that automatically balance themselves after every insertion and deletion

 binary search tree insertion is pretty much just a recursive fn that finds the right pos 
 and insert it there but it would lead to unbalanced trees almost always
 to fix this we add an extra step after insertion and deletion to check if the tree is
 balanced or not if not we perform rotations to balance it out


# avl tree 

an avl tree is a self balancing tree where the height difference between left and right 
sub tree can be atomst one 

## rotations 

rotations in avl trees are desingned to be o(1) 
 there are 4 types of rotations 

 - LL 
 - RR 
 - RL 
 - LR

 basically all combinations of left and right

when insertions are made the tree checks upwards to see if the balance factor of any node
is more than 1 or less than -1 if so it performs the necessary rotation to balance

with delteions its more complicated as multiple nodes can become unbalanced so we have to
check all the way up to the root and perform rotations as necessary

# comparison with red black trees
- Red black trees handle deletions better than avl trees
- avl trees has better search times due to being more rigidly balanced
- avl trees are more strict about balancing
- avl trees take more resorces on insertion and deletion due to more rotations
- red black trees are more commonly used in libraries and frameworks


# insertion and rotation cases 



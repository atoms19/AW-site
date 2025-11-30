---
title : 'skip list datastructure'
description: 'i stubled upon another datastructure gonna go over this'
pubDate: 'Oct 08 2025'
heroImage: ''
---

# what is a skiplist bro ?

linkedlists are cool but the problem is that to traverse them u have to go node by node , what if we could skip some nodes while trying to reach to a node
thats exactly the point of a skiplist we create express highways like layers that skip over nodes in lower layers highter the layer more nodes it skips 

so if u are trying to reach to a node one can take the fastest expressway first then drop down to narrower expressways till u get to the exact node
u might start to think this is starting to sound like a binary search tree and u would be right it does sound like one and it has similiar complexity O(log n) for search insert and delete



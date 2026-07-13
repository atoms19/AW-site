---
title : 'segment trees are op'
description: 'lets learn about segment tree'
pubDate: 'Jul 08 2026'
heroImage: ''
---


# segment trees are lowkey cool 

 I first learnt about segment trees in my Adavanced data structures class since then they have
 came useful in several leetcode problems and overall i find the idea quite appealing 

 i think segment trees is just like prefix sums but 2 dimensional or smthn 

 anyways here is the code for the goats 

 ```java


class SegmentTree {
    int n; 
    int[] tree;
    SegmentTree(int[] nums){
        n = nums.length;
        tree = new int[4*n];
        build(nums,0,0,n-1);
    }

    public int build(int[] nums , int node , int start , int end ){
        if(start == end ){
            tree[node]=nums[start];
            return tree[node];
        }
        int mid = start + (end-start)/2;
        int left = build(nums,node*2+1,start,mid);
        int right = build(nums,node*2+2,mid+1,end);
        tree[node]= left + right;
        return tree[node];
    }

    public int query(int node , int start ,int end , int qstart , int qend ){
        if(qstart> end || qend < start ) return 0;
        if ( start >= qstart && end <=qend ) return tree[node];
        int mid = start + (end-start)/2;
        int leftHalf = query(node*2+1,start,mid,qstart , qend);
        int rightHalf = query(node*2+2,mid+1,end,qstart,qend);
        return leftHalf+ rightHalf;
    }

    public int query( int left , int right){
        return query(0,0,n-1,left ,right );
    }
    
    public int update(int node , int start , int end ,int index, int val){
        if(start == end ) {
            tree[node]= val;
            return tree[node];
        }
        int mid = start+(end - start)/2;
        if(index<=mid){
        update(node*2+1,start, mid , index,val);
        }else{
        update(node*2+2 , mid+1, end , index, val);
        }
        tree[node] = tree[node*2+1]+tree[node*2+2];
        return tree[node];
    }

    public void update(int index,int val){
         update(0,0,n-1,index,val);
    }
}
```

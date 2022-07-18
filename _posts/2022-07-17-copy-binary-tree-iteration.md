---
title: How to copy a binary tree using iteration
layout: post
date:  2022-07-17 -0600
excerpt: While the most common way to copy a binary tree is using a recursive approach, I recently wanted to challenge myself to find an iterative solution to this problem.
tags: [programming, development, software]
---

While the most common way to copy a binary tree is using a recursive approach, I recently wanted to challenge myself to find an iterative solution to this problem. For the sake of simplicity and readability, I chose Python as the programming language and runtime for this solution. 

Please note, the full source code for this solution may be found on my GitHub profile at the following link: [code-samples/Python/copy-binary-tree-iteration](https://github.com/frederickm13/code-samples/tree/master/Python/copy-binary-tree-iteration).

## Solution 

First, I defined the `TreeNode` class, which is included below.

<pre class="w3-light-grey w3-round" style="overflow: auto;">

    class TreeNode:
        def __init__(self, val, left, right):
            self.val = val
            self.left = left
            self.right = right

</pre>

Then, I created the following `shallow_copy_node` function to perform a shallow copy of a `TreeNode`.

<pre class="w3-light-grey w3-round" style="overflow: auto;">

    def shallow_copy_node(node):
        copy = None

        if (node is not None):
            copy = models.TreeNode(node.val, None, None)

        return copy

</pre>

Finally, I created the following `copy_tree` function. This function takes in a root `TreeNode` of a binary tree as an argument. As output, the function returns the root `TreeNode` of a full copy of the original binary tree.

<pre class="w3-light-grey w3-round" style="overflow: auto;">

    def copy_tree(node):
        stack = []
        pointer = [node, shallow_copy_node(node)]
        parent_copy_node = None

        while pointer[0] is not None or len(stack) > 0:
            if (pointer[0] is not None):
                # Check if node value is set.
                if (pointer[0].val != pointer[1].val):
                    pointer[1].val = pointer[0].val

                # Check if parent copy is already tracked.
                if (parent_copy_node is None):
                    parent_copy_node = pointer[1]

                # Copy left and right nodes.
                pointer[1].left = shallow_copy_node(pointer[0].left)
                pointer[1].right = shallow_copy_node(pointer[0].right)

                # Add right node to stack for 
                # both the original and copy trees.
                stack.append([pointer[0].right, pointer[1].right])
                
                # Move pointer to left on both
                # the original and copy trees.
                pointer = [pointer[0].left, pointer[1].left]

            else:
                pointer = stack.pop()
        
        return parent_copy_node

</pre>

## Testing
In order to test the above solution, I needed a way to print a string representation of a binary tree to the console. I created the following `print_tree()` helper function to do this. The below `print_tree()` function uses a breadth-first search algorithm to print a string representation of a binary tree. Using this function, each level of the binary tree is printed in a left-to-right order before moving on to the next level. 

<pre class="w3-light-grey w3-round" style="overflow: auto;">

    def print_tree(node):
        queue = []
        queue.append(node)

        while (len(queue) > 0):
            n = queue.pop(0)
            print(n.val, end=" ")

            if (n.left is not None):
                queue.append(n.left)
            
            if (n.right is not None):
                queue.append(n.right)
        
        print("\n")

</pre>

With the help of the above-mentioned `print_tree()` helper function, I was able to test this solution using the below `main()` function.

<pre class="w3-light-grey w3-round" style="overflow: auto;">

    def main():
        # Build tree.
        node1 = models.TreeNode(1, None, None)
        node2 = models.TreeNode(2, None, None)
        node3 = models.TreeNode(3, node1, node2)
        node4 = models.TreeNode(4, None, None)
        node5 = models.TreeNode(5, None, None)
        node6 = models.TreeNode(6, node4, node5)
        node7 = models.TreeNode(7, node3, node6)

        # Tree diagram.
        #    7
        #   3 6
        # 1 2 4 5

        # Print original tree.
        print("Original tree:")
        functions.print_tree(node7)

        # Copy tree.
        copy_tree_parent = functions.copy_tree(node7)

        # Print tree copy.
        print("Copy:")
        functions.print_tree(copy_tree_parent)

</pre>

## Results
The console output of the above-mentioned test is included below:

<pre class="w3-light-grey w3-round" style="overflow: auto;">

    Original tree:
    7 3 6 1 2 4 5 

    Copy:
    7 3 6 1 2 4 5 

</pre>

Success! 

## Resources

The full source code for this solution may be found on my GitHub profile at the following link: [code-samples/Python/copy-binary-tree-iteration](https://github.com/frederickm13/code-samples/tree/master/Python/copy-binary-tree-iteration).
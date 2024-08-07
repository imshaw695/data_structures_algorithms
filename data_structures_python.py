class Stack:
    """
    Stack is a linear data structure which follows a particular order in which the operations are performed.
    The order may be LIFO (Last In First Out) or FILO (First In Last Out).

    Use cases:
    - Undo mechanism in text editors
    - Expression evaluation and syntax parsing
    """

    def __init__(self):
        self.items = []

    def push(self, item):
        """Push an item onto the stack."""
        self.items.append(item)

    def pop(self):
        """Pop an item off the stack."""
        if not self.is_empty():
            return self.items.pop()
        return None

    def peek(self):
        """Get the top item of the stack."""
        if not self.is_empty():
            return self.items[-1]
        return None

    def is_empty(self):
        """Check if the stack is empty."""
        return len(self.items) == 0

    def size(self):
        """Get the size of the stack."""
        return len(self.items)


class Queue:
    """
    Queue is a linear data structure which follows a particular order in which the operations are performed.
    The order is FIFO (First In First Out).

    Use cases:
    - CPU scheduling
    - Disk scheduling
    - Handling of real-world queues like ticket booking, call center systems
    """

    def __init__(self):
        self.items = []

    def enqueue(self, item):
        """Add an item to the queue."""
        self.items.append(item)

    def dequeue(self):
        """Remove an item from the queue."""
        if not self.is_empty():
            return self.items.pop(0)
        return None

    def is_empty(self):
        """Check if the queue is empty."""
        return len(self.items) == 0

    def size(self):
        """Get the size of the queue."""
        return len(self.items)


class Node:
    """
    Node class for Linked List and Binary Search Tree.

    :param data: Data to be stored in the node.
    :param next: Reference to the next node in Linked List.
    :param left: Reference to the left child in Binary Search Tree.
    :param right: Reference to the right child in Binary Search Tree.
    """

    def __init__(self, data):
        self.data = data
        self.next = None
        self.left = None
        self.right = None


class LinkedList:
    """
    Linked List is a linear data structure, in which the elements are not stored at contiguous memory locations.

    Use cases:
    - Implementation of stacks and queues
    - Dynamic memory allocation
    - Maintaining a directory of names
    """

    def __init__(self):
        self.head = None

    def append(self, data):
        """Append a node to the end of the linked list."""
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        last = self.head
        while last.next:
            last = last.next
        last.next = new_node

    def insert(self, prev_node, data):
        """Insert a new node after the given prev_node."""
        if not prev_node:
            return
        new_node = Node(data)
        new_node.next = prev_node.next
        prev_node.next = new_node

    def delete_node(self, key):
        """Delete the first occurrence of key in linked list."""
        temp = self.head

        if temp and temp.data == key:
            self.head = temp.next
            temp = None
            return

        prev = None
        while temp and temp.data != key:
            prev = temp
            temp = temp.next

        if temp is None:
            return

        prev.next = temp.next
        temp = None

    def search(self, key):
        """Search for a node with a specific key."""
        current = self.head
        while current:
            if current.data == key:
                return True
            current = current.next
        return False


class BinarySearchTree:
    """
    Binary Search Tree (BST) is a binary tree in which each node has at most two children, referred to as the left child and the right child.

    Use cases:
    - Dynamic search-set
    - Lookup tables
    - Priority queues
    """

    def __init__(self):
        self.root = None

    def insert(self, data):
        """Insert a new node with the given data."""
        if self.root is None:
            self.root = Node(data)
        else:
            self._insert(data, self.root)

    def _insert(self, data, node):
        if data < node.data:
            if node.left is None:
                node.left = Node(data)
            else:
                self._insert(data, node.left)
        else:
            if node.right is None:
                node.right = Node(data)
            else:
                self._insert(data, node.right)

    def find(self, data):
        """Find a node with the given data."""
        return self._find(data, self.root)

    def _find(self, data, node):
        if node is None:
            return None
        if data == node.data:
            return node
        elif data < node.data:
            return self._find(data, node.left)
        else:
            return self._find(data, node.right)

    def inorder(self):
        """Perform an in-order traversal of the tree."""
        self._inorder(self.root)

    def _inorder(self, node):
        if node:
            self._inorder(node.left)
            print(node.data)
            self._inorder(node.right)


if __name__ == "__main__":
    # Stack example
    stack = Stack()
    stack.push(1)
    stack.push(2)
    stack.push(3)
    print("Stack size:", stack.size())
    print("Popped from stack:", stack.pop())
    print("Stack top element:", stack.peek())

    # Queue example
    queue = Queue()
    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    print("Queue size:", queue.size())
    print("Dequeued from queue:", queue.dequeue())

    # Linked List example
    linked_list = LinkedList()
    linked_list.append(1)
    linked_list.append(2)
    linked_list.append(3)
    print("Linked List search 2:", linked_list.search(2))
    linked_list.delete_node(2)
    print("Linked List search 2 after deletion:", linked_list.search(2))

    # Binary Search Tree example
    bst = BinarySearchTree()
    bst.insert(5)
    bst.insert(3)
    bst.insert(7)
    bst.insert(2)
    bst.insert(4)
    bst.insert(6)
    bst.insert(8)
    print("BST Inorder Traversal:")
    bst.inorder()
    print("BST find 4:", bst.find(4) is not None)
    print("BST find 10:", bst.find(10) is not None)

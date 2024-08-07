class Stack {
    /**
     * Stack is a linear data structure which follows a particular order in which the operations are performed.
     * The order may be LIFO (Last In First Out) or FILO (First In Last Out).
     * 
     * Use cases:
     * - Undo mechanism in text editors
     * - Expression evaluation and syntax parsing
     */
    constructor() {
        this.items = [];
    }

    push(item) {
        /** Push an item onto the stack. */
        this.items.push(item);
    }

    pop() {
        /** Pop an item off the stack. */
        if (!this.isEmpty()) {
            return this.items.pop();
        }
        return null;
    }

    peek() {
        /** Get the top item of the stack. */
        if (!this.isEmpty()) {
            return this.items[this.items.length - 1];
        }
        return null;
    }

    isEmpty() {
        /** Check if the stack is empty. */
        return this.items.length === 0;
    }

    size() {
        /** Get the size of the stack. */
        return this.items.length;
    }
}

class Queue {
    /**
     * Queue is a linear data structure which follows a particular order in which the operations are performed.
     * The order is FIFO (First In First Out).
     * 
     * Use cases:
     * - CPU scheduling
     * - Disk scheduling
     * - Handling of real-world queues like ticket booking, call center systems
     */
    constructor() {
        this.items = [];
    }

    enqueue(item) {
        /** Add an item to the queue. */
        this.items.push(item);
    }

    dequeue() {
        /** Remove an item from the queue. */
        if (!this.isEmpty()) {
            return this.items.shift();
        }
        return null;
    }

    isEmpty() {
        /** Check if the queue is empty. */
        return this.items.length === 0;
    }

    size() {
        /** Get the size of the queue. */
        return this.items.length;
    }
}

class Node {
    /**
     * Node class for Linked List and Binary Search Tree.
     * 
     * @param {any} data - Data to be stored in the node.
     */
    constructor(data) {
        this.data = data;
        this.next = null;
        this.left = null;
        this.right = null;
    }
}

class LinkedList {
    /**
     * Linked List is a linear data structure, in which the elements are not stored at contiguous memory locations.
     * 
     * Use cases:
     * - Implementation of stacks and queues
     * - Dynamic memory allocation
     * - Maintaining a directory of names
     */
    constructor() {
        this.head = null;
    }

    append(data) {
        /** Append a node to the end of the linked list. */
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let last = this.head;
        while (last.next) {
            last = last.next;
        }
        last.next = newNode;
    }

    insert(prevNode, data) {
        /** Insert a new node after the given prevNode. */
        if (!prevNode) return;
        const newNode = new Node(data);
        newNode.next = prevNode.next;
        prevNode.next = newNode;
    }

    deleteNode(key) {
        /** Delete the first occurrence of key in linked list. */
        let temp = this.head;
        if (temp && temp.data === key) {
            this.head = temp.next;
            temp = null;
            return;
        }
        let prev = null;
        while (temp && temp.data !== key) {
            prev = temp;
            temp = temp.next;
        }
        if (!temp) return;
        prev.next = temp.next;
        temp = null;
    }

    search(key) {
        /** Search for a node with a specific key. */
        let current = this.head;
        while (current) {
            if (current.data === key) {
                return true;
            }
            current = current.next;
        }
        return false;
    }
}

class BinarySearchTree {
    /**
     * Binary Search Tree (BST) is a binary tree in which each node has at most two children, referred to as the left child and the right child.
     * 
     * Use cases:
     * - Dynamic search-set
     * - Lookup tables
     * - Priority queues
     */
    constructor() {
        this.root = null;
    }

    insert(data) {
        /** Insert a new node with the given data. */
        if (this.root === null) {
            this.root = new Node(data);
        } else {
            this._insert(data, this.root);
        }
    }

    _insert(data, node) {
        if (data < node.data) {
            if (node.left === null) {
                node.left = new Node(data);
            } else {
                this._insert(data, node.left);
            }
        } else {
            if (node.right === null) {
                node.right = new Node(data);
            } else {
                this._insert(data, node.right);
            }
        }
    }

    find(data) {
        /** Find a node with the given data. */
        return this._find(data, this.root);
    }

    _find(data, node) {
        if (node === null) {
            return null;
        }
        if (data === node.data) {
            return node;
        } else if (data < node.data) {
            return this._find(data, node.left);
        } else {
            return this._find(data, node.right);
        }
    }

    inorder() {
        /** Perform an in-order traversal of the tree. */
        this._inorder(this.root);
    }

    _inorder(node) {
        if (node !== null) {
            this._inorder(node.left);
            console.log(node.data);
            this._inorder(node.right);
        }
    }
}

(function main() {
    // Stack example
    const stack = new Stack();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    console.log("Stack size:", stack.size());
    console.log("Popped from stack:", stack.pop());
    console.log("Stack top element:", stack.peek());

    // Queue example
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    console.log("Queue size:", queue.size());
    console.log("Dequeued from queue:", queue.dequeue());

    // Linked List example
    const linkedList = new LinkedList();
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    console.log("Linked List search 2:", linkedList.search(2));
    linkedList.deleteNode(2);
    console.log("Linked List search 2 after deletion:", linkedList.search(2));

    // Binary Search Tree example
    const bst = new BinarySearchTree();
    bst.insert(5);
    bst.insert(3);
    bst.insert(7);
    bst.insert(2);
    bst.insert(4);
    bst.insert(6);
    bst.insert(8);
    console.log("BST Inorder Traversal:");
    bst.inorder();
    console.log("BST find 4:", bst.find(4) !== null);
    console.log("BST find 10:", bst.find(10) !== null);
})();

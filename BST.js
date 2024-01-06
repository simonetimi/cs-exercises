class TreeNode {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}
class Tree {
  constructor(arr) {
    const newArr = Array.from(new Set(arr)).sort((a, b) => a - b);
    this.root = this.buildTree(newArr);
  }

  buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) {
      return null;
    }
    const midPoint = Math.floor((start + end) / 2);
    return new TreeNode(
      arr[midPoint],
      this.buildTree(arr, start, midPoint - 1),
      this.buildTree(arr, midPoint + 1, end)
    );
  }

  insert(value, position = this.root) {
    if (value === this.root.data) {
      return;
    }
    const current = position;
    if (value < current.data) {
      if (current.left === null) {
        const newNode = new TreeNode(value);
        current.left = newNode;
      } else {
        this.insert(value, current.left);
      }
    } else if (value > current.data) {
      if (current.right === null) {
        const newNode = new TreeNode(value);
        current.right = newNode;
      } else {
        this.insert(value, current.right);
      }
    }
  }

  delete(value, position = this.root, previousPosition = undefined, origin = undefined) {
    if (this.root === null) {
      return;
    }

    const previous = previousPosition;
    const current = position;

    if (value < current.data) {
      this.delete(value, current.left, current, 'left');
      return;
    }
    if (value > current.data) {
      this.delete(value, current.right, current, 'right');
      return;
    }

    // if node to delete is the root and it's a leaf or has one child
    if (current === this.root && (current.left === null || current.right === null)) {
      this.root = current.left === null ? current.right : current.left;
      return;
    }

    // if node to delete is leaf
    if (current.left === null && current.right === null) {
      if (origin === 'left') {
        previous.left = null;
      } else if (origin === 'right') {
        previous.right = null;
      }

      // if node to delete has 1 child
    } else if (current.left === null || current.right === null) {
      if (current.left === null) {
        if (origin === 'left') {
          previous.left = current.right;
        } else if (origin === 'right') {
          previous.right = current.right;
        }
      } else if (current.right === null) {
        if (origin === 'left') {
          previous.left = current.left;
        } else if (origin === 'right') {
          previous.right = current.left;
        }
      }

      // if node to delete has 2 children
    } else if (current.left !== null && current.right !== null) {
      let navigationParent = current;
      let navigationRef = current.right;
      while (navigationRef.left !== null) {
        navigationParent = navigationRef;
        navigationRef = navigationRef.left;
      }
      current.data = navigationRef.data;
      if (navigationParent === current) {
        navigationParent.right = navigationRef.right;
      } else {
        navigationParent.left = navigationRef.right;
      }
    }
  }

  findNode(value, position = this.root) {
    if (value === position.data) {
      return position;
    }
    if (value < position.data) {
      return this.findNode(value, position.left);
    }
    if (value > position.data) {
      return this.findNode(value, position.right);
    }
  }

  levelOrder(callback, queue = [this.root]) {
    if (this.root === null) {
      return 'This tree is empty!';
    }
    const newArray = [];
    while (queue.length !== 0) {
      const current = queue.shift();
      if (callback) {
        callback(current);
      } else {
        newArray.push(current.data);
      }
      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
    }
    if (!callback) {
      return newArray;
    }
  }

  preorder(callback, position = this.root, preorderArray = []) {
    const current = position;
    const newArray = preorderArray;
    if (current === null) {
      return;
    }
    if (callback) {
      callback(current);
    } else {
      newArray.push(current.data);
    }
    this.preorder(callback, current.left, newArray);
    this.preorder(callback, current.right, newArray);
    return newArray;
  }

  inorder(callback, position = this.root, preorderArray = []) {
    const current = position;
    const newArray = preorderArray;
    if (current === null) {
      return;
    }
    if (current.left !== null) {
      this.inorder(callback, current.left, newArray);
    }
    if (callback) {
      callback(current);
    } else {
      newArray.push(current.data);
    }
    if (current.right !== null) {
      this.inorder(callback, current.right, newArray);
    }
    return newArray;
  }

  postorder(callback, position = this.root, preorderArray = []) {
    const current = position;
    const newArray = preorderArray;
    if (current === null) {
      return;
    }
    if (current.left !== null) {
      this.postorder(callback, current.left, newArray);
    }
    if (current.right !== null) {
      this.postorder(callback, current.right, newArray);
    }
    if (callback) {
      callback(current);
    } else {
      newArray.push(current.data);
    }
    return newArray;
  }

  height(node) {
    // it wants a node, not the value. use the findNode function to retrive it
    if (node === undefined || node === null) {
      return 0;
    }
    const heightLeft = this.height(node.left);
    const heightRight = this.height(node.right);
    return Math.max(heightLeft, heightRight) + 1;
  }

  depth(node, position = this.root, depth = 1) {
    // it wants a node, not the value. use the findNode function to retrive it
    if (node.data === position.data) {
      return depth;
    }
    if (position === null) {
      return;
    }
    if (node.data < position.data) {
      return this.depth(node, position.left, depth + 1);
    }
    if (node.data > position.data) {
      return this.depth(node, position.right, depth + 1);
    }
    return depth;
  }

  isBalanced(position = this.root) {
    if (position === null) {
      return true;
    }
    const heightLeft = this.height(position.left);
    const heightRight = this.height(position.right);
    return (
      Math.abs(heightLeft - heightRight) <= 1 &&
      this.isBalanced(position.left) &&
      this.isBalanced(position.right)
    );
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};
const testArray = [0, 2, 2, 8, 5, 5, 11, 6, 9, 9, 7, 55, 44, 33, 88, 4, 1, 4, 5, 7];
const beautifulTree = new Tree(testArray);

function driver(tree) {
  prettyPrint(tree.root);
  tree.isBalanced();
  console.log(tree.preorder());
  console.log(tree.inorder());
  console.log(tree.postorder());
}
driver(beautifulTree);

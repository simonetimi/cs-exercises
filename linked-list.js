class LinkedListNode {
  constructor(data = null, next = null) {
    this.data = data;
    this.next = next;
  }
}

export default class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  append(data) {
    const newNode = new LinkedListNode(data);
    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  prepend(data) {
    const newNode = new LinkedListNode(data);
    if (this.head === null) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
  }

  size() {
    let counter = 0;
    let current = this.head;
    while (current !== null) {
      current = current.next;
      counter += 1;
    }
    return counter;
  }

  head() {
    const { head } = this;
    return head;
  }

  tail() {
    let current = this.head;
    while (current.next !== null) {
      current = current.next;
    }
    return current;
  }

  at(index) {
    if (this.head === null) {
      return 'List is empty!';
    }
    if (index < 0) {
      return 'The index must be a non-negative number!';
    }
    let current = this.head;
    for (let i = 0; i < index; i += 1) {
      current = current.next;
    }
    if (current === null) {
      return 'The index is beyond the list limit!';
    }
    return current;
  }

  pop() {
    if (this.head === null) {
      return;
    }
    if (this.head.next === null) {
      this.head = null;
    } else {
      let current = this.head;
      while (current.next.next !== null) {
        current = current.next;
      }
      current.next = null;
    }
  }

  contains(value) {
    if (this.head === null) {
      return 'This list is empty!';
    }
    let current = this.head;
    while (current.data !== value) {
      if (current.next === null) {
        return false;
      }
      current = current.next;
    }
    return true;
  }

  find(value) {
    if (this.head === null) {
      return 'This list is empty!';
    }
    let current = this.head;
    let counter = 0;
    while (current.data !== value) {
      if (current.next === null) {
        return "The list doesn't contain that value!";
      }
      counter += 1;
      current = current.next;
    }
    return counter;
  }

  toString() {
    if (this.head === null) {
      return 'This list is empty!';
    }
    let current = this.head;
    let string = '';
    while (current !== null) {
      string = string.concat(`( ${current.data} ) -> `);
      current = current.next;
    }
    if (current === null) {
      string = string.concat(null);
    }
    return string;
  }

  insertAt(value, index) {
    if (index < 0) {
      return 'The index must be a non-negative number!';
    }
    if (this.head === null) {
      if (index === 0) {
        const newNode = new LinkedListNode(value);
        this.head = newNode;
      }
      return 'The list is empty!';
    }
    if (index === 0) {
      const newNode = new LinkedListNode(value, this.head);
      this.head = newNode;
      return 'Added';
    }
    let current = this.head;
    for (let i = 1; i <= index; i += 1) {
      if (current.next === null) {
        return 'The index is beyond the list limit!';
      }
      current = current.next;
    }
    const newNode = new LinkedListNode(value, current.next);
    current.next = newNode;
    return 'Added';
  }

  removeAt(index) {
    if (index < 0) {
      return 'The index must be a non-negative number!';
    }
    if (this.head === null) {
      return 'The list is empty!';
    }
    if (index === 0) {
      this.head = this.head.next;
      return 'Removed';
    }
    let current = this.head;
    let previous = null;
    for (let i = 0; i < index; i += 1) {
      if (current.next === null) {
        return 'The index is beyond the list limit!';
      }
      previous = current;
      current = current.next;
    }
    previous.next = current.next;
    return 'Removed';
  }
}

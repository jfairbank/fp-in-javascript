// # OOP-Style Lists

// Lists are one of the most common data structures in functional programming.
// They are recursive tree structures. Each node wraps some value, known as the
// **head**, and has a reference to the next node in the list, known as the
// **tail**.
//
// Operating on lists requires recursive functions. As with recursive array
// functions, we need some base case. With arrays it was the empty array.
// Likewise with lists the base case is the empty list, also known as **Nil**.
//
// **Before proceeding**, please check out the purely functional approach to lists
// [here](/list.html).
//
// Unlike the functional approach, we use a hybrid OOP/functional approach
// here. One benefit to this is that both `Nil` and an instance of `Cons`
// adhere to the same interface, so we can make recursive calls on `tails`
// without needing to explicitly check for the empty list, or `Nil`.

import { reduceRight as arrayReduceRight } from './array';

// ## Nil

// As mentioned, `Nil` is the empty list and needed for the base case. Without
// `Nil`, our recursive functions would never know when they reach the end of
// the list.
//
// `Nil` is a singleton, so we will just define an object literal with all
// required methods. Each method basically accomplishes what we did in the
// functional approach when checking for the empty list with `isEmpty`. Note
// that we add getters for `head` and `tail` that throw errors because `Nil`
// can't have either of those.
const Nil = {
  get head() {
    throw new Error('No head of Nil');
  },

  get tail() {
    throw new Error('No tail of Nil');
  },

  isEmpty() {
    return true
  },

  toArray() {
    return [];
  },

  toString() {
    return 'Nil';
  },

  map() {
    return this;
  },

  filter() {
    return this;
  },

  reduce(fn, memo) {
    return memo;
  },

  reduce1(fn, memo) {
    return memo;
  },

  reduceRight(fn, memo) {
    return memo;
  }
};

// ## Cons

// The cons cell represents a node in a list. It wraps over some value, the
// `head`, and references the next node in the list, which may be another
// cons cell or `Nil`, signalling the end of the list.
//
// Implementing a cons cell is straightfoward. We create a `Cons` class that
// has two properties, `head` and `tail`. Remember that `head` is the value
// inside the node (e.g. a number like 42), and `tail` is the next node in the
// list (e.g. another cons cell or `Nil`).
//
// Building lists is accomplished by calls to `new Cons` or the helper `cons`
// defined later on. The last call passes in `Nil` as the `tail` to denote the
// end of the list.
//
// ```js
// const list = new Cons(1, new Cons(2, new Cons(3, Nil)));
// ```
class Cons {
  constructor(head, tail) {
    this.head = head;
    this.tail = tail;
  }

  isEmpty() {
    return false;
  }

  toArray() {
    return this.reduce((array, value) => {
      return array.concat(value);
    }, []);
  }

  toString() {
    const contents = this.tail.reduce((current, value) => {
      return `${current}, ${value}`;
    }, this.head);

    return `list(${contents})`;
  }

  map(fn) {
    return cons(fn(this.head), this.tail.map(fn));
  }

  filter(fn) {
    if (fn(this.head)) {
      return cons(this.head, this.tail.filter(fn));
    }

    return this.tail.filter(fn);
  }

  reduce(fn, memo) {
    return this.tail.reduce(fn, fn(memo, this.head));
  }

  reduce1(fn) {
    return this.tail.reduce(fn, this.head);
  }

  reduceRight(fn, memo) {
    return fn(this.tail.reduceRight(fn, memo), this.head);
  }
}

// ---
// ## Helpers

// Helper function for constructing cons cells without calling the constructor
// directly. Shame, shame on those leaky abstractions.
//
// ```js
// const list = cons(1, cons(2, cons(3, Nil)));
// ```
function cons(head, tail) {
  return new Cons(head, tail);
}

// ---
// Helper function to create a list from an array. We utilize the `reduceRight`
// function for arrays to fold over each value in the array to produce
// subsequent cons cells.
//
// Notice we have to go in a right-to-left direction and start with `Nil` as
// the initial memo value. We want to build the tree from the bottom with
// `Nil`.
//
// ```js
// const list = fromArray([1, 2, 3]);
// ```
function fromArray(values) {
  return arrayReduceRight((list, value) => cons(value, list), Nil, values);
}

// ---
// Unnecessary function, but allows us to use an "array-less" syntax for
// creating lists.
//
// ```js
// const list = create(1, 2, 3);
// ```
function create(...values) {
  return fromArray(values);
}

// ---

export {
  Nil,
  Cons,
  cons,
  fromArray,
  create
};

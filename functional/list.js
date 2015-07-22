// # Lists

// Lists are one of the most common data structures in functional programming.
// They are recursive tree structures. Each node wraps some value, known as the
// **head**, and has a reference to the next node in the list, known as the
// **tail**.
//
// Operating on lists requires recursive functions. As with recursive array
// functions, we need some base case. With arrays it was the empty array.
// Likewise with lists the base case is the empty list, also known as **nil**.

import { reduceRight as arrayReduceRight } from './array';

// ## Nil

// As mentioned, `nil` is the empty list and needed for the base case. Without
// `nil`, our recursive functions would never know when they reach the end of
// the list.
//
// `nil` is a singleton, so we will just create an empty object. We use
// `Object.create(null)` to avoid adding an unnecessary prototype to `nil`.
//
// ```js
// Object.getPrototypeOf(nil); // null
// ```
const nil = Object.create(null);

// ## Cons

// The cons cell represents a node in a list. It wraps over some value, the
// `head`, and references the next node in the list, which may be another
// cons cell or `nil`, signalling the end of the list.
//
// Implementing a cons cell is straightfoward. The `cons` function just returns
// an object literal with a `head` and `tail` property. Remember that `head` is
// the value inside the node (e.g. a number like 42), and `tail` is the next
// node in the list (e.g. another cons cell or `nil`).
//
// Building lists is accomplished by calls to `cons` with the last call passing
// in `nil` as the `tail`.
//
// ```js
// const list = cons(1, cons(2, cons(3, nil)));
// ```
function cons(head, tail) {
  return { head, tail };
}

// ## Helpers

// Helper function to create a list from an array. We utilize the `reduceRight`
// function for arrays to fold over each value in the array to produce
// subsequent cons cells.
//
// Notice we have to go a right-to-left direction and start with `nil` as the
// initial memo value. We want to build the tree from the bottom with `nil`.
//
// ```js
// const list = fromArray([1, 2, 3]);
// ```
function fromArray(values) {
  return arrayReduceRight((list, value) => cons(value, list), nil, values);
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
// Helper function to abstract out the notion of an empty list by just checking
// if the supplied `list` argument is `nil`.
//
// ```js
// isEmpty(create(1, 2, 3)); // false
// isEmpty(nil); // true
// ```
function isEmpty(list) {
  return list === nil;
}

// ---
// Convert a list to an array. Uses the list `reduce` function (explained
// further down the page) to build up an array from each value in the list.
//
// ```js
// toArray(create(1, 2, 3)); // [1, 2, 3]
// toArray(nil); // []
// ```
function toArray(list) {
  return reduce((array, value) => {
    return array.concat(value);
  }, [], list);
}

// ---
// Serialize the list into a string. `toString` uses the list `reduce` function
// like `toArray`, except it builds up a string. Notice we account for the
// empty list and return `'nil'` in that case. Also notice that we grab the
// `head` and `tail` of the list, using `head` as the memo for the `reduce`
// call on `tail`. This allows us to take into account the case where there is
// only one item in the list as well as preventing a trailing comma for lists
// with length greater than 1.
//
// ```js
// toString(create(1, 2, 3)); // 'list(1, 2, 3)'
// toString(nil); // 'nil'
// toString(create(42)); // 'list(42)'
// ```
function toString(list) {
  if (isEmpty(list)) {
    return 'nil';
  }

  const { head, tail } = list;

  const contents = reduce((current, value) => {
    return `${current}, ${value}`;
  }, head, tail);

  return `list(${contents})`;
}

// ---
// ## Map

// `map` is arguably one of the most famous functions in functional
// programming. It allows us to transform the values in a list by applying
// `fn` to each value and returning a new list of the mapped values.
//
// For example, we could use `map` to double every number in a list of
// numbers.
//
// ```js
// map(n => n * 2, create(1, 2, 3)); // create(2, 4, 6)
// ```
//
// Notice for our base case we check for the empty list and then return that.
// This ends the chain of recursive `map` calls and gives a value upon which
// the new list will be built. Remember `nil` has to be the last node in a
// list!
//
// With our recursive calls, we build up a new list with calls to `cons`. We
// use the provided mapping callback `fn` to transform the current `head` to
// produce a new `head` for this new cons cell. The new `tail` is formed by
// making a recursive call to `map`, which we know will also return another
// cons cell or `nil`.
function map(fn, list) {
  if (isEmpty(list)) {
    return list;
  }

  const { head, tail } = list;

  return cons(fn(head), map(fn, tail));
}

// ---
// ## Filter

// `filter`, as its name suggests, allows you to filter the values in an
// list. A great example is selecting all the numbers greater than 3 in
// a list of numbers.
//
// ```js
// const list = create(1, 2, 3, 4, 5);
// filter(n => n > 3, list); // create(4, 5)
// ```
//
// Again the base case is the empty list, so return it. Instead of building
// up a new list of new values, we build up a list of existing values. We will
// only create new cons cells if a value passes the filter function. If the
// value does not pass the filter function, then we return whatever the result
// of `filter` on the tail is equal to.
function filter(fn, list) {
  if (isEmpty(list)) {
    return list;
  }

  const { head, tail } = list;

  if (fn(head)) {
    return cons(head, filter(fn, tail));
  }

  return filter(fn, tail);
}

// ---
// ## Reduce

// `reduce` is another of the functional programming all-stars. `reduce` is
// also known as `fold`, `foldLeft`, and `foldl`. The purpose of `reduce` is to
// "reduce", or "fold over", the values in a list to produce a new value. An
// important piece of `reduce` is the `memo` parameter. As the name suggests,
// `memo` keeps a "memo" of the currently accumulated value that we are
// reducing to. It is critical to supply the starting point for reduce by
// providing an initial memo value.
//
// The quintessential example is finding the sum of numbers in a list of
// numbers. The initial memo value would naturally be 0 then.
//
// ```js
// const add = (x, y) => x + y;
// reduce(add, 0, create(1, 2, 3)); // 6
// ```
function reduce(fn, memo, list) {
  if (isEmpty(list)) {
    return memo;
  }

  const { head, tail } = list;

  return reduce(fn, fn(memo, head), tail);
}

// ---
// `reduce2` is a special case of `reduce` whereby the initial memo is set to
// be the first value in the list. This translates to calling `reduce` on the
// tail of the list with the initial memo's being the first value in the
// original list.
//
// ```js
// reduce2(add, create(1, 2, 3)); // 6
// ```
function reduce2(fn, list) {
  const { head, tail } = list;
  return reduce(fn, head, tail);
}


// ---
// `reduceRight` is the same as `reduce` except it operates in the opposite
// direction. Instead of reducing the list from left to right, or from the
// first value to the last, `reduceRight` reduces the list from right to
// left. This means the first call to `fn` will be with the initial `memo` and
// the **last** value in the list. Therefore, `reduceRight` traverses the
// list in reverse. `reduceRight` is also known as `foldr` and `foldRight`.
//
// ```js
// reduceRight(add, '', create('a', 'b', 'c'));
// // 'cba' not 'abc'!
// ```
function reduceRight(fn, memo, list) {
  if (isEmpty(list)) {
    return memo;
  }

  const { head, tail } = list;

  return fn(reduceRight(fn, memo, tail), head);
}

// ---

export {
  nil,
  cons,
  fromArray,
  create,
  isEmpty,
  toArray,
  toString,
  map,
  filter,
  reduce,
  reduce2,
  reduceRight
};

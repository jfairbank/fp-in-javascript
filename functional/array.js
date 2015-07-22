// # Array Functions

// These are functional implementations of common array methods. They are
// similar to the recursive functions you would write for functional lists.
//
// These functions depend on recursive calls to avoid mutating state as seen in
// `for` loops. Notice that each recursive function relies upon a base case
// to stop. Without a base case, the function would create an infinite loop
// of function calls until the maximum stack size is exhausted!
//
// Another paradigm is the concept of operating on the head, or the first
// element, in the array and then applying the function on the tail, or the
// remaining elements in the array. We can write this succinctly in ES2015 with
// array destructuring and the spread operator.
//
// ```js
// const [head, ...tail] = array;
// ```

// ## Helpers

// Helper function to abstract out the notion of an empty array. Allows base
// case checks in recursive functions to be more declarative.
function isEmpty(array) {
  return array.length === 0;
}

// ## Map

// `map` is arguably one of the most famous functions in functional
// programming. It allows us to transform the values in an array by applying
// `fn` to each value and returning a new array of the mapped values.
//
// For example, we could use `map` to double every number in an array of
// numbers.
//
// ```js
// map(n => n * 2, [1, 2, 3]); // [2, 4, 6]
// ```
function map(fn, array) {
  if (isEmpty(array)) {
    return array;
  }

  const [head, ...tail] = array;

  return [fn(head), ...map(fn, tail)];
}

// ## Filter

// `filter`, as its name suggests, allows you to filter the values in an
// array. A great example is selecting all the numbers greater than 3 in
// an array of numbers.
//
// ```js
// filter(n => n > 3, [1, 2, 3, 4, 5]); // [4, 5]
// ```
function filter(fn, array) {
  if (isEmpty(array)) {
    return array;
  }

  const [head, ...tail] = array;

  if (fn(head)) {
    return [head, ...filter(fn, tail)];
  }

  return filter(fn, tail);
}

// ## Reduce

// `reduce` is another of the functional programming all-stars. `reduce` is
// also known as `fold`, `foldLeft`, and `foldl`. The purpose of `reduce` is to
// "reduce", or "fold over", the values in an array to produce a new value. An
// important piece of `reduce` is the `memo` parameter. As the name suggests,
// `memo` keeps a "memo" of the currently accumulated value that we are
// reducing to. It is critical to supply the starting point for reduce by
// providing an initial memo value.
//
// The quintessential example is finding the sum of numbers in an array of
// numbers. The initial memo value would naturally be 0 then.
//
// ```js
// const add = (x, y) => x + y;
// reduce(add, 0, [1, 2, 3]); // 6
// ```
function reduce(fn, memo, array) {
  if (isEmpty(array)) {
    return memo;
  }

  const [head, ...tail] = array;

  return reduce(fn, fn(memo, head), tail);
}

// ---

// `reduce2` is a special case of `reduce` whereby the initial memo is set to
// be the first element in the array. This translates to calling `reduce` on
// the tail of the array with the initial memo's being the first element in the
// original array.
//
// ```js
// reduce2(add, [1, 2, 3]); // 6
// ```
function reduce2(fn, array) {
  const [head, ...tail] = array;
  return reduce(fn, head, tail);
}

// ---

// `reduceRight` is the same as `reduce` except it operates in the opposite
// direction. Instead of reducing the array from left to right, or from the
// first element to the last, `reduceRight` reduces the array from right to
// left. This means the first call to `fn` will be with the initial `memo` and
// the **last** element in the array. Therefore, `reduceRight` traverses the
// array in reverse. `reduceRight` is also known as `foldr` and `foldRight`.
//
// ```js
// reduceRight(add, '', ['a', 'b', 'c']); // 'cba' not 'abc'!
// ```
function reduceRight(fn, memo, array) {
  if (isEmpty(array)) {
    return memo;
  }

  const [head, ...tail] = array;

  return fn(reduceRight(fn, memo, tail), head);
}

// ---

export {
  isEmpty,
  map,
  filter,
  reduce,
  reduce2,
  reduceRight
};

/**
 * ## Array functions.
 *
 * These functions depend on recursive calls to avoid mutating state like using
 * `for` loops. Notice that each recursive function relies upon a base case
 * to stop. Without a base case, the function would create an infinite loop
 * of function calls until the maximum stack size is exhausted.
 *
 * Another paradigm is the concept of operating on the head, or the first
 * element, in the array and then applying the function on the tail, or the
 * remaining elements in the array. We can write this succinctly in ES2015 with
 * array destructuring and the spread operator.
 *
 * @example
 * const [head, ...tail] = array;
 *
 * @module functional/array
 */

/**
 * Helper function to abstract out the notion of an empty array. Allows base
 * case checks in recursive functions to be more declarative.
 *
 * @example
 * isEmpty([]); // true
 * @example
 * isEmpty([1, 2, 3]); // false
 *
 * @param {Array} array
 * @returns {Boolean}
 */
function isEmpty(array) {
  return array.length === 0;
}

/**
 * `map` is arguably one of the most famous functions in functional
 * programming. It allows us to transform the values in an array by applying
 * `fn` to each value and returning a new array of the mapped values.
 *
 * For example, we could use `map` to double every number in an array of
 * numbers.
 *
 * Notice
 *
 * @example
 * map(n => n *2, [1, 2, 3]); // [2, 4, 6]
 *
 * @param {Function} fn - Function to apply to every value
 * @param {Array} array
 * @returns {Array}
 */
function map(fn, array) {
  if (isEmpty(array)) {
    return array;
  }

  const [head, ...tail] = array;

  return [fn(head), ...map(fn, tail)];
}

/**
 * `filter`, as its name suggests, allows you to filter the values in an
 * array. A great example is selecting all the numbers greater than 3 in
 * an array of numbers.
 *
 * @example
 * filter(n => n > 3, [1, 2, 3, 4, 5]); // [4, 5]
 *
 * @param {Function} fn - Function to check if each value passes the filter
 * @param {Array} array
 * @returns {Array}
 */
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

/**
 * Callback type for the `reduce` function. This is the function you supply to
 * `reduce` to a produce a new value.
 *
 * @callback reduceCallback
 * @param {*} memo - The accumulated memo.
 * @param {*} value - A value in the array that is being reduced.
 * @returns {*} Typically, this should be the same type as `memo`.
 */

/**
 * `reduce` is another of the functional programming all-stars. `reduce` is
 * also known as `fold` and `foldLeft`. The purpose of `reduce` is to "reduce",
 * or "fold over", the values in an array to produce a new value. An important
 * piece of `reduce` is the `memo` parameter. As the name suggests, `memo`
 * keeps a "memo" of the currently accumulated value that we are reducing to.
 * It is critical to supply the starting point for reduce by providing an
 * initial memo value.
 *
 * The quintessential example is finding the sum of numbers in an array of
 * numbers. The initial memo value would naturally be 0 then.
 *
 * @example
 * reduce((x, y) => x + y, 0, [1, 2, 3]); // 6
 *
 * @param {reduceCallback} fn - Function to combine an array value and the current memo to produce a new memo.
 * @param {*} memo - The initial memo value.
 * @param {Array} array
 * @returns {*} Typically, this should be the same type as `memo`.
 */
function reduce(fn, memo, array) {
  if (isEmpty(array)) {
    return memo;
  }

  const [head, ...tail] = array;

  return reduce(fn, fn(memo, head), tail);
}

/**
 * A special case of `reduce` whereby the initial memo is set to be the first
 * element in the array. This translate to calling `reduce` on the tail of the
 * array with the initial memo's being the first element in the original array.
 *
 * @example
 * reduce2((x, y) => x + y, [1, 2, 3]); // 6
 *
 * @param {reduceCallback} fn - Function to combine an array value and the current memo to produce a new memo.
 * @param {Array} array
 * @returns {*} Typically, this should be the same type as the elements of the array but not necessarily.
 */
function reduce2(fn, array) {
  const [head, ...tail] = array;
  return reduce(fn, head, tail);
}

/**
 * `reduceRight` is the same as `reduce` except it operates in the opposite
 * direction. Instead of reducing the array from left to right, or from the
 * first element to the last, `reduceRight` reduces the array from right to
 * left. This means the first call to `fn` will be with the initial `memo` and
 * the *last* element in the array. Therefore, `reduceRight` traverses the
 * array in reverse. `reduceRight` is also known as `foldr` and `foldRight`.
 *
 * @example
 * reduceRight((x, y) => x + y, '', ['a', 'b', 'c']); // 'cba' not 'abc'!
 *
 * @param {reduceCallback} fn - Function to combine an array value and the current memo to produce a new memo.
 * @param {*} memo - The initial memo value.
 * @returns {*} Typically, this should be the same type as `memo`.
 */
function reduceRight(fn, memo, array) {
  if (isEmpty(array)) {
    return memo;
  }

  const [head, ...tail] = array;

  return fn(reduceRight(fn, memo, tail), head);
}

/**
 * Like its `reduce2` counterpart, `reduceRight2` sets the initial memo value,
 * except it uses the *last* element as the initial value. Like `reduceRight`,
 * `reduceRight2` traverses the array in the reverse direction.
 *
 * @example
 * reduceRight((x, y) => x + y, ['a', 'b', 'c']); // 'cba' not 'abc'!
 *
 * @param {reduceCallback} fn - Function to combine an array value and the current memo to produce a new memo.
 * @param {Array} array
 * @returns {*} Typically, this should be the same type as the elements of the array but not necessarily.
 */
function reduceRight2(fn, array) {
  const [head, ...tail] = array;
  return reduceRight(fn, head, tail);
}

export {
  isEmpty,
  map,
  filter,
  reduce,
  reduce2,
  reduceRight,
  reduceRight2
};

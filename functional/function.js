// # Yo dawg, functions for functions

// These functions faciliate building up new functions from smaller
// functions.

import { reduceRight } from './array';

// ## Partial

// `partial` works by taking a function, "prefilling" the values of some number
// of parameters, and returning a new function with those parameter values
// filled. The returned function then takes in any remaining arguments when
// invoked.
//
// `partial` is very easy to implement in ES2015 with rest parameters via the
// spread operator. The newly created function is a closure that will remember
// the `args` that were intially supplied. It can then take in `otherArgs` and
// call the original function with the partially applied `args` and newly
// supplied `otherArgs` via the spread operator.
//
// ```js
// const add = (x, y) => x + y;
// const add1 = partial(add, 1);
//
// add1(2); // 3
// ```
function partial(fn, ...args) {
  return (...otherArgs) => fn(...args, ...otherArgs);
}

// ---
// ## Curry

// `curry` offers a way to inject `partial` functionality directly into a
// function. A curried function will apply its argument when invoked until all
// arguments have been supplied. If not all arguments are supplied, then the
// curried function will return a new function with the previous arguments
// "prefilled".
//
// Any number of arguments can be taken with each call. If a call happens to
// satisfy all formal parameters, then the function will actually be invoked.
//
// ```js
// const add = curry((x, y, z) => x + y + z);
//
// // Call one argument at a time
// add(1)(2)(3); // 3 calls to yield 6
//
// // Same as:
// const add1 = add(1);
// const add3 = add1(2);
// add3(3); // 6
//
// // Other combinations:
// add(1, 2)(3); // 2 calls to yield 6
// add(1)(2, 3); // 2 calls to yield 6
// add(1, 2, 3); // 1 call to yield 6
// ```
function curry(fn, len = fn.length) {
  return (...args) => {
    if (args.length >= len) {
      return fn(...args);
    }

    return curry(
      partial(fn, ...args),
      len - args.length
    );
  };
}

// ---
// ## Compose

// Function composition allows functions to be combined to form new functions.
// Composition works by passing the output of one function as the input to the
// next function in a chain of functions.
//
// The order of function calls is important. The last function supplied to a
// `compose` function will be the first function called when the new function
// is actually invoked. Therefore, the function calls flow from right to left.
//
// `compose2` is the simple case where we take two functions to produce a new
// function.
//
// ```js
// const double = (x) => x + x;
// const square = (x) => x * x;
// const doubleAndSquare = compose2(square, double);
//
// doubleAndSquare(4); // 64
// ```
function compose2(f, g) {
  return (...args) => f(g(...args));
}

// ---
// The more general `compose` function takes any number of functions to produce
// a new composed function. We can treat the variadic number of function
// parameters as an array and utilize the `reduceRight` function to
// successively call each original function.
//
// Remember `reduceRight` "reduces" or "folds over" an array to produce a new
// value. In this case, we want to reduce to the final output and in a
// right-to-left direction, so we call each function and use its return value
// as the new `memo` value.
//
// The initial memo will be the arguments supplied to the composed function.
// We capture those arguments in an array via the spread operator, so we make
// sure to keep `memo` as an array with each call inside `reduceRight`. With
// subsequent calls, `memo` will only contain one element because a function
// can only return one value. Therefore, we index into the result array with
// index `0` for our final value.
function compose(...fns) {
  return (...args) => {
    const result = reduceRight((memo, fn) => {
      return [fn(...memo)];
    }, args, fns);

    return result[0];
  };
}

// ---

export { partial, curry, compose2, compose };

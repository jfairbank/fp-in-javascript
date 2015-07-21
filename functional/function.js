import { reduceRight } from './array';

function partial(fn, ...args) {
  return (...otherArgs) => fn(...args, ...otherArgs);
}

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

function compose2(f, g) {
  return (...args) => f(g(...args));
}

function compose(...fns) {
  return (...args) => {
    const result = reduceRight((memo, fn) => {
      return [fn(...memo)];
    }, args, fns);

    return result[0];
  };
}

export { partial, curry, compose2, compose };

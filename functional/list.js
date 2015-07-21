import { reduceRight as arrayReduceRight } from './array';

const nil = Object.create(null);

function cons(head, tail) {
  return { head, tail };
}

function isEmpty(list) {
  return list === nil;
}

function create(...values) {
  return arrayReduceRight((list, value) => cons(value, list), nil, values);
}

function map(fn, list) {
  if (isEmpty(list)) {
    return list;
  }

  const { head, tail } = list;

  return cons(fn(head), map(fn, tail));
}

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

function reduce(fn, memo, list) {
  if (isEmpty(list)) {
    return memo;
  }

  const { head, tail } = list;

  return reduce(fn, fn(memo, head), tail);
}

function reduce2(fn, list) {
  const { head, tail } = list;
  return reduce(fn, head, tail);
}

export {
  nil,
  cons,
  create,
  map,
  filter,
  reduce,
  reduce2
};

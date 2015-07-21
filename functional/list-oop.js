import { reduceRight as arrayReduceRight } from './array';

const Nil = {
  get head() {
    throw new Error('No head of Nil');
  },

  get tail() {
    throw new Error('No tail of Nil');
  },

  map() {
    return this;
  },

  filter() {
    return this;
  },

  reduce(memo) {
    return memo;
  },

  reduce1(memo) {
    return memo;
  }
};

class Cons {
  constructor(head, tail) {
    this.head = head;
    this.tail = tail;
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

  reduce(memo, fn) {
    return this.tail.reduce(fn(memo, this.head), fn);
  }

  reduce1(fn) {
    return this.tail.reduce(this.head, fn);
  }
}

function cons(head, tail) {
  return new Cons(head, tail);
}

function create(...values) {
  return arrayReduceRight((list, value) => cons(value, list), Nil, values);
}

export {
  Nil,
  Cons,
  cons,
  create
};

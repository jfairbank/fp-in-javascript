// # Generators

function *naturalNumbers(n = 1) {
  yield n;
  yield *naturalNumbers(n + 1);
}

function *evenNumbers(n = 2) {
  yield n;
  yield *evenNumbers(n + 2);
}

function *fibonacciSequence(current = 0, next = 1) {
  yield current;
  yield *fibonacciSequence(next, current + next);
}

function take(n, gen, accum = []) {
  if (n === 0) {
    return accum;
  }

  return take(n - 1, gen, accum.concat(gen.next().value));
}

function naturalNumbers() {
  function generator(n) {
    return {
      value: n,
      next() {
        return generator(n + 1);
      }
    };
  }

  return () => generator(1);
}

function evenNumbers() {
  function generator(n) {
    return {
      value: n,
      next() {
        return generator(n + 2);
      }
    };
  }

  return () => generator(2);
}

function fibonacciSequence() {
  function generator(current, next) {
    return {
      value: current,
      next() {
        return generator(next, current + next);
      }
    };
  }

  return () => generator(0, 1);
}

function take(n, gen, accum = []) {
  if (n === 0) {
    return accum;
  }

  const { value, next } = gen();
  return take(n - 1, next, accum.concat(value));
}

function map(fn, origGen) {
  function _map(gen) {
    const { value, next } = gen();
    return [fn(value), next];
  }

  const initial = _map(origGen);

  return generator((lastValue, nextGen) => {
    return _map(nextGen);
  }, ...initial);
}

function filter(fn, origGen) {
  function _filter(gen) {
    const { value, next } = gen();

    if (fn(value)) {
      return [value, next];
    }

    return _filter(next);
  }

  const initial = _filter(origGen);

  return generator((lastValue, nextGen) => {
    return _filter(nextGen);
  }, ...initial);
}

function generator(fn, ...initial) {
  function _generator(...args) {
    return {
      value: args[0],
      next() {
        return _generator(...fn(...args));
      }
    };
  }

  return () => _generator(...initial);
}

//const naturalNumbers = generator(n => [n + 1], 1);
//const evenNumbers = map(n => n * 2, naturalNumbers);
//const gt6Even = filter(n => n > 6, evenNumbers);
////const evenNumbers = generator(n => [n + 2], 2);
////const fibonacciSequence = generator((x, y) => [y, x + y], 0, 1);

////console.log(take(5, naturalNumbers));
////console.log(take(5, evenNumbers));
////console.log(take(5, gt6Even));

//const double = (n) => n * 2;
//const gt3 = (n) => n > 3;

//console.log(take(5, filter(gt3, map(double, naturalNumbers))));
//console.log(take(5, map(double, filter(gt3, naturalNumbers))));

////console.log(take(10, fibonacciSequence()));

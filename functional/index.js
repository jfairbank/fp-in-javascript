// # Functional Programming Basics in JavaScript

// This website aims to provide a one stop source for teaching functional
// programming paradigms by implementing them in JavaScript &mdash; ES2015 to
// be exact! If you have wondered how to implement a recursive `map` function
// or create a `curry` function, then this website will explain it to you.
//
// Functional programming continues to grow in popularity and is becoming
// increasingly relevant in the world of JavaScript frameworks and libraries.
// Utilize this website to gain better understanding of the foundational
// concepts of functional programming in order to better appreciate the
// frameworks and libraries available in JavaScript.
//
// ## Contributing
//
// This is a work in progress with lots of content to come. If you would like
// to help contribute to this website or give feedback, please get in touch at
// the GitHub repo here:
// [jfairbank/fp-in-javascript](https://github.com/jfairbank/fp-in-javascript).
//
// ## Links
//
// To see different functional programming concepts and code definitions please
// visit any of the links below:
//
// * ### [Arrays](/array.html)
// * ### [Functions](/function.html)
// * ### [Lists](/list.html)
// * ### [OOP-Style Lists](/list-oop.html)
import { curry } from './function';
import { map } from './array';

const multiply = curry((x, y) => x * y);
const curriedMap = curry(map);
const doubleNumbers = curriedMap(multiply(2));

const numbers = [1, 2, 3];

console.log(doubleNumbers(numbers)); // [2, 4, 6]

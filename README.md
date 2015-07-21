# Functional Programming Basics in JavaScript

This repo aims to provide a one stop source for explaining functional
programming programs by implementing them in JavaScript -- ES2015 to be exact!
If you have ever wondered how to implement a recursive map or create a curry
function, then this is the repo to explore.

This is a work in progress, especially as I try to annotate the source code
with comments, explaining each function. I'm open to better alternatives for
annotating the source code as well, so feel free to make suggestions.

## Goals

As previously mentioned, I want this to be a repo for understanding **any**
functional programming paradigm with readable code. Functional programming
continues to grow in popularity and is becoming increasingly relevant in the
world of JavaScript frameworks and libraries. Use this repo to be able to better
understand the foundational concepts of functional programming in order to
better appreciate the libraries and frameworks available to us in JavaScript.

## Performance

I mentioned that one goal is to write and explain these concepts with readable
code. What I really mean by that is that I don't intend for this to be
production-worthy code. I know there are certain optimizations that could be
applied to speed up these functions. However, writing "performant" code will
only obfuscate what the code is trying to teach, which is functional programming
basics in JavaScript.

I want to keep the barrier to entry for understanding functional programming as
low as possible. The **concepts** are important, not necessarily the code.
Nonetheless, I may be eating my own words as I use concise ES2015 expressions
that at first appear unreadable. I welcome feedback and alternatives to some of
the approaches I take in the code examples.

## ES2015 and Beyond

The newer standards of ECMAScript continue to make functional programming less
cumbersome in JavaScript. Recursive functions becoming especially concise with
arrow functions, the spread operator, and destructuring. Therefore, this
project's source will use ES2015 and any other new features in future specs if
they are helpful to writing more expressive, functional JavaScript.

## Contributing

I aim to cover most of the well-known paradigms in functional programming, so
please bear with me as I update the source. However, I definitely welcome PR's,
so if there is a particular concept or pattern you would like to contribute to,
please let me know, so we can coordinate our contributions.

If there is a particular pattern you want to see but not up for coding it, then
just open an issue to bring it to my attention.

### Style

As I already mentioned, this codebase will use ES2015, so please use ES2015
syntax and paradigms over ES5. As far as style, you can follow Airbnb's style
guide at https://github.com/airbnb/javascript. One exception to that is that I'm
flexible on the optional parens for single-input arrow functions. Sometimes, I
even prefer to not use the parens.

This code isn't meant to be performant. This isn't intended to be a lodash-like
library. Please write readable and fairly self-explanatory code.

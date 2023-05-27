# **Flowe**

**simplifies the process of organizing and managing flow sequences. Its powerful and intuitive package makes performance optimization seamless and accessible.**

<div align="center">
  <p>
 <a href="https://www.npmjs.com/package/flowe"><img src="https://img.shields.io/npm/v/flowe.svg?style=for-the-badge" alt="NPM version" /></a>
 <a href="https://www.npmjs.com/package/flowe"><img src="https://img.shields.io/npm/dt/flowe.svg?maxAge=3600&style=for-the-badge" alt="NPM downloads" /></a>
 <a href="https://github.com/4i8/flowe.git">
    <img src="https://img.shields.io/badge/github-black?style=for-the-badge&logo=github&logoColor=white" alt="github"/>
  </a>
  </p>
</div>

## Table of Contents

- [Support](#support)
- [Installation](#installation)
- [Example](#example)
  - [CommonJS](#commonjs)
  - [ES6](#es6)
  - [What is the use of a namespace?](#what-is-the-use-of-a-namespace)
- [API](#api)
  - [constructor(namespace, callback)](#constructornamespace-callback)
  - [next()](#next)
  - [push(task)](#pushtask)
  - [concat(tasks)](#concattasks)
  - [kill()](#kill)
- [License](#license)

## Support

- **ECMAScript Modules (ESM)**
- **CommonJS (CJS)**

# **Installation**

```sh-session
npm install flowe
yarn add flowe
```

# **Example**

## Note

Every push() or concat() will start your flowe if it is not already running so you don't have to worry about starting it manually

### CommonJS

this is just an example, you can use flowe for anything

```js
const flowe = require("flowe").default;
const https = require("https");
const namespace = new flowe("namespace", (value, next, index) => {
  // do something...
  https.get(value.url, (res) => {
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });
    res.on("end", () => {
      console.log(data);
      next(); // when you are done, call next() to move to the next task
    });
  });
});
let dorequests = [
  {
    url: "https://jsonplaceholder.typicode.com/todos/1",
    method: "GET",
  },
  {
    url: "https://jsonplaceholder.typicode.com/todos/2",
    method: "GET",
  },
  {
    url: "https://jsonplaceholder.typicode.com/todos/3",
    method: "GET",
  },
];
// concat is a method that adds an array of items to the namespace queue
namespace.concat(dorequests);
//push is a method that adds a single item to the namespace queue
namespace.push({
  url: "https://jsonplaceholder.typicode.com/todos/4",
  method: "GET",
});
// every push or concat will start the namespace if it is not already running
```

### ES6

this is just an example, you can use flowe for anything

```js
import flowe from "flowe";
import https from "https";
const namespace = new flowe("namespace", (value, next, index) => {
  // do something...
  https.get(value.url, (res) => {
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });
    res.on("end", () => {
      console.log(data);
      next(); // when you are done, call next() to move to the next task
    });
  });
});
let dorequests = [
  {
    url: "https://jsonplaceholder.typicode.com/todos/1",
    method: "GET",
  },
  {
    url: "https://jsonplaceholder.typicode.com/todos/2",
    method: "GET",
  },
  {
    url: "https://jsonplaceholder.typicode.com/todos/3",
    method: "GET",
  },
];
// concat is a method that adds an array of items to the namespace queue
namespace.concat(dorequests);
//push is a method that adds a single item to the namespace queue
namespace.push({
  url: "https://jsonplaceholder.typicode.com/todos/4",
  method: "GET",
});
// every push or concat will start the namespace if it is not already running
```

### What is the use of a namespace?

To avoid throwing errors, do not use the same namespace more than once in the same process.

#### `test/index.js`

```js
const tools = new flowe("tools", async (value, next, index) => {
  // do something...
  console.log(value);
  next(); //hello2
});
tools.push("hello");
```

#### `test/inside/tools.js`

**to index.js in your flowe instance named tools**

```js
const tools = new flowe("tools");
tools.push("hello2");
//or
tools.concat(["hello2", "hello3"]);
```

# API

<p><strong> Flowe provides the following methods:</strong>

> ##### `constructor(namespace, callback)`
>
> Creates a new instance of the Flowe class with the provided namespace and callback function.

- namespace (string) - The namespace for the flow sequence.
- callback (Function) - The callback function that takes a value, a next function, and an index as parameters.

> #### `next()`
>
> Moves the flow sequence to the next task and runs it.

> #### `push(task)`
>
> Adds a new task to the end of the flow sequence.

- task (any) - The task to add to the flow sequence.

> #### `concat(tasks)`
>
> Adds an array of tasks to the end of the flow sequence.

- tasks (Array) - The array of tasks to add to the flow sequence.

> #### `kill()`
>
> Stops the current flow sequence and prevents any remaining tasks from running.

# License

Flowe is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)

</p>

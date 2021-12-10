---
title: How to use async/await in JavaScript
layout: Post
date:  2021-04-20 -0600
external: GitHub
sourceurl: https://github.com/frederickm13/code-samples/tree/master/JavaScript/UseAsyncAwaitJavaScript
excerpt: In this post I will be discussing how to develop using async/await in JavaScript.
tags: [JavaScript, Node, Web, Development, Programming, Async, Asynchronous, AJAX]
---

The use of asynchronous programming is essential in web development. Not only is it essential, but asynchronous programming is extremely powerful. In this article I will be giving a brief overview of how to use the `async` and `await` keywords in JavaScript. Also, please find some additional helpful links/resources at the end of this article.

## Background of asynchronous programming
The earliest version of asynchronous programming in JavaScript (at least the earliest that I am aware of) involved the use of "callback" functions. Essentially, "callback" functions provide the developer with a way to pass a function as a parameter to another function. This "callback" function would then be executed once the initial function is complete. The use of "callback" functions is still fairly common, especially in Node.js development. 

Building upon the concept of asynchronous programming, `Promise` objects were introduced to the JavaScript language. To simplify, JavaScript `Promise` objects enable the developer to more easily write effective, maintainable, asynchronous code. `Promise` objects are a very complex topic, and I will not try to explain them in great detail in this article. Hopefully if you are reading this article, then it means you already have some familiarity with `Promise` objects. If not, then I would suggest that you check out some of the following resources: 

- *MDN Web Docs*: [Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- *ErickMcCollum.com*: [How to Chain JavaScript Promises](/2020/05/13/how-to-chain-javascript-promises.html)
- *ErickMcCollum.com*: [How to convert a callback-based function to a promise-based function in JavaScript](/2021/02/09/convert-callback-promise.html)

JavaScript `Promise` objects were a great advancement in asynchronous programming. However, `Promise` objects still pose some complexities that can make them difficult to develop with. This is where the `async` and `await` keywords come into play. The `async` and `await` keywords empower a JavaScript developer to build upon the functionality of `Promise` objects in a way that is much easier to work with, as well as being much more maintainable.

## How to use the `async` keyword
The `async` keyword can be placed in front of a JavaScript function definition. This keyword declares that a function is asynchronous, and it will return a `Promise` object. Using the `async` keyword enables the developer to write asynchronous code without needing to explicitly create and return `Promise` objects.

For example, please see below how a `Promise`-based function can be re-written to use the `async` keyword. 

**Function definition using `Promise` object**:

<pre class="bg-light rounded" style="overflow: auto;">

    function getDataAsync() {
        return new Promise((resolve, reject) => {
            try {
                let data = getSomeData();
                return resolve(data);
            } catch (e) {
                return reject(e);
            }
        });
    }
    
</pre>

**Function definition using `async` keyword**:

<pre class="bg-light rounded" style="overflow: auto;">

    async function getDataAsync() {
        try {
            let data = getSomeData();
            return data;
        } catch (e) {
            throw e;
        }
    }
    
</pre>

## How to use the `await` keyword
The `await` keyword can be used when calling any asynchronous function that returns a `Promise` object. This keyword tells the JavaScript runtime not to execute any code past that line until the asynchronous function has completed. Using the `await` keyword provides the developer with a way to write asynchronous code without the need for `.then()` or `.catch()` statements. 

One caveat to keep in mind is that the `await` keyword can **only** be used within an asynchronous function that was defined using the `async` keyword.

For example, please see below how a function call using `Promise` objects can be re-written to use the `await` keyword. 

**Function call using `Promise` object**:

<pre class="bg-light rounded" style="overflow: auto;">

    function getDataAndDoSomethingAsync() {
        getDataAsync()
            .then((data) => {
                doSomethingHere(data);
            })
            .catch((error) => {
                throw error;
            });
    }
    
</pre>

**Function call using `await` keyword**:

<pre class="bg-light rounded" style="overflow: auto;">

    async function getDataAndDoSomethingAsync() {
        try {
            let data = await getDataAsync();
            doSomethingHere(data);
        } catch (error) {
            throw error;
        }
    }
    
</pre>

## Additional resources
The following resources may also be helpful.

- *MDN Web Docs*: [Making asynchronous programming easier with async and await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)
- *MDN Web Docs*: [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
- *MDN Web Docs*: [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- *freeCodeCamp.org*: [How to Use Async/Await in JavaScript with Example JS Code](https://www.freecodecamp.org/news/async-await-in-javascript/)
- *w3schools.com*: [JavaScript Async](https://www.w3schools.com/Js/js_async.asp)
---
title: How to Chain JavaScript Promises
layout: Post
date: 2020-05-13 -0600
sourceurl: https://github.com/frederickm13/code-samples/tree/master/JavaScript/ChainingPromises
excerpt: A good understanding of how to chain JavaScript Promise objects will greatly improve the productivity of a JavaScript developer.
external: GitHub
tags: [Programming]
type: article
---

JavaScript `Promise` objects are a great addition to an already great programming language. However, as the number of `Promise` objects in one's source code increases, that source code can quickly get out of hand if those `Promise` objects are not organized efficiently. 

A good understanding of how to chain JavaScript `Promise` objects will greatly improve the productivity of a JavaScript developer.

## Overview
In this article, I will provide a brief demonstration of how to chain JavaScript `Promise` objects. Please note, this article assumes that you have a basic of JavaScript `Promise` objects. If you need a refresher, then I would recommend checking out the following page in the [Mozilla Developer Network (MDN) Web Docs: Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises).

## The keys to chaining promises: .then() and .catch()
In order to chain `Promise` objects in JavaScript, it is important to understand the two primary methods associated with doing so. These two methods are [`Promise.prototype.then()`](https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/promise/then) and [`Promise.prototype.catch()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch). 

### Promise.prototype.then() method
The `.then()` method can be appended onto the end of a `Promise` object to execute a callback function depending on whether the `Promise` succeeded or failed. The syntax for the `.then()` method is as follows:

<pre class="bg-light rounded" style="overflow: auto;">

    // In this example, 'prom' is a Promise object

    prom.then(function (successResult) {
        // Execute some code if the promise succeeds
    }, function (errorResult) {
        // Execute some code if the promise fails
    });

</pre>

The most important aspect of the `.then()` method is that it also returns a `Promise` object. The value of this resolved `Promise` object depends on a number of factors. For more information on how the `.then()` method resolves its own `Promise`, please see the following article on the [Mozilla Developer Network (MDN) Web Docs: Promise.prototype.then()](https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/promise/then).

### Promise.prototype.catch() method
The `.catch()` method can be appended onto the end of a `Promise` object, similar to the `.then()` method. The .`catch()` method takes one callback function as a parameter, and it executes this function if the parent `Promise` object fails. 

In fact, the `.catch()` method is actually just a shorthand version of passing a callback function as the second parameter of the `.then()` method. The syntax for the `.catch()` method is as follows:

<pre class="bg-light rounded" style="overflow: auto;">

    // In this example, 'prom' is a Promise object

    prom.catch(function (errorResult) {
        // Execute some code if the promise fails
    });

</pre>

Similar to the `.then()` method, the `.catch()` method returns a `Promise` object. For more information on how the `.catch()` method resolves its own `Promise`, please see the following article on the [Mozilla Developer Network (MDN) Web Docs: Promise.prototype.catch()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch).

## Chaining Promises
Since the `.then()` and `.catch()` methods can both be appended onto a `Promise` object, and they both return their own `Promise` objects, these two methods can be used to chain multiple `Promise` objects together. Please see the example below, demonstrating how to chain `Promise` objects together in JavaScript: 

<pre class="bg-light rounded" style="overflow: auto;">

    // In this example, 'prom' is a Promise object

    prom.then(function (successResult) {

        if (successResult) {
            return true;
        } else {
            return false;
        }

    }).then(function (tfVal) {

        // This function will build a message string using the value
        // returned from the previous Promise
        
        let message = "The previous Promise returned: " + tfVal;

        return message;

    }).then(function(msg) {

        // This function will log the message returned from the 
        // previous Promise to the console

        console.log(msg);
        
        // It is good practice to always return a value from a Promise

        return true;

    }).catch(function (e) {

        // One .catch() function at the end of the chain will handle 
        // any previously uncaught failures within the chain

        console.log("An error occurred somewhere in the Promise pipeline: " + e.message);

    });

</pre>

As mentioned, this article provided a brief demonstration of how to chain JavaScript `Promise` objects. For more information on JavaScript `Promise` objects and their usage, please see the resources provided below. 

### References
The code used in this article may be found in my *GitHub* repository at the following link: [ChainingPromises](https://github.com/frederickm13/code-samples/tree/master/JavaScript/ChainingPromises).

Additionally, please see the following *Mozilla Developer Network (MDN)* documentation for more information:
- [Mozilla Developer Network (MDN) Web Docs](https://developer.mozilla.org/en-US/)
- [MDN Web Docs: Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [MDN Web Docs: Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN Web Docs: Promise.prototype.then()](https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/promise/then)
- [MDN Web Docs: Promise.prototype.catch()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)
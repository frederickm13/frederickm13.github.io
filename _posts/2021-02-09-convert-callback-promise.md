---
title: How to convert a callback-based function to a promise-based function in JavaScript
layout: Post
date:  2021-02-09 -0600
external: GitHub
sourceurl: https://github.com/frederickm13/code-samples/tree/master/JavaScript/ConvertCallbackToPromise
excerpt: In this post I will be discussing how to convert a callback-based function to a promise-based function in JavaScript.
tags: [JavaScript, Node, Web, Development, Programming]
type: article
---

When working with asynchronous code in JavaScript, one will inevitably encounter the use of both callback functions and promise objects. Unfortunately, the use of both callbacks and promises in the same source code base can lead to confusion. Additionally, the use of nested callback functions can lead to code that is complicated to read and follow. Nested callback functions can quickly get out of hand, and it is difficult to organize code that utilizes multiple nested callbacks. 

Fortunately, promise objects in JavaScript are much easier to write well-organized code with. [JavaScript promise objects can be chained together](https://www.erickmccollum.com/2020/05/13/how-to-chain-javascript-promises.html), which leads to a source code base that is less complicated to follow and maintain. Therefore, when working with JavaScript code that requires callback functions, it is oftentimes better to create a "wrapper" function that utilizes promise objects. This "wrapper" promise-based function can then be invoked moving forward instead of the callback-based function. 

## Callback function example
For example, the [Node.js fs.readFile](https://nodejs.org/dist/latest-v14.x/docs/api/fs.html#fs_fs_readfile_path_options_callback) function requires a callback function, rather than a utilizing a promise object. In order to read a text file using this function, one might use code similar to the following excerpt. 

<pre class="bg-light rounded" style="overflow: auto;">

    fs.readFile("MyTextFile.txt", "utf8", (err, data) => {
        if (err) {
            throw err;
        }

        console.log(data);
    });
    
</pre>

Now I understand that the above code seems fine (syntactically speaking, it is fine). However, if one wanted to perform additional operations that also required callback functions, then the above code could quickly become confusing as nested callbacks start building up. This is where the use of promise objects can greatly improve source code readability and maintainability.

## Create a "wrapper" function to use a promise object instead of a callback function
As mentioned above, it is possible to create a "wrapper" promise-based function in order to solve the organizability and maintanability problems that nested callback functions may cause. For example, the following code excerpt creates a "wrapper" function that converts the [Node.js fs.readFile](https://nodejs.org/dist/latest-v14.x/docs/api/fs.html#fs_fs_readfile_path_options_callback) function to use a promise object.

<pre class="bg-light rounded" style="overflow: auto;">

    async function readFileAsync(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, "utf8", async (err, data) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(files);
                }
            });
        })
    }
    
</pre>

With the above "wrapper" function, it is now possible to use the [Node.js fs.readFile](https://nodejs.org/dist/latest-v14.x/docs/api/fs.html#fs_fs_readfile_path_options_callback) function with a promise object. 

## Using the "wrapper" function with a promise object
In order to read a file using the above newly created "wrapper" function, one could use the below code excerpt. 

<pre class="bg-light rounded" style="overflow: auto;">

    getFilesAsync("MyTextFile.txt")
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            throw error;
        });
    
</pre>

Alternatively, it is also possible to use this function with async/await operators. This is demostrated in the following code excerpt. 

<pre class="bg-light rounded" style="overflow: auto;">

    try {
        const textContent = await getFilesAsync("MyTextFile.txt");
        console.log(textContent);
    } catch (error) {
        throw error;
    }
    
</pre>

Each of the above two code excerpts perform the same functionality as the first code excerpt in this post. As a reminder, the first code excerpt in this post used the callback-based [Node.js fs.readFile](https://nodejs.org/dist/latest-v14.x/docs/api/fs.html#fs_fs_readfile_path_options_callback) function.

## Conclusion
I hope that this post proves helpful. For more information, please see the below resources: 
- [Node.js fs.readFile documentation](https://nodejs.org/dist/latest-v14.x/docs/api/fs.html#fs_fs_readfile_path_options_callback)
- [Making asynchronous programming easier with async and await (*MDN Web Docs*)](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)
- [JavaScript promise object (*MDN Web Docs*)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
---
title: How to read a plain text file in Rust
layout: post
date:  2021-11-15 -0600
external: GitHub
sourceurl: https://github.com/frederickm13/code-samples/tree/master/Rust/read-file
excerpt: This is a short article demonstrating how to read a plain text file using the Rust programming language.
tags: [development, rust, software, programming, example]
---

The [Rust programming language](https://www.rust-lang.org/) is known for its lower-level implementation, similar to that of the C programming language. However, even with this in mind, it is still fairly simple to read the contents of a plain text file using Rust. 

For example, assuming that there is a text file named `test.txt` in the parent directory of a Rust program, one could read the entire contents of that text file using the following code snippet: 

<pre class="w3-light-grey w3-round" style="overflow: auto;">

    use std::fs;

    fn main() {
        let file_name = "../test.txt";

        println!("Reading the file: {}", file_name);

        let file_content = fs::read_to_string(file_name)
            .expect("Failed to read the file");

        println!("\nFile contents:\n---------------\n{}\n", file_content);
    }

</pre>

In my example, the above code produced the following output: 

<pre class="w3-light-grey w3-round" style="overflow: auto;">

    % cargo run

    Reading the file: ../test.txt

    File contents:
    ---------------
    Hello there from test.txt!!!

</pre>

When compared to a similar approach using the C programming language, the Rust approach is much simpler. 

More information may be found in the Rust programming language documentation: [Reading a File](https://doc.rust-lang.org/book/ch12-02-reading-a-file.html).

Additionally, the sample code used in this article may be found on my GitHub profile at the following link: [code-samples/Rust/read-file](https://github.com/frederickm13/code-samples/tree/master/Rust/read-file).
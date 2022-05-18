---
title: Three ways to measure the performance of your Python code
layout: post
date:  2021-10-31 -0600
external: GitHub
sourceurl: https://github.com/frederickm13/code-samples/tree/master/Python/ThreeWaysToMeasurePythonCodePerformance
excerpt: Are you looking for ways to measure the performance of your Python code/applications? 
tags: [python, performance, development, tracing, trace, profiling, profile, stats, statistics]
---

Are you looking for ways to measure the performance of your Python code/applications? 

Three popular ways to measure the performance of Python code are: 
- Using the [`time.perf_counter()`](https://docs.python.org/3/library/time.html#time.perf_counter) function.
- Using the [`timeit`](https://docs.python.org/3/library/timeit.html) module.
- Using the [`profile` and `cProfile`](https://docs.python.org/3/library/profile.html#module-cProfile) modules.

I will be discussing each of these three ways in more detail below. 

Please note that all sample code used in this article may be found on my [GitHub](https://github.com) profile at the following link: [code-samples/Python](https://github.com/frederickm13/code-samples/tree/master/Python/ThreeWaysToMeasurePythonCodePerformance).

## Using the `time.perf_counter()` function.
The `time.perf_counter()` function returns a performance counter value can be used to measure execution time of Python code. For example, to measure the execution time of a simple `for` loop, one could use code similar to the following: 

<pre class="w3-light-grey w3-round" style="overflow: auto;">

    start_time = time.perf_counter()
    
    for i in range(10):
        print(i)
    
    end_time = time.perf_counter()
    execution_time = end_time - start_time
    print(f"The execution time is: {execution_time}")

</pre>

Please note that the value returned by `time.perf_counter()` does not have a reference point. Therefore, one should always calculate the difference between two points when measuring execution time. 

## Using the `timeit` module.
The `timeit` module provides a simple way to measure the execution time of Python code. As a module, `timeit` provides has both a command-line interface as well as a callable function that can be used within code. I have included examples of each below, using the same simple `for` loop as in the previous example. 

### Command-line interface.
One could execute the following command to use the `timeit` command-line interface:

<pre class="w3-light-grey w3-round" style="overflow: auto;">

    $ python3 -m timeit 'for i in range(10): print(i)'

</pre>

### Callable function.
In order to use the `timeit` callable function, one could use code similar to the following: 

<pre class="w3-light-grey w3-round" style="overflow: auto;">

    def test_fn():
        for i in range(10):
            print(i)

    timeit.timeit(lambda: test_fn(), number=10000)

</pre>

Please note that the `timeit.timeit()` callable function does not have a default number of repititions. The number of repetitions must be provided when calling the function.

## Using the `profile` and `cProfile` modules.
The `profile` and `cProfile` modules provide more in-depth statistics than `time.perf_counter()` and `timeit`. There are many ways to use the `profile` and `cProfile` modules. However, I have shared one example code snippet below which uses the same simple `for` loop as the previous examples: 

<pre class="w3-light-grey w3-round" style="overflow: auto;">

    with cProfile.Profile() as pr:
        for i in range(10):
            print(i)

    pr.print_stats()

</pre>

Running the above code snippet produces an output similar to the following: 

<pre class="w3-light-grey w3-round" style="overflow: auto;">

    12 function calls in 0.000 seconds

   Ordered by: standard name

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.000    0.000    0.000    0.000 cProfile.py:117(__exit__)
       10    0.000    0.000    0.000    0.000 {built-in method builtins.print}
        1    0.000    0.000    0.000    0.000 {method 'disable' of '_lsprof.Profiler' objects}

</pre>

Details and definitions of this output may be found on the [`profile and cProfile documentation page`](https://docs.python.org/3/library/profile.html#module-cProfile). 

## Additional resources.
- [Documentation for the `time.perf_counter()` function.](https://docs.python.org/3/library/time.html#time.perf_counter)
- [Documentation for the `timeit` module.](https://docs.python.org/3/library/timeit.html)
- [Documentation for the `profile` and `cProfile` modules.](https://docs.python.org/3/library/profile.html#module-cProfile)
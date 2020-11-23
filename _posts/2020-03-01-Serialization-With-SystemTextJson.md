---
title: Comparing the Performance of System.Text.Json and Newtonsoft.Json in .NET
layout: Post
date:  2020-03-01 -0600
external: LinkedIn
sourceurl: https://www.linkedin.com/pulse/comparing-performance-systemtextjson-newtonsoftjson-net-mccollum
excerpt: Are you curious about the performance of the new System.Text.Json API in .NET? 
tags: [Programming]
---

Along with the release of .NET Core 3.0 came a new namespace for working with JSON data: *[System.Text.Json](https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=netcore-3.1)*. Prior to this, the primary API for working with JSON data in .NET was through the use of *[Newtonsoft's Json.NET](https://www.newtonsoft.com/json)*, a third-party package. However, with the introduction of *System.Text.Json* comes a new, built-in way to work with JSON data.

In this article, I will be comparing the performance of basic JSON serialization using both the *System.Text.Json* and *Newtonsoft.Json* APIs.

Performance Test Overview
I will be performing a very basic performance test using a .NET Core 3.1 console application. Within this console application, I have created a minimal "Note" class that contains three properties: "Id" (integer), "Title" (string), and "NoteText" (string). Please find a code snippet of the "Note" class below:

<pre class="bg-light rounded" style="overflow: auto;">

    class Note 
    { 
        public int Id { get; set; } 
        public string Title { get; set; } 
        public string NoteText { get; set; } 
        
        public Note() {} 
        
        public Note(int id, string title, string text) 
        { 
            this.Id = id; 
            this.Title = title; 
            this.NoteText = text; 
        } 
    } 

</pre>

I will create one million (1,000,000) instances of this "Note" class, and then add them to a List object. Then, I will use both the *System.Text.Json* and *Newtonsoft.Json* APIs to serialize this List to a JSON string ten times each. I will capture timings during each serialization process. Therefore, at the end of this test I will have ten performance timings for both the *System.Text.Json* and *Newtonsoft.Json* APIs.

Below is a code snippet showing how the list will be serialized, and how the timings will be captured, for both the *System.Text.Json* and *Newtonsoft.Json* APIs:

<pre class="bg-light rounded" style="overflow: auto;">

    public static int SysJsonSerializeTimer(List&lt;Note&gt; noteList) 
    { 
        Stopwatch sw; 
        sw = Stopwatch.StartNew(); 
        System.Text.Json.JsonSerializer.Serialize(noteList); 
        sw.Stop(); 
        return (int)sw.ElapsedMilliseconds; 
    } 
        
    public static int NsJsonSerializeTimer(List&lt;Note&gt; noteList) 
    { 
        Stopwatch sw; 
        sw = Stopwatch.StartNew(); 
        Newtonsoft.Json.JsonConvert.SerializeObject(noteList); 
        sw.Stop(); 
        return (int)sw.ElapsedMilliseconds; 
    } 

</pre>

The full code used for this performance test may be found in my *[GitHub](https://github.com/)* repository at the following link: [SerializationWithSystemTextJson](https://github.com/frederickm13/code-samples/tree/master/dotnet/SerializationWithSystemTextJson).

## Results

The performance results from this console application may be seen below:

<pre class="bg-light rounded" style="overflow: auto;">

    ITERATION      SYSTEM.TEXT.JSON (ms)    NEWTONSOFT.JSON (ms) 
    1              1293                     2058 
    2              654                      1570 
    3              879                      1202 
    4              907                      1342 
    5              955                      1220 
    6              892                      1208 
    7              921                      1214 
    8              922                      1288 
    9              895                      1219 
    10             884                      1229 

    AVG            920.2                    1355 

</pre>

<img src="/assets/images/JsonPerformanceGraph.jpg" class="rounded w-75">

As can be seen above, the *System.Text.Json* API performs better than the *Newtonsoft.Json* API in all ten iterations of this basic performance test. On average, the *System.Text.Json* API completed the JSON serialization process in about 68% of the time that it took the *Newtonsoft.Json* API to serialize the same data. This means that there was a 32% (about 1.3x) performance improvement when using the new *System.Text.Json* namespace. 

### References

- Official *Microsoft* documentation: [System.Text.Json Namespace](https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=netcore-3.1)
- Official *Microsoft* documentation: [How to serialize and deserialize (marshal and unmarshal) JSON in .NET](https://docs.microsoft.com/en-us/dotnet/standard/serialization/system-text-json-how-to)
- *Newtonsoft* Json.NET API: [Json.NET](https://www.newtonsoft.com/json)
- *Microsoft* .NET Blog: [Try the new System.Text.Json APIs](https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/)
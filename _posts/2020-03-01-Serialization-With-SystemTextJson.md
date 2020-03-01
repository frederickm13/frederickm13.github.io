---
title: Comparing the Performance of System.Text.Json and Newtonsoft.Json in .NET
author: Erick McCollum
layout: Post
date:  2020-03-01 -0600
sourceurl: https://www.linkedin.com/pulse/comparing-performance-systemtextjson-newtonsoftjson-net-mccollum
category: Post
featured: 3
excerpt: Are you curious about the performance of the new System.Text.Json API in .NET? 
---

*DISCLAIMER: Any personal opinions stated on this page are solely my own. This article is provided "as-is," without warranty of any kind. I do not claim ownership of any third-party information used in this article.*

Along with the release of .NET Core 3.0 came a new namespace for working with JSON data: *[System.Text.Json](https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=netcore-3.1)*. Prior to this, the primary API for working with JSON data in .NET was through the use of *[Newtonsoft's Json.NET](https://www.newtonsoft.com/json)*, a third-party package. However, with the introduction of *System.Text.Json* comes a new, built-in way to work with JSON data.

In this article, I will be comparing the performance of basic JSON serialization using both the *System.Text.Json* and *Newtonsoft.Json* APIs.

Performance Test Overview
I will be performing a very basic performance test using a .NET Core 3.1 console application. Within this console application, I have created a minimal "Note" class that contains three properties: "Id" (integer), "Title" (string), and "NoteText" (string). Please find a code snippet of the "Note" class below:

<div class="w3-panel w3-card w3-light-grey w3-code">
    class Note<br>
    {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;public int Id { get; set; }<br>
    &nbsp;&nbsp;&nbsp;&nbsp;public string Title { get; set; }<br>
    &nbsp;&nbsp;&nbsp;&nbsp;public string NoteText { get; set; }<br>
    <br>
    &nbsp;&nbsp;&nbsp;&nbsp;public Note() {}<br>
    <br>
    &nbsp;&nbsp;&nbsp;&nbsp;public Note(int id, string title, string text)<br>
    &nbsp;&nbsp;&nbsp;&nbsp;{<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.Id = id;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.Title = title;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.NoteText = text;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;}<br>
    }<br>
</div>

I will create one million (1,000,000) instances of this "Note" class, and then add them to a List object. Then, I will use both the *System.Text.Json* and *Newtonsoft.Json* APIs to serialize this List to a JSON string ten times each. I will capture timings during each serialization process. Therefore, at the end of this test I will have ten performance timings for both the *System.Text.Json* and *Newtonsoft.Json* APIs.

Below is a code snippet showing how the list will be serialized, and how the timings will be captured, for both the *System.Text.Json* and *Newtonsoft.Json* APIs:

<div class="w3-panel w3-card w3-light-grey w3-code">
    public static int SysJsonSerializeTimer(List&lt;Note&gt; noteList)<br>
    {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;Stopwatch sw;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;sw = Stopwatch.StartNew();<br>
    &nbsp;&nbsp;&nbsp;&nbsp;System.Text.Json.JsonSerializer.Serialize(noteList);<br>
    &nbsp;&nbsp;&nbsp;&nbsp;sw.Stop();<br>
    &nbsp;&nbsp;&nbsp;&nbsp;return (int)sw.ElapsedMilliseconds;<br>
    }<br>
    <br>
    public static int NsJsonSerializeTimer(List&lt;Note&gt; noteList)<br>
    {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;Stopwatch sw;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;sw = Stopwatch.StartNew();<br>
    &nbsp;&nbsp;&nbsp;&nbsp;Newtonsoft.Json.JsonConvert.SerializeObject(noteList);<br>
    &nbsp;&nbsp;&nbsp;&nbsp;sw.Stop();<br>
    &nbsp;&nbsp;&nbsp;&nbsp;return (int)sw.ElapsedMilliseconds;<br>
    }<br>
</div>

The full code used for this performance test may be found in my *[GitHub](https://github.com/)* repository at the following link: [frederickm13/Blog_Shared/SerializationWithSystemTextJson](https://github.com/frederickm13/Blog_Shared/tree/master/SerializationWithSystemTextJson).

### Results

The performance results from this console application may be seen below:

<div class="w3-panel w3-card w3-light-grey w3-code">
    ITERATION&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SYSTEM.TEXT.JSON (ms)&nbsp;&nbsp;&nbsp;&nbsp;NEWTONSOFT.JSON (ms)<br>
    1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1293&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2058<br>
    2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;654&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1570<br>
    3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;879&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1202<br>
    4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;907&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1342<br>
    5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;955&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1220<br>
    6&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;892&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1208<br>
    7&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;921&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1214<br>
    8&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;922&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1288<br>
    9&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;895&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1219<br>
    10&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;884&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1229<br>
<br>
    AVG&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;920.2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1355<br>
</div>

<img src="/data/images/JsonPerformanceGraph.jpg" class="w3-round w3-image" style="width:100%">

As can be seen above, the *System.Text.Json* API performs better than the *Newtonsoft.Json* API in all ten iterations of this basic performance test. On average, the *System.Text.Json* API completed the JSON serialization process in about 68% of the time that it took the *Newtonsoft.Json* API to serialize the same data. This means that there was a 32% (about 1.3x) performance improvement when using the new *System.Text.Json* namespace. 

### References

- Official *Microsoft* documentation: [System.Text.Json Namespace](https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=netcore-3.1)
- Official *Microsoft* documentation: [How to serialize and deserialize (marshal and unmarshal) JSON in .NET](https://docs.microsoft.com/en-us/dotnet/standard/serialization/system-text-json-how-to)
- *Newtonsoft* Json.NET API: [Json.NET](https://www.newtonsoft.com/json)
- *Microsoft* .NET Blog: [Try the new System.Text.Json APIs](https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/)
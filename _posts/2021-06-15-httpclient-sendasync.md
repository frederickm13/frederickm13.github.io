---
title: How to re-use an HttpClient instance with SendAsync.
layout: Post
date:  2021-06-15 -0600
external: GitHub
sourceurl: 
excerpt: In this post, I will be demonstrating how to re-use an HttpClient instance with multiple different API endpoints using the SendAsync method.
tags: [C#, .NET, ASP.NET, dotnet, dotnetcore, Development, Programming, HttpClient, SendAsync]
type: article
---

When using the .NET [`HttpClient`](https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient?view=net-5.0) class, there are many different methods that allow one to send HTTP requests to specified API endpoints. Some of the most common are: 
 - GetAsync
 - PostAsync
 - PutAsync
 - PatchAsync
 - DeleteAsync

The above-mentioned methods are convenient and effective to use. However, there is a down side to these methods. These methods require the programmer to set HTTP request headers on the `HttpClient` instance itself through the [`DefaultRequestHeaders`](https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient.defaultrequestheaders?view=net-5.0) properrty. 

This presents a problem when attempting to re-use an `HttpClient` instance with multiple different API endpoints. Authentication headers will likely need to be updated for each API endpoint. The `DefaultRequestHeaders` property is not thread-safe. Therefore, it is not feasible to update the `DefaultRequestHeaders` property every time a request is made to a different API endpoint. 

One solution to this problem is to use the [`HttpClient.SendAsync()`](https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient.sendasync?view=net-5.0) method. This method accepts an individual [`HttpRequestMessage`](https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httprequestmessage?view=net-5.0) object as a parameter. This enables the programmer to set individual headers, URI, content, etc. for each individual HTTP request that is made from an `HttpClient` instance. 

I have provided an example usage of this method below: 

<pre class="bg-light rounded" style="overflow: auto;">

    using HttpRequestMessage request = new HttpRequestMessage();
    
    
</pre>
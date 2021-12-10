---
title: How to re-use an HttpClient instance with SendAsync
layout: Post
date:  2021-06-16 -0600
external: GitHub
sourceurl: https://github.com/frederickm13/code-samples/tree/master/dotnet/HttpClient-SendAsync
excerpt: In this post, I will be demonstrating how to re-use an HttpClient instance with multiple different API endpoints using the SendAsync method.
tags: [C#, .NET, ASP.NET, dotnet, dotnetcore, Development, Programming, HttpClient, SendAsync]
---

When using the .NET [`HttpClient`](https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient?view=net-5.0) class, there are many different methods that allow one to send HTTP requests to specified API endpoints. Some of the most common are: 

 - `GetAsync`
 - `PostAsync`
 - `PutAsync`
 - `PatchAsync`
 - `DeleteAsync`

The above-mentioned methods are convenient and effective to use. However, there is a down side to these methods. These methods require the programmer to set HTTP request headers on the `HttpClient` instance itself through the [`DefaultRequestHeaders`](https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient.defaultrequestheaders?view=net-5.0) properrty. 

This presents a problem when attempting to re-use an `HttpClient` instance with multiple different API endpoints. Authentication headers will likely need to be updated for each API endpoint. The `DefaultRequestHeaders` property is not thread-safe. Therefore, it is not feasible to update the `DefaultRequestHeaders` property every time a request is made to a different API endpoint. 

One solution to this problem is to use the [`HttpClient.SendAsync()`](https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient.sendasync?view=net-5.0) method. This method accepts an individual [`HttpRequestMessage`](https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httprequestmessage?view=net-5.0) object as a parameter. This enables the programmer to set individual headers, URI, content, etc. for each individual HTTP request that is made from an `HttpClient` instance. 

To demonstrate this, I have provided an example below. The first code snippet shows how to send an HTTP POST request using the [`HttpClient.PostAsync()`](https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient.postasync?view=net-5.0) method. The second code snippet shows how to make the same HTTP POST request using the [`HttpClient.SendAsync()`](https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient.sendasync?view=net-5.0) method.

## Using [`HttpClient.PostAsync()`](https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient.postasync?view=net-5.0).

<pre class="bg-light rounded" style="overflow: auto;">

    // Create Uri and POST body content.
    Uri requestUri = new Uri("https://example.com/api/");
    using StringContent content = new StringContent("{ \"firstName\": \"John\", \"lastName\": \"Doe\"}");

    // Create HttpClient instance and set OAuth header.
    using HttpClient client = new HttpClient();
    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "{OAuth token}");

    // Send HTTP POST request.
    using HttpResponseMessage response = await client.PostAsync(requestUri, content);
    
</pre>

## Using [`HttpClient.SendAsync()`](https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient.sendasync?view=net-5.0).

<pre class="bg-light rounded" style="overflow: auto;">

    // Create Uri and POST body content.
    Uri requestUri = new Uri("https://example.com/api/");
    using StringContent content = new StringContent("{ \"firstName\": \"John\", \"lastName\": \"Doe\"}");

    // Create HttpClient instance.
    using HttpClient client = new HttpClient();

    // Create HttpRequestMessage and set method, OAuth header, and content.
    using HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, requestUri);
    request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", "{OAuth token}");
    request.Content = content;

    // Send HTTP POST request.
    using HttpResponseMessage response = await client.SendAsync(request);
    
</pre>

The above code snippets may be found in my *[GitHub](https://github.com/)* repository at the following link: [code-samples/dotnet/HttpClient-SendAsync](https://github.com/frederickm13/code-samples/tree/master/dotnet/HttpClient-SendAsync).

## Additional resources.
 - Code snippets from this article: [https://github.com/frederickm13/code-samples/tree/master/dotnet/HttpClient-SendAsync](https://github.com/frederickm13/code-samples/tree/master/dotnet/HttpClient-SendAsync).
 - `HttpClient` (docs.microsoft.com): [https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient?view=net-5.0](https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient?view=net-5.0).
 - `HttpClient.PostAsync()` (docs.microsoft.com):[https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient.postasync?view=net-5.0](https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient.postasync?view=net-5.0).
 - `HttpClient.SendAsync()` (docs.microsoft.com): [https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient.sendasync?view=net-5.0](https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient.sendasync?view=net-5.0).
 - `HttpRequestMessage` (docs.microsoft.com): [https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httprequestmessage?view=net-5.0](https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httprequestmessage?view=net-5.0).
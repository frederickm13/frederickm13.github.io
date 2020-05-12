---
title: How to Send Web API Batch Requests in Dynamics 365
layout: Post
date:  2019-11-02 -0600
external: LinkedIn
sourceurl: https://www.linkedin.com/pulse/how-send-web-api-batch-requests-dynamics-365-mccollum/
excerpt: Details on how to send Dynamics 365 Web API batch requests, with examples and sample code.
---

There are times when developing in Dynamics 365 where you may need to perform multiple operations at one time. For example, you may want to create three new account records on the click of a button. In order to do so, it is possible to send three separate HTTP requests to create these three account records using the Dynamics 365 Web API. However this is not ideal, as it becomes far less efficient as the number of records to create increases. In the future if you ever need to increase the record count to create twenty records, then you are having to send twenty different HTTP requests to complete this. 

The more efficient, and more performant, option would be to send a Web API batch request to create these twenty account records in one HTTP request.

## What are some benefits to using a Web API batch request?

There are many benefits to performing Web API operations using a batch request. I have outlined a few below:
- Better Performance: Sending multiple operations in one batch request reduces the number of HTTP requests that need to be sent from the client. This means better application performance. 
- More Efficient: Similar to the above point, reducing the number of HTTP requests that are sent means that there are more resources available for the client to use. This increase in efficiency will have a positive effect.
- Transactional Nature: Web API batch requests can be configured to act as a single transaction by using change sets. This means that if one request fails, they all will fail. This can be useful in certain situations. I won't go into detail regarding change sets in this article. However, you can find more information at the official *[Microsoft](https://microsoft.com/us/en/)* documentation: [Change sets](https://docs.microsoft.com/en-us/powerapps/developer/common-data-service/webapi/execute-batch-operations-using-web-api#change-sets)

## Okay, I am interested, but how do I do it?

When creating a Dynamics 365 Web API batch request, there are very specific steps and guidelines to follow in order to for it to be successful. This is because the Web API batch request body is essentially a body of text that is parsed and executed on the server side. It is not inherently structured like a JSON request body is, for example. Therefore, this request body must meet certain requirements in order for it to be successful. More information on these requirements may be found at the official *[Microsoft](https://microsoft.com/us/en/)* documentation page: [Execute batch operations using the Web API](https://docs.microsoft.com/en-us/powerapps/developer/common-data-service/webapi/execute-batch-operations-using-web-api).

In this article, I will walk through an example for sending a Dynamics 365 Web API batch request using JavaScript to create three account records. It is possible to combine POST, PATCH, DELETE, and even GET operations in one batch request. However, for the purposes of keeping this example simple, I will only focus on sending POST requests.

First, I will create a constructor function to make it easier to create and send the Web API batch request:

<pre class="w3-light-grey w3-round-large" style="overflow: auto;">

    function BatchPostAccounts() { 
        this.apiUrl = Xrm.Utility.getGlobalContext().getClientUrl() + 
            "/api/data/v9.1/"; 
        this.uniqueId = "batch_" + (new Date().getTime()); 
        this.batchItemHeader = "--" +  
            this.uniqueId +  
            "\nContent-Type: application/http\nContent-Transfer-Encoding:binary"; 
        this.content = []; 
    } 
     
    BatchPostAccounts.prototype.addRequestItem = function(entity) { 
        this.content.push(this.batchItemHeader); 
        this.content.push(""); 
        this.content.push("POST " + this.apiUrl + "accounts" + " HTTP/1.1"); 
        this.content.push("Content-Type: application/json;type=entry"); 
        this.content.push(""); 
        this.content.push(JSON.stringify(entity)); 
    } 
     
    BatchPostAccounts.prototype.sendRequest = function() { 
        this.content.push(""); 
        this.content.push("--" + this.uniqueId + "--"); 
        this.content.push(" "); 
     
        var xhr = new XMLHttpRequest(); 
        xhr.open("POST", encodeURI(this.apiUrl + "$batch")); 
        xhr.setRequestHeader("Content-Type", "multipart/mixed;boundary=" + this.uniqueId); 
        xhr.setRequestHeader("Accept", "application/json"); 
        xhr.setRequestHeader("OData-MaxVersion", "4.0"); 
        xhr.setRequestHeader("OData-Version", "4.0"); 
        xhr.addEventListener("load",  
            function() {  
                console.log("Batch request response code: " + xhr.status);  
            }); 
     
        xhr.send(this.content.join("\n")); 
    }

</pre>

*Please note, from my experience the additional empty space after the batch closing tag (line #21 above) is important for formatting issues. The server may return an "invalid JSON" error response if a trailing space is not included in the batch request body.*

Next, I will create three account entity objects in JSON:

<pre class="w3-light-grey w3-round-large" style="overflow: auto;">

    var firstAccount = { 
        name: "Test Account 1" 
    } 
     
    var secondAccount = { 
        name: "Test Account 2" 
    } 
     
    var thirdAccount = { 
        name: "Test Account 3" 
    }

</pre>

Finally, I will feed these account entity objects into the constructor function, and send the Web API batch request:

<pre class="w3-light-grey w3-round-large" style="overflow: auto;">

    var batchRequest = new BatchPostAccounts(); 
    batchRequest.addRequestItem(firstAccount); 
    batchRequest.addRequestItem(secondAccount); 
    batchRequest.addRequestItem(thirdAccount); 
    batchRequest.sendRequest(); 

</pre>

The full code used in this example may be found in my *[GitHub](https://github.com/)* repository at the following link: [WebApiBatch Sample Code](https://github.com/frederickm13/code-samples/tree/master/Dynamics365/WebApiBatch)

### Resources
For additional information and guidance, please see the following resources:
- Official *[Microsoft](https://microsoft.com/us/en/)* documentation: [Execute batch operations using the Web API](https://docs.microsoft.com/en-us/powerapps/developer/common-data-service/webapi/execute-batch-operations-using-web-api)
- Dynamics 365 Community article by *Marc G.*: [WebApi batch request](https://community.dynamics.com/365/b/dynamics365blognl/posts/webapi-batch-request)
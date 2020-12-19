---
title: How to use Django's built-in CSRF protection with AJAX requests
layout: Post
date:  2020-12-19 -0600
external: GitHub
sourceurl: https://github.com/frederickm13/code-samples/tree/master/Django/UseCsrfWithAjax
excerpt: A simple walkthrough of using Django's built-in CSRF protection with AJAX requests
tags: [Django, Web Application, Programming]
---

Django includes built-in middleware that provides cross site request forgery (CSRF) protection for forms. However, to use this CSRF protection with AJAX requests, it requires some additional work. The CSRF token is stored in a browser cookie by default. In order to use this CSRF token in an AJAX request, Django requires the token to be sent in a special "X-CSRFToken" request header. Therefore, JavaScript code needs to be written to do the following: 
1. Retrieve the CSRF token from the browser cookie.
2. Set the "X-CSRFToken" request header as the retrieved CSRF token value. 
3. Send the AJAX "POST" request. 

In this article I will be giving a walkthrough of the above steps in order to demonstrate how to use Django's built-in CSRF protection with AJAX requests. 

##  Assumptions
Before we proceed, let's assume the following:

### Django web app with view function
We already have a Django web application created. In this web application, there is one very simple view function. This view function takes in a "POST" request with one "message" parameter, and then returns that same "message" parameter in a JSON response. 

I have included the code for this view function below, for reference: 

<pre class="bg-light rounded" style="overflow: auto;">

    import json
    from django.http import JsonResponse

    def return_message(request):
        if request.method == 'POST':
            data = json.loads(request.body)
            message = data.get('message', None)
            return JsonResponse({"message": message}, status=200)
    
</pre>

### Simple user interface with form
Additionally, in our Django web application there is a simple web page with a form. In this form, the user is able to type in a message and click a "Submit" button. The "Submit" button sends the user's message in an AJAX request to the afore-mentioned view function.

A screen shot of this web page can be seen below:

<img src="/assets/images/SimpleDjangoWebPage.jpg" class="rounded w-50">

## Walkthrough
Now that we have clarified some assumptions, let's proceed with the walkthrough. I would like to go through this step-by-step, as outlined above. 

### 1. Retrieve the CSRF token from the browser cookie.
To retrieve the CSRF token from the browser cookie, we can borrow some JavaScript code from the Django CSRF documentation ([Cross Site Request Forgery Protection](https://docs.djangoproject.com/en/3.1/ref/csrf/)): 

<pre class="bg-light rounded" style="overflow: auto;">

    // JavaScript function to get cookie by name; retrieved from https://docs.djangoproject.com/en/3.1/ref/csrf/
    function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
    
</pre>

### 2. Set the "X-CSRFToken" request header as the retrieved CSRF token value. 
After retrieving the CSRF token from the browser cookie, we need to set it as the "X-CSRFToken" request header in our AJAX request. To do this, I have written a wrapper function around JavaScript's [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch). 

Please see the code for this wrapper function below: 

<pre class="bg-light rounded" style="overflow: auto;">

    // JavaScript wrapper function to send HTTP requests using Django's "X-CSRFToken" request header
    function sendHttpAsync(path, method, body) {
        let props = {
            method: method,
            headers: {
                "X-CSRFToken": getCookie("csrftoken")
            },
            mode: "same-origin",
        }

        if (body !== null && body !== undefined) {
            props.body = JSON.stringify(body);
        }

        return fetch(path, props)
            .then(response => {
                return response.json()
                    .then(result => {
                        return {
                            ok: response.ok,
                            body: result
                        }
                    });
            })
            .then(resultObj => {    
                return resultObj;
            })
            .catch(error => {
                throw error;
            });
    }
    
</pre>

### 3. Send the AJAX "POST" request. 
Now that we have 1) retrieved the CSRF token from the browser cookie and 2) set it as the "X-CSRFToken" request header for our AJAX request, we can proceed to send our AJAX "POST" request to the server. To do this, I have bound the following JavaScript function to the "submit" event of our web page's form: 

<pre class="bg-light rounded" style="overflow: auto;">

    // JavaScript submit function
    function sampleSubmit(event) {
        event.preventDefault();
        let messageHeader = document.querySelector("#message");
        let message = document.querySelector("#sample-input").value;

        let requestBody = {
            "message": message
        };

        sendHttpAsync("/return-message", "POST", requestBody)
            .then(response => {
                messageHeader.innerText = response.body.message;
            });
    }
    
</pre>

## Conclusion
Using the above steps, we are now able to send AJAX "POST" requests to our web app while still utilizing Django's built-in CSRF protection. 

Please note, the full Django web app source code for this sample may be found in my GitHub repository at the following location: [frederickm13/code-samples/Django/UseCsrfWithAjax](https://github.com/frederickm13/code-samples/tree/master/Django/UseCsrfWithAjax).

Additionally, you may find more information regarding Django's built-in CSRF protection in the Django documentation at the following location: [Cross Site Request Forgery Protection](https://docs.djangoproject.com/en/3.1/ref/csrf/).
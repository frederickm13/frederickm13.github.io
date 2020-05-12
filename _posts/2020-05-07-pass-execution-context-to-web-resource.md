---
title: How to Pass Execution Context to a Web Resource in Dynamics 365
layout: Post
date: 2020-05-07 -0600
sourceurl: https://github.com/frederickm13/code-samples/tree/master/Dynamics365/PassExecutionContextToWebResource
excerpt: In this article, I will be demonstrating how you can use the getContentWindow() method of the Power Apps JavaScript Client API to pass executionContext into a web resource/iframe control on a form. 
external: GitHub
---

When customizing Dynamics 365 forms using JavaScript, there may be a situation in which you want to pass [`executionContext`](https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/executioncontext) (or other data) into a web resource or iframe control on the form. For example, you may want to create your own custom HTML button on the form, and have this button perform some operation on the form itself using the [`formContext`](https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/executioncontext/getformcontext) object. 

In this article, I will be demonstrating how you can use the [`getContentWindow()`](https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/controls/getcontentwindow) method of the [Power Apps JavaScript Client API](https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference) to pass [`executionContext`](https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/executioncontext) into a web resource/iframe control on a form. 

## Overview
The following steps exhibit how you can create a custom HTML button on the Dynamics 365 form that will toggle lock/unlock a field on the form. Please note, this example will only work in the [Unified Interface](https://docs.microsoft.com/en-us/powerapps/user/unified-interface).

## Create a custom web resource
First, I will create a custom HTML web resource. This web resource will be very simple, and it will only contain an HTML button in its content window. I will name this web resource "sample_web-resource.html." 

Please see the HTML markup for this web resource below:

<pre class="w3-light-grey w3-round-large" style="overflow: auto;">

    &lt;!DOCTYPE html&gt;
    &lt;html lang="en"&gt;
    &lt;head&gt;
        &lt;title&gt;Sample Button&lt;/title&gt;
        &lt;meta charset="utf-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;button id="samplebutton" name="Toggle Field Lock" title="Toggle lock/unlock the field" onclick="ToggleLock()"&gt;
        Toggle Field Lock
        &lt;/button&gt;

        &lt;script src="sample_web-resource.js" type="text/javascript"&gt;&lt;/script&gt;
    &lt;/body&gt;
    &lt;/html&gt;

</pre>

I will also create a custom JavaScript web resource to go with the above HTML. This web resource will be named "sample_web-resource.js." Inside this JavaScript, I will create two global variables, `parentExecutionContext` and `parentFormContext` that will eventually reference the [`executionContext`](https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/execution-context) and [`formContext`](https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/executioncontext/getformcontext) objects from the parent Dynamics 365 form.

Please see the JavaScript code for this web resource below:

<pre class="w3-light-grey w3-round-large" style="overflow: auto;">

    window.parentExecutionContext = null;
    window.parentFormContext = null;

    function InitializeButton(executionContext) {
        // Assign executionContext and formContext to global variables within the web resource
        window.parentExecutionContext = executionContext;
        window.parentFormContext = executionContext.getFormContext();
    }

    function ToggleLock() {
        var fieldName = "name";

        // Get the "name" control from the Dynamics 365 form
        var control = window.parentFormContext.getControl(fieldName);

        // Check if the control is currently locked
        var isLocked = control.getDisabled();
        
        // Toggle the lock on the control
        control.setDisabled(!isLocked);
    }

</pre>

## Add the custom web resource to the Dynamics 365 form
After creating the above two web resources, I will add the "sample_web-resource.html" web resource to the Dynamics 365 form. This component will be added to the form as a web resource control named "WebResource_sample_web-resource." 

For the purposes of this demonstration, I will not walk through the full steps necessary to add this web resource control to the Dynamics 365 form. However, the following official *Microsoft* Documentation contains some helpful information on this topic: [Use IFRAME and web resource controls on a form](https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/use-iframe-and-web-resource-controls-on-a-form).

## Add JavaScript to the Dynamics 365 form
Now, I will add some JavaScript to the Dynamics 365 form. The following JavaScript code will pass the form's [`executionContext`](https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/execution-context) object into the custom web resource control that we added to the form. In order to properly work, this JavaScript should be registered on the form's [OnLoad](https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/events/form-onload) event. 

Please see the OnLoad JavaScript code below:

<pre class="w3-light-grey w3-round-large" style="overflow: auto;">

    // This function should be registered on the form's OnLoad event
    function OnLoad(executionContext) {
        // Get formContext
        var formContext = executionContext.getFormContext();

        // Get the web resource control on the form
        var wrCtrl = formContext.getControl("WebResource_sample_web-resource");

        // Get the web resource inner content window
        if (wrCtrl !== null && wrCtrl !== undefined) {
            wrCtrl.getContentWindow().then(function (win) {
                win.InitializeButton(executionContext);
            });
        }
    }

</pre>

The custom web resource control ("WebResource_sample_web-resource") can now obtain and use the [`formContext`](https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/executioncontext/getformcontext) object to perform operations on the Dynamics 365 form. After saving and publishing the above customizations, the custom HTML button should now lock/unlock the "name" field on the Dynamics 365 form when the button is clicked.

## How does this work?
The `getContentWindow()` Client API method returns a [Promise Object](https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/promise). This Promise resolves with a reference to the web resource control's inner [`contentWindow`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/contentWindow) object. This inner `contentWindow` that is returned from the Promise can then be used to access any of the custom web resource's global variables, functions, objects, etc. 

In this simple example, I used the web resource's inner `contentWindow` object to pass the form's [`executionContext`](https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/execution-context) object. 

I would like to reiterate that this example will only work in the [Unified Interface](https://docs.microsoft.com/en-us/powerapps/user/unified-interface). A similar outcome may be achieved in the classic web interface using the [`getObject()`](https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/controls/getobject) method. However, that is outside of the scope of this article.

### References
The code used in this article may be found in my *GitHub* repository at the following link: [PassExecutionContextToWebResource](https://github.com/frederickm13/code-samples/tree/master/Dynamics365/PassExecutionContextToWebResource).

Additionally, please see the following official *Microsoft* documentation for more information:
- [Client API Reference for model-driven apps](https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference)
- [getContentWindow (Client API reference)](https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/controls/getcontentwindow)
- [Use IFRAME and web resource controls on a form](https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/use-iframe-and-web-resource-controls-on-a-form)
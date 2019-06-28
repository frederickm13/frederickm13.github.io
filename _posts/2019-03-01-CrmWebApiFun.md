---
title: CrmWebApiFun.cs Sample "Helper" Class
author: Erick McCollum
layout: Post
date:  2019-03-01 -0600
sourceurl: https://github.com/frederickm13/D365_Samples/tree/master/WebApiCsharp
category: Project
featured: 2
---

*Please note, this code is provided to the community as-is. This code is not certified for production use without further review and testing by your organization.*

This is a basic C# sample "helper" class to demonstrate how to work with Dynamics 365 data programmatically using the Web API. More information about the Dynamics 365 Web API may be found at the following official documentation links: 
- [Query Data using the Web API](https://docs.microsoft.com/en-us/dynamics365/customer-engagement/developer/webapi/query-data-web-api)
- [Web API Reference](https://docs.microsoft.com/en-us/dynamics365/customer-engagement/web-api/about?view=dynamics-ce-odata-9)
- [Use the Dynamics 365 for Customer Engagement Web API](https://docs.microsoft.com/en-us/dynamics365/customer-engagement/developer/use-microsoft-dynamics-365-web-api)
- [Web API Samples](https://docs.microsoft.com/en-us/dynamics365/customer-engagement/developer/webapi/web-api-samples)

This class does not contain all necessary functionality to perform any operation. However, it does provide the following base functionality:
1. Ability to obtain a CRM instance OAuth token, and instantiate an HttpClient object with this token.
2. Ability to send HTTP GET requests to the specified Dynamics 365 instance.
3. Ability to send HTTP POST requests to the specified Dynamics 365 instance.
4. Ability to send HTTP DELETE requests to the specified Dynamics 365 instance.
5. Ability to send HTTP PATCH requests to the specified Dynamics 365 instance.

Please find additional detailed documentation regarding this "helper" class below:

## Constructor
#### CrmWebApiFun(string CrmApiUrl, string AzureAdClientId, string AzureAdRedirectUrl)

Initializes a new instance of the `CrmWebApiFun` class for a specified Dynamics 365 instance.

*Parameters:*
- *string CrmApiUrl*: This is the Dynamics 365 Web API URL for your Dynamics 365 instance. This may be found in your Dynamics 365 instance by navigating to Settings > Customizations > Developer Resources. For example: https://{OrgDomain}.api.crm.dynamics.com/api/data/{OrgVersion}/

- *string AzureAdClientId*: This is the Client ID that is associated with this application after you register it in Azure Active Directory. For more information, please see the following link: [Walkthrough: Register a Dynamics 365 for Customer Engagement app with Azure Active Directory](https://docs.microsoft.com/en-us/dynamics365/customer-engagement/developer/walkthrough-register-dynamics-365-app-azure-active-directory)

- *string AzureAdRedirectUrl*: This is the Redirect URI value associated with this application after you register it in Azure Active Directory. For more information, please see the following link: [Walkthrough: Register a Dynamics 365 for Customer Engagement app with Azure Active Directory](https://docs.microsoft.com/en-us/dynamics365/customer-engagement/developer/walkthrough-register-dynamics-365-app-azure-active-directory)

## Properties
#### authContext
*Type:* private static readonly [AuthenticationContext](https://docs.microsoft.com/en-us/dotnet/api/microsoft.identitymodel.clients.activedirectory.authenticationcontext?view=azure-dotnet)

*Description:* This is the authentication authority used by ADAL to obtain the required OAuth token. This property is static because the authentication authority will not change between different instances of the class.

#### authResult
*Type:* private [AuthenticationResult](https://docs.microsoft.com/en-us/dotnet/api/microsoft.identitymodel.clients.activedirectory.authenticationresult?view=azure-dotnet)

*Description:* This is the object that is used to store the result, including OAuth token, after authenticating to the `authContext` using ADAL.

#### resource
*Type:* private [string](https://docs.microsoft.com/en-us/dotnet/api/system.string?view=netframework-4.7.2)

*Description:* The root resource URL for the specified Dynamics 365 instance. This property is assigned a value when the `CrmWebApiFun` constructor is called. The value of this property is determined using the `CrmApiUrl` parameter that is passed in the constructor.

#### resourceApi
*Type:* private [Uri](https://docs.microsoft.com/en-us/dotnet/api/system.uri?view=netframework-4.7.2)

*Description:* The Dynamics 365 Web API URL for the specified Dynamics 365 instance. This property is assigned a value when the `CrmWebApiFun` constructor is called. The value of this property is equal to the `CrmApiUrl` parameter that is passed to the constructor. 

#### clientId
*Type:* private [string](https://docs.microsoft.com/en-us/dotnet/api/system.string?view=netframework-4.7.2)

*Description:* The Client ID that is associated with this application after you register it in Azure Active Directory. This property is assigned a value when the `CrmWebApiFun` constructor is called. The value of this property is equal to the `AzureAdClientId` parameter that is passed to the constructor. 

#### redirectUrl
*Type:* private [Uri](https://docs.microsoft.com/en-us/dotnet/api/system.uri?view=netframework-4.7.2)

*Description:* The Redirect URI that is associated with this application after you register it in Azure Active Directory. This property is assigned a value when the `CrmWebApiFun` constructor is called. The value of this property is equal to the `AzureAdRedirectUrl` parameter that is passed to the constructor. 

#### request
*Type:* private readonly [HttpClient](https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient?view=netframework-4.8)

*Description:* The instance of the `HttpClient` class that will be used for all web requests sent from the `CrmWebApiFun` instance. One `HttpClient` instance will be used for all requests sent from the `CrmWebApiFun` instance. This is a best practice to lessen the number of sockets in use, as well as prevent the occurrence of `SocketException` errors that can arise if a new `HttpClient` object is instantiated for every web request. Please note that using multiple `HttpClient` objects at once can exhaust the number of available sockets for the system.

## Methods
#### GetOrRefreshCrmToken()

This is a private method which is used internally within the `CrmWebApiFun` class to authenticate with the specified Dynamics 365 instance, and obtain/refresh a valid OAuth token. The OAuth token is then assigned to the authorization header of the `CrmWebApiFun` instance's `request` property. This private method is executed internally to ensure that a valid OAuth token is set in the authorization header prior to sending any web request.

*Parameters:*

- None

*Returns*

- [Task](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task?view=netframework-4.7.2)<[HttpClient](https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient?view=netframework-4.7.2)>

#### GetCrmData()

Sends an HTTP GET request to the specified Dynamics 365 instance in order to retrieve data.

*Parameters:* 

- *string queryString*: This is the [string](https://docs.microsoft.com/en-us/dotnet/api/system.string?view=netframework-4.7.2) that will be passed, along with the base Web API URL, in an HTTP GET request to your Dynamics 365 instance. For example, to retrieve all "Account" entity records, you would set this parameter to `"accounts"`.

*Returns:*

- [Task](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task?view=netframework-4.7.2)<[HttpResponseMessage](https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpresponsemessage?view=netframework-4.8)>

#### PostCrmData()

Sends an HTTP POST request to the specified Dynamics 365 instance in order to create data. 

*Parameters:* 

- *string entityName*: This is the [string](https://docs.microsoft.com/en-us/dotnet/api/system.string?view=netframework-4.7.2) that will be passed, along with the base Web API URL, in an HTTP POST request to your Dynamics 365 instance. This parameter will specify the record(s) to be created in CRM. For example, to create an "Account" entity record, you would set this parameter to `"accounts"`.

- *string content*: This is a JSON formatted [string](https://docs.microsoft.com/en-us/dotnet/api/system.string?view=netframework-4.7.2) that will be passed as content in the HTTP POST request to your Dynamics 365 instance. This parameter will populate the attribute values of the newly created record in CRM. You may create this JSON formatted string however you like prior to passing it into the function. My recommendation would be to create a [JObject](https://www.newtonsoft.com/json/help/html/T_Newtonsoft_Json_Linq_JObject.htm) using [Json.NET](https://www.newtonsoft.com/json/help/html/CreatingLINQtoJSON.htm), and then pass it as a string using the [JObject.ToString()](https://www.newtonsoft.com/json/help/html/M_Newtonsoft_Json_Linq_JToken_ToString.htm) method.

*Returns:*

- [Task](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task?view=netframework-4.7.2)<[HttpResponseMessage](https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpresponsemessage?view=netframework-4.8)>
 
#### DeleteCrmData()

Sends an HTTP DELETE request to the specified Dynamics 365 instance in order to delete data. 

*Parameters:* 

- *string queryString*: This is the [string](https://docs.microsoft.com/en-us/dotnet/api/system.string?view=netframework-4.7.2) that will be passed, along with the base Web API URL, in an HTTP DELETE request to your Dynamics 365 instance. This parameter will specify the record(s) to be deleted in CRM. For example, to delete a specific "Account" entity record, you would set this parameter to `"accounts(xxxxxxxx-xxxx-xxxx-xxxxxxxxxxxx)"`, substituting the "Account" record's unique ID.

*Returns:*

- [Task](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task?view=netframework-4.7.2)<[HttpResponseMessage](https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpresponsemessage?view=netframework-4.8)>
 
#### PatchCrmData()

Sends an HTTP PATCH request to the specified Dynamics 365 instance in order to update data. 

*Parameters:* 

- *string queryString*: This is the [string](https://docs.microsoft.com/en-us/dotnet/api/system.string?view=netframework-4.7.2) that will be passed, along with the base Web API URL, in an HTTP PATCH request to your Dynamics 365 instance. This parameter will specify the record(s) to be updated in CRM. For example, to update a specific "Account" entity record, you would set this parameter to `"accounts(xxxxxxxx-xxxx-xxxx-xxxxxxxxxxxx)"`, substituting the "Account" record's unique ID.

- *string content*: This is a JSON formatted [string](https://docs.microsoft.com/en-us/dotnet/api/system.string?view=netframework-4.7.2) that will be passed as content in the HTTP PATCH request to your Dynamics 365 instance. This parameter will populate the attribute values of the record's attributes that you are updating in CRM. You may create this JSON formatted string however you like prior to passing it into the function. My recommendation would be to create a [JObject](https://www.newtonsoft.com/json/help/html/T_Newtonsoft_Json_Linq_JObject.htm) using [Json.NET](https://www.newtonsoft.com/json/help/html/CreatingLINQtoJSON.htm), and then pass it as a string using the [JObject.ToString()](https://www.newtonsoft.com/json/help/html/M_Newtonsoft_Json_Linq_JToken_ToString.htm) method.

*Returns:*

- [Task](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task?view=netframework-4.7.2)<[HttpResponseMessage](https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpresponsemessage?view=netframework-4.8)>
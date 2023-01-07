---
title: My top three tips for creating a great web API
layout: post
date:  2023-01-05 -0600
excerpt: There are many "best practices" when it comes to good, effective web API design and development. In this article, I will be sharing my top three tips for creating a great web API.
tags: [programming, development, software, web api, api]
---

There are many "best practices" when it comes to web API design and development. In this article, I will be sharing my top three tips for creating a great web API.

Please note, the tips shared in this article are based on my own opinions and experiences. I believe it to be perfectly reasonable for others disagree with this list. 

## 1. Define and implement web API security from the start. 

In my opinion, this is the single most important tip that I can give. That is because I believe that security is the single most important aspect of a great web API. Without a solid security mechanism, an API is vulnerable. A vulnerable web API is not a great API. Therefore, due to the massive importance of a web API's security, my opinion is that the security mechanism should be defined and implemented from the start. 

Unfortunately, in real life scenarios, it seems that web API security does not get the attention and care that it deserves. Security is complicated, complex, and time consuming to implement and test. In time-sensitive environments with project deadlines, these characteristics can cause security to be pushed to the backlog. While it is possible to create a functioning web API first, and then implement security later on, I would strongly recommend against it. 

When web API security is defined from the start, it greatly decreases the future maintenance cost. Patterns can be defined, and testing strategies can be implemented. These patterns and strategies can be easily extended to future functionality that is added to the web API. 

If security is implemented "after the fact," then it means the development team needs to back track and identify all areas that need to be secured. To add to this headache, it may not be easy to apply a single security pattern across an existing web API. This can easily lead to a security mechanism that is overly complex, difficult to maintain, and "taped together."

At the time of writing, token-based authentication is one of the most popular ways to secure an API. OAuth is considered an industry standard for token-based authentication. Below are a few helpful articles to provide more information.
- [What Is Token-Based Authentication? (okta.com)](https://www.okta.com/identity-101/what-is-token-based-authentication/)
- [OAuth 2.0 (oauth.net)](https://oauth.net/2/)

## 2. Design, implement, and adhere to a monitoring pattern. 

This tip does not directly impact the functionality or feature set of the web API. However, it has a massive, indirect impact on the reliability and maintainability of the web API. When a web API has great monitoring, it will have a positive influence across the board. For example, below I have included some of the positive benefits of great web API monitoring. 
- Increased developer productivity. 
- Improved response time to incidents. 
- Faster bug/issue resolution. 
- Quicker ramp up time for new team members. 
- Better metrics that can be surfaced to dashboards and visuals. 

When I say that a web API should have a "monitoring pattern," I believe this includes the following items at a minimum. 
- A single logging framework/library that is re-used by all applications and services. 
- A centralized location where all logs and metrics are viewable. 
- A defined structure for log messages. 
- A defined standard for application metrics and timings that should be applied to all applications and services.
- An effective way to query logs and metrics, as well as filter them by application/service. 

## 3. Create detailed documentation, and keep it up to date. 

Last, but definitely not least, a great web API should have great documentation to go along with it! 

I know that writing documentation is time consuming. I know that writing documentation often feels like a waste of time. I know that writing documentation requires a ton of effort. 

However, writing documentation is not only important, but it is also extremely valuable. Great documentation is beneficial to both consumers and creators of the web API. When done correctly, web API documentation will do each of the following things, and much, much more. 
- Reduced number of support inquiries/tickets from web API consumers. 
- Improved developer and stakeholder knowledge of the web API. 
- Quicker ramp up time for new team members.
- Reduced need for knowledge transfer when existing team members get promoted or depart the team. 
- Improved maintainability of the web API.
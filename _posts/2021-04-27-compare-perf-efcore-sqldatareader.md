---
title: Comparing the performance of Entity Framework Core and SqlDataReader in ASP.NET Core
layout: Post
date:  2021-04-27 -0600
external: GitHub
sourceurl: https://github.com/frederickm13/code-samples/tree/master/dotnet/EFCoreVsSqlDataReader
excerpt: In this post I will be comparing the performance of Entity Framework Core and SqlDataReader in ASP.NET Core
tags: [C#, .NET, ASP.NET, dotnet, dotnetcore, Development, Programming, database, Entity Framework, Entity Framework Core, SqlDataReader, SQL, Performance]
type: article
---

When using ASP.NET Core, there are many different possibilities for integrating with a database. Two popular methods to do this are 1) using an object-relational mapper, such as [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/), or 2) writing SQL queries directly using a lightweight SQL client class, such as the [SqlDataReader](https://docs.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqldatareader?view=dotnet-plat-ext-5.0) class. Each of these methods have their own pros and cons. For more information on these two methods, please find some resources in the "Additional Resources" section at the end of this article.

In this article, I will be comparing the performance of reading SQL data using [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/) and [SqlDataReader](https://docs.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqldatareader?view=dotnet-plat-ext-5.0). 

*Note: As you read this article, please keep in mind that this is intended to be a high-level performance comparison, not an in-depth performance analysis.*

## Performance Test Overview
I will be doing a simple performance comparison using an ASP.NET Core web API application. This web application will be targeting .NET Core v3.1. The source code used in this performance comparison may be found in my *[GitHub](https://github.com/)* repository at the following link: [code-samples/dotnet/EFCoreVsSqlDataReader](https://github.com/frederickm13/code-samples/tree/master/dotnet/EFCoreVsSqlDataReader). 

This web API application will interact with a local SQL Server Express Database (hosted within the default [Visual Studio LocalDB](https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-express-localdb?view=sql-server-ver15)) named `ExampleDb`. The `ExampleDb` database will contain one million records in a single table named `ExampleRecords`. The web API will expose the following endpoints: 

1. api/EFCore/GetTopRecords
2. api/EFCore/GetEvenRecords
3. api/EFCore/GetComplexWhere
4. api/SqlDataReader/GetTopRecords
5. api/SqlDataReader/GetEvenRecords
6. api/SqlDataReader/GetComplexWhere

Each of the above endpoints will perform a different read operation on the `ExampleRecords` table in the `ExampleDb` database. Once the read operation has completed, a record will be created in the `TimingLogs` table. This record in the `TimingLogs` table will log the amount of time, in milliseconds, that it took to complete that read operation. 

I will not go into detail describing each of the queries being performed in the above endpoints. However, if you would like to review and compare the queries for yourself, please feel free to do so. As mentioned, the source code may be found in my *[GitHub](https://github.com/)* repository at the following link: [code-samples/dotnet/EFCoreVsSqlDataReader](https://github.com/frederickm13/code-samples/tree/master/dotnet/EFCoreVsSqlDataReader).

Using *[PostMan](https://www.postman.com/)*, I will send 51 HTTP requests to each of the above six web API endpoints (for a total of 306 HTTP requests). The first request will serve as a warm-up for the web API endpoint. The following 50 HTTP requests will be used for the purposes of this performance comparison (for a total of 300 HTTP requests). Each of the 51 HTTP requests will be separated by a delay of 500 ms (half of a second).

I understand that this is a very simple performance test. However, as noted above, this is not intended to be an in-depth performance comparison.

## Results
Please find the average, maximum, and minimum results of this performance comparison below. Based on the below results, we can see that there is an average performance increase of about 42% when using the [SqlDataReader](https://docs.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqldatareader?view=dotnet-plat-ext-5.0) class. 

<img src="/assets/images/SqlReadPerformance_Avg.jpg" class="rounded w-75">

<img src="/assets/images/SqlReadPerformance_Max.jpg" class="rounded w-75">

<img src="/assets/images/SqlReadPerformance_Min.jpg" class="rounded w-75">

## Additional resources
The following resources may also be helpful.

- [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)
- [SqlDataReader](https://docs.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqldatareader?view=dotnet-plat-ext-5.0)
- [Visual Studio LocalDB](https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-express-localdb?view=sql-server-ver15)
- [PostMan](https://www.postman.com/)
- [Tutorial: Get started with EF Core in an ASP.NET MVC web app](https://docs.microsoft.com/en-us/aspnet/core/data/ef-mvc/intro?view=aspnetcore-5.0)
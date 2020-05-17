---
title: Forecasting NBA Three Pointers Made for the Next Five Seasons
layout: Post
date:  2019-08-11 -0600
external: LinkedIn
sourceurl: https://www.linkedin.com/pulse/forecasting-nba-three-pointers-made-next-five-seasons-mccollum/
excerpt: The NBA is changing. This is very evident when viewing the growing impact of the three point shot in basketball.
tags: [Data Science]
---

The *[NBA](https://www.nba.com/)* is changing.

Anyone who has kept up with the *NBA* over the last five years would likely agree with the above statement. What used to be a gritty, "big man's game" has been evolving into a sport where athleticism and technical skill are becoming more and more valuable. This is very evident when viewing the growing impact of the three point shot in basketball. Below we can see a plot of the total number of three pointers made in each *NBA* season since the three point shot was first introduced in 1979:

<img src="/data/images/TotalThreesPlot.png" class="w3-round w3-image" style="width:100%">

Perhaps the first thing one notices in the above plot are the two steep drops. These two areas indicate shortened seasons in which a full 82 games were not played. However, aside from this it is evident that the popularity of the three point shot has increased substantially over the past 40 *NBA* seasons. In last year's season alone (2018-19), there were a total of 27,960 three point shots made, with each of the 30 *NBA* teams making an average of 932 three pointers over the course of the season. Below is a plot of the average number of three point shots made per *NBA* team over the past 40 seasons:

<img src="/data/images/ThreePointTeamAvg.png" class="w3-round w3-image" style="width:100%">

This plot follows the same pattern as the previous one. In fact, one could easily mistake these previous two plots as being the exact same. However, the difference can be seen in the number of three pointers made (y-axis).

While the three point shot has become increasingly more popular, it is interesting to note that the league as a whole is not getting much more efficient at this shot. Below we can see that the league average three point percentage has remained relatively consistent around 35% since the mid-90s:

<img src="/data/images/AvgPercentage.png" class="w3-round w3-image" style="width:100%">

With all of this data showing how popular the three point shot has become, what can we expect in the near future? The short answer to this question is simple: most likely more of the same.

I have created an ARIMA forecasting model using the programming language R. For those of you interested in reading more on ARIMA models and how they work, this [Wikipedia](https://en.wikipedia.org/wiki/Autoregressive_integrated_moving_average) link is helpful. However, all that you need to know for this article is that ARIMA is a mathematical model used to forecast and predict data. Using this ARIMA model, one can see that the number of three pointers made is expected to continue increasing over the next five seasons:

<img src="/data/images/ForecastThreePointers.png" class="w3-round w3-image" style="width:100%">

It should be noted that the model does predict that the rate at which made three pointers increases will diminish slightly. This can be seen by the forecast having a lesser positive incline when compared to previous years. Additionally, please note that the blue shading outside of the main forecast line are confidence intervals. The darker blue shading indicates that the model is 80% sure the forecast will fall within those boundaries, while the lighter blue shading indicates the model is 95% sure that forecast will fall within those boundaries.

Included below are the numerical forecast values for this model, including the respective confidence interval values:

<img src="/data/images/ForecastNumericalValues.jpg" class="w3-round w3-image" style="width:100%">

Based on the projected values of this forecast model, it will be interesting to see how accurate the results are when compared to real values from upcoming *NBA* seasons. Please feel free to come back in a year or so and add a comment pointing out how wrong I was.

Thanks for taking the time to read!

*The R source code and data set used for this article may be found on my [GitHub Profile](https://github.com/frederickm13/data-science/tree/master/ForecastingNbaThreePointers). This data set was created using data from https://www.basketball-reference.com and the [National Basketball Association](https://www.nba.com/). I do not claim ownership of any data included in this data set.*
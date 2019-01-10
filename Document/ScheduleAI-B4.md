# Financials (steady state)
## Revenue Model, Cost Blocks
We use the dual model of advertising and subscription to earn revenue.

The thousand impressions of the ad are about \$4-6, and the average click revenue is about \$1 to \$2.

Users can also get more storage and advanced features by subscribing to remove ads for $3/month.

Our cost is mainly divided into three parts.

We used the method of outsourcing and remote work to flexibly adjust our labor costs, so we did not need office and other expenses in the early stage.

### Labor costs
The minimum requirement for manpower is that I write the maintenance program myself, and 4000 euros should be able to sustain my life outing activities.

If I outsource the entire project, my previous inquiry was $50,000.

### Equipment cost
Developer account 200 USD / year
Running server cost estimate 1000 USD / 5000 users * year, depending on specific pressure
### Advertising cost
Put 15 percent of revenue into advertising
## P&L (steady state)
User quantity model: Suppose we get 500 users per month, 20% churn rate, and customer growth rate increases by 10% per month.
![User quantity model](/assets/User%20quantity%20model.PNG)

We use the following variables to calculate P&L:
+ 5% subscription rate (slack 30%;Successful saas standard >5%)
+ 10 ads per day for free users, 1% clickthrough rate (Average of 1,5%).
+ \$0,5 per click (Average of \$1).
+ Staff salary increases by 20% per year

Simplification:
+ Free users offer \$1.5 a month
+ Subscribers offer \$3 a month

![P$L](/assets/P$L_4a5fekgot.PNG)


# Minimum Viable Product
Our Minimum Viable Product is a saas application.
You can find it here:
http://www.private-secretary.org/workspace#/

You can log in with the following account:
```
Email:admin@admin.com
password:password
```
## Remarks
+ The current version is very unstable and may crash at any time. If it crashes, please contact me with slack.
+ The current version is used for display purposes and your changes will not be saved.
+ At present, only the core algorithm has been completed, and many small functions and ui are still not perfect.
+ I am still improving it now, the actual details may not be exactly the same.
+ thing=event=activity
## Tutorial
When you log in, you will see a current calendar. Different from the traditional calendar, he is divided into multiple columns. The first column shows the arrangement of non-fixed activities, the second column shows fixed activities, and the third column shows conflicts. Non-fixed events will be ranked starting from the current time.
![Calendar Day](/assets/Calendar%20Day.PNG)
You can create a new event by clicking the plus sign on the calendar.
![Activity Attribute](/assets/Activity%20Attribute.PNG)
The program will match your previous input to autofill it, but this is just a demo, and he doesn't automatically learn now.
![Match padding](/assets/Match%20padding.png)
You can quickly get rid of what you have already done.
![Activity Depend](/assets/Activity%20Depend.PNG)
If you see this please turn it off, otherwise it will block some content. This is the debug tool.
![debugbar](/assets/debugbar.PNG)
You can import .ics formatted calendars from TUMcampus, but I'm not sure if it supports ics formats from other software.
![Activity Setting](/assets/Activity%20Setting_dfw9kotj4.PNG)
When you change the activity table, your schedule will be recalculated
![Calendar1](/assets/Calendar1.PNG)
The next step is to implement a new quick tour of the event, which will allow the user to temporarily postpone the currently scheduled event.

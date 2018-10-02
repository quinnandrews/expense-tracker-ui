## About this Project

This Expense Tracker App was developed for the purpose of learning React. It is 
a place where I can experiment and see where the boundaries are. However, 
I wanted something I would actually use, and I've been wanting a simple tool to 
enter the purchases I make and analyze the data to see what I could learn from it. 

At present this app does not connect to any database, etc. Each page has its own 
set of mock data used for development purposes. Consequently, changes you make on 
one page won't be reflected in another. Eventually, it will connect to the 
expense-tracker-api. 

DEMO: http://expense-tracker-demo.s3-website-us-west-2.amazonaws.com/

## Notes

This app currently contains a lot of experimentation with inheritance. I did this 
for a variety of reasons: 

1. Having worked with Apache Wicket for many years, using inheritance was natural. 
2. The React Documentation recommends not using inheritance without providing a 
sufficient explanation. I wanted to experiment, see what works, what doesn't, what's 
good about it, what's not so good about it, etc. 
3. I also wanted to explore working with classes in javascript.

This app also plays around with doing something else that may not be considered good 
practice. In some Component Classes I pass the instance to Children via props, which 
allows me to call any method I want on the Parent Class. I was surprised that it worked. 
I thought it would throw an error of some kind, since the preference is to pass method 
references one by one through props, an exercise that can become rather tedious. 

I have worked with Java Server Faces and Apache Wicket for many years. My approach 
to React is, therefore, drawn from that experience. My approach to conversion and 
validation, in particular, is patterned after the way they are handled in JSF and 
Wicket. 
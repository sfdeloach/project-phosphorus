# ProjectPhosphorus

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.5.

Pull event data from a third party that provides a back-end connection to a MS SQL Server database (CSV data format), convert to JSON, reform the data to better serve the app's purpose, and upload to a newly created database (MongoDB). Develop an Angular app to view reports on productivity:

* **Overall initiated contacts**

 - 'ONV' on a limited list of event types
 - 'ONV' with a report of some type generated
 - traffic stops

* **Classic initiated w/ disposition (10-15, 10-50, FCCs)**

 - initiated felony arrests
 - initiated misdemeanor arrests
 - DUI arrests
 - criminal UTTs
 - UTTs
 - written warnings
 - FCCs
 - TPs
 - CJIS

* **Non-initiated effort**

 - non-initiated arrests
 - non-initiated offense reports
 - non-initiated non-offense reports
 - crash investigations
 - total calls for service (some event types excluded)

* **Days worked**

----
## stack

Locally host the following:

* Angular user interface
* Express RESTful API
* instance of MongoDB

----
## phosphorus app

* Login
* Officer/Squad assignments
* Days worked - if unique dates are counted, nights will show more days worked
* FTO and OIC??? How should this be accounted for?

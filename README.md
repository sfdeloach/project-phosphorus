# ProjectPhosphorus

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.5.

Pull event data from a third party that provides a back-end connection to a MS SQL Server database (CSV data format), convert to JSON, reform the data to better serve the app's purpose, and upload to a newly created database (MongoDB). Develop an Angular app to view reports on productivity.

----
## aws-serverless stack

* Angular SPA served statically via S3
* API Gateway
* DynamoDB (officers and reports tables only)
* Cognito
* Lambda
* Route 53

![Serverless Diagram](https://raw.githubusercontent.com/sfdeloach/project-phosphorus/master/project-phosphorus.png)


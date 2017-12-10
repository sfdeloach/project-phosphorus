# ProjectPhosphorus

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.5.

Pull event data from a third party that provides a back-end connection to a MS SQL Server database (CSV data format), convert to JSON, reform the data to better serve the app's purpose, and upload to a newly created database (MongoDB). Develop an Angular app to view reports on productivity:

* overall initiated (non-AP events)
* classic initiated w/ disposition (10-15, 10-50, FCCs)
* non-initiated effort

----
## pull data using MS Access

Select the following fields:

1. Event Number
2. Name/ID
3. Call Type
4. Disposition
5. Case Number
6. Time Created
7. Time Arrived
8. Date?

Where:

1. Start Date is equal to ???
2. Stop Date is equal to ???
3. Name is like [ ???, ???, ... , ??? ]
4. Call was not cancelled
5. Call is not a 10-13 (any other exclusions?)

----
## convert and reform data

* Convert CSV to JSON and refactor to this form:

`
[{
    "id": 531,
    "type": "22N",
    "disp": ["V"],
    "case": undefined,
    "created": "2012-04-23",
    "initiated": false
}, {
    "id": 641,
    "type": "VEH",
    "disp": ["A1", "B"],
    "case": ["OR", "CJ"],
    "created": "2012-04-23",
    "initiated": true
}]
`

----
## upload data

* mLab or Mongo Atlas?

----
## phosphorus app

* Login
* Assign id's to squads
* Days worked - if unique dates are counted, nights will show more days worked
* FTO and OIC??? How should this be accounted for?

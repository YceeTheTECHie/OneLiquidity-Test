# A serverless todo application


## 📖Table of contents

- [Techologies](#Technologies)
- [Getting Started](#Getting-started)
  - [Features](#features)
  - [Making requests](#Making-requests)
- [Docs](https://documenter.getpostman.com/view/14374190/TzY68ZMc)



### ✨Features

- [x] Add Todo
- [x] Create Todo
- [x] Get All Todo
- [x] Update Todo
- [x] Get Todo By Id
- [x] Delete Todo   



## ⛷️Getting Started

Clone the main branch of the repo, cd into the folder and run
```
npm install
```
create an .env file and all the following
```
LOCAL_URL=http://localhost:5000
REGION=localhost
LOCAL=true
```
To run the api locally, open up your terminal and run

``` 
serverless offline start 
```

You can start making requests to the API now.

To run the unit tests and the e2e tests run the command,
``` 
npm test 

```

To deploy the API to AWS, run the command

``` 
serverless deploy 
```

 Rationale To Decisions I made during development

- Due to the fact that middyfy does not have full typescript support despite it is t]an inbuilt middleware for serverless applications, I used a very popular validator called yup which has full support for typescript.


- I also decided to create an utility for sending http response back to the client to avoid code duplication.

- During development also, I seperated the services from the handlers so as to ensure every component of the app is a unit.
  




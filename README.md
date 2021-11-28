# Simple CRUD API

1. The task is solved using only **pure Node.js**.
2. API path `/person`:
    * **GET** `/person` or `/person/${personId}` returns all persons or person with corresponding `personId`
    * **POST** `/person` is used to create record about new person and store it in database
    * **PUT** `/person/${personId}` is used to update record about existing person
    * **DELETE** `/person/${personId}` is used to delete record about existing person from database
3. Persons are stored as `objects` that have following properties:
    * `id` — unique identifier (`string`, `uuid`) generated on server side
    * `name` — person's name (`string`, **required**)
    * `age` — person's age (`number`, **required**)
    * `hobbies` — person's hobbies (`array` of `strings` or empty `array`, **required**)
4. Requests to non-existing endpoints (e.g. `/some-non/existing/resource`) should be handled.

First of all run command **use npm i**
Your .env file should include 
  *  PORT=3000
  * HOST_NAME='127.0.0.1'
To launch app in development mode use command: **npm run start:dev**
To launch app in production mode use command: **npm run start:prod**

To check use Postman with API on **http://localhost:3000/person**.

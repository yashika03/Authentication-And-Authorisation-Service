# Authentication and Authorisation Service
This is the Authentication and Authorisation service for the Airline Management Project.
### Project Setup
1. Clone the project
2. Run ```npm install``` in the command propmt
3. Create ```.env``` file outside src and write the PORT number.
4. Create a config.json file inside config folder and write the below code inside that file:
```
{
  "development": {
    "username": "root",
    "password": <your sql password>,
    "database": "Auth_Database_Dev",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```
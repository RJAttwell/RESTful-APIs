RESTful API:

- REpresentational State Transfer
- A client will make a HTTP Request to a server. We've seen it in app.get(function(req, res)). It's the req (request).
- HTTP is not the only language that servers can speak. There is also FTP (File Transfer Protocol request). 
- HTTPS = HTTP Secure request. Ensure your information/request is encrypted so no one knows what it says if it gets intercepted. 

- The server will have a bunch of APIs that clients can tap into.
- REST is an architectual style for building APIs 
- There are others such as GraphQL

- There are several rules an API has to follow to be RESTful:
    - Use HTTP Request verbs
    - Use specific pattern of routes/endpoints URLs

HTTP verbs:
- get
- post
- put
- patch 
- delete 

- get is basically the same as Read in CRUD
- post corresponds to Create (When data is posted to the server, it makes an entry in our database)
-  put/patch corresponds to Update
- Difference between put and patch:
    - Put is replacing an entire entry in a database with a new one
    - Patch request is sending just the piece of data that needs updating instead of the entire entry 
- delete = delete in CRUD (Self explanatory)

Specific pattern of routes/endpoints:
- Provides a mapping between the HTTP verbs
- Example: /articles will fetch all articles whilst /articles/steam will fetch just the artcile on steam 

Creating a Database with Robo 3T:
- First thing is create data in database. 
- A GUI commonly used with MongoDB is Robo 3T
- Connect to local host in Studio 3T and you'll be able to see your DBs, collections and documents inside

GET Articles:
- app.get(route, function(req, res))

Server speaks to database and we expose certain parts of our database through APIs for clients (browsers)

Client can be a web page/browser which would make a GET request and our server will send over the relevant HTML/CSS/JS files to render the web page.

Can go into POSTMAN and make a POST request after using app.post in the app.js file.

CREATE:
- To create and save data inside our MongoDB database:

    - const <constantName> = new <modelName>({
        fieldName : fieldData
    });

    - <constantName>.save();

DELETE:
- app.delete(route, function(req, res));

ROUTE HANDLERS:

- app.route() method. Can create chainable router handlers for a route path. 
- Can be used to refactor code 

GET a specific document:
- Spaces in URLs are represented as %20
- So when performing a GET request in Postman, use, for example: 'localhost:3000/articles/united%20states'




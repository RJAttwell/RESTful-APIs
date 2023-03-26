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

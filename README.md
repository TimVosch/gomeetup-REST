# GoMeetUp REST-API
The GoMeetUp api will provide the ability for people to create location based events or meetups with descriptions and (maybe) pictures etc. People nearby will get a notification and they will be able set their presence to: 

 - *I will be there*
 - *I am not sure yet*
 - *I wont be there* (Alias for: *Has not responded yet*)

The API will provide different levels of permissions for easy maintenance. Admins or moderators will have the ability to remove unwanted events/meet ups.

Contributing
---
The api is currently not in a state where we can accept pull-requests. Sorry for the inconvenience.

Setting up
---
 - Clone the repo.
 - setup MongoDB on your system.
 - ```npm install``` to install dependencies.
 - ```npm start``` to start the server.

Node environment file
---
The node env file can be used to pass the following variables:

 - ```PORT=8080```  The port the server runs on.
 - ```APP_TOKEN_SECRET=DEBUG``` This is the secret that signs the JWT tokens. (**CHANGE THIS**)
 - ```APP_TOKEN_EXPIRATION=86400``` The expire time in seconds for the JWT token.

Routes / Endpoints
---
See the ```routes/Index.js``` file for more information.

License
---
    The MIT License (MIT)
    
    Copyright (c) 2016 Tim van Osch
    
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.

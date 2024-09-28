You will only be needed to setup ```.env``` file to run the server.

_Note: You do not need to keep production variables different to run in the localhost or local machine, they both can be same._

*NOTE: If you face any challenges, error or have any doubt, just create a PR(recommended) or email me, I will respond as soon as possible:*

```.env``` file contains <br/>

```

# FOR DEVELOPMENT ( to run on local machine/ localhost )
MONGO_URI = 
GOOGLE_CLIENT = 
GOOGLE_SECRET = 
COOKIE_KEY = 
TOKEN_SECRET = 
CLOUD_NAME = 
CLOUD_API_KEY = 
CLOUD_API_SECRET = 
PASS = 
PORT = 
REACT_APP_BACKEND_URL = 
REACT_APP_FRONTEND_URL = 
EMAIL_ID = 

# FOR PRODUCTION ( to run on server after deployment)
MONGO_URI_PRODUCTION = 
GOOGLE_CLIENT_PRODUCTION = 
GOOGLE_SECRET_PRODUCTION = 
COOKIE_KEY_PRODUCTION = 
TOKEN_SECRET_PRODUCTION = 
CLOUD_NAME_PRODUCTION = 
CLOUD_API_KEY_PRODUCTION = 
CLOUD_API_SECRET_PRODUCTION = 
PASS_PRODUCTION = 
PORT_PRODUCTION = 
EMAIL_ID_PRODUCTION = 
REACT_APP_BACKEND_URL_PRODUCTION = 
REACT_APP_FRONTEND_URL_PRODUCTION = 

```

where <br/>

- MONGO_URI=URI of the mongodb database
- GOOGLE_CLIENT=google client id for google oauth generated from google console
- GOOGLE_SECRET=google secret for google oauth generated from google console
- COOKIE_KEY=key of the cookie
- TOKEN_SECRET=token secret (random value like 120days)
- CLOUD_NAME=cloudnary cloud name for storing images 
- CLOUD_API_KEY=cloudnary cloud key for storing images
- CLOUD_API_SECRET=cloudnary cloud secret for storing images
- PASS=Google app password which generated after 2 factor verification for sending mails related to verification, forgot password, report etc.
- EMAIL_ID=id for which PASS is generated
- PORT=5002
- REACT_APP_BACKEND_URL=http://localhost:5002 (backend url)
- REACT_APP_FRONTEND_URL=http://localhost:3000 (frontend url)

```.env``` file contains <br/>

```
MONGO_URI <br/>
GOOGLE_CLIENT
GOOGLE_SECRET
COOKIE_KEY
TOKEN_SECRET
CLOUD_NAME (of cloudinary)
CLOUD_API_KEY
CLOUD_API_SECRET 
PASS (google app password for nodemailer)
REACT_APP_BACKEND_URL=http://localhost:5000
```

where <br/>

- MONGO_URI=URI of the mongodb database
- GOOGLE_CLIENT=google client id for google oauth
- GOOGLE_SECRET=google secret for google oauth
- COOKIE_KEY=key of the cookie
- TOKEN_SECRET=token secret
- CLOUD_NAME=cloudnary cloud name for storing images
- CLOUD_API_KEY=cloudnary cloud key for storing images
- CLOUD_API_SECRET=cloudnary cloud secret for storing images
- PASS=Google app password which generated after 2 factor verification for sending mails related to verification, forgot password, report etc.
- REACT_APP_BACKEND_URL=http://localhost:5000 (backend url)
- REACT_APP_FRONTEND_URL=http://localhost:3000 (frontend url)

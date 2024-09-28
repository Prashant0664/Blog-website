require('dotenv').config();

if (process.env.NODE_ENV === 'production') {
    module.exports = {
        MONGO_URI: process.env.MONGO_URI_PRODUCTION,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_PRODUCTION,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_SECRET_PRODUCTION,
        COOKIE_KEY: process.env.COOKIE_KEY_PRODUCTION,
        TOKEN_SECRET: process.env.TOKEN_SECRET_PRODUCTION,
        CLOUD_NAME: process.env.CLOUD_NAME_PRODUCTION,
        CLOUD_API_KEY: process.env.CLOUD_API_KEY_PRODUCTION,
        CLOUD_API_SECRET: process.env.CLOUD_API_SECRET_PRODUCTION,
        PASS: process.env.PASS_PRODUCTION,
        EMAIL_ID: process.env.EMAIL_ID_PRODUCTION,
        PORT: process.env.PORT_PRODUCTION,
        BACKEND_URL: process.env.REACT_APP_BACKEND_URL_PRODUCTION,
        FRONTEND_URL: process.env.REACT_APP_FRONTEND_URL_PRODUCTION
    }
}
else {
    module.exports = {
        MONGO_URI: process.env.MONGO_URI,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_SECRET,
        COOKIE_KEY: process.env.COOKIE_KEY,
        TOKEN_SECRET: process.env.TOKEN_SECRET,
        CLOUD_NAME: process.env.CLOUD_NAME,
        CLOUD_API_KEY: process.env.CLOUD_API_KEY,
        CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,
        PASS: process.env.PASS,
        EMAIL_ID: process.env.EMAIL_ID,
        PORT: process.env.PORT,
        BACKEND_URL: process.env.REACT_APP_BACKEND_URL,
        FRONTEND_URL: process.env.REACT_APP_FRONTEND_URL
    }
}

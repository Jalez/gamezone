# 2. Configuring Secure Communication
## 2.1 Use HTTPS in Production

    In development, you might use HTTP, but in production, always use HTTPS.
    Obtain an SSL/TLS certificate from a trusted Certificate Authority (CA).
    Configure your server to use HTTPS.

## 2.2 Secure Session Cookies

Ensure your session cookies are secure:

```js

// In session configuration
cookie: {
  maxAge: 1000 * 60 * 60 * 24, // 1 day
  secure: true, // Set to true in production when using HTTPS
  httpOnly: true,
  sameSite: 'lax', // or 'strict' depending on your needs
},

    secure: Ensures cookies are only sent over HTTPS.
    httpOnly: Prevents JavaScript from accessing cookies (mitigates XSS attacks).
    sameSite: Controls when cookies are sent (mitigates CSRF attacks).
```

## 2.3 Store Sessions in a Database

Using connect-mongo, session data is stored in MongoDB, providing persistence across server restarts.

```js

// Session configuration with MongoStore
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { /* ... */ },
}));

```
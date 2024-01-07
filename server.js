// Libraries & Config
const express = require('express')
const { auth } = require('express-openid-connect')
const { requiresAuth } = require('express-openid-connect')

require('dotenv').config()

const app = express()
const port = 3000

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: 'http://localhost:3000',
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
}

// Express Config & Permissions
app.set('view engine', 'ejs')
app.use(auth(config))

// Server Endpoints
app.get('/', (req, res) => {
    loggedIn = req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
    res.render('pages/index', {
        loggedIn: loggedIn
    })
})

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user))
})


app.get('/about', (req, res) => {
    res.render('pages/about')
})

// Server Deployment (Listen)
app.listen(port, () => {
    console.log(`Server Listening at http://localhost:${port}`)
})
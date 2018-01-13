//	DEPENDENCIES
require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const massive = require('massive')
const axios = require('axios')



//Express
const app = express();
app.use(bodyParser.json());


// app.delete(`${auth}/logout`, .destroy)
// app.put(`${auth}/:id`, .update)

//Authorization Endpoints
// const auth = "/api/auth"
// app.get(`${auth}/login`, .list)
// app.get(`${auth}/setUser`, .findOne)
// app.get(`${auth}/authenticated`, .findOne)
// app.post(auth, .create)


// Friend Endpoints
// const friend = "/api/friend"
// app.get(`${friend}/list`, .list)
// app.post(`${friend}/add`, .create)
// app.post(`${friend}/remove`, .destroy)

//User Endpoints
// const user = "/api/user"
// app.patch(`${user}/patch/:id`,)
// app.get(`${user}/list`, .list)
// app.get(`${user}/search`, .list)

//Recommended Endpoints
// const recommended = "/api/recommended"
// app.post(`${recommended}`, .create)
// app.post(`${recommended}/add`, .create)

//MASSIVE
const db = app.get('db');

massive(process.env.CONNECTION_STRING)
    .then(db => {
        app.set('db', db)
    }).catch((error) => console.error());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.use(express.static(`${__dirname}/../build`));

app.post('/login', (req, res) => {
    const { userId } = req.body;
    const auth0Url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${userId}`;
    axios.get(auth0Url, {
        headers: {
            Authorization: 'Bearer ' + process.env.AUTH0_MANAGEMENT_ACCESS_TOKEN
        }
    }).then(response => {
        const userData = response.data;
        req.session.user = {
            name: userData.name,
            email: userData.email,
            auth0_id: userData.user_id,
            pictureUrl: userData.picture
        };
        res.json({ user: req.session.user });
        app.get('db').find_user(userData.user_id).then(users => {
            if (!users.length) {
                app.get('db').create_user([userData.user_id, userData.email, userData.picture, userData.name]).then(() => {

                }).catch(error => {
                    console.log('error', error);
                });
            }
        })
    }).catch(error => {
        console.log('error', error);
        res.status(500).json({ message: 'Oh noes!' });
    });
});

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.send();
});

app.get('/user-data', (req, res) => {
    res.json({ user: req.session.user });
});


const PORT = process.env.SERVER_PORT || 3005
app.listen(PORT, () => console.log(`listening on port ${PORT}`))
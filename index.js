const express = require('express')

const jwt = require('jsonwebtoken')

const cors = require('cors')

const dataService = require('./services/data.service')

const app = express()

app.use(cors({
    origin:'http://localhost:4200'
}))

app.use(express.json())

const appMiddleware = (req, res, next) => {
    console.log("application specific middleware");
    next()
}

app.use(appMiddleware)

const jwtMiddleware = (req, res, next) => {

    try {
        token = req.headers['x-access-token']
        const data = jwt.verify(token, 'supersecretkey12345')
        console.log(data);
        req.currentUid= data.currentUid
        next()
    }
    catch {
        res.status(401).json({
            status: false,
            statusCode: 401,
            message: 'Please Log in'
        })
    }
}

// Register API

app.post('/register', (req, res) => {
    dataService.register(req.body.username, req.body.uid, req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result)

        })

})

//Login API

app.post('/login', (req, res) => {
    //login solving
     dataService.login(req.body.uid, req.body.password)
     .then(result => {
        res.status(result.statusCode).json(result)

    })

})

//Add event API

app.post('/addEvent', jwtMiddleware, (req, res) => {
    //event solving
    dataService.addEvent(req, req.body.date, req.body.message, )
    .then(result => {
        res.status(result.statusCode).json(result)

    })
})

//Veiw event API

app.post('/veiwEvent', jwtMiddleware, (req, res) => {
    //transaction solving
    dataService.veiwEvent(req.body.uid)
    .then(result => {
        res.status(result.statusCode).json(result)

    })
})



//Delete Acc API
app.delete('/deleteAcc/:uid',jwtMiddleware,(req, res) => {
    //delete solving
    dataService.deleteAcc(req.params.uid)
    .then(result => {
    res.status(result.statusCode).json(result)

    })
})

app.listen(3000, () => {
    console.log("SERVER STARTED AT 3000");
})
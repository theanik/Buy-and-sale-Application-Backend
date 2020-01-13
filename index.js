const express = require('express')
const bp = require('body-parser')

const app = express()
//middleware
const cros = require('./src/middelware/cros');

//controller
const user = require('./src/controller/userController')
const post = require('./src/controller/postController')


//use middleware
app.use(bp.json())
app.use(cros)


//routs
app.use(user)
app.use(post)


app.get('/', (req, res) => {
    res.send("Hayy...what's uppp!!")
})

const port = 7000

app.listen(port, () => console.log(`Bike Bazer app listening on port ${port}!`))
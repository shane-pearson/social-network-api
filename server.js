const express = require ('express')
const db = require ('./config/connection')
const routes = require ('./Routes')
const PORT = process.env.PORT || 3001
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(routes)

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`server running on PORT ${PORT}`)
    })
})
const express=require("express")
const mysql = require("mysql")
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.urlencoded({extended : true}))
app.use(cors())
app.use(express.json())


const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'manager',
    database:'smartship'
})

app.get("/",(req,res)=>{
    const getquery = "select * from user"
    db.query(getquery,(error,result)=>{
        // console.log(result)
        res.send(result)

    })
})

app.post("/insert",(req,res) => {

    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    const sqlpost = "insert into user (name,email,password) values (?,?,?);"
    db.query(sqlpost,[name,email,password],(error,result) => {
        // console.log(result);
        res.send(result);
    })
})

app.listen(2001,()=>{
    console.log("server started 2001")
})

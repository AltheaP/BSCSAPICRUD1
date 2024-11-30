//instantiation
//import express API framework
const express = require("express")
const app = express();
const moment = require('moment')
//importing mysql
const mysql = require("mysql")
const cors = require('cors')
//port number
const PORT = process.env.PORT || 5000;

const logger = (req, res, next) =>{
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}:${moment().format()} `)
    next()
}

app.use(logger)
app.use(cors())
app.use(express.json()); // use this in fetch APi for CRUD
//connection to mysql
const connection = mysql.createConnection({
    host: "bmix5lkljpjozaesn25j-mysql.services.clever-cloud.com",
    user: "ucxd8z4ufrksc4cm",
    password: "pTZyaV36KWhUUaIkL3mE",
    database: "bmix5lkljpjozaesn25j",
});

//initilization of connection
connection.connect();


//API - REPORT
//GET request and response are the parameters
app.get("/api/Products", (req, res) =>{
    //create a query
    connection.query("SELECT * FROM Product",(err, rows, fields)=>{
        //checking errors
        if(err) throw err;
        //response
        //key value pair
        res.json(rows);
    });
});

//API - REPORT - SEARCH
//passing the id parameter
//request - >>> front-end ID
app.get("/api/Products/:id",(req, res)=>{
    const id=req.params.id; 
    connection.query(`SELECT * FROM Product WHERE id='${id}'`, (err, rows, fields)=>{
        if(err) throw err;

        if(rows.length > 0){
            res.json(rows);
        }else{
            res.status(400).json({msg: `${id} id not found!`})
        }
    })
    //res.send(id);
})


//POST - CREATE
app.use(express.urlencoded({extended: false}))
app.post("/api/Products", (req, res)=>{
    const iname = req.body.iname;
    const uprice = req.body.uprie;
    const quantity = req.body.quantity;
    const supplier = req.body.supplier;
    connection.query(`INSERT INTO Product (itemName, unitPrice, quantity, supplier) VALUES ('${iname}','${uprice}', '${quantity}', '${supplier}')`, (err, rows, fields) =>{
        if(err) throw err;
        res.json({msg: `Successfully inserted`});
    })

})


app.listen(5000, () => {
    console.log(`Server is running in port ${PORT}`);
})

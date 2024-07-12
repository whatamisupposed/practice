const express = require('express')
const morgan = require('morgan')
const app = express()

app.get('/', (req, res)=>{
    res.send('Good day')
})

app.listen(3000, ()=>{
    console.log('server is up');
})
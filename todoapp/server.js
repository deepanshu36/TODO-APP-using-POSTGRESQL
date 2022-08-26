const express=require('express')
const app=express()
const port=3000;
app.use(express.json())

const personroutes=require('./routes')

// app.use(express.json())

app.use('/api',personroutes)

app.get('/',(req,res)=>{

    res.send('hello')
})
app.listen(port,()=>{

    console.log('server is listening on 3000'); 

})


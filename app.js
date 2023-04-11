const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const port=3000;
const userRoutes=require('./routes/users')

app.use(bodyParser.json());
app.use('/users',userRoutes);

app.get('/',(req,res)=>
{
    res.send('hi i am working')
})

app.listen(port,()=>{
    console.log(`app started on ${port}`);
})
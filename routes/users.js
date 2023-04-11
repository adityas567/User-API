const express=require('express');

const router=express.Router();

const db=require('mongoose');

db.set('strictQuery',false);

db.connect('mongodb://localhost:27017/api-data');


const userSchema=new db.Schema({
    name:String,
    age: Number
});

const getData=async ()=>
{
    const model=db.model('users',userSchema);
    const results=await model.find()
    return results;
}

const postData=async ()=>
{
    const model=db.model('users',userSchema);
    return model;
}

const updateData=async()=>
{
    const model=db.model('users',userSchema);
    return model;
}

router.get('/',async(req,res)=>
{
    const result=await getData();
    res.send(result);
})

router.post('/',async(req,res)=>
{
    const results=await postData();
    const data=new results(req.body);
    await data.save();
    res.send('posted');
})

router
  .route("/:id")
  .get(async(req, res) => {
    // console.log(req.user);
    const result=await updateData();
    const data=await result.findOne({_id:req.params.id});
    res.send(data);
  })
  .put(async(req, res) => {
    const result=await updateData();
    const data=await result.updateOne({_id:req.params.id},{$set:req.body});
    console.log(data);
    res.send(data);
  })
  .delete(async(req, res) => {
    const result=await updateData();
    const data=await result.deleteOne({_id:req.params.id});
    res.send(data);
  });


module.exports=router;
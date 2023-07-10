const express=require('express');
const mongoose=require('mongoose');
const Product=require('./models/productmodel');
const app=express();
const PORT=3000;
//using express middleware 
app.use(express.json());
 

//get method to view a new resource
//post to create
//put to update
//delete  to remove
app.get('/',(req,res)=>{
    res.send("hello node ");

});


app.get('/details',async(req,res)=>{
    try{
        const details=await Product.find({});
        res.status(200).json(details)
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message}); 
    }
});
 

app.get('/details/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const details=await Product.findById(id);
        res.status(200).json(details);
    }
        catch(error){
            console.log(error.message); 
            res.status(500).json({message:error.message}); 
        }
    });

app.post('/details',async(req,res)=>{
        // console.log(req.body);
        // res.send(req.body); 
        try{
        const details=await Product.create(req.body);
        res.status(200).json(details);
        }
        catch(error){
            console.log(error.message); 
            res.status(500).json({message:error.message}); 
        }
    
    });

//put

app.put('/details/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const  details=await Product.findByIdAndUpdate(id,req.body);
        if(!details) {
            return res.status(404).json({message:`cannot find any details wiht Id ${id}`});
        } 
         const updatedproduct=await Product.findById(id);
        res.status(200).json(updatedproduct);
    }catch(error){
        res.status(500).json({message:error.message});
    }
});


//delete a product

app.delete('/details/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const details=await Product.findByIdAndDelete(id);
        if(!details) {
            return res.status(404).json({message:`cannot delete any details wiht Id ${id}`});
        } 
        res.status(200).json(details);
         
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
});

app.listen(PORT,()=>{
    console.log("node server running on port 3000");
});

mongoose.connect('mongodb://localhost:27017/nodedb')
.then(()=>{
    console.log("connected to mongodb");
}).catch((error)=>{
    console.log(error)
});

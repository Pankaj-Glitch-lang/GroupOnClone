const express=require('express');
const mongoose=require('mongoose');
const ProductRouter = require('./router/product.route');
const cors=require('cors');
const UserRouter = require('./router/user.route');

const router = require('./router/cart.routes');

const app=express();
app.use(express.json())
app.use(cors())

const uri = "mongodb+srv://pankajmahato0089:eCwJm0kvbkdVMuql@cluster0.f21rb.mongodb.net/groupon?retryWrites=true&w=majority&appName=Cluster0";

const atlasDb= ()=>{
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.error('Database connection error:', err));

}

app.use('/product',ProductRouter);
app.use('/auth',UserRouter);
app.use('/cart',router)

app.listen(8080,(err)=>{
    if(!err){
        console.log('Server Started..');
        atlasDb()
    }else{
        console.log('Something Went wrong',err);
    }
})
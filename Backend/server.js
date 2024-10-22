const mongoose=require('mongoose');
require('dotenv').config();
const express=require('express');
const app=express();
const userRouter=require('./Routes/userRoute');
const ProductRouter=require('./Routes/productRoute')
const port=process.env.SERVER_PORT;
const db_url=process.env.DB_URL

const cors=require('cors');



mongoose.connect(`${db_url}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB connection error:", err));


app.listen(port,()=>{
    console.log(port)
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/user',userRouter);
app.use('/product',ProductRouter)




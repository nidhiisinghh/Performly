const express = require('express');
const cors = require('cors');
const userRouter=require('./Route/userRoute')
const performRoute=require('./Route/performer')
const reviewRoute=require('./Route/reviewRoute')
const mongoose=require('mongoose')
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Mongoose Connected")
})
.catch((err)=>{
    console.log(err)
})

const PORT = process.env.PORT || 3000;

app.use('/user', userRouter);
app.use('/performer', performRoute);
app.use('/review', reviewRoute);

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

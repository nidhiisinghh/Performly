const express = require('express');
const cors = require('cors');
const userRouter=require('./Route/userRoute')
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/user',userRouter);

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

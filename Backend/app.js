const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/route');

require('dotenv').config();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;


app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("connected to mongodb..."))
.catch((err)=>{console.log(err)});


// app.get('/', (req, res) => {
//     res.send('Authentication Server Running')
// })
app.use('/auth',routes);



app.listen(PORT,()=>console.log(`Server is running at ${PORT}`));

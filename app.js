const express       = require('express');
const dotenv        = require('dotenv');
const mongoose      = require('mongoose');

const authRoute     = require('./Routes/auth')
const projectRoute  = require('./Routes/project')
const ticketRoute   = require('./Routes/ticket')
const sprintRoute   = require('./Routes/sprint')
const app           = express();

dotenv.config();

app.use(express.json());

app.use('/auth',authRoute);
app.use('/project',projectRoute);
app.use('/project/ticket',ticketRoute);
app.use('/project/sprint',sprintRoute);

if(process.env.NODE_ENV !== "test"){
    mongoose.connect(process.env.DB_CONNECT,
        { 
            useUnifiedTopology: true, 
            useNewUrlParser: true 
        }, () =>
        {
        console.log("connected to db");
        }
    )
}


module.exports      = app;
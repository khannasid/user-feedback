const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require("helmet");
const compression = require("compression");

const routing = require('./routers');


const app = express();

app.use(cors());// Enable CORS for frontend communication
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet()); // Adds security headers  
app.use(compression());


app.get("/", (req, res)=>{
    res.send("API is running...!!");
});
app.use('/api', routing);


module.exports = app;
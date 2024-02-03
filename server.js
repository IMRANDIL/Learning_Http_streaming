require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');



const app = express();

const server = http.createServer(app);
const PORT = process.env.PORT || 6003;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

server.listen(PORT, ()=>{
    console.log(`Server runs on port: ${PORT}`);
})
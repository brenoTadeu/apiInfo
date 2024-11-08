require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./router/endereco');

app.use(express.json());
app.use('/api', router);

const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{
    console.log(`server running in PORT: ${PORT}`);
})
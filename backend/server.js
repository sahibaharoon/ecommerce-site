const express = require('express');
const app = express();
const PORT = 3000;
const products= require('./data');
const cors=require('cors');

app.use(cors());
app.get("/api/products",(req,res)=>{
    res.json(products)
});
app.use(express.static('../'));
app.listen(PORT,() => {
    console.log(`Server running at http://localhost:${PORT}`);
});

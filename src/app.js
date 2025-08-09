const express =require('express');
const cors = require('cors');
const aiRoutes= require('./routes/ai.routes')

const authRoutes = require('./routes/auth'); 


const app = express();

// app.use(cors())
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({extended:true}));


app.get('/', (req ,res)=>{
    res.send("hello world");
})

app.use('/ai' , aiRoutes);
app.use('/api/auth', authRoutes); 


module.exports=app;
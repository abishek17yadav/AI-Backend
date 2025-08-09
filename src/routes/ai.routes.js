const express= require('express');
const aiController = require("../controllers/ai.controller")



const router= express.Router();




router.post("/get-review" ,aiController.getReview)


// routes fiel ke andar app routes create karte ho aut kauns sa controller chalana hai woh batate hoo

module.exports=router;



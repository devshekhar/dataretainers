const express = require('express');
const router = express.Router();
const app = express(); 
const cors = require('cors'); 
app.use(cors({credentials: true, origin: true}));

 
const lead_data = require('../models/lead_data');
//get http method to /main
router.get('/',(req,res)=>{
  
    lead_data.getAllLeadList((err,lists)=>{
    if(err){
     
        res.json({success:false,message:`failed to load all lead list Error:${err}`});
    }
    else{
     
        res.write(JSON.stringify({success:true,lists:lists},null,2));
        res.end();
    }
    });
});


module.exports =router;
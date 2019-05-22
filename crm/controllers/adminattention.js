const express = require('express');
const router = express.Router();
const app = express(); 
const cors = require('cors'); 
app.use(cors({credentials: true, origin: true}));
const lead_data = require('../models/admin_login');
const config =require('../config/database');
const jwt = require('jsonwebtoken');
const jwt_auth = require('../config/jwtauth'); 


//set attention data to database
router.post('/setattentiondata/:id',(req,res)=>{
    if(req.body.attentiontype=='requestprice'){


        config.query('select * from adminattention where userid=?',[req.params.id],(err,result)=>{
            if(err){
                console.log('error while updating admin attention'+err);
            }else{
                if(result.length>0){
                config.query("update adminattention set adminattentionstatus=?,adminattentioncomment=?,requestpriceattention='true' where userid=?",[req.body.status,req.body.adminattentioncomment,req.params.id],(err,result)=>{
                    if(err){
                        console.log('error while updating adminattention status'+err);
                    }else{
                        res.send(JSON.stringify({success:true,message:'admin attention data updated successfully',adminattentiondata:result}));
                    }
                });
            }else{
config.query("insert into adminattention(userid,agentname,adminattentionstatus,requestpriceattention,adminattentioncomment) values(?,?,'true',?,?)",[req.params.id,req.body.username,req.body.status,req.body.adminattentioncomment
],(err,result)=>{
    if(err){
   console.log('error while set admin attention '+err);
    }else{
        res.send(JSON.stringify({success:true,message:'set admin attention data successfully',adminattentiondata:result}));
    }
});
    }
}
        });
    }
    if(req.body.attentiontype=='othersattention'){
        config.query('select * from adminattention where userid=?',[req.params.id],(err,result)=>{
            if(err){
                console.log('error while updating admin attention'+err);
            }else{
                if(result.length>0){
                config.query("update adminattention set adminattentionstatus=?,othersattentioncomment=?,otherattention='true' where userid=?",[req.body.status,req.body.adminattentioncomment,req.params.id],(err,result)=>{
                    if(err){
                        console.log('error while updating adminattention status'+err);
                    }else{
                        res.send(JSON.stringify({success:true,message:'admin attention data updated successfully',adminattentiondata:result}));
                    }
                })
                }else{
                    config.query("insert into adminattention(userid,agentname,otherattention,adminattentionstatus,othersattentioncomment) values(?,?,'true',?,?)",[req.params.id,req.body.username,req.body.status,req.body.adminattentioncomment
                    ],(err,result)=>{
                        if(err){
                       console.log('error while set admin attention '+err);
                        }else{
                            res.send(JSON.stringify({success:true,message:'set admin attention data successfully',adminattentiondata:result}));
                        }
                    });
                }
            }
            
           
        })
     
            }
});
router.get('/getattentiondata',(req,res)=>{
    config.query("select * from adminattention where (adminattentionstatus='pending' or adminattentionstatus='downpayment created') and requestpriceattention='true'",function(err,result){
        if(err){
            console.log(err);
        }else{
            res.send(JSON.stringify({success:true,message:'get admin data successfully',adminattentiondata:result}));
        }
    });
});
router.get('/getotherattentiondata',(req,res)=>{
    console.log('value of thie');
config.query("select * from adminattention where  otherattention='true'",(err,result)=>{
    if(err){
        console.log('error while fetching data for otherattention data'+err);

    }else{
        res.send(JSON.stringify({success:true,message:'get other attention succcessfully',
    otherattentiondata:result}));
    }
});
});
module.exports =router;
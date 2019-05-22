const express = require('express');
const router = express.Router();
const app = express(); 
const bcrypt = require('bcrypt');
const cors = require('cors'); 
const mysql = require('mysql');
const config =require('../config/database');
app.use(cors({credentials: true, origin: true}));
const jwt = require('jsonwebtoken');
const jwt_auth = require('../config/jwtauth'); 
const agent_data = require('../models/agent_login_model');
const register_data= require('../models/agentRegistration')
//get http method to /main
router.get('/data',(req,res)=>{
  
  agent_data.getAgentLogin((err,agentlogin)=>{
  if(err){
   res.json({success:false,message:`failed to load all lead list Error:${err}`});
  }
  else{
   
      res.send(JSON.stringify({success:true,agentlogin:agentlogin},null,2)); 
  }
  });
});

router.post('/register',(req,res)=>{
config.query('select * from agents where username=?',[req.body.username],function(err,result){
    if(err){
        console.log('error while get agent username'+err);
        
    }
    if(!result.length){
        config.query('insert into agents(username,password,usertype) values(?,?,?)',[req.body.username,req.body.password,req.body.usertype],function(err,rows){
            if(err){
                console.log('error while registering user'+err);
                res.send({success:false,message:'Failed to create Agent'});
            }else{
              res.send({success:true,message:'A new Agent is Created',rows:rows},null,2);
           
            }
        });
    }else{
        res.send({success:false,message:'User Already Exist'});
    }
});


});

//assign agent to case and insert agent and and status
router.post('/assign/id',(req,res)=>{
    config.query('select agent,firstname from lead where id = ?',[req.body.idname],function(err,result){
     console.log('chechking for agent'+result[0].agent);
     if( isNaN(result[0].agent)){
        res.send({success:false,message:`This Case is Assigned to Another Agent`});
      
     }else{
        config.query('update lead set agent=?,status="process" where id=?',[req.body.agentname,req.body.idname],function(err,rows){
            if(err){
                res.send({success:false});
            res.send({success:false,message:'Agent not assign'});
            }else{
                res.send({success:true,message:'Case assigned to agent'});
               
            }
        })   
     }
    });
    
})

router.post('/login',(req,res)=>{
    if(!req.body.username){
        res.json({success:false,message:'username is not provided'})
    }else{
        if(!req.body.password){
            res.json({success:false,message:'password is not provided'})
        }else{
            config.query('select password,username from agents where username =?',[req.body.username],function(err,user){
                if(user.length==0){
                    res.json({success:false,message:'Agent not found'});
                    res.end();
                }else{
                    if(req.body.password==user[0].password){
                           const token = jwt.sign({userName:user[0].username},jwt_auth.secret,{expiresIn:'24h'});
                            res.json({success:true,message:'User login',token:token,user:{user:user[0].username}});
                        }else{
                            res.json({success:false,message:'Password Incorrect'}); 
                        }
                    
                }
            })

            
        }
    }
});


router.use((req,res,next)=>{
    const token = req.headers['authorization'];
   
    if(!token){
        res.json({success:false,message:'No Token Provided'});
    }else{
        jwt.verify(token,jwt_auth.secret,(err,decoded)=>{
            if(err){
                res.json({success:false,message:'Token invalid: '+jwt_auth.secret+'hell /n'+token});
            }else{
                req.decoded = decoded;
                next();
            }
        })
    }
})


router.get('/profile',(req,res)=>{
    config.query('select password,username,usertype from agents where username =?',[req.decoded.userName],function(err,user){
        if(user.length==0){
            res.json({success:false,message:'User not found'});
        }else{
           
                res.json({success:true,user:user,message:user});
            }
        
   
    })
});
      
module.exports =router;

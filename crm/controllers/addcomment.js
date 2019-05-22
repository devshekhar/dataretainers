
const express = require('express');
const router = express.Router();
const app = express(); 
const config =require('../config/database');
const schedule = require('node-schedule');
const http = require('http');
var CronJob = require('cron').CronJob;
const SocketIO =require('socket.io');
 const server = http.Server(app);
const io = SocketIO(server);

router.post('/insert:id',(req,res)=>{
    config.query('select commentid from updatewall order by commentid desc limit 1',function(err,resultid){
        if(err){
            console.log('error while fetching comments id'+err);
        }else{
          global.commetid22= Number(resultid[0].commentid) +1;
          console.log('value of comment id'+commetid22);
          config.query('insert into updatewall(remindercomment,remindertime,commenttime,caseno,commentid) values(?,?,NOW(),?,?)',[req.body.comment,req.body.remindertime,req.params.id,commetid22,req.params.id],(err,result)=>{
            if(err){
                console.log('error while inserting data into updatewall'+err);
            }else{
                res.send(JSON.stringify({success:true,message:'comment is added in update wall',remindercomment:result}));
            }
        });
        }


});
});
router.get('/fetch:id',(req,res)=>{
    
          config.query('select remindercomment,remindertime,commenttime from updatewall where caseno=?',[req.params.id],(err,result)=>{
            if(err){
                throw err;
            }else{
                console.log(result.length);
                res.send(JSON.stringify({success:true,message:'comment value fetched',commentdata:result}));
              
            }
           });
        });
        
   
    


router.get('/getalert:id',(req,res)=>{
    
    config.query('select self_alert_comment,self_alert_remindertime,self_alert_time from lead where id=?',[req.params.id],(err,result)=>{
        if(err){
            throw err;
        }else{
            res.send(JSON.stringify({success:true,message:'self alert value fetched',alertdata:result}));
        };
    });
});

router.post('/submitalert:id',(req,res)=>{
   
    config.query('UPDATE lead set 	self_alert_comment=?,self_alert_remindertime=?, self_alert_time=NOW() where id=?',[req.body.alertcomment,req.body.selfalertdate,req.params.id],(err,result)=>{
    if(err){
        console.log(err);
    }else{
       res.send(JSON.stringify({success:true,message:`self alert comment added`,selfalertdata:result}));
       var date = new Date(req.body.selfalertdate);
       

    }
    });
    });

module.exports =router;

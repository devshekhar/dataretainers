const express = require('express');
const router = express.Router();
const config = require('../config/database');

router.post('/postdata/:id',(req,res)=>{
   // console.log(req.params.id);
  

   if(req.body.quotesplan=='serviceplan'){
   config.query('select quotesid from quotes order by quotesid desc limit 1',function(err,resultid){
if(err){
    console.log('err id quotesid'+err);
}else{
    global.quotesid22  =Number(resultid[0].quotesid) + 1;
    console.log(quotesid22);

   config.query('insert into quotes(id,quotesplan,serialnumber,service,listprice,quantity,total,quotesid) values(?,?,?,?,?,?,?,?)',[req.params.id,req.body.quotesplan,req.body.serialnumber,req.body.service,req.body.listprice,req.body.quantity,req.body.total,quotesid22],function(err,result){
    if(err){
     console.log('err'+err);
    }else{
        
        res.send(JSON.stringify({success:true,message:'Quotes Data Submitted Succefully',quotesdata:result}));
    }
   });
}
});
   }  


   if(req.body.quotesplan=='downpayment'){
       config.query('update quotes set downpayment=? where id=?',[req.body.downpayment,req.params.id],function(err,result){
           if(err){
               console.log('error while updating downpayment'+err)
           }else{
               res.send(JSON.stringify({success:true,message:'Quotes plan Updated Successfully',quotesdata:result}));
               config.query("update adminattention set adminattentionstatus ='downpayment created'where userid=?",[req.body.id],(err,result)=>{
                if(err){
                    console.log('error while updating the admin attention status in downpayment'+err);
                }else{
                   
                }
            });
           }
       });
   }

   if(req.body.quotesplan=='backupdrive'){
       config.query('update quotes set drivesize=?,drivequantity=?,basicdriveprice=?,drivetotalprice=? where id=?',[req.body.drivesize,req.body.drivequantity,req.body.basicdriveprice,req.body.drivetotalprice,req.params.id],function(err,result){
        if(err){
            console.log('error while updating quotespayment'+err)
        }else{
            res.send(JSON.stringify({success:true,message:'Downpayment Updated Successfully',quotesdata:result}));
        }
       })
   }
   if(req.body.quotesplan=='shipping'){
    config.query('update quotes set shippingcost=?,shippingtype=? where id=?',[req.body.shippingcost,req.body.shippingtype,req.params.id],function(err,result){
     if(err){
         console.log('error while updating shipping payment'+err)
     }else{
         res.send(JSON.stringify({success:true,message:'Shipping payment Updated Successfully',quotesdata:result}));
     }
    })
}
});


// select quotes data by id
router.get('/getdata/:id',(req,res)=>{
console.log(req.params.id);
config.query('select * from quotes where id=?',[req.params.id],function(err,result){
    if(err){
        console.log('err'+err);
    }else{
        res.send(JSON.stringify({success:true,message:'Quotes Data Fetches Successfully',quotesdata:result}));
    }
})
});


//select edit data by id
router.get('/geteditdata/:id',(req,res)=>{
    config.query('select * from quotes where quotesid = ?',[req.params.id],function(err,result){
     if(err){
     console.log('get the value FOR edit form '+err);
     }else{
   res.send(JSON.stringify({success:true,message:'get the value for edit form',editquotesdata:result}));
     }
    });
})


//submit edit quotes data to the database
router.post('/submiteditdata/:id',(req,res)=>{
  
    if(req.body.quotesplan=='serviceplan'){
      
    config.query('update quotes set quotesplan=?,serialnumber=?,service=?,listprice=?,quantity=?,total=? where quotesid=?',[req.body.quotesplan,req.body.serialnumber,req.body.service,req.body.listprice,req.body.quantity,req.body.total,req.params.id],function(err,result){
        if(err){
           console.log('error while submit edit quotes form'+err)
        }else{
         res.send(JSON.stringify({success:true,message:'submit the value for edit form ',submitquotesdata:result}));
        }
    });
}

if(req.body.quotesplan=='downpayment'){
config.query('update quotes set downpayment=? where id=?',[req.body.downpayment,req.body.id],function(err,result){
if(err){
    console.log('err while updating downpayment'+err);
}else{
    res.send(JSON.stringify({success:true,message:'downpayment data updated successfully',submitquotesdata:result}));
    
    config.query("update adminattention set adminattentionstatus ='downpayment created'where userid=?",[req.body.id],(err,result)=>{
        if(err){
            console.log('error while updating the admin attention status in downpayment'+err);
        }else{
           
        }
    });
}
})
}

if(req.body.quotesplan=='backupdrive'){
  
    config.query('update quotes set drivesize=?, drivequantity=?,basicdriveprice=?,drivetotalprice=? where id=?',[req.body.drivesize,req.body.drivequantity,req.body.basicdriveprice,req.body.drivetotalprice,req.body.id],function(err,result){
    if(err){
        console.log('err while updating backupdrive'+err);
    }else{
        res.send(JSON.stringify({success:true,message:'backupdrive data updated successfully',submitquotesdata:result}));
    }
    })
    }
    
    if(req.body.quotesplan=='shipping'){
       
        config.query('update quotes set shippingtype=?, shippingcost=? where id=?',[req.body.shippingtype,req.body.shippingcost,req.body.id],function(err,result){
        if(err){
            console.log('err while updating shipping payment'+err);
        }else{
            res.send(JSON.stringify({success:true,message:'shipping data updated successfully',submitquotesdata:result}));
        }
        });
        }
       
        if(req.body.quotesplan=='finalpayment'){
     //  console.log('value of quotes'+req.body.otherscost);

            config.query('update quotes set total=?,downpayment=?,drivetotalprice=?,shippingcost=?,otherscost=?,taxcost=?,overallcost=? where id=?',[req.body.total,req.body.downpayment,req.body.drivetotalprice,req.body.shippingcost,req.body.otherscost,req.body.taxcost,req.body.overallcost,req.body.id],function(err,result){
            if(err){
                console.log('err while updating final payment'+err);
            }else{
                res.send(JSON.stringify({success:true,message:'final payment data updated successfully',submitquotesdata:result}));
                config.query("update adminattention set adminattentionstatus ='finalpayment created'where userid=?",[req.body.id],(err,result)=>{
                    if(err){
                        console.log('error while updating the admin attention status in downpayment'+err);
                    }else{
                       
                    }
                });
            }
            });
            }
});

//delete quotes data to the database

router.get('/deletequotes/:id',(req,res)=>{
config.query('delete from quotes where quotesid=?',[req.params.id],function(err,result){
    if(err){
        console.log('error while delete quotes data'+err);
    }else{
        res.send(JSON.stringify({success:true,message:'successfully deleted data from quotes',deletequotes:result}));
    }
})

})
module.exports =router;

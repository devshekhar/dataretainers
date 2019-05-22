import { Component, OnInit } from '@angular/core';
import {MainservicesService} from '../../services/mainservices.service';
import{Router, RouterStateSnapshot,ActivatedRoute} from '@angular/router';
import {  } from '@angular/router'
import {Howl, Howler} from 'howler';
import {FlashMessagesService} from 'angular2-flash-messages';
import * as socketIO from 'socket.io-client';
import {NewCaseData} from '../../models/newcasedata';
import{MediaInformation} from '../../models/mediainfo';
import {CommentData} from '../../models/commentdata';
import {AlertData} from '../../models/selfalert';
import {FormGroup,FormBuilder,Validators, FormControl} from '@angular/forms';
import {Quotes} from '../../models/quotes';
@Component({
  selector: 'app-casedetails',
  templateUrl: './casedetails.component.html',
  styleUrls: ['./casedetails.component.css'],
 
})
export class CasedetailsComponent implements OnInit {
  editformvalue=false;
  
id;
infoupdate;
state;
commentform:FormGroup;
selfalertform:FormGroup;
quotesform:FormGroup;
editquotesform:FormGroup;
adminattentionform:FormGroup;
mediadata;
private newcasedata:NewCaseData[]=[];
private mediainformation:MediaInformation[]=[];
private quotes:any;
private editquotes:any;
downpayementQuotes=false;
serviceplanQuotes=true;
backupDriveQuotes=false;
shippingQuotes=false;
finalQuotes=false;
editquotesid;
adminAttentionStatus='pending';
//device_type =this.mediainformation.device_type;
device_type;
device_manufacturer;
       device_model;
       device_capacity;
       cnn_failure;
       recovery_attempts;
       file_folder;
       caseno;
       date_time;
       device_serialno;
private commentdata:CommentData[]=[];
private selfalertdata:AlertData[]=[];

updatewall=false;
selfalert=false;
processClass="fas fa-times-circle";
checkvalue=false;
commentdisable=false;
currentusertype;
currentusername;
isadminattention=false;
adminattentionmessage;
modalhide;
//address=this.newcasedata+' '+this.newcasedata.state;

  constructor(
    private mainService:MainservicesService,
    private router:Router,
    private activeRouter:ActivatedRoute,
    private formBuilder:FormBuilder
  ) {
    this.createForm();
    this.alertform();
    this.addQuotesForm();

   }
   createForm(){
       this.commentform=this.formBuilder.group({
       casecomment:['',Validators.required],
       casedate:['',Validators.required],
       chechkvalue:['',Validators.required]
    
     })
   }

   alertform(){
     this.selfalertform=this.formBuilder.group({
     alertcomment:['',Validators.required],
     selfalertdate:['',Validators.required],
     chechkvalue:['']
     });
   }
   addQuotesForm(){
this.quotesform=this.formBuilder.group({
  quotesplan:['',Validators.required],
  serialnumber:['',Validators.required],
  service:['',Validators.required],
  listprice:['',Validators.required],
  quantity:['',Validators.required],
  total:['',Validators.required],
  downpayment:['',Validators.required],
  drivesize:['',Validators.required],
  drivequantity:['',Validators.required],
  basicdriveprice:['',Validators.required],
  drivetotalprice:['',Validators.required],
  shippingcost:['',Validators.required],
  shippingtype:['',Validators.required],
  otherscost:['',Validators.required],
    taxcost:['',Validators.required],
     overallcost:['',Validators.required],
})
   }
   onQuoteSubmit(){
  const quotesData ={
    quotesplan:this.quotesform.get('quotesplan').value,
    serialnumber:this.quotesform.get('serialnumber').value,
    service:this.quotesform.get('service').value,
    listprice:this.quotesform.get('listprice').value,
    quantity:this.quotesform.get('quantity').value,
    total:this.quotesform.get('total').value,
    downpayment:this.quotesform.get('downpayment').value,
    drivesize:this.quotesform.get('drivesize').value,
    drivequantity:this.quotesform.get('drivequantity').value,
    basicdriveprice:this.quotesform.get('basicdriveprice').value,
    drivetotalprice:this.quotesform.get('drivetotalprice').value,
    shippingcost:this.quotesform.get('shippingcost').value,
    shippingtype:this.quotesform.get('shippingtype').value,
    otherscost:this.quotesform.get('shippingtype').value,
    taxcost:this.quotesform.get('shippingtype').value,
    overallcost:this.quotesform.get('shippingtype').value,
    
  }
  
  this.mainService.sendQuotesData(this.id,quotesData).subscribe(data=>{
  if(data.success){
    console.log('data is submitted');
    window.location.reload();
  }
  });
   }
  ngOnInit() {
    this.activeRouter.params.subscribe(params => {
      this.id = Number.parseInt(params['slug'])
    });
    
    this.mainService.getCaseDetailsById(this.id).subscribe(data=>{
     this.newcasedata=data.newcasebyid[0];
     this.caseno=data.newcasebyid[0].caseno;
      this.getMediaInfo(this.caseno);
      
    });
    this.mainService.getCommentById(this.id).subscribe(data=>{
     this.commentdata=data.commentdata;
 
    
    });
    this.mainService.getAlertData(this.id).subscribe(data=>{
     this.selfalertdata=data.alertdata[0];
    
    })
    this.mainService.getQuotesData(this.id).subscribe(data=>{
      
      this.quotes=data.quotesdata;
    });
 this.currentusername=this.mainService.getCurrentUserData().currentusername;
 this.currentusertype=this.mainService.getCurrentUserData().currentusertype;  
 
  }
  showValue(data){
    const mediacasedata={
      casevalue:this.caseno,
      value:data.value,
      field:data.field
     }
   this.mainService.toUpdateCaseInfo(this.id,mediacasedata).subscribe(data=>{
  this.infoupdate =data;
    if(data.success==true){
    // location.reload();
    }
   });

   
  }

  getMediaInfo(caseno){
    const mediacaseno={
      casevalue:caseno
     }
    this.mainService.getMediaInfoById(mediacaseno).subscribe(data=>{
     if(data.media[0])
     {
      this.mediainformation =data.media[0];
     
     }else{
       this.mediainformation = [

       
        {
          id: '',
          device_type: '',
          device_manufacturer: '',
          device_model: '',
          device_capacity: '',
          cnn_failure: '',
          recovery_attempts: '',
          file_folder: '',
          caseno: '',
          date_time: '',
          device_serialno: ''
        } 
        
       ]
     //  console.log("value of mediadddddddddd info"+this.mediainformation[0]);
      }
            });
  }
  updateWall(){
    this.updatewall=true;
    this.selfalert=false;
  }
  selfAlert(){
    this.selfalert=true;
    this.updatewall=false;
  }
  changeCheckbox(event){
    
  if(event.target.checked){
    this.checkvalue=true;
  }else{
    this.checkvalue=false;
  }
  }

  onCommentSubmit(){
    const commentdata ={
     comment:this.commentform.get('casecomment').value,
     remindertime:this.commentform.get('casedate').value
    }

    this.mainService.onSubmitComment(this.id,commentdata).subscribe(data=>{
      if(data.success==true){
     //   console.log(data);
        this.commentdisable=true;
      }
    })
  }

  
  onAddAlert(){
    const alertdata ={
      alertcomment:this.selfalertform.get('alertcomment').value,
      selfalertdate:this.selfalertform.get('selfalertdate').value
    }
    console.log(alertdata);
      this.mainService.onSubmitAddAlert(this.id,alertdata).subscribe(data=>{
      if(data.success==true){
        this.commentdisable=true;
      }
    })
  }
 onEditQuote(quotesid){
 
   this.editquotesid = quotesid;
   this.editformvalue=true;
   this.editquotes=null;
   //this.editquotesform.reset(this.editquotesform.value);
   this.createEditQuotesForm();
   
  this.mainService.editGetQuotesById(quotesid).subscribe(data=>{
   
    this.editquotes=data.editquotesdata[0];
 // this.editquotesform.controls['quotesplan'].setValue(this.editquotes.quotesplan);
  this.editquotesform.controls['serialnumber'].setValue(this.editquotes.serialnumber);
  this.editquotesform.controls['service'].setValue(this.editquotes.service);
  this.editquotesform.controls['listprice'].setValue(this.editquotes.listprice);
  this.editquotesform.controls['quantity'].setValue(this.editquotes.quantity);
  this.editquotesform.controls['total'].setValue(this.editquotes.total);

  });

 
 }

 createEditQuotesForm()
 {

 this.editquotesform= this.formBuilder.group({
  quotesplan:['',Validators.required],
  serialnumber:['',Validators.required],
  service:['',Validators.required],
  listprice:['',Validators.required],
  quantity:['',Validators.required],
  total:['',Validators.required],
  downpayment:['',Validators.required],
  drivesize:['',Validators.required],
  drivequantity:['',Validators.required],
  basicdriveprice:['',Validators.required],
  drivetotalprice:['',Validators.required],
  shippingcost:['',Validators.required],
  shippingtype:['',Validators.required],
  otherscost:['',Validators.required],
  taxcost:['',Validators.required],
  overallcost:['',Validators.required],

});
 }


 onEditQuoteSubmit(){
  
  //console.log('value of quotes id ' +this.editquotesid);
  const editquotesformdata={
    quotesplan:this.editquotesform.get('quotesplan').value,
    serialnumber:this.editquotesform.get('serialnumber').value,
    service:this.editquotesform.get('service').value,
    listprice:this.editquotesform.get('listprice').value,
    quantity:this.editquotesform.get('quantity').value,
    total:this.editquotesform.get('total').value,
    downpayment:this.editquotesform.get('downpayment').value,
    drivesize:this.editquotesform.get('drivesize').value,
    drivequantity:this.editquotesform.get('drivequantity').value,
    basicdriveprice:this.editquotesform.get('basicdriveprice').value,
    drivetotalprice:this.editquotesform.get('drivetotalprice').value,
    shippingcost:this.editquotesform.get('shippingcost').value,
    shippingtype:this.editquotesform.get('shippingtype').value,
    otherscost:this.editquotesform.get('otherscost').value,
    taxcost:this.editquotesform.get('taxcost').value,
    overallcost:this.editquotesform.get('overallcost').value,
    id:this.id
  }
 this.mainService.onEditQuoteSubmit(this.editquotesid,editquotesformdata).subscribe(data=>{
    //console.log('value of final payement');
    if(data.success){
      window.location.reload();
    }
  });
 }

 onDeleteQuote(quotes){
 //  console.log(quotes.quotesid);
 this.mainService.deleteQuotesById(quotes.quotesid).subscribe(data=>{
if(data.success){
 var index =this.quotes.indexOf(quotes,0);
 if(index > -1){
   this.quotes.splice(index,1);
 }
}
 });
 } 
 onQuotesPlanChange(value:any){
  // console.log('value changed'+value);
   //console.log(this.downpayemntQuotes);
if(value=='downpayment'){
  this.downpayementQuotes=true;
  this.serviceplanQuotes=false;
  this.backupDriveQuotes=false; 
  this.finalQuotes=false;
  this.shippingQuotes=false;
  //console.log('value after chnaging select value'+this.downpayemntQuotes);
}
if(value=='backupdrive'){
  this.serviceplanQuotes=false;
  this.backupDriveQuotes=true; 
  this.downpayementQuotes=false;
  this.shippingQuotes=false;
  this.finalQuotes=false;
}
if(value=='serviceplan'){
  this.serviceplanQuotes=true;
  this.backupDriveQuotes=false; 
  this.downpayementQuotes=false;
  this.shippingQuotes=false;
  this.finalQuotes=false;
}
if(value=='shipping'){
  this.shippingQuotes=true;
  this.serviceplanQuotes=false;
  this.backupDriveQuotes=false; 
  this.downpayementQuotes=false;
  this.finalQuotes=false;
}
if(value=='finalpayment'){
  this.finalQuotes=true;
  this.serviceplanQuotes=false;
  this.backupDriveQuotes=false; 
  this.downpayementQuotes=false;
  this.shippingQuotes=false;
}
 }

 onEditDownpayment(quotes){
   
   this.editquotesid = quotes[0].quotesid;
   this.editformvalue=true;
   this.editquotes=null;
   //this.editquotesform.reset(this.editquotesform.value);
   this.createEditQuotesForm();
   
  this.mainService.editGetQuotesById(this.editquotesid).subscribe(data=>{
   
    this.editquotes=data.editquotesdata[0];
    
  //this.editquotesform.controls['quotesplan'].setValue('downpayment');
 this.editquotesform.controls['downpayment'].setValue(this.editquotes.downpayment);
 });
}
onEditBackupDrive(quotes){
  this.editquotesid = quotes[0].quotesid;
  this.editformvalue=true;
  this.editquotes=null;
  //this.editquotesform.reset(this.editquotesform.value);
  this.createEditQuotesForm();
  
 this.mainService.editGetQuotesById(this.editquotesid).subscribe(data=>{
  
   this.editquotes=data.editquotesdata[0];
 

this.editquotesform.controls['drivesize'].setValue(this.editquotes.drivesize); 
this.editquotesform.controls['drivequantity'].setValue(this.editquotes.drivequantity); 
this.editquotesform.controls['basicdriveprice'].setValue(this.editquotes.basicdriveprice);
this.editquotesform.controls['drivetotalprice'].setValue(this.editquotes.drivetotalprice);
 });
}
onEditShipping(quotes){
  this.editquotesid = quotes[0].quotesid;
  this.editformvalue=true;
  this.editquotes=null;
  //this.editquotesform.reset(this.editquotesform.value);
  this.createEditQuotesForm();
  
 this.mainService.editGetQuotesById(this.editquotesid).subscribe(data=>{
  
   this.editquotes=data.editquotesdata[0];
 //console.log(this.editquotes.shippingcost);

this.editquotesform.controls['shippingcost'].setValue(this.editquotes.shippingcost); 
this.editquotesform.controls['shippingtype'].setValue(this.editquotes.shippingtype); 

 });
}

onEditFinaPayment(quotes){
  this.editquotesid = quotes[0].quotesid;
  this.editformvalue=true;
  this.editquotes=null;
  //this.editquotesform.reset(this.editquotesform.value);
  this.createEditQuotesForm();
  
 this.mainService.editGetQuotesById(this.editquotesid).subscribe(data=>{
  
   this.editquotes=data.editquotesdata[0];
 //console.log(this.editquotes.overallcost);

this.editquotesform.controls['shippingcost'].setValue(this.editquotes.shippingcost); 
this.editquotesform.controls['total'].setValue(this.editquotes.total); 
this.editquotesform.controls['downpayment'].setValue(this.editquotes.downpayment); 
this.editquotesform.controls['drivetotalprice'].setValue(this.editquotes.drivetotalprice); 
this.editquotesform.controls['taxcost'].setValue(this.editquotes.taxcost);
this.editquotesform.controls['otherscost'].setValue(this.editquotes.otherscost);
this.editquotesform.controls['overallcost'].setValue(this.editquotes.overallcost);
 });
} 

onAdminAttention(){
  this.isadminattention=true;
  this.adminattentionform=this.formBuilder.group({
    attentiontype:['',Validators.required],
    adminattentioncomment:['',Validators.required]
  });
}
onAdminAttentionFormSubmit(){
  const adminAttentionData={
    userid:this.id,
    username:this.currentusername,
    status:this.adminAttentionStatus,
    adminattentioncomment:this.adminattentionform.get('adminattentioncomment').value,
    attentiontype:this.adminattentionform.get('attentiontype').value
 }
 this.mainService.setAdminAttention(adminAttentionData,this.id).subscribe(data=>{
if(data.success){
  this.adminattentionmessage="Your query successfully send to Admin";
  console.log(this.adminattentionmessage);
  setTimeout(()=>{
 document.getElementById('closeBtn').click();
   },2000)
}
});
}

onAttentioTypeChange(){

}
onLogoutClick(){
    this.mainService.logoutUser();
    this.router.navigate['/'];

  
  }
}

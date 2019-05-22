import { Component, OnInit } from '@angular/core';
import {MainservicesService} from '../../services/mainservices.service';
import{Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import{Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
@Component({
  selector: 'app-adminmainpage',
  templateUrl: './adminmainpage.component.html',
  styleUrls: ['./adminmainpage.component.css']
})
export class AdminmainpageComponent implements OnInit {

  username;
  password;
  usertype='admin';
  adminattentiondata;
  isAdminAttentionStatus=false;
  isAdminAttentionBlock=false;
  isOthersAttentionBlock=false;
  otherattentiondata;
  isOtherAttentionStatus=false
  attentiondata$=Observable.of(this.attentiondata$);
    constructor(
      private authService:MainservicesService,
      private router:Router,
      private flashMessagesService:FlashMessagesService
    ) { }
   onLogoutClick(){
     this.authService.logoutUser();
     
     this.router.navigate(['/']);
   }
    ngOnInit() {
      this.authService.getAdminProfile().subscribe(profile =>{
        this.username = profile.user[0].admin_user;
       this.password= profile.user[0].password;
       this.setUserData();
      });

      
    setInterval(() => {
      this.getAttention();
      this.getOthersAttention();
    }, 6000);
   
  }
  getAttention(){
  this.authService.getAdminAttention().subscribe(data=>{
    this.adminattentiondata=data.adminattentiondata;
    this.attentiondata$=data.adminattentiondata[0];
 for(var i=0;i<this.adminattentiondata.length;i++){
   if(this.adminattentiondata[i].adminattentionstatus=='pending' ||this.adminattentiondata[i].adminattentionstatus=='downpayment created'){
    
     this.isAdminAttentionStatus=true;
   }
 }
  });
}
getOthersAttention(){
  this.authService.getOthersAttention().subscribe(data=>{
    this.otherattentiondata=data.otherattentiondata;
    
    if(this.otherattentiondata.length>0){
      this.isOtherAttentionStatus=true;
    }
  });
}
    setUserData(){
      const userdata={
        currentusername:this.username,
        currentusertype:this.usertype
      }
      this.authService.setCurrentUserData(userdata);
     
    }
    adminAttentionCreateQuotes(userid){
      console.log(userid);
      this.router.navigate(['/caseinfo',userid]);
    }
    onRequestPrice(){
      this.isAdminAttentionBlock=true;
      this.isOthersAttentionBlock=false
    }
    onOtherRequest(){
      this.isAdminAttentionBlock=false;
      this.isOthersAttentionBlock=true;
    }
    removeOtherAttention(userid){
     
    }
}

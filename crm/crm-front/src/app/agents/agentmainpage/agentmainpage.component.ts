import { Component, OnInit,OnChanges,SimpleChanges, Input} from '@angular/core';
import {MainservicesService} from '../../services/mainservices.service';
import{Router} from '@angular/router';
import {Howl, Howler} from 'howler';
import {FlashMessagesService} from 'angular2-flash-messages';
import * as socketIO from 'socket.io-client';
import {NewCaseData} from '../../models/newcasedata';


@Component({
  selector: 'app-agentmainpage',
  templateUrl: './agentmainpage.component.html',
  styleUrls: ['./agentmainpage.component.css']
})
export class AgentmainpageComponent implements OnInit,OnChanges {
// socket =socketIO('http://localhost:3000/');
//today:number=Date.now();
@Input() newCaseData:NewCaseData[];
username;
password;
agentid;
agentname;
caseMessage;
agentInfoClass;
usertype='agent';
  constructor(
    private authService:MainservicesService,
    private router:Router,
    private flashMessagesService:FlashMessagesService
  
  ) { }


  //for logout
 onLogoutClick(){
   this.authService.logoutUser();
   
   this.router.navigate(['/']);
 }
 ngOnChanges(changes:SimpleChanges){
   console.log("this is ngOnint"+changes);
 }

 //function for assign agent
 assignAgent(id,agent){
   this.agentid=id;
   this.agentname=name;
var index = this.newCaseData.indexOf(id);
      console.log(index);
      this.newCaseData.splice(index,1);
      console.log(this.newCaseData);
const user={
  idname:id,
  agentname:agent
}
this.authService.assignAgent(user).subscribe(data=>{
  console.log(data.success);
  if(data.success){
    this.router.navigate(['/caseinfo', this.agentid]);
  }else{
    this.caseMessage=data.message;
    this.agentInfoClass='alert alert-danger';
    setTimeout(()=>{    //<<<---    using ()=> syntax
      location.reload();
 }, 3000);
  }
})

 }
  ngOnInit() {
   //get the agent profile
    this.authService.getProfile().subscribe(profile =>{
      this.username = profile.user[0].username;
     this.password= profile.user[0].password;
     this.setUserData();
    });

    setInterval(() => {
      this.getCaseData()
    }, 6000);
    
  
   // var sound = new Howl({
      //src: ['assets/sound/alert.MP3']
    //});
    
    
  }
  getCaseData(){
    this.authService.getNewCase().subscribe(data=>{
     length =data.newcase.length;
     console.log(length);
     if(length>0){
      this.newCaseData=data.newcase;
      console.log(this.newCaseData);
     }
    })
  }
  setUserData(){
    const userdata={
      currentusername:this.username,
      currentusertype:this.usertype
    }
    this.authService.setCurrentUserData(userdata);
   
  }
}



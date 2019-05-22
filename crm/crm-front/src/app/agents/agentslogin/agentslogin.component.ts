import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators, FormControl} from '@angular/forms'
import {AgentData} from '../../models/agentsdata';
import {MainservicesService} from '../../services/mainservices.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-agentslogin',
  templateUrl: './agentslogin.component.html',
  styleUrls: ['./agentslogin.component.css']
})
export class AgentsloginComponent implements OnInit {
private agentData:AgentData[] =[];
loading =false;
form:FormGroup;
messageClass;
message;
processing;
  constructor(private formBuiler:FormBuilder,private mainService:MainservicesService,private router:Router) { 
    this.createForm();
  }
  
  createForm(){
    this.form = this.formBuiler.group({
      username:['',Validators.required],
      password:['',Validators.required]
     
    });
  }
  
   disableForm(){
     this.form.controls['username'].disable();
     this.form.controls['password'].disable();
       }
       enableForm(){
        this.form.controls['username'].enable();
        this.form.controls['password'].enable();
          }
          
          //login function 
          onLoginSubmit(){
        this.processing = true;
        this.disableForm();
        const user ={
          username:this.form.get('username').value,
          password:this.form.get('password').value
        }
        this.mainService.loginagent(user).subscribe(data=>{
          if(!data.success){
           this.messageClass='alert alert-danger';
           this.message=data.message;
           this.processing=false;
           this.enableForm();
           
          }else{
 
 
 this.mainService.storeUserData(data.token,data.user);
 setTimeout(()=>{
   this.router.navigate(['/agentmainpage']);
 },1000)
          }
        });
      }
     
  ngOnInit() {
    
  }
  public loadLists(){
    //get All list from the server and update to the lists property
    this.mainService.getAgentData().subscribe(
      response =>this.agentData= response,
    )
  }
        
}
    
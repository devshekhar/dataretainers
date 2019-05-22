import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators, FormControl} from '@angular/forms';
import {MainservicesService} from '../../services/mainservices.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  loading=false;
  form:FormGroup;
messageClass;
message;
processing;

  constructor(private formBuilder:FormBuilder,private mainService:MainservicesService,private router:Router) { 
    this.createForm();
  }
  createForm(){
   this.form =this.formBuilder.group({
     username:['',Validators.required],
     password:[null,Validators.required]
   })
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
    this.processing=true;
    this.disableForm();
    const user={
      username:this.form.get('username').value,
      password:this.form.get('password').value
    }
    this.mainService.loginadmin(user).subscribe(data=>{
      if(!data.success){
       this.messageClass='alert alert-danger';
       this.message=data.message;
       this.processing=false;
       this.enableForm();
       
      }else{


this.mainService.storeUserData(data.token,data.user);
setTimeout(()=>{
this.router.navigate(['/adminmainpage']);
},1000)
      }
    });
  }
  ngOnInit() {
  }

}

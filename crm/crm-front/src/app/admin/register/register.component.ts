import { Component, OnInit, group } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import {MainservicesService} from '../../services/mainservices.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
form:FormGroup;
message;
messageClass;
processing=false;
createForm(){
  this.form = this.formBuilder.group({
    username:['',Validators.required],
    password:['',Validators.required],
    confirm:['',Validators.required],
    usertype:['',Validators.required]
  },{
    validator:this.matchingPasswords('password','confirm'
  )});
}

  constructor(private formBuilder:FormBuilder,private mainservice:MainservicesService) {
    this.createForm();
   }
onRegisterSubmit(){
 this.processing=true;
 this.disableForm();
  const user={
    username:this.form.get('username').value,
    password:this.form.get('password').value,
    usertype:this.form.get('usertype').value
  }
  this.mainservice.registerAgent(user).subscribe(data =>{
    console.log(data.message);
    if(!data.success){
 this.messageClass='alert alert-danger';
 this.message = data.message;
 this.processing=false;
 this.enableForm();
    }else{
   this.messageClass='alert alert-success';
   this.message= data.message;
    }
   })
 
 
}
disableForm(){
this.form.controls['username'].disable();
this.form.controls['password'].disable();
this.form.controls['confirm'].disable();
}
enableForm(){
  this.form.controls['username'].enable();
  this.form.controls['password'].enable();
  this.form.controls['confirm'].enable();
}
 
  ngOnInit() {
    
    
  }
  matchingPasswords(password,confirm){
    return(group:FormGroup) =>{
      if(group.controls[password].value ===group.controls[confirm].value){
        return null;
      }else{
        return {'matchingPasswords':true}
      }
    }
  }


}

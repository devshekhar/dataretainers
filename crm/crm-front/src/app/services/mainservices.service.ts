import { Injectable } from '@angular/core';
import{Http,Headers,RequestOptions,RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {List} from '../models/List';
import {AdminData} from '../models/admindata';
import {AgentData} from '../models/agentsdata';
import{NewCaseData} from '../models/newcasedata';
import 'rxjs/add/operator/map';
import {URLSearchParams} from '@angular/http';
import { tokenKey } from '@angular/core/src/view';
import {tokenNotExpired} from 'angular2-jwt';
@Injectable()
export class MainservicesService {
  authToken;
  user;
  options;
  currentusertype;
  currentusername;
  storeuserdata;
  createAuthenticationHeaders(){
    this.loadToken();
    this.options= new RequestOptions({
      headers:new Headers({
        method: RequestMethod.Post,
         url: 'http://localhost:4200/agentmainpage',
        'Content-Type':'application/json',
        'authorization':this.authToken
      })
    });
  }
  loadToken(){
  const token =localStorage.getItem('token');
  this.authToken=token;
  }
private serverApi ='http://localhost:3000';
  constructor(private http:Http) { }
   public getAllLists():Observable<List[]> {
    let URI=`${this.serverApi}/main/`;
   return this.http.get(URI,{ withCredentials: true }).map(res =>res.json())
   .map(res=><List[]>res.lists);
 }
 //get the user information
 public getCurrentUserData(){
 let currentgetdata=localStorage.getItem(this.storeuserdata);
 return JSON.parse(currentgetdata);
}
 //set the user information
 public setCurrentUserData(userdata){
 // console.log(userdata.currentusername);
  localStorage.setItem(this.storeuserdata,JSON.stringify(userdata));
 
   }

//for get admin data
 public getAdminData():Observable<AdminData[]>{
  let URI=`${this.serverApi}/adminlogin/`;
  return this.http.get(URI,{withCredentials:true}).map(res=>res.json()).map(res=><AdminData[]>res.admindata);
 }
//for get new data
public getNewCase(){
  let URI=`${this.serverApi}/newcase/`;
  return this.http.get(URI).map(res=>res.json());
}
 //for agentdata
 public getAgentData():Observable<AgentData[]>{
  let URI=`${this.serverApi}/adminlogin/`;
  return this.http.get(URI,{withCredentials:true}).map(res=>res.json()).map(res=><AgentData[]>res.agentdata);
 }

//for register agent
 public registerAgent(user){
  let URI=`${this.serverApi}/agent/register/`;
   return this.http.post(URI,user).map(res=>res.json());
 }

 //for login agent
 public loginagent(user){
  let URI=`${this.serverApi}/agent/login/`;
   return this.http.post(URI,user).map(res =>res.json())
 }
 //get agent profile data
 public getProfile(){
  this.createAuthenticationHeaders();
  let URI=`${this.serverApi}/agent/profile/`;
  return this.http.get(URI,this.options).map(res=>res.json());
}
//create agent token
storeUserData(token,user){
  localStorage.setItem('token',token);
  localStorage.setItem('user',JSON.stringify(user));
  this.authToken= token;
  this.user = user;
  
}
logoutUser(){
  this.authToken= null;
  this.user=null,
  localStorage.clear();
}

loggedIn(){
  return tokenNotExpired();
}

//for login admin
public loginadmin(user){
  let URI=`${this.serverApi}/admin/login/`;
  return this.http.post(URI,user).map(res =>res.json())
}

//get admin profile data
public getAdminProfile(){
  this.createAuthenticationHeaders();
  let URI=`${this.serverApi}/admin/profile/`;
  return this.http.get(URI,this.options).map(res=>res.json());
}


//get mysqlwatch value
public getMysqlwatch(){
  let URI=`${this.serverApi}/mysqlwatch/`;
  return this.http.get(URI).map(res=>res.json());
}

//assign agent to case
public assignAgent(user){
  let URI=`${this.serverApi}/agent/assign/id`;
  return this.http.post(URI,user).map(res=>res.json());
}
//get newcase details based on id
public getCaseDetailsById(userId){
  let URI=`${this.serverApi}/newcase/`;
  return this.http.get(URI+userId).map(res=>res.json());
}
//get the media information based on id
public getMediaInfoById(caseno){
  let URI=`${this.serverApi}/newcase/getmediainfo`;
  return this.http.post(URI,caseno).map(res=>res.json());
}
//update  case value information
public toUpdateCaseInfo(userId,mediacasedata){
  let URI=`${this.serverApi}/newcase/update/`;
  return this.http.post(URI+userId,mediacasedata).map(res=>res.json());
}

//submit comment value in database
public onSubmitComment(userId,commentdata){
  let URI =`${this.serverApi}/addcomment/insert`;
  return this.http.post(URI+userId,commentdata).map(res=>res.json());
}
//get comment data 
public getCommentById(userId){
  let URI =`${this.serverApi}/addcomment/fetch`;
  return this.http.get(URI+userId).map(res=>res.json());
}

//submit alert data to database

public onSubmitAddAlert(userId,commentdata){
  let URI =`${this.serverApi}/addcomment/submitalert`;
  return this.http.post(URI+userId,commentdata).map(res=>res.json());
}

//get alert data from database

public getAlertData(userId){
  let URI =`${this.serverApi}/addcomment/getalert`;
  return this.http.get(URI+userId).map(res=>res.json());
}

/*}*/
public getQuotesData(userid){
let URI =`${this.serverApi}/quotes/getdata/${userid}`;
return this.http.get(URI).map(res=>res.json());
}
//send quotes data to database
public sendQuotesData(userid,quotesData){
 
let URI =`${this.serverApi}/quotes/postdata/${userid}`;
return this.http.post(URI,quotesData).map(res=>res.json());
}
//get edit quotes form data by id
public editGetQuotesById(quotesid){
  let URI =`${this.serverApi}/quotes/geteditdata/${quotesid}`;
  return this.http.get(URI).map(res=>res.json());
}

//submit edit quotes data by id

public onEditQuoteSubmit(quotesid,editquotesdata){

  let URI =`${this.serverApi}/quotes/submiteditdata/${quotesid}`;
  return this.http.post(URI,editquotesdata).map(res=>res.json());
}

public deleteQuotesById(quotesid){
  let URI =`${this.serverApi}/quotes/deletequotes/${quotesid}`;
  return this.http.get(URI).map(res=>res.json());
}
//set admin attention data
public setAdminAttention(getAdminAttentionData,quotesid){
  let URI =`${this.serverApi}/adminattention/setattentiondata/${quotesid}`;
  return this.http.post(URI,getAdminAttentionData).map(res=>res.json())
}
//get admin attention data
public getAdminAttention(){
  let URI =`${this.serverApi}/adminattention/getattentiondata`;
  return this.http.get(URI).map(res=>res.json());
}
//get other admin attention data
public getOthersAttention(){
  let URI =`${this.serverApi}/adminattention/getotherattentiondata`;
  return this.http.get(URI).map(res=>res.json()); 
}
}
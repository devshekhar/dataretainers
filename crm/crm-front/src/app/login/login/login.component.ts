import { Component, OnInit } from '@angular/core';
import {MainservicesService} from '../../services/mainservices.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mysqlwatchvalue;
 
  constructor(private authService:MainservicesService ) {}

  ngOnInit() {
    
   }
  }



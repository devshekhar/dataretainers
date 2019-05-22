import { Component, OnInit } from '@angular/core';
import {MainservicesService} from '../services/mainservices.service';
import {List} from '../models/List';
import {Observable} from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import {ActivatedRoute} from "@angular/router";
import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators'
import {FilterPipe} from '../filter.pipe';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [MainservicesService]
})
export class MainPageComponent implements OnInit {
  p: number = 1;
//lists property which is an array of lIst type
private lists:List[] =[];

  

  constructor(private mainService:MainservicesService) {
 
   }
   
   ngOnInit() {
    this.loadLists();
    
  
  }
  
public loadLists(){
  //get All list from the server and update to the lists property
  this.mainService.getAllLists().subscribe(
    response =>this.lists= response,
  )
}
}
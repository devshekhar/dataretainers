import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import {MainservicesService} from './services/mainservices.service';
import { RouterModule,Routes } from '@angular/router';
import { FilterPipe } from './filter.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { CaseComponent } from './agents/case/case.component';
import { MainpageComponent } from './agents/mainpage/mainpage.component';
import { AdmincaseComponent } from './admin/admincase/admincase.component';
import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';
import { AgentsloginComponent } from './agents/agentslogin/agentslogin.component';
import { LoginComponent } from './login/login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RegisterComponent } from './admin/register/register.component';
import { FormsModule }   from '@angular/forms';
import { AgentmainpageComponent } from './agents/agentmainpage/agentmainpage.component';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuard} from './guards/auth.guard';
import { AdminmainpageComponent } from './admin/adminmainpage/adminmainpage.component';
import { CasedetailsComponent } from './case/casedetails/casedetails.component';
import { CasenotificationComponent } from './newcase/casenotification/casenotification.component';
import { NgxClickToEditModule } from 'ngx-click-to-edit';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'adminlogin',      component: AdminloginComponent },
  {
    path: 'agentlogin',
    component:AgentsloginComponent,
    data: { title: 'Agent Login' }
  },
  {
    path: 'agentregister',
    component:RegisterComponent,
    data: { title: 'Agent Register' },
    canActivate:[AuthGuard]
  },
  {
    path:'adminmainpage',
    component:AdminmainpageComponent,
    data:{title:'Admin Main Page'},
    canActivate:[AuthGuard]
  },
  {
    path:'caseinfo/:slug',
    component:CasedetailsComponent,
    data:{title:'Case details by id'},
    canActivate:[AuthGuard]
  },
  {
    path: 'agentmainpage',
    component:AgentmainpageComponent,
    data: { title: 'Agent Profile' },
    canActivate:[AuthGuard]
  },
  { path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  { path: '**', component: PagenotfoundComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    FilterPipe,
    CaseComponent,
    MainpageComponent,
    AdmincaseComponent,
    AdminloginComponent,
    AgentsloginComponent,
    LoginComponent,
    PagenotfoundComponent,
    RegisterComponent,
    AgentmainpageComponent,
    AdminmainpageComponent,
    CasedetailsComponent,
    CasenotificationComponent,
    
     ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    RouterModule,
    NgxPaginationModule,
    NgxClickToEditModule.forRoot(),
    FlashMessagesModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    AuthGuard,
    MainservicesService],
  bootstrap: [AppComponent],
})


export class AppModule { }

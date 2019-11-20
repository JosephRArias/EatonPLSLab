import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'hammerjs';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
   MatButtonModule,
   MatCheckboxModule,
   MatFormFieldModule,
   MatInputModule,
   MatOptionModule,
   MatSelectModule,
   MatSlideToggleModule,
   MatCardModule, 
   MatChipsModule,
   MatToolbarModule, 
   MatListModule
} from '@angular/material';

import { MatSidenavModule } from '@angular/material/sidenav';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatIconRegistry } from '@angular/material';
import { LoginComponent } from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import {ForgotPasswordComponent} from './forgot/forgot.component';
import { appRoutes } from './app.routing';
import { AuthGuard } from './guards/auth.guard';
import { AppService } from './app.service';
import { APP_BASE_HREF } from '@angular/common';



import { MsalService } from './services/msal.service';
import { HttpClientModule } from '@angular/common/http';
import { TareasComponent } from './tareas/tareas.component';
import { UserGuard } from './guards/user.guard';
import { AdminMainComponent } from './admin/main/admin-main.component';
import { AdminGuard } from './guards/admin.guard';
import { NavMenuComponent } from './shared/nav-menu.component';
import { ProjectsComponent } from './projects/projects.component';
import { ModeratorGuard } from './guards/moderator.guard';
import { RequestFormComponent } from './request-form/request-form.component';
import { ListComponent } from './requests/list/list.component';

import { BatchModel } from './models/batch.model';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule, 
    MatInputModule,
    MatOptionModule, 
    MatSelectModule, 
    MatSlideToggleModule, 
    MatCardModule,
    MatChipsModule, 
    MatToolbarModule, 
    MatIconModule, 
    MatListModule,
    HttpClientModule,
    FlexLayoutModule,
    MatSidenavModule,
    
    AngularFireModule.initializeApp(environment.firebase),
 	  AngularFirestoreModule,
    
     RouterModule.forRoot(appRoutes)],

  declarations: [AppComponent, LoginComponent, HomeComponent, RegistrationComponent, ForgotPasswordComponent, TareasComponent, AdminMainComponent, NavMenuComponent, ProjectsComponent, RequestFormComponent, ListComponent, FilterPipe],
  bootstrap: [AppComponent],
  providers: [MatIconRegistry, AppService, MsalService, AuthGuard, ModeratorGuard, UserGuard, AdminGuard, BatchModel, {provide: APP_BASE_HREF, useValue : '/'}]
})
export class AppModule {

}

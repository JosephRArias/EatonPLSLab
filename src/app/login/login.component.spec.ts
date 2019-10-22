import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { TestBed,getTestBed, async,fakeAsync,tick, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {Router} from "@angular/router";
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import { AppService } from '../app.service';
import { LoginComponent } from './login.component';
import { appRoutes } from '../app.routing';
import { AppModule } from '../app.module';

describe('LoginComponent', () => {
  let app: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let appService: AppService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
      imports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        FormsModule,
        ReactiveFormsModule,
        appRoutes,
        AppModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [AppService]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LoginComponent);
      app = fixture.debugElement.componentInstance;
      app.ngOnInit();
      appService = TestBed.get(AppService);
    });

  }));

  // it('should create the app', async(() => {
  //   expect(app).toBeTruthy();
  // }));

  // it('form invalid when empty', () => {
  //   expect(app.loginForm.valid).toBeFalsy();
  // });


  // it('blocks login without a valid email address', () => {
  //   app.loginForm.controls.email.setValue("admin");
  //   app.loginForm.controls.password.setValue("admin");
  //   expect(app.loginForm.valid).toBeFalsy();
  // });

  // it('allows login with a valid email address & password', () => {
  //   app.loginForm.controls.email.setValue("admin@123.com");
  //   app.loginForm.controls.password.setValue("admin");
  //   expect(app.loginForm.valid).toBeTruthy();
  // });
  // it('stores token after successful login', () => {
  //   app.login();
  //   expect(localStorage.getItem('currentUser')).toBeTruthy();
  // });
  //   it('blocks login without a valid email address', () => {
  //   app.loginForm.controls.email.setValue("admin");
  //   app.loginForm.controls.password.setValue("admin");
  //   expect(app.loginForm.valid).toBeFalsy();
  // });

  // it('allows login with a valid email address & password', () => {
  //   app.loginForm.controls.email.setValue("admin@123.com");
  //   app.loginForm.controls.password.setValue("admin");
  //   expect(app.loginForm.valid).toBeTruthy();
  // });
  // it('stores token after successful login', () => {
  //   app.login();
  //   expect(localStorage.getItem('currentUser')).toBeTruthy();
  // });

        // it('navigate to "products" redirects you to /products',
        //     fakeAsync(() => {
        //         const injector = getTestBed();
        //         const router = injector.get(Router);
        //         const fixture = TestBed.createComponent(LoginComponent);
        //         fixture.detectChanges();
        //         tick(50);
        //         router.navigate(['/products'])
        //             .then(() => {
        //                 expect(router.url).toEqual('/products');
        //             });
        //     }));

});
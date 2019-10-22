
import { TestBed, fakeAsync, getTestBed, tick, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from "../app.module";
import { ForgotPasswordComponent } from './forgot.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../app.service';
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

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let appService: AppService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, MatAutocompleteModule,
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
        AppModule,
        FormsModule,
        ReactiveFormsModule
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should render Register Component', () => {
    expect(component).toBeTruthy();
  });

  it('validates password field successfully', () => {
    component.passwordForm.controls.password.setValue("7897897899");
    expect(component.passwordForm.controls.password.valid).toBeTruthy();
  });

  it('validates password field failure', () => {
    component.passwordForm.controls.password.setValue("");
    expect(component.passwordForm.controls.password.valid).toBeFalsy();
  });

  it('emailContinue when email form is valid', () => {
    component.emailForm.controls['email'].setValue('admin@123.com');
    component.sendResetEmail();
    expect(component.emailForm.valid).toBeTruthy();
    expect(component.showPasswordForm).toBeTruthy();
    expect(component.showEmailForm).toBeFalsy();
  });

  it('emailContinue when email form is invalid', () => {
    component.emailForm.controls['email'].setValue('admin');
    component.sendResetEmail();
    expect(component.emailForm.valid).toBeFalsy();
    expect(component.showPasswordForm).toBeFalsy();
    expect(component.showEmailForm).toBeTruthy();
  });


});

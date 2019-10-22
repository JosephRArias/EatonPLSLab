
import { TestBed, fakeAsync, getTestBed, tick, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from "../app.module";
import { RegistrationComponent } from './registration.component';
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

describe('RegistrationComponent', () => {
    let component: RegistrationComponent;
    let fixture: ComponentFixture<RegistrationComponent>;
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
        fixture = TestBed.createComponent(RegistrationComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
    });

    it('should render Register Component', () => {
        expect(component).toBeTruthy();
    });

    it('blocks login without a valid email address', async () => {
        component.registrationForm.controls.email.setValue("admin");
        expect(component.registrationForm.controls.email.valid).toBeFalsy();
    });

    it('allows login with a valid email address', () => {
        component.registrationForm.controls.email.setValue("admin@123.com");
        expect(component.registrationForm.controls.email.valid).toBeTruthy();
    });

    it('backtoRegister', () => {
        component.backtoRegister();
        expect(component.showRegisterForm).toBeTruthy();
        expect(component.showVerificationForm).toBeFalsy();
    });

    it('registration', () => {
        component.registrationForm.controls['email'].setValue('admin@123.com');
        component.sendEmailVerification();
        expect(component.showVerificationForm).toBeTruthy();
        expect(component.showRegisterForm).toBeFalsy();
    });

    it('backtoVerification', () => {
        component.backtoVerification();
        expect(component.showVerificationForm).toBeTruthy();
        expect(component.showAccountForm).toBeFalsy();
    });

    it('goToAccount', () => {
        component.verifyEmail();
        expect(component.showAccountForm).toBeTruthy();
        expect(component.showVerificationForm).toBeFalsy();
    });

});

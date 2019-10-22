/// <reference types="cypress" />
import Chance from 'chance';
const chance = new Chance();

describe('Angular login', () => {
    const email = chance.email();
    const pass = 'Validpassword23';

    it('Login form loads correctly', () => {
        cy.visit('localhost:4200')
        cy.contains('Email Address');
        cy.contains('Password');
        cy.contains('Remember Me');
        cy.contains('LOG IN');
        cy.contains('Sign Up');
        cy.contains('Forgot Password');
        cy.contains('Terms and Conditions');
        cy.contains('Privacy Policy')
    });

    it('Register and create user account', () => {
        cy.contains('Sign Up').click()
        cy.url().should('include', 'registration')
        cy.get('[data-cy=reg-email]').type(email);
        cy.contains('NEXT').click()
        cy.get('[data-cy="verify code"]').type(12345);
        cy.get('.mat-raised-button').eq(0).should('not.be.disabled');
        cy.contains('NEXT').click()
        cy.get('h4').should('have.text', 'Create Account');
        cy.contains('account details')
        cy.get('[data-cy=reg-fname]').type('new')
        cy.get('[data-cy=reg-lname]').type('user');
        cy.get('[data-cy=reg-title-role]').type('administrator');
        cy.get('[data-cy=reg-phone]').type('4445556666');
        cy.get('[data-cy=reg-pswd]').type('PaSSworD');
        cy.get('[data-cy=reg-conf-pswd]').type('PaSSworD');
        cy.get('.mat-raised-button').eq(0).should('not.be.disabled');
        cy.get('[data-cy=reg-finish-btn]').click()
        cy.url().should('include', 'login')
    });
    it('User login and log out', () => {
        cy.get('[data-cy=login-email]').type(email);
        cy.get('[data-cy=login-password]').type(12345)
        cy.get('[data-cy=login-btn]').eq(0).should('not.be.disabled');
        cy.get('[data-cy=login-btn]').click()
        cy.get('[data-cy=logout-btn]').eq(0).should('not.be.disabled');
        cy.get('.mat-raised-button').click();
        cy.url().should('include', 'login')
    });
});
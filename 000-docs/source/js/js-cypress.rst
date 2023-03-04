# JS - Cypress
###############

## Cypress in a Nutshell
*************************

https://youtube.com/watch?v=LcGHiFnBh3Y

https://docs.cypress.io/guides/overview/why-cypress

command, npm install -D cypress
command, cypress run

Headless-mode is useful for running on a Continuous Integration (CI)

command, Open desktop app: npx cypress open

Exemple organisation
- root
  - cypress
    - fixtures
    - integration
    - plugins
    - support

Cypress API doc: docs.cypress.io/api

Exemple

```javascript
it('send email with contact form', () => {
  cy.get('#name-input').type('Amir')
  cy.get('#email-input').type('amir@cypress.io')
  cy.get('from').submit()
  cy.get('#success-message').shoudl('be.visible')
})
```

```javascript
cy.get('button')
  .click()
  .should('have.class', 'active')
```

```javascript
cy.visit('http://localhost:8080/signup')

cy.get('input[name="email"]').type('amir@cypress.io')
cy.get('input[name="password"]').type('1234')
cy.get('input[name="confirm-password"]').type('1234')
cy.get('#signup-button').click

cy.location('pathname').should('eq', '/login')

cy.get('input[name="email"]').type('amir@cypress.io')
cy.get('input[name="password"]').type('1234')
cy.get('#login-button').click

cy.location('pathname').should('eq', '/board')
```

Execute js on the system: cy.task (on.cypress.io/task)

```javascript
// cypress/support/commands.js

Cypress.commands.add('login', (email, password) => {
  cy.get('input[name="email"]').type('amir@cypress.io')
  cy.get('input[name="password"]').type('1234')
  cy.get('#login-button').click
})
```

```javascript
context('User setup', () => {
  beforeEach(() => {
    cy.task('clear:db')
  })

  it('signup and login user', () => {
    cy.visit('http://localhost:8080/signup')

    cy.get('input[name="email"]').type('amir@cypress.io')
    cy.get('input[name="password"]').type('1234')
    cy.get('input[name="confirm-password"]').type('1234')
    cy.get('#signup-button').click

    cy.location('pathname').should('eq', '/login')

    cy.login('amir@cypress.io', '1234')

    cy.location('pathname').should('eq', '/board')
  })
})
```

```javascript
// cypress/plugins/index.js

const { clearDatabase, seedDatabase } = require('../../server/db')

module.exports = (on, config) => {
  on('task', {
    'clear:db': () => {
      return clearDatabase()
    }
  })

  on('task', {
    'seed:db': () => {
      return seedDatabase(data)
    }
  })
}
```

command, launch cypress in ci: npx cypress run
command, launch cypress in ci and record: npx cypress run --record
command, launch cypress in ci and record with parallelization: npx cypress run --record --parallel

## Automation Step by Step
***************************

:source: https://www.youtube.com/watch?v=CYcdT-tOvB0&list=PLhW3qG5bs-L9LTfxZ5LEBiM1WFfvX3dJo

Command, launch only subpart of tests: npx cypress run --spec <spec path>

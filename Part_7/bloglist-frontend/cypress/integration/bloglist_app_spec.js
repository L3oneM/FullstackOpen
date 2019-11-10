describe('Blogs ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Panikas',
      username: 'Panos',
      password: 'Paok'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('log in')
  })

  it('login form can be opened', function() {
    cy.contains('login')
      .click()
  })

  it('user can login', function () {
    cy.contains('log in')
      .click()
    cy.get('input:first')
      .type('Panos')
    cy.get('input:last')
      .type('Paok')
    cy.contains('login')
      .click()
    cy.contains('Panos')
  })

  describe('when logged in', function() {
    it('a new blog can be created', function() {
      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('a blog created by cypress')
      cy.get('#author')
        .type('cypress')
      cy.get('#url')
        .type('www.cypress')
      cy.contains('create')
        .click()
      cy.contains('a blog created by cypress')
    })
  })
})
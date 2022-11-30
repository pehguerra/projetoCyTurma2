describe('cabeçalho da página home', () => {
    
    context('não logado', () => {
        
        beforeEach(() => {
            cy.visit('/')
        })

        it('valida o cabeçalho', () => {
            
            // Conexão QA
            cy.getElement('navbar-conexaoQA')
                .should('have.attr', 'href', '/')
                .and('not.have.attr', 'target', '_blank')

            // QAs
            cy.getElement('navbar-QAs')
                .should('have.attr', 'href', '/perfis')
                .and('not.have.attr', 'target', '_blank')

            // Sobre
            cy.getElement('navbar-about')
                .should('have.attr', 'href', '/sobre')
                .and('not.have.attr', 'target', '_blank')

            // Cadastrar
            cy.getElement('navbar-register')
                .should('have.attr', 'href', '/cadastrar')
                .and('not.have.attr', 'target', '_blank')

            // Login
            cy.getElement('navbar-login')
                .should('have.attr', 'href', '/login')
                .and('not.have.attr', 'target', '_blank')
        })
    })

    context('logado', () => {
        
    })
})
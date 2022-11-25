describe('API - Profile', () => {
    
    let urlPerfis = '/api/profile'

    // DRY - Don't Repeat Yourself
    context('todos os perfis', () => {
        
        it('valida a API de perfis', () => {
            
            cy.log('Teste de texto')
            
            cy.request({
                method: 'GET',
                url: urlPerfis
            }).then(({ status, duration, body, headers }) => {
                expect(status).to.eq(200)
                expect(duration).to.be.lessThan(10000)
                expect(body[0].status).to.eq('Gerente de Testes')
                expect(body[0].user.name).to.eq('Pedro Guerra')
                expect(body[0].skills[0]).to.eq('Cypress')
                expect(body[0].skills).to.have.lengthOf(1)
                expect(body[0].date).to.not.be.null
                expect(headers['x-powered-by']).to.eq('Express')
            })
        })
    })

    context('perfil específico', () => {

        let urlPerfil = '/api/profile/user'
        
        it('seleciona um usuário inválido', () => {
            
            cy.request({
                method: 'GET',
                url: `${urlPerfil}/1`,
                failOnStatusCode: false
            }).then(({ status, body }) => {
                expect(status).to.eq(404)
                expect(body.errors[0].msg).to.eq('Perfil não encontrado')
            })
        })

        it('valida um usuário válido', () => {
            let usuarioId = '637d72b11fb5cb0015a02258'

            cy.request({
                method: 'GET',
                url: `${urlPerfil}/${usuarioId}`
            }).then(({ status, body }) => {
                expect(status).to.eq(200)
                expect(body.user.name).to.eq('Pedro Guerra')
            })
        })

        it('valida um usuário válido buscando na base', () => {
            
            cy.request({
                method: 'GET',
                url: urlPerfis
            }).then(({ body }) => {

                cy.request({
                    method: 'GET',
                    url: `${urlPerfil}/${body[1].user._id}`
                }).then(({ status, body }) => {
                    expect(status).to.eq(200)
                    expect(body.status).to.eq('Outro')
                })
            })
        })
    })
})
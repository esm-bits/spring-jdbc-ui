// https://docs.cypress.io/api/introduction/api.html

describe('index page', () => {
  it('インデックスページが正しく表示される', async () => {
    const res = await cy.request('/')
    expect(res.status).to.eq(200)
    cy.visit('/')
  })
})

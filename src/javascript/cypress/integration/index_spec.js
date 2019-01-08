describe('index page spec', () => {
  it('show index page', async () => {
    const res = await cy.request('/')
    expect(res.status).to.eq(200)
  })
})

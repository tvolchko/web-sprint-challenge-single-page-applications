


describe('Pizza form', () => {
    const orderButton = () => cy.get('button[id=order-pizza]')
    beforeEach(() => {
        cy.visit('http://localhost:3001')
        orderButton().click()
      })

    const nameInput = () => cy.get('input[name=name-input]')
    const sizeDropdown = () => cy.get('select[name=size-dropdown]')
    const pepperoni = () => cy.get('input[name=pepperoni')
    const sausage = () => cy.get('input[name=sausage')
    const onions = () => cy.get('input[name=onions')
    const greenPeppers = () => cy.get('input[name=greenPeppers')
    const butt = () => cy.get('button[id=order-button]')
    const special = () => cy.get('input[name=special-text]')

    it('test that you can add text to the boxes', () => {
        nameInput()
            .should('have.value', '')
            .type('Gerry Generic')
            .should('have.value', 'Gerry Generic')
        special()
            .should('have.value', '')
            .type('Gimme some sauceeee')
            .should('have.value', 'Gimme some sauceeee')
    })

    it('test that you can select multiple toppings', () => {
        pepperoni().check()
        sausage().check()
        onions().check()
        greenPeppers().check()
        pepperoni().should('have.checked', 'true')
        sausage().should('have.checked', 'true')
        onions().should('have.checked', 'true')
        greenPeppers().should('have.checked', 'true')
    })

    it('test that you can submit the form', () => {
        nameInput().type('Gerry Generic')
        sizeDropdown().select('Small')
        pepperoni().click()
        special().type('SAUCEEEEE')
        butt().click()
        cy.contains("Gerry Generic's Order")
    })
})
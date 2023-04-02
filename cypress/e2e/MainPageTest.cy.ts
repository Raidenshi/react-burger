describe('Constructor page tests', () => {
  beforeEach(function () {
    cy.visit('http://localhost:3000');
  });

  describe('Drag n Drop', function () {
    it('should drag an ingredient to constructor', function () {
      const dataTransfer = new DataTransfer();
      cy.get('img[alt*="Краторная булка N-200i"]').trigger('dragstart', {
        dataTransfer,
      });

      cy.get('[class^=constructor-list_list]')
        .trigger('drop', {
          dataTransfer,
        })
        .contains('Краторная булка N-200i (верх)');
    });

    it('should delete ingredient from constructor', function () {
      const dataTransfer = new DataTransfer();
      cy.get('img[alt*="Соус Spicy-X"]').trigger('dragstart', {
        dataTransfer,
      });

      cy.get('[class^=constructor-list_list]')
        .trigger('drop', {
          dataTransfer,
        })
        .get('[class^=constructor-element__action]')
        .click();

      cy.get('[class^=constructor-list_list]')
        .contains('Соус Spicy-X')
        .should('not.exist');
    });
  });

  describe('Modal', () => {
    it('should open and close ingredient modal', () => {
      cy.get('a[href^="/ingredient/60d3b41abdacab0026a733c6"]').click();

      cy.get('#react-modals').contains('Детали ингредиента');

      cy.get('#react-modals')
        .get('[class^=ingredient-page_details]')
        .contains('Калории, ккал');
      cy.get('button[class^=modal_button]').click();
    });

    it('should open order modal', () => {
      const dataTransfer = new DataTransfer();
      cy.get('img[alt*="Краторная булка N-200i"]').trigger('dragstart', {
        dataTransfer,
      });

      cy.get('[class^=constructor-list_list]').trigger('drop', {
        dataTransfer,
      });

      cy.get('.button_type_primary').click();

      cy.get('input[name="email"]').type('pepega@gmail.com');
      cy.get('input[name="password"]').type('pepega');

      cy.get('button[type="submit"]').click().wait(1000);

      cy.get('.button_type_primary').click().wait(15000);
      cy.get('#react-modals').contains('Ваш заказ начали готовить');
      cy.get('button[class^=modal_button]').click();
    });
  });
});

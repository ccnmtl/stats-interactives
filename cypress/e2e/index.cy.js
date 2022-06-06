it('Checks links to the interactives from the homepage', function() {
    // The purpose of this test is to check that the
    // routing is working as expected
    var baseUrl = 'http://localhost:3000';
    [
        '/central-limit-theorem',
        '/linear-regression-model',
        '/least-squares-estimation',
        '/sampling-distribution-regression',
    ].map(function(url){
        cy.visit(baseUrl);
        cy.wait(500);
        cy.get('a[href="' + url + '"]').click();
    });
});

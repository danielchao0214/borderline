describe('template spec', () => {

  beforeEach(function(){
    cy.visit('http://localhost:3000/dashboardmaps')
  })

  it('Import Button Exists', () => {
    
    cy.get('.DashboardMaps_importbox__ZvXev > .MuiButtonBase-root')

  })

  it('Check if Map container exsits', () => {
    
    cy.get('.DashboardMaps_mapcontainer__YU2Fh')

  })

  it('Check Recently Viewed Exsits', () => {
  
    cy.get('.DashboardMaps_recentmapcontainer__pFA9W')

  })


  it('Open Import Modal and verify buttons import  are present', () => {

    cy.get('.DashboardMaps_importbox__ZvXev > .MuiButtonBase-root').click()
    
    cy.get('.Modal_modalChoices__cFlNx > :nth-child(1) > .MuiButtonBase-root')

    cy.get('.Modal_modalChoices__cFlNx > :nth-child(1) > .MuiButtonBase-root')
  })




})
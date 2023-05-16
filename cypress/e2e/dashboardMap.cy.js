describe('template spec', () => {

  beforeEach(function(){
    cy.visit('http://localhost:3000/dashboardforums')
  })



  it('Create Post Button exsits', () => {
    
    cy.get('.DashboardForums_createButtonContainter__nhW9E > .MuiButtonBase-root')

  })

  it('Recently Viewed Exists', () => {
    
    cy.get('.DashboardForums_recentforumcontainer__TfI_l')

  })

   it('Forum container Exists', () => {
    
    cy.get('.DashboardForums_forumcontainer___r22v')

  })



})
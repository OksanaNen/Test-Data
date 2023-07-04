describe('connect to test db', () => {
  it('can connect to the db', () => {
    cy.task("queryDb", "CREATE TABLE Students (StudentID int, FirstName varchar(255), StudentGroup varchar(255), City varchar(255))");
  }); 
  
  it('Input entries', () => {
    cy.task("queryDb", 
    `INSERT INTO Students (StudentID, FirstName, StudentGroup, City) VALUES 
    (1, 'Maria', '117', 'Moscow'),
    (2, 'Petr', '217', 'Spb'),
    (3, 'Ekaterina', '317', 'Kogalym')`
   ).then((result) => {
     cy.log(JSON.stringify(result)); 
     expect(result.affectedRows).to.eql(3);
    });
  });

  it('Adding new data', () => {
    cy.task("queryDb", 
    `INSERT INTO Students (StudentID, FirstName, StudentGroup, City) VALUES 
    (4, 'Vladimir', '117', 'Ufa'),
    (5, 'Roman', '117', 'Cheliabinsk')`
   ).then((result) => {
     cy.log(JSON.stringify(result)); 
     expect(result.affectedRows).to.eql(2);
    });
  });

  it('select', () => {
    cy.task("queryDb", `SELECT FirstName from Students WHERE City='Kogalym'`)
    .then((result) => {
        cy.log(JSON.stringify(result));
        expect(result[0].FirstName).to.eql('Ekaterina');
    });
  });

  it('select group #117', () => {
    cy.task("queryDb", `SELECT FirstName from Students WHERE StudentGroup='117'`)
    .then((result) => {
        cy.log(JSON.stringify(result));
        expect(result[0].FirstName).to.eql('Maria');
    });
  });

  it('can delete the db', () => {
    cy.task("queryDb", "DROP TABLE Students");
  });
});
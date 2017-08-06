/**
 * Created by tichaona on 6/30/17.
 */
var createServicesTable = require('../dao/dbscripts/create/services-create-table');
var migrateServicesTable = require('../dao/dbscripts/migrate/services-migrate-table');

var createUsersTable = require('../dao/dbscripts/create/users-create-table');
var migrateUsersTable = require('../dao/dbscripts/migrate/users-migrate-table');

var createLastLoginTable = require('../dao/dbscripts/create/lastlogin-create-table');

var createCompaniesTable = require('../dao/dbscripts/create/companies-create-table');
var migrateCompaniesTable = require('../dao/dbscripts/migrate/companies-migrate-table');

var createReviewsTable = require('../dao/dbscripts/create/reviews-create-table');

var dbCreateTables = () => {
    console.log("Starting DB creation");
    createServicesTable();
    createUsersTable();
    createLastLoginTable();
    createCompaniesTable();
    createReviewsTable();
    console.log("DB creation Done!");
}

var dbMigrateData = () => {
    console.log("Starting DB Migrataion");
    migrateServicesTable();
    migrateUsersTable();
    migrateCompaniesTable();
    console.log("DB Migrataion Complete");

}


module.exports = {dbCreateTables, dbMigrateData}


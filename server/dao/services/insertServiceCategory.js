/**
 * Created by tichaona on 7/04/17.
 */
var {BBZ_DATABASE_PATH} = require ('../../constants/Database');
var bbzSqlite = require('../../dao/sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var insertServiceCategory = (serviceCategory, userId = null) => {
    let sql = `INSERT INTO services (serviceCategory, userId) 
    VALUES ('${serviceCategory}', ${userId} )`;
    console.log("sql", sql);
    return db.prepare(sql).run();
}

module.exports = insertServiceCategory;



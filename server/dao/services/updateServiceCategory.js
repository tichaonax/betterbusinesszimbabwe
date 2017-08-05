/**
 * Created by tichaona on 7/4/17.
 */
var {BBZ_DATABASE_PATH} = require ('../../constants/Database');
var bbzSqlite = require('../../dao/sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var updateServiceCategory = (serviceId, serviceCategory, userId) => {
    let sql = `UPDATE services SET 
    serviceCategory = '${serviceCategory}', 
    userId = ${userId} 
    WHERE serviceId = ${serviceId};`;
    return db.prepare(sql).run();
}

module.exports = updateServiceCategory;
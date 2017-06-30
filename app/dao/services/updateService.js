/**
 * Created by tichaona on 6/29/17.
 */
var bbzSqlite = require('../../dao/sqlite-singleton');
var db = bbzSqlite.getInstance();

var updateService = (serviceId, serviceItemId, serviceCategory, userId) => {
    let sql = `UPDATE services SET 
    serviceItemId = ${serviceItemId}, 
    serviceCategory = '${serviceCategory}', 
    userId = ${userId} 
    WHERE serviceId = ${serviceId};`;
    return db.prepare(sql).run();
}

module.exports = updateService;
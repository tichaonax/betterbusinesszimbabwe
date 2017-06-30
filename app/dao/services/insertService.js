/**
 * Created by tichaona on 6/29/17.
 */
var {BBZ_DATABASE_PATH} = require ('../../constants/Database');
var bbzSqlite = require('../../dao/sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var insertService = (serviceItemId, serviceCategory, userId = null) => {
    let sql = `INSERT INTO services (serviceItemId,serviceCategory, userId) VALUES (${serviceItemId}, '${serviceCategory}', ${userId})`;
    return db.prepare(sql).run();
}

module.exports = insertService;



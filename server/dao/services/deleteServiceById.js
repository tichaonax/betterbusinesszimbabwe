/**
 * Created by tichaona on 7/4/17.
 */
var {BBZ_DATABASE_PATH} = require ('../../constants/Database');
var bbzSqlite = require('../../dao/sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var deleteServiceById = (serviceId, userId) => {
    let sql = `UPDATE services SET
    isApproved = ${0},
    userId = ${userId}
    WHERE serviceId = ${serviceId};`;
    console.log("delet sql", sql);
    return db.prepare(sql).run();
}

module.exports = deleteServiceById;
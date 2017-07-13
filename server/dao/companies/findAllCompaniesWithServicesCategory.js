/**
 * Created by tichaona on 7/8/17.
 */
var {BBZ_DATABASE_PATH} = require ('../../constants/Database');
var bbzSqlite = require('../../dao/sqlite-singleton');
var db = bbzSqlite.getInstance(BBZ_DATABASE_PATH);

var findAllCompaniesWithServicesCategory = () => {
    let sql =`select c.companyId, c.userId, c.serviceId, c.companyTitle,
        c.companyDesc, c.rating, c.reviewCount, c.createAt, 
        c.updateAt, s.serviceItemId, s.serviceCategory,
         c.isApproved
         from 
        companies c
        join services s
        on c.serviceId = s.serviceId`;
    console.log("sql",sql);
    return db.prepare(sql).all();
}

module.exports = findAllCompaniesWithServicesCategory;

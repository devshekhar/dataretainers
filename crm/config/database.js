var mysql = require('mysql');
var connection=mysql.createPool({
        host     : '166.62.72.33',
        user     : 'data_root',
        password : 'aezakmi@123',
        database : 'dataretainers',
});
module.exports=connection;
const mysql = require('mysql');
const {MYSQL_CONF} = require('../conf/db');

const connection = mysql.createConnection(MYSQL_CONF);

connection.connect();

exec = (sql) => {
    const promise = new Promise(
        (resolve, reject) =>{
            connection.query(sql, (err, result)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve(result);
            })
            
        }
    );
    return promise;
}
console.log('mysql OK');
module.exports = {
    exec,
    escape:mysql.escape
}
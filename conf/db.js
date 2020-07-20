const env = process.env.NODE_ENV

if (env === 'dev'){
    var {MYSQL_CONF, REDIS_CONF} = require('./dev_connection');
}

if (env === 'production'){
    var {MYSQL_CONF, REDIS_CONF} = require('./prd_connection');
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}